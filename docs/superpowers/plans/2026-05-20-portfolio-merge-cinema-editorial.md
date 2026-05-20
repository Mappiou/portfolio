# Fusion portfolio-cinema + portfolio-editorial — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fusionner les 3 projets (`portfolio/`, `portfolio-cinema/`, `portfolio-editorial/`) en un seul. Ajouter une page Chooser racine `/` avec split-screen 50/50, et un bouton "Voir l'autre vue" dans le nav de chaque variante avec cross-fade 500 ms.

**Architecture:** Option B (du spec) — `src/shared/` pour data/i18n/types/hooks/Chooser, `src/variants/{cinema,editorial}/` pour deux jeux de composants indépendants. Routing : `/` → Chooser, `/cinema/:lang/...`, `/editorial/:lang/...`. Persistance via localStorage.

**Tech Stack:** React 19, TypeScript, Vite, React Router v7, framer-motion, Tailwind v4, Vitest + Testing Library, Playwright.

**Spec source:** `docs/superpowers/specs/2026-05-20-portfolio-merge-cinema-editorial-design.md`

---

## File Structure (à créer / modifier)

**À créer :**
- `src/shared/data/{projects,education,travels,passions,bio,index}.ts`
- `src/shared/i18n/index.ts` + `src/shared/i18n/locales/{fr,en,es}.json`
- `src/shared/types/index.ts`
- `src/shared/hooks/{useVariantPreference,useDetectInitialLanguage}.ts`
- `src/shared/components/{Chooser.tsx,Chooser.css,LanguageDropdown.tsx}`
- `src/variants/cinema/**` (copie de `portfolio-cinema/src/**` sauf data/i18n/types)
- `src/variants/editorial/**` (copie de `portfolio-editorial/src/**` sauf data/i18n/types)
- `src/variants/cinema/routes.tsx` + `src/variants/editorial/routes.tsx`
- `src/variants/cinema/components/layout/VariantSwitchButton.tsx`
- `src/variants/editorial/components/layout/VariantSwitchButton.tsx`
- `public/shared/` (images, assets) + `public/shared/chooser/{cinema,editorial}.webp`
- `scripts/capture-chooser-screenshots.ts`
- `tests/unit/useVariantPreference.test.ts`
- `tests/unit/Chooser.test.tsx`
- `tests/e2e/routing.spec.ts`

**À modifier :**
- `src/App.tsx` — nouveau routing top-level + AnimatePresence
- `src/main.tsx` — import du `shared/i18n` au lieu de l'ancien
- `vite.config.ts` — ajouter alias `@shared`
- `tsconfig.app.json` — `paths` pour `@shared/*`

**À supprimer après validation :**
- L'ancien `src/data/`, `src/i18n/`, `src/components/`, `src/pages/`, `src/hooks/`, `src/styles/`, `src/lib/` à la racine de `portfolio/src/` (l'ancien code de base, remplacé par les variants).

---

## Phase 0 — Préparation

### Task 1 : Créer la branche + tags de sauvegarde

**Files:** aucun (opérations git uniquement)

