import type { Language } from "../i18n";

export type Translated = Record<Language, string>;

export type Experience = {
  id: string;
  role: Translated;
  company: string;
  location: Translated;
  period: Translated;
  description: Translated;
  bullets: Translated[];
  stack: string[];
  illustration: "chatbot" | "rasa" | "blockchain" | "music" | "health";
};

export type Education = {
  id: string;
  /** Sort key for the chronological timeline */
  year: number;
  /** Visual marker on the dot — 'milestone' for life events, 'exchange' for abroad, 'internship' for student internships, 'degree' for diplomas, 'job' for professional positions, 'travel' for extended trips */
  kind: "milestone" | "exchange" | "internship" | "degree" | "job" | "travel";
  title: Translated;
  /** Compact label shown on the timeline card (e.g. "Bac S", "Erasmus Chine") */
  shortTitle?: Translated;
  /** Secondary line on the timeline card (location/employer/context) */
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
  /** Optional list of bullet points shown in the expanded detail panel */
  bullets?: Translated[];
  /** Optional tech / context stack tags */
  stack?: string[];
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
  /** Picsum seed for the placeholder photo */
  photoSeed: string;
  /** Optional override (real photo) */
  photoSrc?: string;
  /** Short note about ancestral origins (Vietnam / Laos) */
  origin?: Translated;
};

export type Skill = {
  category: Translated;
  items: string[];
};

export type Project = {
  id: "volley-meteo" | "scan2pdf" | "triolinguo";
  name: string;
  emoji: string;
  tagline: Translated;
  description: Translated;
  features: Translated[];
  stack: string[];
  apkUrl: string;
  /** Public source repo URL. Optional — left undefined until the repo is actually pushed to GitHub. */
  githubUrl?: string;
  accent: "red" | "green" | "blue" | "yellow";
  /** Optional paths to real app screenshots, e.g. ['/images/apps/volley/1.png', ...]. When empty, a synthesized placeholder mockup is shown. */
  screenshots?: string[];
};
