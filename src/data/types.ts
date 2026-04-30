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
  degree: Translated;
  school: string;
  period: Translated;
  detail: Translated;
  illustration: "diploma" | "scroll" | "world";
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
  githubUrl: string;
  accent: "red" | "green" | "blue" | "yellow";
};
