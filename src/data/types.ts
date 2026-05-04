import type { Language } from "../i18n";

export type Translated = Record<Language, string>;

export type Experience = {
  id: string;
  role: Translated;
  company: string;
  location: string;
  period: Translated;
  description: Translated;
  bullets: Translated[];
  stack: string[];
  illustration: "chatbot" | "rasa" | "blockchain" | "music" | "health";
};

export type Education = {
  id: string;
  kind: "degree" | "exchange";
  title: Translated;
  school: string;
  location: string;
  period: Translated;
  description: Translated;
  /** Country flag emoji, used for exchange entries */
  flag?: string;
  /** Optional path to a photo (e.g. /images/edu/canada.jpg) — when set replaces the placeholder block */
  photoSrc?: string;
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
