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
| Distribution APK  | **GitHub Releases** (release `apks`, URL `releases/download/apks/<app>.apk`)                         |

Bundle prod : **360 KB JS / 117 KB gzipped · 16 KB CSS / 4 KB gzipped · 2 KB HTML**.

---

## Démarrage

> Site **100 % front-end** (Vite + React + TypeScript) : pas de backend, pas de base de données, **aucune variable d'environnement ni clé secrète** à configurer. Une fois les outils ci-dessous installés, trois commandes suffisent.

### Prérequis à installer

| Outil        | Pourquoi                                              | Version             |
| ------------ | ----------------------------------------------------- | ------------------- |
| **Git**      | cloner le dépôt                                       | récente             |
| **Node.js**  | exécuter Vite                                         | **20.19+** (LTS conseillée, ex. Node 22) |
| **pnpm**     | installer les dépendances (le projet a un `pnpm-lock.yaml`) | 10.x           |

#### macOS (le plus simple, via Homebrew)

```bash
# 1) Installer Homebrew s'il n'est pas déjà là
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2) Installer Git + Node
brew install git node

# 3) Activer pnpm (fourni par Node via Corepack — rien d'autre à installer)
corepack enable
```

> Alternative si `corepack enable` pose problème : `npm install -g pnpm`

#### Windows

