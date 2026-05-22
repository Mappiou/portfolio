# Revue Portfolio — 15 améliorations prioritaires

Audit réalisé le 2026-05-21 sur le portfolio (`/Users/mathieudiep/Claude/portfolio/`), en croisant trois revues parallèles : copywriting, design/DA, UX/ergonomie.

**Verdict global (en 3 lignes)** : portfolio techniquement propre (i18n FR/EN/ES, `prefers-reduced-motion`, skip-link, stack React 19 moderne) avec un concept fort (deux variantes Cinema/Editorial). Mais trois plaies cassent l'expérience : aucune des fontes annoncées n'est réellement chargée (donc 60 % de l'identité typo s'effondre en Georgia), toutes les images sont des `picsum.photos` (le visiteur ne voit jamais Mathieu ni un vrai screenshot), et la navigation mobile est inutilisable (pas de burger, scroll-to-hash cassé, CV introuvable dans la nav). Une fois ces fondations corrigées, la singularité du projet ressortira.

Les améliorations sont classées par **impact × effort** : les 5 premières sont des quick wins à fort impact, les suivantes demandent plus de travail mais transforment le projet.

---

## Quick wins (< 2 h chacune)

### 1. Charger les vraies fontes — la priorité absolue
**Constat** : tout le code demande `Cormorant Garamond` (cinema), `Newsreader`, `Inter Tight`, `JetBrains Mono` (editorial) via `tokens.fontTitle / fontBody / fontMono`. Or `index.html` ne charge que `Fraunces`, `Inter`, `Caveat`, `Lora`, `Instrument Serif`. Résultat : 100 % des titres et du body retombent en Georgia + system-ui. Toute l'identité typo annoncée est invisible.
**Fix** : dans `index.html:31-35`, remplacer le `<link>` Google Fonts par une requête contenant `Cormorant+Garamond:ital,wght@0,300..500;1,300..500` + `Newsreader:ital,opsz,wght@0,6..72,400..500;1,6..72,400..500` + `Inter+Tight:wght@300..600` + `JetBrains+Mono:wght@400;500`, `display=swap`. Ajouter un `<link rel="preload" as="font">` pour les deux titres. **Sans ce fix, tous les autres correctifs typo sont cosmétiques.**

### 2. Remplacer tous les `picsum.photos` par de vraies images
**Constat** : 25 occurrences de `picsum.photos/seed/...` dans `src/` — y compris le portrait Hero (`cinema/Hero.tsx:17`, `editorial/Hero.tsx:22`), la photo Bio, les illustrations Timeline/Travel/Projects, et même le PhoneMockup qui retombe sur un emoji par défaut parce que `projects.ts` n'a aucun champ `screenshots`. Tant que c'est `picsum`, le site donne l'impression d'un template non terminé.
**Fix** : (a) 1 vrai portrait (3:2 et 4:5) pour Hero + Bio + Contact ; (b) 2-3 screenshots par projet (`/projects/triolinguo-1.png`, etc.) référencés dans `projects.ts` via `screenshots: [...]` ; (c) `loading="lazy"` sur toutes les `<img>` hors hero. Sans portrait réel, le concept "Scène 01 / Ouverture" sonne comme un template.

### 3. Réécrire le Hero pour une promesse différenciante
**Constat** : `bio.intro` = *« AI Engineer basé à Barcelone, je conçois et déploie des systèmes LLM/RAG que de vraies personnes utilisent, tous les jours. »* — c'est descriptif, pas différenciant. 80 % des portfolios IA disent la même chose. La preuve (90 000 users) est cachée dans une expérience.
**Fix** (FR, à adapter EN/ES) : *« Salut, je suis Mathieu. J'ai mis un chatbot LLM/RAG entre les mains de 90 000 personnes. AI Engineer à Barcelone, j'écris du Python, je livre des apps Flutter, et j'aime quand la technique reste calme. »* — preuve d'abord, ton personnel, concret. Cf. `src/shared/i18n/locales/{fr,en,es}.json` clé `bio.intro`.

