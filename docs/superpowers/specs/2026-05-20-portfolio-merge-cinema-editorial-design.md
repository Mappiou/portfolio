# Fusion portfolio-cinema + portfolio-editorial dans portfolio

**Date** : 2026-05-20
**Auteur** : Mathieu Diep
**Statut** : Design approuvé — prêt pour implémentation

## Objectif

Unifier les trois projets `portfolio/`, `portfolio-cinema/` et `portfolio-editorial/` en un seul projet `portfolio/`. À l'arrivée sur le site, l'utilisateur choisit entre deux univers visuels distincts :

- **Cinema** : sombre, noir, cinématique, artistique (palette `#0E0D0B` + accent doré, typo Cormorant Garamond, radius arrondis).
- **Editorial** : clair, jovial, magazine (palette `#F5EDE0` + accent rouille, typo Newsreader, radius nets).

Les deux variantes restent visuellement indépendantes (composants distincts). Seules les données CV, traductions et images sont partagées.

## Décisions clés

| Décision | Choix |
|---|---|
| Comportement du choix | Persistant via localStorage + bouton "Voir l'autre vue" toujours dispo dans le nav |
| Architecture | Option B — deux jeux de composants distincts (`variants/cinema/`, `variants/editorial/`) + couche `shared/` pour data/i18n/assets |
| Routing | `/` → Chooser, puis `/:variant/:lang/...` |
| Images Chooser | Screenshots du Hero actuel de chaque variante (générés via Playwright, WebP ~150-200 kB) |
| Layout Chooser | Split-screen 50/50 plein écran, hover 55/45 + brightness, fade-in à l'arrivée |
| Bouton switch | Petit bouton dans `PillNav` (style adapté à la variante), cross-fade 500ms entre les deux sites |
| Logo "Mathieu Diep" | Ramène au Chooser `/` |
| Legacy links (ancien format `/projects/:id`) | Redirection vers `/` (Chooser) |
| Anciens repos portfolio-cinema / portfolio-editorial | Archive read-only, conservés au moins 1 mois après merge |

## Architecture — structure des dossiers

```
portfolio/
├── src/
│   ├── shared/
│   │   ├── data/                        # projects, education, travels, passions, bio
│   │   ├── i18n/                        # locales/{fr,en,es}.json + index.ts
│   │   ├── types/                       # Project, EducationStep, etc.
│   │   ├── hooks/
│   │   │   ├── useVariantPreference.ts  # localStorage { variant, lang }
│   │   │   └── useDetectInitialLanguage.ts
│   │   └── components/
│   │       └── Chooser.tsx              # page racine /
│   │
│   ├── variants/
│   │   ├── cinema/
│   │   │   ├── components/{layout,sections,projects,ui,seo}/
│   │   │   ├── pages/{Home,ProjectDetail,NotFound}.tsx
│   │   │   ├── styles/palette.ts
│   │   │   ├── index.css
│   │   │   └── routes.tsx               # exporte <CinemaApp />
│   │   └── editorial/                   # même structure (pas de ChapterCard)
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── public/
│   └── shared/
│       ├── projects/
│       ├── education/
│       ├── travels/
│       └── chooser/                     # cinema.webp + editorial.webp
│
├── package.json                         # union des deps (identiques aujourd'hui)
├── vite.config.ts                       # alias @shared → src/shared
└── docs/superpowers/specs/              # ce document
```

### Règles de séparation

| Va dans `shared/` | Reste dans `variants/<x>/` |
|---|---|
| Données CV (objets TS purs) | Composants React (style, layout, animations) |
| Traductions i18n FR/EN/ES | Palette de couleurs |
| Images, photos, médias | Typographie |
| Types TypeScript | Tokens (radius, espacements) |
| Hooks utilitaires sans UI | CSS spécifique au variant |
| Le composant `Chooser` lui-même | Composants Layout / Hero / Sections |

### Conséquences workflow

- Changer une photo projet → 1 fichier dans `public/shared/projects/`, vu par les 2 variantes.
- Ajouter une traduction → 1 fichier `shared/i18n/locales/`. Idem.
- Refondre le Hero cinema → seul `variants/cinema/components/sections/Hero.tsx` bouge.

## Routing

```tsx
// src/App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Chooser />} />
    <Route path="/cinema/*" element={<CinemaApp />} />
    <Route path="/editorial/*" element={<EditorialApp />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
  <Analytics />
</BrowserRouter>
```

