import type { Language } from "@shared/i18n";

export type Translated = Record<Language, string>;

export type Education = {
  id: string;
  /** Sort key for the chronological timeline */
  year: number;
  /** Visual marker on the dot — 'milestone' for life events, 'exchange' for abroad, 'internship' for student internships, 'degree' for diplomas, 'job' for paid positions, 'travel' for long trips */
  kind: "milestone" | "exchange" | "internship" | "degree" | "job" | "travel";
  title: Translated;
  /** Short label used on the compact timeline card (e.g. "Bac S", "Erasmus Chine") */
  shortTitle?: Translated;
  /** Optional second line on the compact timeline card (location/employer/branch) */
  shortSubtitle?: Translated;
  school: Translated;
  location: Translated;
  period: Translated;
  /** Short one-line summary, always visible on the timeline */
  summary: Translated;
  /** Long description, revealed when the entry is expanded */
  description: Translated;
  /** Country flag emoji, used for exchange entries */
  flag?: string;
  /** Optional path to a photo (e.g. /images/edu/canada.jpg) — shown in the expanded panel */
  photoSrc?: string;
  /** Optional sub-bullets, revealed inside the detail panel */
  bullets?: Translated[];
  /** Optional tech/stack tags, revealed inside the detail panel */
  stack?: string[];
};

export type TravelPhoto = {
  /** Stable picsum seed (deterministic — same seed = same image) */
  seed: string;
  /** Optional override path to a real photo (e.g. /images/travels/vietnam-1.jpg) */
  src?: string;
  /** Optional short caption shown on hover / for a11y */
  caption?: Translated;
};

export type Travel = {
  id: string;
  /** Sort key — months since January 2023 (e.g. March 2023 = 2, February 2024 = 13). */
  monthOffset: number;
  country: Translated;
  flag: string;
  period: Translated;
  region: "asia" | "amazon" | "andes" | "altiplano" | "atacama" | "cone-sud" | "brazil" | "mexico";
  /** One-line tagline */
  summary: Translated;
  /** Long-form prose for the detail panel */
  description: Translated;
  /** Standout places / experiences */
  highlights: Translated[];
  /** Gallery of 1–4 photos; first is the lead/hero shot */
  photos: TravelPhoto[];
  /** Short note about ancestral origins (Vietnam / Laos) */
  origin?: Translated;
};

export type Skill = {
  category: Translated;
  items: string[];
};

export type Project = {
  id: "volley-meteo" | "scan2pdf" | "triolinguo" | "noscroll" | "torneo";
  name: string;
  emoji: string;
  tagline: Translated;
  description: Translated;
  features: Translated[];
  stack: string[];
  apkUrl: string;
  /** Public source repo URL. Optional — left undefined until the repo is actually pushed to GitHub. */
  githubUrl?: string;
  accent: "red" | "green" | "blue" | "yellow" | "lilac";
  /** Optional paths to real app screenshots, e.g. ['/images/apps/volley/1.png', ...]. When empty, a synthesized placeholder mockup is shown. */
  screenshots?: string[];
};