### 4. Ajouter "Download CV" dans la nav (et un CTA Contact persistant)
**Constat** : le seul bouton CV vit dans `BioSection.tsx:64` — invisible tant qu'on n'a pas scrollé. C'est l'action #1 d'un recruteur, elle doit être en 1 clic. La clé i18n `nav.downloadCv` existe déjà, elle n'est juste pas placée.
**Fix** : ajouter un CTA "Download CV" à droite du `PillNav` (desktop), dans une bottom-nav mobile (avec `Home / Projects / Contact / CV`). En option, mettre un bouton mailto flottant en bottom-right sur scroll.

### 5. Corriger le contraste WCAG en variante Editorial
**Constat** : `editorial/styles/palette.ts:15` définit `textSecondary: "#7A6E5F"` sur `beige: "#F5EDE0"` → ratio ~3.9:1 (sous le 4.5:1 AA requis pour body). Le token est utilisé sur méta périodes/lieux, légendes, et même certains paragraphes (`BioSection.tsx:103`). L'accent `teal: "#8B6F47"` est aussi à 4.3:1, en limite. Tap targets sous 44 px : `DownloadButton` 38 px, `LanguageSwitcher` 24 px, `PillNav` items 28 px.
**Fix** : (a) `textSecondary` → `#5C5246` (ratio ~6.1:1), `teal` accent body → `#6F5736` (= `tealHover` déjà défini). (b) Min-height 44 px sur tous les boutons cliquables, padding-y ≥ 12 px sur les liens de nav.

---

## Améliorations moyennes (½ journée à 1 jour)

### 6. Rendre la navigation mobile utilisable
**Constat** : `PillNav` rend une `<ul>` flex à 3 items + logo + `VariantSwitchButton` sans aucun `hidden md:flex`, aucun burger, aucun wrap. À 375 px (iPhone SE/13 mini), le label *"Switch to cinema mode"* (`VariantSwitchButton.tsx:17`) déborde. Le `LanguageSwitcher` en `absolute right-6 top-7` (`Layout.tsx:46`) chevauche le PillNav. Le menu mobile n'existe simplement pas.
**Fix** : créer un `<MobileNav>` (drawer ou bottom-nav) qui s'affiche sous `md`, masquer le PillNav desktop sous `md`. Convention : bottom-nav fixe 3 icônes (Home / Projects / Contact) + un bouton FAB CV.

### 7. Réparer le scroll-to-hash sur le PillNav
**Constat** : les liens `<Link to="...#projects">` du `PillNav` ne déclenchent **pas** de scroll vers la section. React Router 7 ne gère pas le scroll natif sur ancre, et `scroll-behavior: smooth` sur `html` (`index.css:11`) ne suffit pas si le hash change sans re-render. Si on est déjà sur la page, rien ne se passe.
**Fix** : ajouter un composant `<ScrollToHash />` monté dans `App.tsx` qui écoute `useLocation().hash` et fait `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })` — ou installer `react-router-hash-link` et remplacer les `<Link>` par `<HashLink>`.

### 8. Code-splitter les deux variantes (lazy import)
**Constat** : `App.tsx:5-6` importe `CinemaApp` et `EditorialApp` en synchrone. L'utilisateur qui choisit Editorial télécharge quand même tout Cinema (et inversement). Sur ce projet, ~5 400 lignes de sections + Framer Motion + lucide-react + qrcode.react vivent en double.
**Fix** : `const CinemaApp = lazy(() => import('./variants/cinema/routes'))` + idem editorial + `<Suspense fallback={...}>`. Gain estimé : bundle initial divisé par ~2, LCP en baisse mesurable.

