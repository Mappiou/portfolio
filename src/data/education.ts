import type { Education } from "./types";

export const education: Education[] = [
  {
    id: "engineering-utt",
    kind: "degree",
    title: {
      fr: "Diplôme d'ingénieur — Informatique & Systèmes d'Information",
      en: "Engineering Degree — Computer Science & Information Systems",
      es: "Título de Ingeniero — Informática & Sistemas de Información",
    },
    school: "UTT — Université de Technologie de Troyes",
    location: "Troyes, France",
    period: {
      fr: "2015 — 2020 · 5 ans",
      en: "2015 — 2020 · 5 years",
      es: "2015 — 2020 · 5 años",
    },
    description: {
      fr: "Cursus complet d'ingénieur sur 5 ans avec spécialisation en Intelligence Artificielle. Cursus enrichi par 2 semestres d'échange à l'étranger (Canada puis Chine).",
      en: "Full 5-year engineering programme with a specialization in Artificial Intelligence. Enriched by 2 semesters of exchange abroad (Canada then China).",
      es: "Programa completo de 5 años de ingeniería con especialización en Inteligencia Artificial. Enriquecido por 2 semestres de intercambio en el extranjero (Canadá y luego China).",
    },
  },
  {
    id: "master-security",
    kind: "degree",
    title: {
      fr: "Master 2 — Sécurité des Systèmes d'Information (Cryptographie)",
      en: "Master 2 — Information System Security (Cryptography)",
      es: "Máster 2 — Seguridad de Sistemas de Información (Criptografía)",
    },
    school: "UTT — Université de Technologie de Troyes",
    location: "Troyes, France",
    period: {
      fr: "2020 — 2021 · double diplôme",
      en: "2020 — 2021 · double degree",
      es: "2020 — 2021 · doble titulación",
    },
    description: {
      fr: "Double diplôme spécialisé en cryptographie : protocoles, primitives cryptographiques, sécurité des réseaux, audit, gouvernance.",
      en: "Double degree specialised in cryptography: protocols, cryptographic primitives, network security, audit, governance.",
      es: "Doble titulación especializada en criptografía: protocolos, primitivas criptográficas, seguridad de redes, auditoría, gobernanza.",
    },
  },
  {
    id: "exchange-canada",
    kind: "exchange",
    title: {
      fr: "Échange universitaire — Canada",
      en: "Academic exchange — Canada",
      es: "Intercambio universitario — Canadá",
    },
    school: "Échange dans le cadre du diplôme d'ingénieur UTT",
    location: "Canada",
    period: {
      fr: "1 semestre · pendant l'ingénieur",
      en: "1 semester · during the engineering degree",
      es: "1 semestre · durante la ingeniería",
    },
    description: {
      fr: "Échange universitaire classique d'un semestre. J'y ai approfondi mes compétences techniques (IA, dev) tout en découvrant un nouvel environnement académique, une autre méthode de travail et la culture nord-américaine.",
      en: "Classic one-semester academic exchange. I deepened my technical skills (AI, dev) while discovering a new academic environment, a different way of working and the North American culture.",
      es: "Intercambio universitario clásico de un semestre. Profundicé mis competencias técnicas (IA, desarrollo) mientras descubría un nuevo entorno académico, otra forma de trabajar y la cultura norteamericana.",
    },
    flag: "🇨🇦",
  },
  {
    id: "exchange-china",
    kind: "exchange",
    title: {
      fr: "Échange universitaire — Chine",
      en: "Academic exchange — China",
      es: "Intercambio universitario — China",
    },
    school: "Échange dans le cadre du diplôme d'ingénieur UTT",
    location: "Chine",
    period: {
      fr: "1 semestre · pendant l'ingénieur",
      en: "1 semester · during the engineering degree",
      es: "1 semestre · durante la ingeniería",
    },
    description: {
      fr: "Semestre orienté business multiculturel : stratégie internationale, négociation interculturelle, immersion dans l'écosystème tech asiatique. Une perspective complètement différente sur le travail en équipe et la culture d'entreprise.",
      en: "Semester focused on multicultural business: international strategy, cross-cultural negotiation, immersion in the Asian tech ecosystem. A completely different perspective on teamwork and corporate culture.",
      es: "Semestre orientado a negocios multiculturales: estrategia internacional, negociación intercultural, inmersión en el ecosistema tech asiático. Una perspectiva completamente distinta sobre el trabajo en equipo y la cultura de empresa.",
    },
    flag: "🇨🇳",
  },
];