- [ ] **Step 1: Créer la branche de travail dans portfolio/**

```bash
cd /Users/mathieudiep/Claude/portfolio
git checkout -b feat/merge-variants
```

Expected: `Switched to a new branch 'feat/merge-variants'`

- [ ] **Step 2: Poser un tag pre-merge sur les 3 repos**

```bash
cd /Users/mathieudiep/Claude/portfolio && git tag pre-merge
cd /Users/mathieudiep/Claude/portfolio-cinema && git tag pre-merge
cd /Users/mathieudiep/Claude/portfolio-editorial && git tag pre-merge
```

Expected: 3 tags créés, aucune erreur.

- [ ] **Step 3: Vérifier l'égalité des dossiers partagés entre cinema et editorial**

```bash
cd /Users/mathieudiep/Claude
diff -r portfolio-cinema/src/data portfolio-editorial/src/data
diff -r portfolio-cinema/src/i18n portfolio-editorial/src/i18n
```

Expected: si différences présentes, c'est OK — on prendra la version cinema comme source canonique (les commits récents sont identiques entre les deux). Noter les différences pour vérification manuelle.

---

## Phase 1 — Squelette + données partagées

### Task 2 : Créer la structure de dossiers

**Files:**
- Create: `src/shared/{data,i18n,types,hooks,components}/`
- Create: `src/variants/{cinema,editorial}/`
- Create: `public/shared/chooser/`

- [ ] **Step 1: Créer tous les dossiers vides**

```bash
cd /Users/mathieudiep/Claude/portfolio
mkdir -p src/shared/{data,i18n/locales,types,hooks,components}
mkdir -p src/variants/{cinema,editorial}
mkdir -p public/shared/chooser
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: scaffold shared + variants folders"
```

### Task 3 : Configurer l'alias `@shared`

**Files:**
- Modify: `vite.config.ts`
- Modify: `tsconfig.app.json`

- [ ] **Step 1: Mettre à jour `vite.config.ts`**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
});
```

- [ ] **Step 2: Mettre à jour `tsconfig.app.json` pour l'alias**

Ajouter dans `compilerOptions` (avant la fermeture `}`) :

```json
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["src/shared/*"]
    }
```

- [ ] **Step 3: Vérifier que le typecheck passe**

```bash
pnpm typecheck
```

Expected: PASS (aucune erreur — l'alias n'est encore référencé nulle part).

- [ ] **Step 4: Commit**

```bash
git add vite.config.ts tsconfig.app.json
git commit -m "chore(config): add @shared path alias"
```

### Task 4 : Porter les données + types vers `src/shared/`

**Files:**
- Create: `src/shared/data/{projects,education,travels,passions,bio,index}.ts`
- Create: `src/shared/types/index.ts`

- [ ] **Step 1: Copier les fichiers data depuis portfolio-cinema (source canonique)**

```bash
cd /Users/mathieudiep/Claude/portfolio
cp ../portfolio-cinema/src/data/types.ts src/shared/types/index.ts
cp ../portfolio-cinema/src/data/*.ts src/shared/data/
# Le fichier types.ts a été dupliqué, on le retire de data/
rm -f src/shared/data/types.ts
```

- [ ] **Step 2: Créer un barrel `src/shared/data/index.ts`**

```ts
export * from "./projects";
export * from "./education";
export * from "./travels";
export * from "./passions";
export * from "./bio";
```

(Adapter les exports selon les fichiers réellement présents dans `portfolio-cinema/src/data/`.)

- [ ] **Step 3: Mettre à jour les imports des fichiers data**

Dans chaque fichier de `src/shared/data/`, remplacer les imports de `./types` par `@shared/types` :

```bash
cd /Users/mathieudiep/Claude/portfolio
find src/shared/data -name "*.ts" -exec sed -i '' 's|from "./types"|from "@shared/types"|g' {} \;
```

- [ ] **Step 4: Typecheck**

```bash
pnpm typecheck
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/shared/
git commit -m "feat(shared): port data + types from cinema variant"
```

### Task 5 : Porter l'i18n vers `src/shared/`

**Files:**
- Create: `src/shared/i18n/index.ts`
- Create: `src/shared/i18n/locales/{fr,en,es}.json`

- [ ] **Step 1: Copier i18n depuis cinema**

```bash
cd /Users/mathieudiep/Claude/portfolio
cp ../portfolio-cinema/src/i18n/index.ts src/shared/i18n/index.ts
cp ../portfolio-cinema/src/i18n/locales/*.json src/shared/i18n/locales/
```

- [ ] **Step 2: Vérifier que index.ts importe bien depuis `./locales/`**

Lire `src/shared/i18n/index.ts`. Les imports doivent ressembler à `import fr from "./locales/fr.json"`. Si oui, RAS.

- [ ] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/shared/i18n/
git commit -m "feat(shared): port i18n locales (FR/EN/ES)"
```

### Task 6 : Porter les assets vers `public/shared/`

**Files:**
- Create: `public/shared/**` (copie de l'arborescence images)

- [ ] **Step 1: Copier les assets**

```bash
cd /Users/mathieudiep/Claude/portfolio
# Liste les sous-dossiers d'assets dans portfolio-cinema/public/
ls ../portfolio-cinema/public/
# Copie tout sauf favicon/icon (déjà dans portfolio/public/)
rsync -av --exclude='favicon*' --exclude='icon*' ../portfolio-cinema/public/ public/shared/
```

- [ ] **Step 2: Inspecter le résultat**

```bash
ls public/shared/
```

Expected: dossiers `projects/`, `education/`, `travels/`, etc.

- [ ] **Step 3: Commit**

```bash
git add public/shared/
git commit -m "feat(shared): copy public assets (images, photos)"
```

---

## Phase 2 — Port de la variante Cinema

### Task 7 : Copier les composants Cinema

**Files:**
- Create: `src/variants/cinema/{components,pages,styles}/` + `index.css`

- [ ] **Step 1: Copier l'arborescence**

```bash
cd /Users/mathieudiep/Claude/portfolio
cp -R ../portfolio-cinema/src/components src/variants/cinema/
cp -R ../portfolio-cinema/src/pages src/variants/cinema/
cp -R ../portfolio-cinema/src/styles src/variants/cinema/
cp -R ../portfolio-cinema/src/hooks src/variants/cinema/
cp -R ../portfolio-cinema/src/lib src/variants/cinema/ 2>/dev/null || true
cp ../portfolio-cinema/src/index.css src/variants/cinema/index.css
```

- [ ] **Step 2: Mettre à jour les imports cross-cutting**

Dans `src/variants/cinema/**/*.{ts,tsx}`, remplacer :
- `from "../data/..."` ou `from "../../data/..."` → `from "@shared/data/..."`
- `from "../i18n"` ou similaire → `from "@shared/i18n"`
- `from "../data/types"` → `from "@shared/types"`

```bash
cd /Users/mathieudiep/Claude/portfolio
# Remplacement des imports data
find src/variants/cinema -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' -E 's|from "(\.\./)+data/|from "@shared/data/|g; s|from "(\.\./)+data"|from "@shared/data"|g' {} \;
# Remplacement des imports i18n
find src/variants/cinema -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' -E 's|from "(\.\./)+i18n"|from "@shared/i18n"|g; s|from "(\.\./)+i18n/|from "@shared/i18n/|g' {} \;
# Remplacement du type
find src/variants/cinema -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' -E 's|from "@shared/data/types"|from "@shared/types"|g' {} \;
```

- [ ] **Step 3: Vérifier les chemins d'images**

Les composants référencent probablement `/projects/xxx.jpg` (chemin public). Comme les assets sont maintenant dans `public/shared/`, il faut les mettre à jour :

```bash
cd /Users/mathieudiep/Claude/portfolio
# Cherche les chemins d'image dans le code (à examiner manuellement avant transformation)
grep -r --include="*.ts" --include="*.tsx" -E '"/(projects|education|travels|passions)/' src/variants/cinema/ | head -20
```

Pour chaque chemin trouvé, le préfixer par `/shared`. Si besoin, transformation automatique :

```bash
find src/variants/cinema -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' -E 's|"/(projects\|education\|travels\|passions)/|"/shared/\1/|g' {} \;
```

⚠ Faire un `git diff` après pour valider qu'on n'a rien cassé d'autre :

```bash
git diff src/variants/cinema/ | head -100
```

- [ ] **Step 4: Typecheck**

```bash
pnpm typecheck
```

Expected: PASS. Si erreurs sur des imports, corriger un par un.

- [ ] **Step 5: Commit**

```bash
git add src/variants/cinema/
git commit -m "feat(cinema): port components + pages from portfolio-cinema"
```

### Task 8 : Créer `variants/cinema/routes.tsx`

**Files:**
- Create: `src/variants/cinema/routes.tsx`

- [ ] **Step 1: Créer le composant CinemaApp**

```tsx
// src/variants/cinema/routes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import { useDetectInitialLanguage } from "@shared/hooks/useDetectInitialLanguage";