### 9. Ajouter des résultats chiffrés dans les expériences
**Constat** : sur 5 expériences, seules 2 contiennent des métriques (Hexamind 90 k users, Lincoln +20 % / 1M req/mois). Capgemini, Aubay, Orange Labs sont décrits en verbes flous (« développement de », « évaluation de », « recherche sur ») — du CV générique.
**Fix** : enrichir chaque bullet de `src/shared/data/experiences.ts` avec **un chiffre ou un livrable concret**. Exemple Aubay : *« Entraîné 3 architectures (LSTM, Transformer, VAE) sur ~10 k séquences MIDI, livré un démonstrateur capable de générer 30 s de mélodie cohérente. »* À faire pour les 3 expériences faibles, ~30 minutes par expérience.

### 10. Sortir les strings hardcodées FR-only des composants
**Constat** : un visiteur en EN ou ES voit du français dans plusieurs endroits :
- `cinema/Hero.tsx:52,93-95` : `SCÈNE 01 / OUVERTURE`, `MAI · 2026`, `BARCELONA · AI ENGINEER`
- `cinema/PassionsSection.tsx:75,89,305` et `editorial/PassionsSection.tsx:105,123` : `Le corps, en mouvement.`, `— Acte I`, `4 disciplines`
- `index.html:2` `<title>` figé en FR, `<html lang="fr">` jamais mis à jour dynamiquement
**Fix** : déplacer ces chaînes dans les 3 locales sous `hero.sceneLabel`, `hero.dateLabel`, `passions.bodyTitle`, `passions.actI/II`, `passions.count`. Pour `<title>` et `<html lang>` : un `useEffect` dans `App.tsx` qui set `document.title = t('meta.siteTitle')` et `document.documentElement.lang = i18n.language`.

