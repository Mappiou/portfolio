# Mathieu Diep — Portfolio

Site vitrine personnel de **Mathieu Diep**, AI Engineer (LLM/RAG/Generative AI).
Présente la bio, la timeline pro, les principes de travail, et 3 apps Android téléchargeables directement par QR code.

> Style visuel : **Editorial** chaud, inspiré de [seanhalpin.xyz](https://www.seanhalpin.xyz/about) — fond beige `#EBE3D5`, texte deep teal `#0E534D`, accents pastels (mint / rust / lilas / babyblue / yellow), titres serif Fraunces, italiques Instrument Serif, corps Inter.
> Trilingue : 🇫🇷 FR / 🇬🇧 EN / 🇪🇸 ES (routes dédiées + détection auto + persistance localStorage).

---

## Stack

| Couche            | Choix                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| Build / dev       | **Vite 8** + React 19 + TypeScript strict (`noUncheckedIndexedAccess`)                              |
| Styling           | **Tailwind CSS v4** + custom palette (`src/styles/palette.ts`)                                      |
| Polices           | **Fraunces** (titres) + **Inter** (corps) + **Instrument Serif** (accents italiques) — Google Fonts |
| Icônes            | **lucide-react** + brand SVG inline (GitHub, LinkedIn, X)                                           |
| Routing           | **react-router-dom v7** — routes par langue (`/fr`, `/en`, `/es`)                                   |
| i18n              | **react-i18next** + browser language detector + `<Trans>` pour italiques                            |
| QR codes          | `qrcode.react` (SVG, généré à la volée depuis l'URL APK)                                            |
| Tests unitaires   | **Vitest** + Testing Library + jsdom (≥ 50% coverage)                                               |
| Tests E2E         | **Playwright** (Chromium desktop + Pixel 5 mobile)                                                  |
| Lint              | **ESLint** strict + `jsx-a11y` + Prettier                                                           |
| Analytics         | `@vercel/analytics` (sans cookies, gratuit)                                                         |
| Hébergement cible | **Vercel** (sous-domaine gratuit)                                                                   |
| Distribution APK  | **GitHub Releases** par app (lien permanent `releases/latest/download/`)                            |

Bundle prod : **360 KB JS / 117 KB gzipped · 16 KB CSS / 4 KB gzipped · 2 KB HTML**.

---

## Démarrage

```bash
pnpm install
pnpm dev              # http://localhost:5173
```

## Scripts disponibles

| Commande                       | Action                                                      |
| ------------------------------ | ----------------------------------------------------------- |
| `pnpm dev`                     | Serveur de dev (HMR, sourcemaps)                            |
| `pnpm build`                   | Build de production dans `dist/`                            |
| `pnpm preview`                 | Sert le build prod localement (port 4173)                   |
| `pnpm lint` / `lint:fix`       | ESLint strict + accessibilité                               |
| `pnpm format` / `format:check` | Prettier write / check                                      |
| `pnpm typecheck`               | `tsc -b --noEmit`                                           |
| `pnpm test`                    | Tests unitaires Vitest (mode run, single shot)              |
| `pnpm test:watch`              | Tests unitaires en mode watch                               |
| `pnpm test:coverage`           | Tests unitaires + rapport de couverture (HTML + JSON)       |
| `pnpm test:e2e`                | Tests E2E Playwright (lance auto le `preview` server)       |
| `pnpm test:e2e:install`        | Télécharge les browsers Chromium                            |
| `pnpm verify`                  | Pipeline complète locale : lint + typecheck + tests + build |

## Structure du projet

```
portfolio/
├── public/
│   ├── cv/Mathieu_Diep_CV.pdf      # téléchargé depuis le bouton "Download CV"
│   ├── favicon.svg, robots.txt, sitemap.xml
├── src/
│   ├── components/
│   │   ├── layout/         # Layout, PillNav, LanguageSwitcher (top-right pill), Footer
│   │   ├── sections/       # Hero, BioSection, TimelineSection, PrinciplesSection, ProjectsSection, ContactSection
│   │   ├── ui/             # AuraCanvas (gradient blobs), MegaButton, PortraitTile, BrandIcons (Github/LinkedIn/X)
│   │   ├── projects/       # QRCode, DownloadButton
│   │   └── seo/            # SEO (title + meta description par page)
│   ├── data/                # types.ts, profile, experiences, education, skills, projects, principles
│   ├── hooks/               # useLanguageRoute, usePrefersReducedMotion
│   ├── i18n/                # Config + locales/{fr,en,es}.json (utilise <Trans> pour les italiques)
│   ├── pages/               # Home (orchestre les 6 sections), ProjectDetail, NotFound
│   ├── styles/              # palette.ts (couleurs + design tokens)
│   ├── App.tsx              # Routing /:lang + ProjectDetail + NotFound
│   ├── main.tsx             # Bootstrap React + i18n
│   └── index.css            # Tailwind import + skip link + focus + reduced-motion
├── tests/
│   ├── setup.ts             # Mocks IntersectionObserver, matchMedia
│   ├── unit/                # 28 tests Vitest (data, locales, composants, intégration full app)
│   └── e2e/                 # 13 tests Playwright × 2 projects (Chromium + Pixel 5)
├── .github/
│   ├── workflows/ci.yml     # CI complète (lint + typecheck + tests + build + E2E)
│   └── pull_request_template.md
├── vercel.json              # Rewrites SPA + headers de sécurité
├── eslint.config.js         # Flat config strict + jsx-a11y + prettier
├── playwright.config.ts
├── vitest.config.ts
├── tsconfig.app.json        # `strict: true`, `noUncheckedIndexedAccess: true`
└── vite.config.ts
```

## Routing

| URL                                    | Page                                                                  |
| -------------------------------------- | --------------------------------------------------------------------- |
| `/` → redirige vers la langue détectée |                                                                       |
| `/{fr,en,es}`                          | Long-scroll : Hero + Bio + Timeline + Principles + Projects + Contact |
| `/{fr,en,es}/projects/volley-meteo`    | Volley Météo : description, features, QR + bouton APK                 |
| `/{fr,en,es}/projects/scan2pdf`        | Scan2PDF                                                              |
| `/{fr,en,es}/projects/triolinguo`      | Triolinguo                                                            |
| `/{fr,en,es}/<inconnu>`                | 404 stylisé                                                           |

## Sections de la home page

1. **Hero** — pill "✱ À propos" + titre serif géant centré "Hi, I'm _Mathieu._"
2. **BioSection** — photo placeholder mint (cols 5/12) + intro serif + 2 paragraphes + 2 CTA (Download CV / Contact)
3. **TimelineSection** — 5 pills deep teal pour les expériences (Hexamind, Lincoln, Capgemini, Aubay, Orange Labs)
4. **PrinciplesSection** — container blur arrondi 64px, 4 entrées en grille 2×2 (numérotées 01-04)
5. **ProjectsSection** — 3 cards pastels (mint/rust/babyblue) avec mini-QR code intégré
6. **ContactSection** — gros titre serif + 3 boutons (Email / GitHub / LinkedIn)

## Multilingue

- 3 langues isolées : routes par langue, contenu dans `src/data/*.ts` (objet `Record<Language, string>`) et `src/i18n/locales/{fr,en,es}.json` pour les libellés UI.
- Toggle FR/EN/ES dans le header → met à jour l'URL en gardant la page courante (`useLanguageRoute` synchronise URL ↔ i18next).
- Détection auto au premier visit (`navigator.language`), persistée en `localStorage`.
- Test garanti que les 3 fichiers de locale partagent **exactement** le même set de clés (`tests/unit/locales.test.ts`).

## QR codes & APK

Les 3 APKs sont **bundlés dans le portfolio** sous `public/apks/<app>.apk` et servis par Vercel sur le même domaine que le site. Chaque projet expose dans `src/data/projects.ts` une `apkUrl` relative (`/apks/volley_meteo.apk`). Au rendu, `<QRCode />` la résout en URL absolue via `window.location.origin` (helper `src/lib/url.ts`) pour que le contenu du QR soit téléchargeable depuis n'importe quel téléphone.

**En prod (Vercel)**, le QR pointe vers `https://<domaine>/apks/volley_meteo.apk` → le téléphone télécharge directement l'APK.

**En local (dev/preview)**, le QR pointe vers `http://localhost:5173/apks/...` → utilisable seulement depuis la même machine. Pour tester depuis un téléphone, voir "Test QR depuis téléphone" plus bas.

### Mettre à jour une APK

```bash
cd ../volley_meteo
flutter build apk --release
cp build/app/outputs/flutter-apk/app-release.apk \
   ../portfolio/public/apks/volley_meteo.apk
cd ../portfolio
git add public/apks/volley_meteo.apk
git commit -m "chore(apk): update volley_meteo to vX.Y.Z"
git push  # Vercel redéploie automatiquement
```

Tailles APK actuelles : volley_meteo 42 MB, scan2pdf 50 MB, triolinguo 42 MB. Vercel free tier accepte jusqu'à 100 MB/fichier.

### Test QR depuis téléphone (en local)

Le téléphone ne peut pas atteindre `localhost`. Deux options :

1. **Tunnel public** — `pnpm dlx ngrok http 5173` → URL publique, modifier `apkUrl` temporairement
2. **Réseau local** — `pnpm dev --host`, le téléphone va à `http://<ip-mac>:5173`

Le plus simple reste de déployer sur Vercel et de scanner depuis le domaine de prod.

### Migration vers GitHub Releases (futur, optionnel)

Si la taille du repo devient un problème, il sera trivial de basculer vers GitHub Releases : remplacer dans `src/data/projects.ts` chaque `apkUrl: "/apks/<x>.apk"` par `apkUrl: "https://github.com/mathieudiep/<repo>/releases/latest/download/<x>.apk"` et publier les releases via `gh release create`.

## Workflow Git

- Branche `main` protégée. Toute évolution passe par une branche `feat/*`, `fix/*` ou `chore/*` puis une PR.
- **Conventional commits** : `feat(home): ...`, `fix(i18n): ...`, `chore(deps): ...`, `test(qr): ...`.
- CI bloquante avant merge (`.github/workflows/ci.yml`) :
  1. `pnpm lint` + `pnpm format:check`
  2. `pnpm typecheck`
  3. `pnpm test:coverage` (seuil 50%)
  4. `pnpm build`
  5. `pnpm test:e2e` (Chromium + Pixel 5)
- Tag de version (`v1.0.0`, `v1.1.0`...) à chaque release stable.
- Template de PR avec checklist auto-review dans `.github/pull_request_template.md`.

## Déploiement Vercel — étapes à faire à votre retour

Le repo est commit en local mais **pas encore poussé sur GitHub** ni connecté à Vercel (besoin de votre auth). Voici la procédure complète :

### 1. Créer le repo GitHub

```bash
cd /Users/mathieudiep/Claude/portfolio
gh auth login                            # si pas déjà connecté
gh repo create mathieudiep/portfolio --public --source=. --remote=origin --push
```

### 2. Connecter à Vercel

```bash
pnpm dlx vercel@latest                   # 1ère fois : login + lien projet
# OU via l'interface : https://vercel.com/new → import GitHub repo "portfolio"
```

Vercel détecte automatiquement Vite, le build se fait en `pnpm build`, le output est `dist/`.

### 3. Vérifier en production

Une fois déployé, l'URL sera `https://mathieu-diep.vercel.app` (ou le slug Vercel choisi).
À tester :

- 3 langues : `/fr`, `/en`, `/es`
- Navigation par toggle de langue (l'URL change, le contenu aussi)
- Pages projet : QR code visible, lien APK pointe vers GitHub releases
- 404 sur route inconnue
- Lighthouse audit : viser ≥ 90 en perf / a11y / SEO

### 4. Publier les APK

Pour chaque app (`volley_meteo`, `scan2pdf`, `Triolinguo`), créer une release `v1.0.0` avec l'APK release attaché — voir la section **QR codes & APK** ci-dessus.

### 5. (Optionnel) Domaine custom

Acheter `mathieudiep.fr` (~7€/an chez OVH ou Cloudflare Registrar), pointer le DNS vers Vercel → l'ajouter via le dashboard Vercel.

## Tests détaillés

### Unitaires (Vitest)

- `tests/unit/i18n.test.ts` — config i18n, languages supportés
- `tests/unit/locales.test.ts` — parité des clés FR/EN/ES, aucune valeur vide
- `tests/unit/data.test.ts` — intégrité des projets, expériences, éducation, skills, profile
- `tests/unit/QRCode.test.tsx` — composant QR (SVG, taille, title)
- `tests/unit/LanguageSwitcher.test.tsx` — 3 liens, aria-current, préservation du chemin
- `tests/unit/ProjectCard.test.tsx` — rendu nom + tagline + lien correct par langue
- `tests/unit/Home.integration.test.tsx` — rendu complet de l'app dans les 3 langues + détail projet + 404

### E2E (Playwright)

- Routing : `/` redirige, `/fr`, `/en`, `/es` chargent le bon contenu
- Toggle langue change URL et contenu
- 3 pages projet ont QR + lien APK valide
- Bouton "retour accueil" préserve la langue
- 404 affiche bien le 404 sur route inconnue
- Accessibilité : `<main>` et `<nav>` présents

## Accessibilité

- HTML sémantique (`<header>`, `<main>`, `<footer>`, `<nav>`, headings hiérarchisés)
- Skip link "aller au contenu" (visible au clavier)
- `aria-current="page"` sur la langue active
- `aria-labelledby` sur chaque section
- Contrastes vérifiés (WCAG AA pour le texte)
- Respect de `prefers-reduced-motion`
- `outline` visible au clavier (`focus-visible`)
- ESLint plugin `jsx-a11y` activé en strict

## Crédits

- Polices : [Caveat](https://fonts.google.com/specimen/Caveat) (manuscrit) + [Lora](https://fonts.google.com/specimen/Lora) (corps) — Google Fonts
- Illustrations : SVG custom hand-drawn en interne
- Icônes : emoji natifs

## Licence

Propriétaire — © 2026 Mathieu Diep. Tous droits réservés.