export function CinemaApp() {
  const lang = useDetectInitialLanguage();
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/cinema/${lang}`} replace />} />
      <Route path=":lang" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects/:projectId" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: fail si `useDetectInitialLanguage` n'existe pas encore — c'est attendu, on le crée au step 3.

- [ ] **Step 3: Créer `useDetectInitialLanguage` (utilitaire pur)**

```tsx
// src/shared/hooks/useDetectInitialLanguage.ts
const SUPPORTED = ["fr", "en", "es"] as const;
export type SupportedLang = (typeof SUPPORTED)[number];

function isSupported(lang: string): lang is SupportedLang {
  return (SUPPORTED as readonly string[]).includes(lang);
}

export function useDetectInitialLanguage(): SupportedLang {
  if (typeof window === "undefined") return "fr";
  const nav = window.navigator.language.slice(0, 2).toLowerCase();
  return isSupported(nav) ? nav : "fr";
}
```

- [ ] **Step 4: Typecheck à nouveau**

```bash
pnpm typecheck
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/variants/cinema/routes.tsx src/shared/hooks/useDetectInitialLanguage.ts
git commit -m "feat(cinema): add CinemaApp routes subtree"
```

### Task 9 : Brancher `/cinema/*` dans `App.tsx` et valider

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Mettre à jour `App.tsx` (version intermédiaire — pas encore le Chooser)**

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { CinemaApp } from "./variants/cinema/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cinema/*" element={<CinemaApp />} />
        <Route path="/" element={<Navigate to="/cinema" replace />} />
        <Route path="*" element={<Navigate to="/cinema" replace />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}
```

- [ ] **Step 2: Mettre à jour `main.tsx` pour importer le nouvel i18n**

Lire `src/main.tsx`. Remplacer toute ligne `import "./i18n"` ou similaire par `import "@shared/i18n"`. Conserver le reste.

- [ ] **Step 3: Lancer le dev server**

```bash
pnpm dev
```

Expected: démarre sans erreur sur `http://localhost:5173`.

- [ ] **Step 4: Vérifier visuellement**

Ouvrir `http://localhost:5173/cinema/fr` dans le navigateur. La home cinema doit s'afficher exactement comme avant (palette noire + accents dorés). Tester aussi `/cinema/en` et `/cinema/fr/projects/<id>` (avec un projectId valide).

Si régression visuelle : examiner la console pour erreurs d'imports / 404 d'images / etc., corriger.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/main.tsx
git commit -m "feat(app): wire /cinema/* route"
```

---

## Phase 3 — Port de la variante Editorial

### Task 10 : Copier les composants Editorial

**Files:**
- Create: `src/variants/editorial/{components,pages,styles,hooks}/` + `index.css`

- [ ] **Step 1: Copier l'arborescence (idem cinema)**

```bash
cd /Users/mathieudiep/Claude/portfolio
cp -R ../portfolio-editorial/src/components src/variants/editorial/
cp -R ../portfolio-editorial/src/pages src/variants/editorial/
cp -R ../portfolio-editorial/src/styles src/variants/editorial/
cp -R ../portfolio-editorial/src/hooks src/variants/editorial/
cp -R ../portfolio-editorial/src/lib src/variants/editorial/ 2>/dev/null || true
cp ../portfolio-editorial/src/index.css src/variants/editorial/index.css
```

- [ ] **Step 2: Réécrire les imports (data, i18n, types, assets)**

```bash
cd /Users/mathieudiep/Claude/portfolio
find src/variants/editorial -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' -E 's|from "(\.\./)+data/|from "@shared/data/|g; s|from "(\.\./)+data"|from "@shared/data"|g' {} \;
find src/variants/editorial -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' -E 's|from "(\.\./)+i18n"|from "@shared/i18n"|g; s|from "(\.\./)+i18n/|from "@shared/i18n/|g' {} \;
find src/variants/editorial -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' -E 's|from "@shared/data/types"|from "@shared/types"|g' {} \;
find src/variants/editorial -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' -E 's|"/(projects\|education\|travels\|passions)/|"/shared/\1/|g' {} \;
```

- [ ] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/variants/editorial/
git commit -m "feat(editorial): port components + pages from portfolio-editorial"
```

### Task 11 : Créer `variants/editorial/routes.tsx` et brancher

**Files:**
- Create: `src/variants/editorial/routes.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Créer EditorialApp (symétrique à CinemaApp)**

```tsx
// src/variants/editorial/routes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import { useDetectInitialLanguage } from "@shared/hooks/useDetectInitialLanguage";

export function EditorialApp() {
  const lang = useDetectInitialLanguage();
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/editorial/${lang}`} replace />} />
      <Route path=":lang" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects/:projectId" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
```

- [ ] **Step 2: Brancher dans App.tsx (intermédiaire — pas encore Chooser)**

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { CinemaApp } from "./variants/cinema/routes";
import { EditorialApp } from "./variants/editorial/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cinema/*" element={<CinemaApp />} />
        <Route path="/editorial/*" element={<EditorialApp />} />
        <Route path="/" element={<Navigate to="/cinema" replace />} />
        <Route path="*" element={<Navigate to="/cinema" replace />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}
```

- [ ] **Step 3: Test visuel**

```bash
pnpm dev
```

Ouvrir `http://localhost:5173/editorial/fr`. Doit afficher la home editorial (palette beige + Newsreader) sans régression.

- [ ] **Step 4: Commit**

```bash
git add src/variants/editorial/routes.tsx src/App.tsx
git commit -m "feat(editorial): wire /editorial/* route"
```

---

## Phase 4 — Screenshots du Chooser

### Task 12 : Écrire le script Playwright de capture

**Files:**
- Create: `scripts/capture-chooser-screenshots.ts`

- [ ] **Step 1: Créer le script**

```ts
// scripts/capture-chooser-screenshots.ts
import { chromium } from "@playwright/test";

const URLS = [
  { url: "http://localhost:5173/cinema/fr", out: "public/shared/chooser/cinema.png" },
  { url: "http://localhost:5173/editorial/fr", out: "public/shared/chooser/editorial.png" },
];

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1200 } });
  for (const { url, out } of URLS) {
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    await page.screenshot({ path: out, fullPage: false });
    console.log(`Captured ${url} -> ${out}`);
    await page.close();
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Lancer le dev server dans un terminal**

```bash
pnpm dev
```

- [ ] **Step 3: Lancer le script dans un autre terminal**

```bash
cd /Users/mathieudiep/Claude/portfolio
npx tsx scripts/capture-chooser-screenshots.ts
```

Expected: 2 fichiers PNG créés dans `public/shared/chooser/`.

- [ ] **Step 4: Convertir en WebP optimisé**

```bash
cd /Users/mathieudiep/Claude/portfolio/public/shared/chooser
# Si cwebp est installé (via brew install webp)
cwebp -q 80 cinema.png -o cinema.webp
cwebp -q 80 editorial.png -o editorial.webp
# Vérifier les tailles (cible ~150-200 kB)
ls -lh
# Supprimer les PNG sources
rm cinema.png editorial.png
```

Si `cwebp` n'est pas installé : `brew install webp` (ou ImageMagick : `magick cinema.png -quality 80 cinema.webp`).

- [ ] **Step 5: Commit**

```bash
cd /Users/mathieudiep/Claude/portfolio
git add scripts/capture-chooser-screenshots.ts public/shared/chooser/
git commit -m "feat(chooser): add screenshot capture script + chooser images"
```

---

## Phase 5 — Page Chooser

### Task 13 : Hook `useVariantPreference` (TDD)

**Files:**
- Create: `src/shared/hooks/useVariantPreference.ts`
- Create: `tests/unit/useVariantPreference.test.ts`

- [ ] **Step 1: Écrire le test qui échoue**

```ts
// tests/unit/useVariantPreference.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useVariantPreference } from "@shared/hooks/useVariantPreference";

describe("useVariantPreference", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns null when no preference is stored", () => {
    const { result } = renderHook(() => useVariantPreference());
    expect(result.current.get()).toBeNull();
  });

  it("persists and retrieves a preference", () => {
    const { result } = renderHook(() => useVariantPreference());
    result.current.set({ variant: "cinema", lang: "fr" });
    expect(result.current.get()).toEqual({ variant: "cinema", lang: "fr" });
  });

  it("ignores invalid stored values", () => {
    window.localStorage.setItem("portfolio:preference", '{"variant":"unknown"}');
    const { result } = renderHook(() => useVariantPreference());
    expect(result.current.get()).toBeNull();
  });

  it("ignores malformed JSON", () => {
    window.localStorage.setItem("portfolio:preference", "{not-json");
    const { result } = renderHook(() => useVariantPreference());
    expect(result.current.get()).toBeNull();
  });

  it("clears the preference", () => {
    const { result } = renderHook(() => useVariantPreference());
    result.current.set({ variant: "editorial", lang: "en" });
    result.current.clear();
    expect(result.current.get()).toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le test pour valider l'échec**

```bash
pnpm test -- --run tests/unit/useVariantPreference.test.ts
```

Expected: FAIL avec "Cannot find module '@shared/hooks/useVariantPreference'".

- [ ] **Step 3: Implémenter le hook**

```ts
// src/shared/hooks/useVariantPreference.ts
const STORAGE_KEY = "portfolio:preference";

export type Variant = "cinema" | "editorial";
export type Preference = { variant: Variant; lang: string };

function isValidPreference(value: unknown): value is Preference {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    (v.variant === "cinema" || v.variant === "editorial") &&
    typeof v.lang === "string"
  );
}

export function useVariantPreference() {
  const get = (): Preference | null => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return isValidPreference(parsed) ? parsed : null;
    } catch {
      return null;
    }
  };

  const set = (p: Preference) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch {
      // localStorage unavailable (Safari private mode, etc.)
    }
  };

  const clear = () => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // noop
    }
  };

  return { get, set, clear };
}
```

- [ ] **Step 4: Lancer le test à nouveau**

```bash
pnpm test -- --run tests/unit/useVariantPreference.test.ts
```

Expected: PASS (5/5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/shared/hooks/useVariantPreference.ts tests/unit/useVariantPreference.test.ts
git commit -m "feat(shared): add useVariantPreference hook + tests"
```

### Task 14 : Composant `LanguageDropdown`

**Files:**
- Create: `src/shared/components/LanguageDropdown.tsx`

- [ ] **Step 1: Implémenter le composant**

```tsx
// src/shared/components/LanguageDropdown.tsx
const LANGUAGES = ["fr", "en", "es"] as const;
export type DropdownLang = (typeof LANGUAGES)[number];

type Props = {
  value: DropdownLang;
  onChange: (lang: DropdownLang) => void;
};

export function LanguageDropdown({ value, onChange }: Props) {
  return (
    <div
      role="group"
      aria-label="Choisir la langue"
      style={{
        display: "flex",
        gap: "0.75rem",
        fontFamily: "'Inter Tight', system-ui, sans-serif",
        fontSize: "0.95rem",
        letterSpacing: "0.04em",
      }}
    >
      {LANGUAGES.map((lang) => {
        const isActive = lang === value;
        return (
          <button
            key={lang}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(lang)}
            style={{
              background: "transparent",
              border: "none",
              padding: "0.25rem 0",
              color: "inherit",
              cursor: "pointer",
              textTransform: "uppercase",
              textDecoration: isActive ? "underline" : "none",
              opacity: isActive ? 1 : 0.65,
            }}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/LanguageDropdown.tsx
git commit -m "feat(shared): add LanguageDropdown component"
```

### Task 15 : Composant `Chooser` (TDD)

**Files:**
- Create: `src/shared/components/Chooser.tsx`
- Create: `src/shared/components/Chooser.css`
- Create: `tests/unit/Chooser.test.tsx`

- [ ] **Step 1: Écrire le test qui échoue**

```tsx
// tests/unit/Chooser.test.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Chooser } from "@shared/components/Chooser";

function renderChooser(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Chooser />
    </MemoryRouter>
  );
}

describe("Chooser", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders two variant buttons", () => {
    renderChooser();
    expect(screen.getByLabelText(/Portfolio Cinema/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Portfolio Editorial/i)).toBeInTheDocument();
  });

  it("renders the language dropdown", () => {
    renderChooser();
    expect(screen.getByRole("group", { name: /langue/i })).toBeInTheDocument();
  });

  it("shows 'Ta dernière visite' chip when a preference exists", () => {
    window.localStorage.setItem(
      "portfolio:preference",
      JSON.stringify({ variant: "cinema", lang: "fr" })
    );
    renderChooser();
    expect(screen.getByText(/Ta dernière visite/i)).toBeInTheDocument();
  });

  it("updates the active language when clicking the dropdown", () => {
    renderChooser();
    const enButton = screen.getByRole("button", { name: /^en$/i });
    fireEvent.click(enButton);
    expect(enButton).toHaveAttribute("aria-pressed", "true");
  });
});
```

- [ ] **Step 2: Lancer le test (échec attendu)**

```bash
pnpm test -- --run tests/unit/Chooser.test.tsx
```

Expected: FAIL avec "Cannot find module '@shared/components/Chooser'".

- [ ] **Step 3: Créer `Chooser.css`**

```css
/* src/shared/components/Chooser.css */
.chooser-split {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
}

@media (max-width: 767px) {
  .chooser-split {
    flex-direction: column;
  }
  .chooser-half {
    flex: 1 !important;
    filter: none !important;
  }
}
```

- [ ] **Step 4: Créer le composant Chooser**

```tsx
// src/shared/components/Chooser.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useVariantPreference, type Variant } from "@shared/hooks/useVariantPreference";
import { useDetectInitialLanguage, type SupportedLang } from "@shared/hooks/useDetectInitialLanguage";
import { LanguageDropdown } from "./LanguageDropdown";
import "./Chooser.css";

const CONFIG: Record<Variant, {
  image: string;
  title: string;
  tagline: string;
  cta: string;
  fontTitle: string;
  ctaColor: string;
  gradient: string;
  textColor: string;
  ariaLabel: string;
}> = {
  cinema: {
    image: "/shared/chooser/cinema.webp",
    title: "CINEMA",
    tagline: "Sombre, artistique et cinématique",
    cta: "Entrer",
    fontTitle: "'Cormorant Garamond', Georgia, serif",
    ctaColor: "#D9A648",
    gradient: "linear-gradient(180deg, rgba(14,13,11,0) 0%, rgba(14,13,11,0.7) 100%)",
    textColor: "#EFE9DD",
    ariaLabel: "Portfolio Cinema — sombre et cinématique",
  },
  editorial: {
    image: "/shared/chooser/editorial.webp",
    title: "EDITORIAL",
    tagline: "Clair, joyeux et magazine",
    cta: "Entrer",
    fontTitle: "'Newsreader', Georgia, serif",
    ctaColor: "#A04A2D",
    gradient: "linear-gradient(180deg, rgba(245,237,224,0) 0%, rgba(245,237,224,0.85) 100%)",
    textColor: "#1F1A14",
    ariaLabel: "Portfolio Editorial — clair et magazine",
  },
};

const ORDER: Variant[] = ["cinema", "editorial"];

export function Chooser() {
  const navigate = useNavigate();
  const { get, set } = useVariantPreference();
  const detectedLang = useDetectInitialLanguage();
  const previous = get();
  const [lang, setLang] = useState<SupportedLang>(
    (previous?.lang as SupportedLang) ?? detectedLang
  );
  const [hovered, setHovered] = useState<Variant | null>(null);

  const enter = (variant: Variant) => {
    set({ variant, lang });
    navigate(`/${variant}/${lang}`);
  };

  return (
    <main style={{ height: "100vh", width: "100vw", overflow: "hidden", position: "relative" }}>
      <h1
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        Choisis ton portfolio
      </h1>

      <div
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.5rem",
          zIndex: 10,
          color: "#fff",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)",
          padding: "0.45rem 1rem",
          borderRadius: "999px",
        }}
      >
        <LanguageDropdown
          value={lang}
          onChange={(next) => setLang(next as SupportedLang)}
        />
      </div>

      <div className="chooser-split">
        {ORDER.map((key, idx) => {
          const config = CONFIG[key];
          const isHovered = hovered === key;
          const isDimmed = hovered !== null && hovered !== key;
          return (
            <motion.button
              key={key}
              type="button"
              aria-label={config.ariaLabel}
              onClick={() => enter(key)}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              className="chooser-half"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                flex: isHovered ? 1.1 : 1,
                filter: isDimmed ? "brightness(0.6)" : "brightness(1)",
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: idx * 0.1,
              }}
              style={{
                position: "relative",
                border: "none",
                cursor: "pointer",
                padding: 0,
                backgroundImage: `url(${config.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: config.textColor,
                fontFamily: config.fontTitle,
                overflow: "hidden",
                flex: 1,
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: config.gradient }} />
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: "4rem 2rem",
                  gap: "1rem",
                }}
              >
                {previous?.variant === key && (
                  <span
                    style={{
                      fontFamily: "'Inter Tight', system-ui, sans-serif",
                      fontSize: "0.85rem",
                      opacity: 0.75,
                      letterSpacing: "0.05em",
                    }}
                  >
                    ↪ Ta dernière visite
                  </span>
                )}
                <span style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 600, letterSpacing: "0.05em" }}>
                  {config.title}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter Tight', system-ui, sans-serif",
                    fontSize: "1.1rem",
                    opacity: 0.9,
                    textAlign: "center",
                    maxWidth: "32ch",
                  }}
                >
                  {config.tagline}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter Tight', system-ui, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: config.ctaColor,
                    marginTop: "0.5rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {config.cta} →
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Lancer les tests à nouveau**

```bash
pnpm test -- --run tests/unit/Chooser.test.tsx
```

Expected: PASS (4/4 tests).

- [ ] **Step 6: Commit**

```bash
git add src/shared/components/ tests/unit/Chooser.test.tsx
git commit -m "feat(chooser): add split-screen Chooser component + tests"
```

### Task 16 : Brancher la route `/` → Chooser

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Mettre à jour App.tsx**

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Chooser } from "@shared/components/Chooser";
import { CinemaApp } from "./variants/cinema/routes";
import { EditorialApp } from "./variants/editorial/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chooser />} />
        <Route path="/cinema/*" element={<CinemaApp />} />
        <Route path="/editorial/*" element={<EditorialApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}
```

- [ ] **Step 2: Test visuel**

```bash
pnpm dev
```

Ouvrir `http://localhost:5173/`. Le Chooser doit s'afficher : split-screen 50/50, deux images, dropdown FR/EN/ES en haut à droite. Hover sur une moitié → elle s'agrandit, l'autre s'assombrit. Clic → navigation vers `/cinema/fr` ou `/editorial/fr`.

- [ ] **Step 3: Vérifier la persistance**

Cliquer sur Cinema. Revenir sur `/`. La moitié Cinema doit afficher "↪ Ta dernière visite".

- [ ] **Step 4: Vérifier mobile**

Ouvrir devtools, mode mobile (375×667). Le layout doit s'empiler verticalement. Pas de hover.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat(app): route / to the Chooser page"
```

---

## Phase 6 — Bouton switch + cross-fade

### Task 17 : `VariantSwitchButton` (cinema)

**Files:**
- Create: `src/variants/cinema/components/layout/VariantSwitchButton.tsx`

- [ ] **Step 1: Implémenter le bouton**

```tsx
// src/variants/cinema/components/layout/VariantSwitchButton.tsx
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftRight } from "lucide-react";
import { useVariantPreference } from "@shared/hooks/useVariantPreference";
import { palette } from "../../styles/palette";

export function VariantSwitchButton() {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { set } = useVariantPreference();

  const handleClick = () => {
    const targetLang = lang ?? "fr";
    set({ variant: "editorial", lang: targetLang });
    navigate(`/editorial/${targetLang}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Voir l'autre vue (editorial)"
      title="Changer de portfolio"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        background: palette.beigeDeep,
        color: palette.teal,
        border: `1px solid rgba(217,166,72,0.25)`,
        padding: "0.5rem 0.9rem",
        borderRadius: "999px",
        fontFamily: "'Inter Tight', system-ui, sans-serif",
        fontSize: "0.78rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      <ArrowLeftRight size={14} />
      <span>Voir l'autre vue</span>
    </button>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/variants/cinema/components/layout/VariantSwitchButton.tsx
git commit -m "feat(cinema): add VariantSwitchButton"
```

### Task 18 : `VariantSwitchButton` (editorial)

**Files:**
- Create: `src/variants/editorial/components/layout/VariantSwitchButton.tsx`

- [ ] **Step 1: Implémenter le bouton (palette editorial)**

```tsx
// src/variants/editorial/components/layout/VariantSwitchButton.tsx
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftRight } from "lucide-react";
import { useVariantPreference } from "@shared/hooks/useVariantPreference";
import { palette } from "../../styles/palette";

export function VariantSwitchButton() {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { set } = useVariantPreference();

  const handleClick = () => {
    const targetLang = lang ?? "fr";
    set({ variant: "cinema", lang: targetLang });
    navigate(`/cinema/${targetLang}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Voir l'autre vue (cinema)"
      title="Changer de portfolio"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        background: palette.cream,
        color: palette.teal,
        border: `1px solid ${palette.hairlineStrong ?? "rgba(31,26,20,0.22)"}`,
        padding: "0.5rem 0.9rem",
        borderRadius: "4px",
        fontFamily: "'Inter Tight', system-ui, sans-serif",
        fontSize: "0.78rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      <ArrowLeftRight size={14} />
      <span>Voir l'autre vue</span>
    </button>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/variants/editorial/components/layout/VariantSwitchButton.tsx
git commit -m "feat(editorial): add VariantSwitchButton"
```

### Task 19 : Insérer le `VariantSwitchButton` dans les nav des deux variantes

**Files:**
- Modify: `src/variants/cinema/components/layout/PillNav.tsx`
- Modify: `src/variants/editorial/components/layout/PillNav.tsx`

- [ ] **Step 1: Lire le PillNav cinema actuel**

```bash
cat src/variants/cinema/components/layout/PillNav.tsx
```

Repérer l'élément `<ul>` qui contient les liens de nav (Home / Projects / Contact). Le `LanguageSwitcher` est sans doute monté ailleurs (dans Layout). Le bouton switch doit être inséré dans le même `<ul>` après les liens, ou à côté du LanguageSwitcher.

- [ ] **Step 2: Modifier PillNav cinema**

Dans `src/variants/cinema/components/layout/PillNav.tsx`, ajouter en haut :

```tsx
import { VariantSwitchButton } from "./VariantSwitchButton";
```

Et dans le rendu, juste après la fermeture du `.map(...)` qui itère sur `items` (donc après le dernier `<li>` des nav-items) et avant la fermeture `</ul>` :

```tsx
        <li style={{ marginLeft: 8 }}>
          <VariantSwitchButton />
        </li>
```

- [ ] **Step 3: Modifier PillNav editorial (idem)**

Même opération dans `src/variants/editorial/components/layout/PillNav.tsx`.

- [ ] **Step 4: Test visuel**

```bash
pnpm dev
```

- Ouvrir `/cinema/fr` → le bouton "Voir l'autre vue" apparaît dans le nav.
- Cliquer → navigation vers `/editorial/fr`.
- Sur `/editorial/fr` → le bouton ramène vers `/cinema/fr`.

- [ ] **Step 5: Commit**

```bash
git add src/variants/cinema/components/layout/PillNav.tsx src/variants/editorial/components/layout/PillNav.tsx
git commit -m "feat(layout): mount VariantSwitchButton in each variant's PillNav"
```

### Task 20 : Logo "Mathieu Diep" ramène à `/`

**Files:**
- Modify: `src/variants/cinema/components/layout/Layout.tsx` (ou wherever le logo vit)
- Modify: `src/variants/editorial/components/layout/Layout.tsx`

- [ ] **Step 1: Localiser le logo dans chaque variante**

```bash
grep -rn "Mathieu Diep" src/variants/cinema/components/layout/
grep -rn "Mathieu Diep" src/variants/editorial/components/layout/
```

- [ ] **Step 2: Modifier le `to` du logo**

Dans le composant qui rend le logo, remplacer le `to={...}` actuel (probablement `/${lang}` ou similaire) par `to="/"`. Garder l'apparence visuelle inchangée.

Si le logo est un `<Link>` :

```tsx
<Link to="/" aria-label="Retour au choix de portfolio">
  {/* contenu existant inchangé */}
</Link>
```

- [ ] **Step 3: Test visuel**

```bash
pnpm dev
```

Sur `/cinema/fr` puis `/editorial/fr` : clic sur "Mathieu Diep" → retour sur `/` (Chooser).

- [ ] **Step 4: Commit**

```bash
git add src/variants/cinema/components/layout/ src/variants/editorial/components/layout/
git commit -m "feat(layout): logo links to the Chooser (/)"
```

### Task 21 : Cross-fade 500 ms entre les routes

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Refactor App.tsx pour utiliser AnimatePresence**

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { Chooser } from "@shared/components/Chooser";
import { CinemaApp } from "./variants/cinema/routes";
import { EditorialApp } from "./variants/editorial/routes";

function AnimatedRoutes() {
  const location = useLocation();
  const segment = location.pathname.split("/")[1] || "root";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={segment}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Chooser />} />
          <Route path="/cinema/*" element={<CinemaApp />} />
          <Route path="/editorial/*" element={<EditorialApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <Analytics />
    </BrowserRouter>
  );
}
```

⚠ Note : la `key={segment}` garantit que le `motion.div` se démonte/remonte quand on passe de `/cinema/...` à `/editorial/...`, déclenchant le cross-fade. Les navigations *intra*-variante (ex : `/cinema/fr` → `/cinema/fr/projects/xyz`) ne déclenchent **pas** de fade puisque le segment reste `cinema`.

- [ ] **Step 2: Test visuel**

```bash
pnpm dev
```

- Sur `/cinema/fr`, cliquer "Voir l'autre vue" → cross-fade visible vers editorial (~500 ms).
- Sur `/cinema/fr`, cliquer sur un projet → pas de fade (transition normale).
- Sur `/`, cliquer Cinema → fade vers cinema.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat(app): cross-fade 500ms between variants via AnimatePresence"
```

---

## Phase 7 — Cleanup & validation

### Task 22 : Nettoyer les anciens fichiers à la racine de `src/`

**Files:**
- Delete: `src/data/`, `src/i18n/`, `src/components/`, `src/pages/`, `src/hooks/`, `src/styles/`, `src/lib/`, `src/content.ts`

- [ ] **Step 1: Vérifier qu'aucun de ces dossiers n'est plus référencé**

```bash
cd /Users/mathieudiep/Claude/portfolio
grep -rn "from \"\\./data\"" src/App.tsx src/main.tsx
grep -rn "from \"\\./i18n\"" src/App.tsx src/main.tsx
grep -rn "from \"\\./components/\"" src/App.tsx src/main.tsx
```

Expected: aucun résultat. Si certains existent, c'est qu'on a oublié de migrer.

- [ ] **Step 2: Supprimer les anciens dossiers**

```bash
rm -rf src/data src/i18n src/components src/pages src/hooks src/styles src/lib
rm -f src/content.ts
```

- [ ] **Step 3: Typecheck + tests**

```bash
pnpm verify
```

Expected: PASS. Si erreurs, restaurer le dossier concerné (`git restore src/<dossier>`) et investiguer.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove legacy src/{data,i18n,components,pages,hooks,styles,lib}"
```

### Task 23 : Tests E2E (Playwright)

**Files:**
- Create: `tests/e2e/routing.spec.ts`

- [ ] **Step 1: Écrire les tests E2E**

```ts
// tests/e2e/routing.spec.ts
import { test, expect } from "@playwright/test";

test.describe("portfolio routing", () => {
  test("/ shows the Chooser with both variants", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel(/Portfolio Cinema/i)).toBeVisible();
    await expect(page.getByLabel(/Portfolio Editorial/i)).toBeVisible();
  });

  test("clicking Cinema navigates to /cinema/:lang", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel(/Portfolio Cinema/i).click();
    await expect(page).toHaveURL(/\/cinema\/(fr|en|es)/);
  });

  test("clicking Editorial navigates to /editorial/:lang", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel(/Portfolio Editorial/i).click();
    await expect(page).toHaveURL(/\/editorial\/(fr|en|es)/);
  });

  test("VariantSwitchButton on /cinema goes to /editorial", async ({ page }) => {
    await page.goto("/cinema/fr");
    await page.getByRole("button", { name: /Voir l'autre vue/i }).click();
    await expect(page).toHaveURL(/\/editorial\/fr/);
  });

  test("VariantSwitchButton on /editorial goes to /cinema", async ({ page }) => {
    await page.goto("/editorial/fr");
    await page.getByRole("button", { name: /Voir l'autre vue/i }).click();
    await expect(page).toHaveURL(/\/cinema\/fr/);
  });

  test("unknown URLs redirect to the Chooser", async ({ page }) => {
    await page.goto("/projects/anything");
    await expect(page).toHaveURL("/");
    await expect(page.getByLabel(/Portfolio Cinema/i)).toBeVisible();
  });

  test("preference is persisted across reloads", async ({ page, context }) => {
    await page.goto("/");
    await page.getByLabel(/Portfolio Editorial/i).click();
    await expect(page).toHaveURL(/\/editorial\/(fr|en|es)/);

    await page.goto("/");
    await expect(page.getByText(/Ta dernière visite/i)).toBeVisible();
  });
});
```

- [ ] **Step 2: Lancer les tests E2E**

```bash
pnpm dev &
# Attendre que le serveur soit prêt
sleep 3
pnpm test:e2e
```

Expected: tous les tests PASS. Arrêter le dev server avec `kill %1` après.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/routing.spec.ts
git commit -m "test(e2e): cover Chooser, switch button, redirect, persistence"
```

### Task 24 : Validation finale `pnpm verify`

**Files:** aucun (vérification globale)

- [ ] **Step 1: Lancer la vérif complète**

```bash
cd /Users/mathieudiep/Claude/portfolio
pnpm verify
```

Expected: lint + typecheck + tests + build tous PASS.

- [ ] **Step 2: Vérifier la taille du bundle**

```bash
ls -lh dist/assets/*.js | head -5
```

Pour info uniquement. Pas d'action requise (le code-splitting est désactivé par décision spec).

- [ ] **Step 3: Tests manuels checklist**

Ouvrir le site avec `pnpm preview` après build :

| URL / Action | Attendu |
|---|---|
| `/` | Chooser, split 50/50 |
| Dropdown langue en haut à droite | Click EN → souligné, lang à `en` |
| Click moitié Cinema | Nav vers `/cinema/en` (si lang sélectionnée en) |
| `/cinema/fr/projects/<id>` (id valide) | Page détail cinema |
| Bouton "Voir l'autre vue" sur cinema | Fade vers `/editorial/fr` |
| Logo "Mathieu Diep" sur editorial | Retour à `/` |
| `/projects/foo` | Redirige sur `/` |
| `/zzz/xxx` | Redirige sur `/` |
| Refresh sur `/` après visite | Chip "↪ Ta dernière visite" sur la moitié correspondante |
| Mobile (375px) | Chooser empilé vertical, pas de hover |

Si un point échoue : corriger, commit, recommencer la verif.

- [ ] **Step 4: Commit final si corrections**

```bash
git add -A
git commit -m "fix: address manual test findings" # uniquement si fixes nécessaires
```

### Task 25 : Archivage des anciens repos

**Files:**
- Create: `../portfolio-cinema/ARCHIVED.md`
- Create: `../portfolio-editorial/ARCHIVED.md`

- [ ] **Step 1: Créer le README d'archive pour portfolio-cinema**

```bash
cat > /Users/mathieudiep/Claude/portfolio-cinema/ARCHIVED.md <<'EOF'
# Archived — 2026-05-20

Ce projet a été fusionné dans le projet principal `portfolio/`. La variante visuelle "Cinema" vit désormais sous :

- URL : `/cinema/:lang`
- Code : `portfolio/src/variants/cinema/`

Ce repo est conservé en read-only pour archive (minimum 1 mois après le merge).

Voir le spec : `portfolio/docs/superpowers/specs/2026-05-20-portfolio-merge-cinema-editorial-design.md`
EOF
```

- [ ] **Step 2: Idem pour portfolio-editorial**

```bash
cat > /Users/mathieudiep/Claude/portfolio-editorial/ARCHIVED.md <<'EOF'
# Archived — 2026-05-20

Ce projet a été fusionné dans le projet principal `portfolio/`. La variante visuelle "Editorial" vit désormais sous :

- URL : `/editorial/:lang`
- Code : `portfolio/src/variants/editorial/`

Ce repo est conservé en read-only pour archive (minimum 1 mois après le merge).

Voir le spec : `portfolio/docs/superpowers/specs/2026-05-20-portfolio-merge-cinema-editorial-design.md`
EOF
```

- [ ] **Step 3: Commits sur les repos d'archive**

```bash
cd /Users/mathieudiep/Claude/portfolio-cinema
git add ARCHIVED.md
git commit -m "docs: archive notice — merged into portfolio/"

cd /Users/mathieudiep/Claude/portfolio-editorial
git add ARCHIVED.md
git commit -m "docs: archive notice — merged into portfolio/"
```

- [ ] **Step 4: Merger la branche dans master (côté portfolio/)**

```bash
cd /Users/mathieudiep/Claude/portfolio
git checkout master
git merge --no-ff feat/merge-variants -m "feat: merge cinema + editorial variants into portfolio"
```

Expected: merge propre. Si conflit avec les changes uncommitted présents sur master au démarrage du plan, résoudre cas par cas (ils sont a priori sans rapport avec le merge des variants).

---

## Self-Review

✅ **Spec coverage check :**
- Architecture Option B (shared + variants) → Tasks 2, 4-7, 10
- Routing `/` → Chooser → `/:variant/:lang` → Tasks 9, 11, 16, 21
- Persistance localStorage → Task 13
- Chooser split-screen 50/50 + dropdown haut-droit → Task 15
- Screenshots WebP → Task 12
- VariantSwitchButton cinema + editorial + cross-fade → Tasks 17, 18, 19, 21
- Logo → / → Task 20
- Legacy URL → / → Task 21 (catch-all dans App.tsx)
- Archive anciens repos → Task 25
- Pas de code-splitting → respecté (single bundle)
- Pas de fallback JPEG → respecté

✅ **Placeholders :** aucun "TBD" / "TODO" / "à compléter" dans les steps. Tous les blocs de code sont complets.

✅ **Type consistency :** `Variant`, `Preference`, `SupportedLang` sont définis dans Task 13 et 8, réutilisés cohéremment dans Tasks 15, 17, 18.

---

## Estimation totale

| Phase | Tasks | Durée estimée |
|---|---|---|
| 0 — Préparation | 1 | 10 min |
| 1 — Squelette + shared | 2-6 | 1 h |
| 2 — Port cinema | 7-9 | 1 h 30 |
| 3 — Port editorial | 10-11 | 1 h |
| 4 — Screenshots | 12 | 30 min |
| 5 — Chooser | 13-16 | 2 h |
| 6 — Switch + cross-fade | 17-21 | 1 h 15 |
| 7 — Cleanup + validation | 22-25 | 1 h |
| **Total** | **25 tasks** | **~8 h 30** |