1. Installer **[Node.js LTS](https://nodejs.org)** (l'installeur inclut npm + Corepack).
2. Installer **[Git for Windows](https://git-scm.com)**.
3. Dans PowerShell : `corepack enable`, puis suivre les mêmes étapes que ci-dessous.

#### Linux

Installer Node via [`nvm`](https://github.com/nvm-sh/nvm) (ou le gestionnaire de paquets de la distrib), puis `corepack enable`. Git est généralement déjà présent (`sudo apt install git` sinon).

#### Vérifier que tout est en place

```bash
git --version
node -v       # doit afficher v20.19 ou plus
pnpm -v
```

### Cloner et lancer

```bash
# 1) Cloner le dépôt (public — aucune authentification requise)
git clone https://github.com/Mappiou/portfolio.git

# 2) Entrer dans le dossier
cd portfolio

# 3) Installer les dépendances (lit le pnpm-lock.yaml)
pnpm install

# 4) Lancer le serveur de développement (HMR : recharge auto à chaque modif)
pnpm dev
```

Vite affiche alors une URL du type `http://localhost:5173/`. Ouvre-la dans ton navigateur. Après l'écran de choix, les deux variantes sont :

- `http://localhost:5173/editorial/fr`
- `http://localhost:5173/cinema/fr`

Pour **arrêter** le serveur : `Ctrl + C` dans le terminal.

> Les APK téléchargeables ne sont **pas** dans le dépôt (elles sont hébergées en [GitHub Releases](#qr-codes--apk)) : rien à télécharger en plus, les boutons et QR codes du site pointent directement vers la release.

### Version de production (optionnel)

```bash
pnpm build      # compile le site optimisé dans dist/
pnpm preview    # sert ce build localement (http://localhost:4173)
```

### Récupérer les mises à jour plus tard

```bash
cd portfolio
git pull
pnpm install    # au cas où des dépendances auraient changé
pnpm dev
```

### Récap minimal (outils déjà installés)

```bash
git clone https://github.com/Mappiou/portfolio.git
cd portfolio
pnpm install
pnpm dev
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

## ✏️ Éditer le contenu du site

Le contenu est désormais éclaté en plusieurs fichiers de données dans `src/shared/data/` (et les chaînes UI dans `src/shared/i18n/locales/{fr,en,es}.json`).

| Fichier                              | Contenu                                                                |
| ------------------------------------ | ---------------------------------------------------------------------- |
| `src/shared/data/profile.ts`         | Nom, email, téléphone, localisation, liens GitHub/LinkedIn             |
| `src/shared/data/experiences.ts`     | Timeline pro (Hexamind, Lincoln, Capgemini, Aubay, Orange Labs)        |
| `src/shared/data/education.ts`       | Timeline formation (Bac, UTT, Master Cybersécurité, échanges, stages)  |
| `src/shared/data/projects.ts`        | 5 apps Android (Volley Météo, Scan2PDF, Triolinguo, Torneo, NoScroll)  |
| `src/shared/data/skills.ts`          | Catégories de compétences (IA, Data, Programmation, Outils, Langues)   |
| `src/shared/data/passions.ts`        | Sport / Nouvelles technologies                                         |
| `src/shared/data/travels.ts`         | Section voyages (par région)                                           |
| `src/shared/i18n/locales/*.json`     | Libellés UI FR / EN / ES (nav, hero, footer, boutons, page 404…)       |

---

## 🖼️ Photos du site — guide complet

Toutes les images réelles vivent dans `public/`. Le chemin que tu mets dans un `src=` ou un `photoSrc` doit être **absolu, commençant par `/`** (et non `public/`).

> **Règle d'organisation** :
> - `public/cinema/` → **uniquement** les images de fond (`bgSrc`/Hero) propres au mode **cinema**. Elles n'ont pas d'équivalent en editorial.
> - `public/passions/`, `public/portrait.jpg`, etc. → images **partagées** entre les deux modes (le même fichier alimente les deux variantes via `src/shared/data/*.ts`).
>
> **Convention de nommage** : kebab-case, préfixe explicite. Pour les bg cinema : `<section>-bg.jpg`. Pour les passions/education/travels : `<sujet>-<nom>.jpg` ou `<nom>.jpg`.

### A — Images actuellement déposées (dans `public/`)

| Fichier (chemin public absolu)   | Mode(s)            | Affichée à                                                                  | Référencée depuis                                                          |
| -------------------------------- | ------------------ | --------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `/portrait.jpg`                  | cinema + editorial | Portrait Hero (editorial) **et** portrait dans la BioSection (cinema)       | `editorial/Hero.tsx:22`, `cinema/BioSection.tsx:100` (`src=`)              |
| `/cinema/passions-bg.jpg`        | cinema uniquement  | Bandeau "Chapitre 05 — Passions" (ChapterCard)                              | `cinema/PassionsSection.tsx:20` (`bgSrc`)                                  |
| `/passions/beach.jpg`            | cinema + editorial | Item Beach volley                                                           | `src/shared/data/passions.ts` → `beach-volley.photoSrc`                    |
| `/passions/skating.jpg`          | cinema + editorial | Item Patin à glace                                                          | `src/shared/data/passions.ts` → `skating.photoSrc`                         |
| `/passions/trek1.jpg`            | cinema + editorial | Trekking — image 1 du quadriptyque                                          | `src/shared/data/passions.ts` → `trekking.photoSrcs[0]`                    |
| `/passions/trek2.jpg`            | cinema + editorial | Trekking — image 2                                                          | `src/shared/data/passions.ts` → `trekking.photoSrcs[1]`                    |
| `/passions/trek3.jpg`            | cinema + editorial | Trekking — image 3                                                          | `src/shared/data/passions.ts` → `trekking.photoSrcs[2]`                    |
| `/passions/trek4.jpg`            | cinema + editorial | Trekking — image 4                                                          | `src/shared/data/passions.ts` → `trekking.photoSrcs[3]`                    |

> Pour remplacer une de ces images, **écrase simplement le fichier à son chemin actuel**. Pas besoin de toucher au code.

### B — Photos encore en placeholder (à remplacer si tu veux du contenu réel)

Pour chaque ligne ci-dessous : crée le fichier suggéré dans `public/<dossier>/`, puis édite la ligne pointée pour remplacer l'URL `https://picsum.photos/...` par le chemin absolu.

#### B.1 — Backgrounds **cinema uniquement** (à déposer dans `public/cinema/`)

Ces images n'ont **pas d'équivalent en editorial** — elles servent uniquement les ChapterCards et le fond du Hero du mode cinema.

| Fichier suggéré              | Section affichée                       | Ligne à éditer                                                              |
| ---------------------------- | -------------------------------------- | --------------------------------------------------------------------------- |
| `/cinema/hero-bg.jpg`        | Fond du Hero cinema                    | `src/variants/cinema/components/sections/Hero.tsx:16` (`src=`)              |
| `/cinema/bio-bg.jpg`         | Chapitre 01 — Bio (bandeau)            | `src/variants/cinema/components/sections/BioSection.tsx:16` (`bgSrc`)       |
| `/cinema/timeline-bg.jpg`    | Chapitre 02 — Expérience pro (bandeau) | `src/variants/cinema/components/sections/TimelineSection.tsx:28` (`bgSrc`)  |
| `/cinema/education-bg.jpg`   | Chapitre 03 — Formation (bandeau)      | `src/variants/cinema/components/sections/EducationSection.tsx:185` (`bgSrc`)|
| `/cinema/travel-bg.jpg`      | Chapitre 04 — Voyages (bandeau)        | `src/variants/cinema/components/sections/TravelSection.tsx:180` (`bgSrc`)   |
| `/cinema/projects-bg.jpg`    | Chapitre 06 — Projets (bandeau)        | `src/variants/cinema/components/sections/ProjectsSection.tsx:17` (`bgSrc`)  |
| `/cinema/contact-bg.jpg`     | Fond de la section Contact cinema      | `src/variants/cinema/components/sections/ContactSection.tsx:20` (`src=`)    |

#### B.2 — Image scène Bio (editorial uniquement)

| Fichier suggéré              | Section affichée    | Comment l'activer                                                                              |
| ---------------------------- | ------------------- | ---------------------------------------------------------------------------------------------- |
| `/bio-desk.jpg`              | Bio editorial       | `src/variants/editorial/components/sections/BioSection.tsx:57` — remplacer l'URL `src=`         |

#### B.3 — Passions (l'image manquante)

| Fichier suggéré                        | Section affichée   | Comment l'activer                                                                                                              |
| -------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `/passions/badminton.jpg`              | Item Badminton     | Dans `src/shared/data/passions.ts`, sur l'item `badminton`, remplacer la valeur de `photoSrc:` (actuellement une URL Unsplash) par `"/passions/badminton.jpg"` |

#### B.4 — Frise formation (panneau étendu de chaque entrée)

Pour chaque entrée de la frise formation, tu peux ajouter une vraie photo. Dans `src/shared/data/education.ts`, sur l'entrée correspondante, ajoute la propriété `photoSrc: "/education/<fichier>.jpg"`.

| Fichier suggéré                        | Entrée                                  | `id` à éditer dans `education.ts` |
| -------------------------------------- | --------------------------------------- | --------------------------------- |
| `/education/bac.jpg`                   | Baccalauréat                            | `bac`                             |
| `/education/utt-start.jpg`             | Entrée à l'UTT                          | `utt-start`                       |
| `/education/utt-prepa-end.jpg`         | Fin de prépa intégrée                   | `utt-prepa-end`                   |
| `/education/exchange-canada.jpg`       | Échange Canada                          | `exchange-canada`                 |
| `/education/exchange-china.jpg`        | Échange Chine                           | `exchange-china`                  |
| `/education/internship-orange-labs.jpg`| Stage Orange Labs                       | `internship-orange-labs`          |
| `/education/internship-aubay.jpg`      | Stage Aubay                             | `internship-aubay`                |
| `/education/internship-capgemini.jpg`  | Stage Capgemini                         | `internship-capgemini`            |
| `/education/engineering-utt.jpg`       | Diplôme d'ingénieur UTT                 | `engineering-utt`                 |
| `/education/master-cybersecurity.jpg`  | Master Cybersécurité                    | `master-cybersecurity`            |
| `/education/job-lincoln.jpg`           | Data Scientist — Lincoln                | `job-lincoln`                     |

> Les `id` exacts à utiliser sont ceux déjà présents dans `src/shared/data/education.ts` — vérifie le fichier si une ligne diffère.

#### B.5 — Section Voyages

Dans `src/shared/data/travels.ts`, chaque photo a un `seed` (placeholder picsum). Ajoute `src: "/travels/<fichier>.jpg"` à côté pour utiliser une vraie photo. Exemple :

```ts
// Avant
{ seed: "vietnam-sapa-rice" },
// Après
{ seed: "vietnam-sapa-rice", src: "/travels/vietnam-sapa-rice.jpg" },
```

Suggestion de nommage : `/travels/<pays>-<lieu>-<n>.jpg` (ex : `/travels/vietnam-halong-1.jpg`).

#### B.6 — Captures d'écran d'apps (pages détails projets)

Dans `src/shared/data/projects.ts`, chaque projet peut avoir un tableau `screenshots: string[]`. Conventions :

| Fichier suggéré                        | Projet                                  |
| -------------------------------------- | --------------------------------------- |
| `/projects/volley-meteo-1.png` à `-N.png` | Volley Météo (`/projects/volley-meteo`) |
| `/projects/scan2pdf-1.png` à `-N.png`     | Scan2PDF (`/projects/scan2pdf`)         |
| `/projects/triolinguo-1.png` à `-N.png`   | Triolinguo (`/projects/triolinguo`)     |

---

### Exemple complet — remplacer le portrait du Hero editorial

```bash
# 1) Crée le dossier si besoin et dépose la photo
mkdir -p public/editorial
cp ~/Pictures/portrait.jpg public/editorial/hero-portrait.jpg
```

```tsx
// 2) Édite src/variants/editorial/components/sections/Hero.tsx (ligne 22)
// AVANT
<img src="https://picsum.photos/seed/mathieu-portrait/800/1000" alt="..." />
// APRÈS
<img src="/editorial/hero-portrait.jpg" alt="..." />
```

C'est tout — Vite est en hot-reload, la nouvelle image apparaît tout de suite.

### Notes de cohérence

- Les **3 langues partagent obligatoirement les mêmes clés** (`tests/unit/locales.test.ts` plante sinon).
- Les balises `<italic>…</italic>` dans les titres sont traitées par `<Trans>` (react-i18next) → laisser telles quelles.
- TypeScript empêche les fautes de structure : si tu casses une clé, `pnpm typecheck` te le dira.

---

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
│   ├── content.ts           # ✏️ SOURCE UNIQUE — tous les textes du site + chemins des photos
│   ├── data/                # types.ts + ré-exports thin depuis content.ts (profile, experiences, education, skills, projects, passions)
│   ├── hooks/               # useLanguageRoute, usePrefersReducedMotion
│   ├── i18n/                # Config react-i18next + languages.ts (les libellés vivent dans content.ts)
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

Les 5 APK sont distribuées en **[GitHub Releases](https://github.com/Mappiou/portfolio/releases/tag/apks)** (release `apks`), **pas** dans le dépôt — ce qui garde le repo léger. Chaque projet expose dans `src/shared/data/projects.ts` une `apkUrl` absolue :

```
https://github.com/Mappiou/portfolio/releases/download/apks/<app>.apk
```

Au rendu, le bouton « Télécharger l'APK » utilise directement cette URL, et `<QRCode />` l'encode (le helper `resolveAbsoluteUrl` laisse passer les URL `https://` telles quelles). Résultat : depuis n'importe quel téléphone, scanner le QR ou cliquer le bouton télécharge l'APK directement depuis la release — en local **comme** en prod, puisque l'URL est absolue et publique.

> `public/apks/*.apk` est **gitignoré**. Les fichiers présents localement (issus d'un build) ne sont jamais commités.

### Mettre à jour une APK (quand tu modifies une app)

**Principe :** comme le site pointe vers une URL de release **fixe**, mettre à jour une app = reconstruire son APK puis **remplacer l'asset** portant le même nom dans la release `apks`. **Aucune modification de code n'est nécessaire dans le portfolio**, et **aucun redéploiement** : l'URL ne change pas, le bouton et le QR pointent automatiquement vers la nouvelle version.

> ⚠️ Le **nom de l'asset ne doit jamais changer** (`volley_meteo.apk`, `scan2pdf.apk`, `triolinguo.apk`, `torneo.apk`, `noscroll.apk`). C'est lui qui fait le lien avec l'URL du site.

#### Prérequis (une seule fois)

- **GitHub CLI** authentifié : `gh auth status` (sinon `gh auth login`).
- La **toolchain** de l'app : Flutter (apps Dart) ou Android SDK + JDK (app Kotlin).

#### Table de correspondance par app

| App (id portfolio) | Dossier source       | Type    | Commande de build               | APK produite                                              | Nom d'asset (fixe)  |
| ------------------ | -------------------- | ------- | ------------------------------- | --------------------------------------------------------- | ------------------- |
| `volley-meteo`     | `../volley_meteo`    | Flutter | `flutter build apk --release`   | `build/app/outputs/flutter-apk/app-release.apk`           | `volley_meteo.apk`  |
| `scan2pdf`         | `../scan2pdf`        | Flutter | `flutter build apk --release`   | `build/app/outputs/flutter-apk/app-release.apk`           | `scan2pdf.apk`      |
| `triolinguo`       | `../Triolinguo`      | Flutter | `flutter build apk --release`   | `build/app/outputs/flutter-apk/app-release.apk`           | `triolinguo.apk`    |
| `torneo`           | `../torneo`          | Flutter | `flutter build apk --release`   | `build/app/outputs/flutter-apk/app-release.apk`           | `torneo.apk`        |
| `noscroll`         | `../noscroll`        | Kotlin  | `./gradlew :app:assembleDebug`  | `app/build/outputs/apk/debug/app-debug.apk`               | `noscroll.apk`      |

> Les chemins `../` supposent que les projets d'apps sont **à côté** du dossier `portfolio` (tous dans `~/Claude/`). Adapte sinon.

#### Cas Flutter (Volley Météo, Scan2PDF, Triolinguo, Torneo)

Exemple avec **Volley Météo** :

```bash
# 1) Aller dans le projet de l'app et reconstruire l'APK
cd ../volley_meteo
flutter build apk --release

# 2) Remplacer l'asset dans la release (depuis n'importe où)
gh release upload apks \
   build/app/outputs/flutter-apk/app-release.apk#volley_meteo.apk \
   --clobber --repo Mappiou/portfolio
```

- La syntaxe `chemin/vers/app-release.apk#volley_meteo.apk` uploade le fichier **en le renommant** en `volley_meteo.apk` (le nom d'asset attendu par le site).
- `--clobber` **écrase** l'asset existant du même nom (sinon GitHub refuse car il existe déjà).

Pour une autre app Flutter, change juste le dossier (`cd ../scan2pdf`, etc.) et le nom d'asset (`#scan2pdf.apk`).

#### Cas Kotlin (NoScroll)

NoScroll se build en **debug** (le `release` n'est pas signé, donc non installable) :

```bash
cd ../noscroll
./gradlew :app:assembleDebug

gh release upload apks \
   app/build/outputs/apk/debug/app-debug.apk#noscroll.apk \
   --clobber --repo Mappiou/portfolio
```

#### Vérifier que la mise à jour est en ligne

```bash
# L'asset apparaît avec sa nouvelle taille / date :
gh release view apks --repo Mappiou/portfolio --json assets \
  -q '.assets[] | "\(.name)  \(.size) o  \(.updatedAt)"'

# L'URL publique répond bien (200) :
curl -sIL -o /dev/null -w "%{http_code}\n" \
  https://github.com/Mappiou/portfolio/releases/download/apks/volley_meteo.apk
```

Sur le site, le téléchargement et le QR servent désormais la nouvelle APK — rien d'autre à faire.

> Limite GitHub : **100 MB/fichier** (les APK actuelles vont de 16 à 52 MB).

### Ajouter une nouvelle app

1. Builder son APK et l'uploader sur la release `apks` (voir ci-dessus), avec un nom d'asset `<id>.apk`.
2. Ajouter une entrée dans `src/shared/data/projects.ts` (avec `apkUrl: "https://github.com/Mappiou/portfolio/releases/download/apks/<id>.apk"`).
3. Ajouter l'`id` à l'union de type `Project["id"]` (`src/shared/types/index.ts`) et les URL au `public/sitemap.xml`.

### Test QR depuis téléphone

Comme l'`apkUrl` est une URL GitHub publique, **le QR est scannable directement depuis n'importe quel téléphone**, même en dev local — pas besoin de tunnel ni d'IP locale.

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