### 11. Réécrire le CTA Contact + ajouter un vrai bouton
**Constat** : `contactSection.body` = *« Je suis ouvert à discuter d'un nouveau poste, d'une mission, ou simplement d'un café (vrai ou virtuel)… »* — passif, sans verbe d'action, et **aucun bouton mailto visible** (le mailto se cache dans une icône). Sur les 3 langues, traductions littérales calquées ("la couture entre la recherche AI et les apps" → "the seam between… and apps you can hand to a friend" est lourd ; "la costura entre la IA" en ES n'est pas idiomatique).
**Fix** : (a) réécrire les 3 langues avec un verbe direct — FR *« Écris-moi si tu cherches un AI Engineer pour un poste, une mission freelance, ou juste pour parler shop autour d'un café. »* (b) ajouter `contactSection.cta` = *« M'écrire / Email me / Escríbeme »* rendu en `<MegaButton>` mailto en haut de la section.

---

## Améliorations ambitieuses (plus longues mais structurantes)

### 12. Différencier *structurellement* Cinema et Editorial, pas juste leur palette
**Constat** : sur les 8 sections, 6 sont quasi isomorphes entre les deux variantes (même header, même grid 12 cols, même image, même bandeau mono). `TravelSection` et `EducationSection` font ~740 lignes **chacune par variante** avec une logique identique de scroll-snap horizontal et seuls les `tintFor` qui changent. Le passage Cinema↔Editorial devient un toggle de couleurs. Un recruteur dira "même portfolio en noir vs blanc" — donc le Chooser ne se justifie pas.
**Fix** : extraire la logique scroller dans un hook partagé `@shared/hooks/useScrollSnapTimeline.ts`, puis **deux UI réellement différentes** : Cinema → vraie pellicule horizontale (perforations SVG, ratio 4:3 par "frame", chapitrage strict, scroll snap-x sur certaines sections) ; Editorial → vraie grille print (drop caps Newsreader, hairlines 0.5 px, légendes type magazine, table des matières comme nav alternative, *aucun* dégradé/blur/translate). Effort : 3-4 jours, mais c'est ce qui transforme le portfolio de "joli template" à "double démonstration de DA".

### 13. Supprimer le Chooser comme home obligatoire
**Constat** : sur `/`, l'utilisateur doit choisir Cinema vs Editorial **avant** de voir un mot pro sur Mathieu. ~5-8 s de réflexion + 1 clic + 1.2 s d'animation cumulée avant le hero. Pour un recruteur LinkedIn en mode survol, c'est une friction non justifiée tant que les deux variantes ne sont pas *vraiment* différentes (cf. point #12).
**Fix** : rediriger `/` vers `/{lastVariant ?? "editorial"}/{detectedLang}` (en utilisant `useVariantPreference`) et garder le Chooser en route secondaire `/style` accessible via un bouton dans le menu. Le `VariantSwitchButton` peut aussi proposer un menu déroulant "Cinema ↔ Editorial · Voir les 2 styles".

### 14. Remplacer `AuraCanvas` par des fonds spécifiques à chaque variante
**Constat** : les deux variantes utilisent le **même** composant — 3 cercles `width: 32rem; filter: blur(160-180px)` positionnés en top-left / right / bottom. C'est littéralement le pattern Stripe/Vercel/Tailwind-template des 2 dernières années, ça nuit à la promesse "deux DA distinctes", et le blur 160 px est coûteux GPU.
**Fix** : (a) Cinema → grain de film (SVG noise overlay très subtil, `mix-blend-mode: overlay`, `opacity: 0.04`) + vignettage radial — colle au concept pellicule. (b) Editorial → fond papier crème uni avec texture print légère (SVG paper grain), aucun dégradé. Bonus : supprime un anti-pattern visuel reconnu comme "AI design 2023".

### 15. Enrichir `ProjectDetail` (breadcrumb, projet suivant, contexte)
**Constat** : `ProjectDetail.tsx` affiche stack, description, features, QR, GitHub, puis un seul bouton "← Back to home" (perd la position de scroll). Pas de breadcrumb (`Home > Projets > Volley Météo`), pas de lien "Projet suivant →", pas de section "Pourquoi j'ai fait ça / Challenges". Le visiteur qui finit la page n'a aucune raison de continuer. Le retour scroll perd la position dans la section Projects de la home.
**Fix** : (a) breadcrumb en haut ; (b) footer de page "Voir aussi : [Scan2PDF →] [Triolinguo →]" qui boucle entre projets ; (c) ajouter optionnellement les sections *Contexte / Stack détaillée / Captures* ; (d) au retour Home, restaurer le scroll via `#projects` dans le `Link to`.

---

## Synthèse — par où commencer ?

**Semaine 1 (quick wins, impact immédiat)**
- Jour 1 : #1 fontes, #5 contraste WCAG (= 2 commits, 1 h chacun)
- Jour 2-3 : #2 vraies images (shooting + intégration)
- Jour 4 : #3 hero réécrit, #11 contact, #9 chiffres expériences (texte uniquement)
- Jour 5 : #4 CTA CV dans nav, #10 textes FR-only sortis dans i18n

**Semaine 2 (structurel)**
- #6 nav mobile + burger
- #7 scroll-to-hash réparé
- #8 code splitting variantes
- #15 ProjectDetail enrichi

**Backlog (ambition)**
- #12 différenciation structurelle Cinema/Editorial (3-4 jours)
- #13 Chooser secondaire (1 jour, dépend de #12)
- #14 fonds par variante (1-2 jours, dépend de la DA finale)

---

## Ce qui est déjà bien (pour mémoire)

- Architecture variantes propre : data partagée, pages parallèles, switch facile.
- i18n FR/EN/ES en place via i18next, avec détection navigateur.
- `prefers-reduced-motion` et `skip-link` présents (base accessibilité).
- Le ton "calme, un peu joueur" dans `bio.paragraphs[1]` et les `prose` de Passions est singulier — à étendre, pas à effacer.
- Le `travels.prologue` (pèlerinage, origines, Mexico) est la phrase la plus mémorable du site : exactement le type de récit qui devrait inspirer le hero.
- L'idée du chapitrage Cinema (`ChapterCard`, numérotation `CHAPITRE 06`) est forte et exploitable une fois le portrait + les fontes en place.

---

*Rapport généré en croisant 3 audits parallèles (copy, design, UX) — voir les rapports détaillés dans le transcript de la session du 2026-05-21.*