Chaque variante exporte son sous-arbre :

```tsx
// variants/cinema/routes.tsx
export function CinemaApp() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/cinema/${detectInitialLanguage()}`} replace />}
      />
      <Route path=":lang" element={<CinemaLayout />}>
        <Route index element={<CinemaHome />} />
        <Route path="projects/:projectId" element={<CinemaProjectDetail />} />
        <Route path="*" element={<CinemaNotFound />} />
      </Route>
    </Routes>
  );
}
```

## Persistance

```tsx
// src/shared/hooks/useVariantPreference.ts
type Variant = 'cinema' | 'editorial';
type Preference = { variant: Variant; lang: string };

export function useVariantPreference() {
  const get = (): Preference | null => { /* lit localStorage */ };
  const set = (p: Preference) => { /* écrit localStorage */ };
  const clear = () => { /* supprime localStorage */ };
  return { get, set, clear };
}
```

**Comportement** :
- `/` affiche toujours le Chooser, même si une préférence existe. Si préférence présente, la moitié correspondante affiche un chip discret "↪ Ta dernière visite".
- Naviguer vers `/cinema/:lang` ou `/editorial/:lang` met à jour localStorage.
- Le bouton "Voir l'autre vue" bascule directement vers l'autre variante (pas vers le chooser) et met à jour localStorage.

## Page Chooser

### Layout

Split-screen 50/50 plein écran (desktop, ≥768 px). Chaque moitié contient :
- Screenshot du Hero de la variante (couvre toute la moitié, gradient noir→transparent ou beige→transparent en overlay pour lisibilité).
- Titre en grand : **CINEMA** (Cormorant Garamond) ou **EDITORIAL** (Newsreader).
- Tagline : "Sombre, artistique et cinématique" / "Clair, joyeux et magazine".
- CTA "Entrer →" (doré pour cinema, rouille pour editorial).
- Chip "↪ Ta dernière visite" si applicable (typo Inter Tight, opacité 0.7).

Mobile (<768 px) : empilé verticalement, 50vh chacun, pas de hover effect.

### Comportements

- Au hover desktop : moitié survolée passe de 50% à 55% de largeur, l'autre s'assombrit (`filter: brightness(0.6)`). Transition framer-motion ~400 ms.
- Clic n'importe où sur une moitié = choix → navigation vers `/cinema/:lang` ou `/editorial/:lang`. Résolution de `lang` (par ordre de priorité) :
  1. Lang choisie via le dropdown du Chooser pour cette session, si l'utilisateur l'a explicitement changée.
  2. `lang` sauvegardée dans localStorage (préférence précédente).
  3. Lang détectée depuis `navigator.language` si supportée (FR/EN/ES).
  4. Fallback `DEFAULT_LANGUAGE` (FR).
- À l'arrivée sur `/`, fade-in léger des deux moitiés (~500 ms stagger).
- Lien "Choisir la langue" en bas centré (dropdown FR/EN/ES) — change la `lang` cible avant le clic.

### Accessibilité

- `<main>` avec `<h1 className="sr-only">Choisis ton portfolio</h1>`.
- Chaque moitié est un `<Link aria-label="Portfolio Cinema — sombre et cinématique">`.
- Focus visible au keyboard, `tabIndex` ordonné gauche → droite.

## Bouton "Voir l'autre vue"

Composant `VariantSwitchButton` créé dans chaque variante (style adapté).

- Cinema : fond `#131210`, texte doré `#D9A648`, icône Lucide `ArrowLeftRight`, label "Voir l'autre vue".
- Editorial : fond `#FAF5EB`, texte rouille `#A04A2D`, même icône et label.
- Placé dans `PillNav` à côté du `LanguageSwitcher`.
- Tooltip au hover : "Changer de portfolio".

### Cross-fade

`AnimatePresence` au niveau de `App.tsx` (ou wrapper top-level). Chaque variante wrappe son outlet dans `motion.div` :

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
>
  <Outlet />
