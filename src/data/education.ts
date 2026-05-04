import type { Education } from "./types";

export const education: Education[] = [
  {
    id: "bac",
    year: 2015,
    kind: "milestone",
    title: {
      fr: "Baccalauréat S — mention Bien",
      en: "French baccalaureate (S) — with honours",
      es: "Bachillerato S — con mención",
    },
    school: "Lycée",
    location: "France",
    period: { fr: "2015 · mention Bien", en: "2015 · with honours", es: "2015 · con mención" },
    summary: {
      fr: "Bac S, spécialité Mathématiques + SI, mention Bien.",
      en: "Scientific track, Maths + Engineering Sciences major, honours.",
      es: "Bachillerato científico, Matemáticas + Ciencias de la Ingeniería, con mención.",
    },
    description: {
      fr: "Baccalauréat scientifique avec spécialité Mathématiques et Sciences de l'Ingénieur (SI), obtenu mention Bien. C'est là que la combinaison maths + résolution de problèmes concrets a déclenché l'envie de continuer en école d'ingénieur.",
      en: "Scientific baccalaureate with a Mathematics + Engineering Sciences (SI) major, earned with honours. The mix of maths and concrete problem-solving is what made me want to continue toward an engineering school.",
      es: "Bachillerato científico con especialidad en Matemáticas y Ciencias de la Ingeniería (SI), obtenido con mención. La combinación de matemáticas y resolución de problemas concretos fue lo que me motivó a continuar en una escuela de ingeniería.",
    },
  },
  {
    id: "utt-start",
    year: 2015,
    kind: "milestone",
    title: {
      fr: "Entrée à l'UTT",
      en: "Joining UTT",
      es: "Ingreso en la UTT",
    },
    school: "UTT — Université de Technologie de Troyes",
    location: "Troyes, France",
    period: { fr: "Septembre 2015", en: "September 2015", es: "Septiembre 2015" },
    summary: {
      fr: "Début du cursus ingénieur — 5 ans, spécialisation IA.",
      en: "Start of the engineering programme — 5 years, AI specialization.",
      es: "Inicio del programa de ingeniería — 5 años, especialización en IA.",
    },
    description: {
      fr: "Première rentrée à l'UTT. Tronc commun en sciences de l'ingénieur, puis orientation vers l'informatique et les systèmes d'information avec une spécialisation marquée en IA dès la 3ème année.",
      en: "First day at UTT. Common engineering core, then orientation toward computer science and information systems with a strong AI focus starting in year 3.",
      es: "Primer día en la UTT. Tronco común en ciencias de la ingeniería, luego orientación hacia informática y sistemas de información con un fuerte enfoque en IA desde el 3er año.",
    },
  },
  {
    id: "exchange-canada",
    year: 2018,
    kind: "exchange",
    title: {
      fr: "Échange universitaire — Canada",
      en: "Academic exchange — Canada",
      es: "Intercambio universitario — Canadá",
    },
    school: "Université canadienne · échange UTT",
    location: "Canada",
    period: {
      fr: "1 semestre · 2018",
      en: "1 semester · 2018",
      es: "1 semestre · 2018",
    },
    summary: {
      fr: "Un semestre en immersion académique nord-américaine.",
      en: "One semester immersed in the North American academic system.",
      es: "Un semestre en inmersión académica norteamericana.",
    },
    description: {
      fr: "Échange universitaire classique d'un semestre. J'y ai approfondi mes compétences techniques (IA, dev) tout en découvrant un nouvel environnement académique, une autre méthode de travail et la culture nord-américaine. Beaucoup de travail en équipe, projets pratiques, rythme intense.",
      en: "Classic one-semester academic exchange. I deepened my technical skills (AI, dev) while discovering a new academic environment, a different way of working, and the North American culture. Lots of teamwork, practical projects, intense rhythm.",
      es: "Intercambio universitario clásico de un semestre. Profundicé mis competencias técnicas (IA, desarrollo) mientras descubría un nuevo entorno académico, otra forma de trabajar y la cultura norteamericana. Mucho trabajo en equipo, proyectos prácticos, ritmo intenso.",
    },
    flag: "🇨🇦",
  },
  {
    id: "exchange-china",
    year: 2019,
    kind: "exchange",
    title: {
      fr: "Échange universitaire — Chine",
      en: "Academic exchange — China",
      es: "Intercambio universitario — China",
    },
    school: "Université chinoise · échange UTT",
    location: "Chine",
    period: {
      fr: "1 semestre · 2019",
      en: "1 semester · 2019",
      es: "1 semestre · 2019",
    },
    summary: {
      fr: "Semestre business multiculturel en Asie.",
      en: "Multicultural business semester in Asia.",
      es: "Semestre de negocios multiculturales en Asia.",
    },
    description: {
      fr: "Semestre orienté business multiculturel : stratégie internationale, négociation interculturelle, immersion dans l'écosystème tech asiatique. Une perspective complètement différente sur le travail en équipe et la culture d'entreprise. Voyages dans les pays voisins en parallèle.",
      en: "Semester focused on multicultural business: international strategy, cross-cultural negotiation, immersion in the Asian tech ecosystem. A completely different perspective on teamwork and corporate culture. Trips to neighbouring countries on the side.",
      es: "Semestre orientado a negocios multiculturales: estrategia internacional, negociación intercultural, inmersión en el ecosistema tech asiático. Una perspectiva completamente distinta sobre el trabajo en equipo y la cultura de empresa. Viajes a países vecinos en paralelo.",
    },
    flag: "🇨🇳",
  },
  {
    id: "engineering-utt",
    year: 2020,
    kind: "degree",
    title: {
      fr: "Diplôme d'ingénieur — Informatique & SI",
      en: "Engineering Degree — Computer Science & IS",
      es: "Título de Ingeniero — Informática & SI",
    },
    school: "UTT — Université de Technologie de Troyes",
    location: "Troyes, France",
    period: { fr: "Juin 2020 · 5 ans", en: "June 2020 · 5 years", es: "Junio 2020 · 5 años" },
    summary: {
      fr: "Diplôme d'ingénieur en poche, spécialisation IA.",
      en: "Engineering degree obtained, AI specialization.",
      es: "Título de ingeniero obtenido, especialización en IA.",
    },
    description: {
      fr: "Cursus complet d'ingénieur sur 5 ans avec spécialisation en Intelligence Artificielle. Stages, projets longs, deux semestres à l'étranger (Canada + Chine). Diplôme reconnu par la CTI.",
      en: "Full 5-year engineering programme with a specialization in Artificial Intelligence. Internships, long-form projects, two semesters abroad (Canada + China). CTI-accredited diploma.",
      es: "Programa completo de 5 años de ingeniería con especialización en Inteligencia Artificial. Prácticas, proyectos largos, dos semestres en el extranjero (Canadá + China). Diploma acreditado por la CTI.",
    },
  },
  {
    id: "master-security",
    year: 2021,
    kind: "degree",
    title: {
      fr: "Master 2 — Cryptographie & Sécurité des SI",
      en: "Master 2 — Cryptography & Information System Security",
      es: "Máster 2 — Criptografía & Seguridad de SI",
    },
    school: "UTT — Université de Technologie de Troyes",
    location: "Troyes, France",
    period: {
      fr: "2020 — 2021 · double diplôme",
      en: "2020 — 2021 · double degree",
      es: "2020 — 2021 · doble titulación",
    },
    summary: {
      fr: "Double diplôme, fin du parcours académique.",
      en: "Double degree, end of the academic journey.",
      es: "Doble titulación, fin del recorrido académico.",
    },
    description: {
      fr: "Double diplôme spécialisé en cryptographie et sécurité des systèmes d'information : protocoles, primitives cryptographiques, sécurité réseau, audit, gouvernance. Six ans après le bac, fin du parcours étudiant — direction la vie pro.",
      en: "Double degree specialised in cryptography and information system security: protocols, cryptographic primitives, network security, audit, governance. Six years after the baccalaureate, the student journey ends — heading into the professional world.",
      es: "Doble titulación especializada en criptografía y seguridad de sistemas de información: protocolos, primitivas criptográficas, seguridad de redes, auditoría, gobernanza. Seis años después del bachillerato, fin del recorrido estudiantil — rumbo al mundo profesional.",
    },
  },
];
