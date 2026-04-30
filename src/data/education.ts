import type { Education } from "./types";

export const education: Education[] = [
  {
    id: "master",
    degree: {
      fr: "Master 2 — Sécurité des Systèmes d'Information",
      en: "Master 2 — Information System Security",
      es: "Máster 2 — Seguridad de Sistemas de Información",
    },
    school: "Université de Technologie de Troyes (UTT)",
    period: {
      fr: "Septembre 2020 — 2021",
      en: "September 2020 — 2021",
      es: "Septiembre 2020 — 2021",
    },
    detail: {
      fr: "Double diplôme",
      en: "Double degree",
      es: "Doble titulación",
    },
    illustration: "diploma",
  },
  {
    id: "engineering",
    degree: {
      fr: "Diplôme d'ingénieur — Informatique et Systèmes d'Information",
      en: "Engineering Degree — Computer Science and Information Systems",
      es: "Título de Ingeniero — Informática y Sistemas de Información",
    },
    school: "Université de Technologie de Troyes (UTT)",
    period: {
      fr: "Septembre 2015 — 2020",
      en: "September 2015 — 2020",
      es: "Septiembre 2015 — 2020",
    },
    detail: {
      fr: "Spécialisation IA · 2 semestres à l'étranger (Canada 🇨🇦 et Chine 🇨🇳)",
      en: "AI specialization · 2 semesters abroad (Canada 🇨🇦 and China 🇨🇳)",
      es: "Especialización en IA · 2 semestres en el extranjero (Canadá 🇨🇦 y China 🇨🇳)",
    },
    illustration: "world",
  },
];