</motion.div>
```

Pendant le switch, les deux variantes cohabitent ~500 ms en cross-fade.

## Plan de migration

### Phase 0 — Préparation

1. Branche `feat/merge-variants` sur `portfolio/`.
2. Tag `pre-merge` sur les 3 repos.
3. Diff exhaustif des `data/` et `i18n/` entre cinema et editorial pour identifier les conflits éventuels.

### Phase 1 — Squelette

1. Créer `src/shared/`, `src/variants/{cinema,editorial}/`, `public/shared/`.
2. Copier `data/`, `i18n/`, `types/` (version canonique) vers `src/shared/`.
3. Déplacer images depuis `portfolio-cinema/public/` vers `public/shared/`.
4. Configurer alias `@shared` dans `vite.config.ts` et `tsconfig.app.json`.

### Phase 2 — Port de cinema

1. Copier `portfolio-cinema/src/{components,pages,styles}/` + `index.css` → `src/variants/cinema/`.
2. Remplacer imports `./data/`, `./i18n/`, `./types`, `./hooks/useDetectInitialLanguage` par `@shared/...`.
3. Créer `variants/cinema/routes.tsx` exportant `<CinemaApp />`.
4. Wire-up dans `App.tsx` : `/cinema/*` → `<CinemaApp />`.
5. Validation : `/cinema/fr` doit afficher la home cinema actuelle sans régression visuelle.

### Phase 3 — Port d'editorial

Idem Phase 2, symétrique. Vérifier qu'aucune dépendance croisée n'existe entre les deux variantes.

### Phase 4 — Screenshots du Chooser

1. `pnpm dev`, navigation sur `/cinema/fr` et `/editorial/fr`.
2. Capture *above-the-fold* du Hero (viewport 1920×1200, sans scroll) via Playwright. Script à ajouter sous `scripts/capture-chooser-screenshots.ts`.
3. Optimisation WebP (~150-200 kB) → `public/shared/chooser/{cinema,editorial}.webp`. Fournir aussi un fallback JPEG pour les anciens navigateurs.

### Phase 5 — Page Chooser

1. `src/shared/components/Chooser.tsx` avec split-screen 50/50.
2. `src/shared/hooks/useVariantPreference.ts`.
3. Route `/` → `<Chooser />` dans `App.tsx`.
4. Validation : clic moitié cinema → `/cinema/fr` ; mobile empilé OK ; hover désactivé mobile.

### Phase 6 — Bouton switch + cross-fade

1. `VariantSwitchButton` créé dans chaque variant (style local).
2. Insertion dans le `PillNav` de chaque variant à côté du `LanguageSwitcher`.
3. Le logo "Mathieu Diep" pointe vers `/` (chooser).
4. `AnimatePresence` au niveau du wrapper top-level pour le cross-fade 500 ms.

### Phase 7 — Cleanup & validation

1. `pnpm verify` (lint + typecheck + test + build) doit passer.
2. Tests manuels :
   - `/` → Chooser
   - `/cinema/fr` → home cinema FR
   - `/cinema/fr/projects/<id>` → détail projet cinema
   - Click "Voir l'autre vue" → fade vers `/editorial/fr`
   - `/foo/bar` → redirect vers `/`
   - `/projects/<id>` (legacy) → redirect vers `/`
3. 1er visit (localStorage vide) puis 2e visit (préférence mémorisée).
4. Test mobile (viewport <768 px).
5. Anciens repos : README dans chacun pointant vers le nouveau ; archive read-only ≥ 1 mois.

## Risques & mitigations

| Risque | Mitigation |
|---|---|
| Drift entre `data/` actuels de cinema vs editorial | Diff exhaustif Phase 0 ; trancher cas par cas |
| Composants référant des classes CSS globales par variant | Isoler les `index.css` + scoper sélecteurs (`.cinema-app .my-class`) |
| Liens legacy (`/projects/:id`) | Catch-all redirige vers `/` (Chooser) |
| Le `ChapterCard` existe seulement dans cinema | Reste dans `variants/cinema/components/ui/`, jamais importé ailleurs |
| Bundle size potentiellement doublé (2 jeux de composants) | Code-splitting via React.lazy au niveau `CinemaApp` / `EditorialApp` si nécessaire |

## Estimation

| Phase | Durée estimée |
|---|---|
| 0 + 1 — Préparation + squelette | 30 min |
| 2 — Port cinema | 1 h |
| 3 — Port editorial | 1 h |
| 4 — Screenshots | 30 min |
| 5 — Chooser | 1 h 30 |
| 6 — Bouton switch + cross-fade | 45 min |
| 7 — Cleanup + validation | 30 min |
| **Total** | **~6 h** |
