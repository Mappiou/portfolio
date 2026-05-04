import type { Translated } from "./types";

export type PassionItem = {
  id: string;
  label: Translated;
  flag?: string;
  /** Optional path to a photo (e.g. /images/passions/badminton.jpg). When unset, a tinted placeholder is shown */
  photoSrc?: string;
};

export type Passion = {
  id: string;
  icon: "sport" | "tech" | "travel";
  title: Translated;
  description: Translated;
  items: PassionItem[];
};

export const passions: Passion[] = [
  {
    id: "sport",
    icon: "sport",
    title: { fr: "Sport", en: "Sport", es: "Deporte" },
    description: {
      fr: "Quand je ne suis pas devant un écran, je suis en train de courir après une balle ou de glisser sur de la glace. Trois disciplines, trois rythmes différents.",
      en: "When I'm not at a screen, I'm chasing a ball or gliding on ice. Three disciplines, three different rhythms.",
      es: "Cuando no estoy frente a una pantalla, persigo una pelota o me deslizo sobre el hielo. Tres disciplinas, tres ritmos diferentes.",
    },
    items: [
      {
        id: "badminton",
        label: { fr: "Badminton", en: "Badminton", es: "Bádminton" },
      },
      {
        id: "volley",
        label: {
          fr: "Volley-ball / Beach volley",
          en: "Volleyball / Beach volley",
          es: "Voleibol / Vóley playa",
        },
      },
      {
        id: "skating",
        label: {
          fr: "Patin à glace",
          en: "Ice skating",
          es: "Patinaje sobre hielo",
        },
      },
    ],
  },
  {
    id: "tech",
    icon: "tech",
    title: {
      fr: "Nouvelles technologies",
      en: "New technologies",
      es: "Nuevas tecnologías",
    },
    description: {
      fr: "J'adore découvrir, comprendre et démonter les nouveautés tech : nouveaux modèles d'IA, frameworks, gadgets, démos de week-end. Comprendre comment ça marche sous le capot, c'est ce qui me fait avancer.",
      en: "I love discovering, understanding and tinkering with new tech: new AI models, frameworks, gadgets, weekend demos. Understanding what's under the hood is what keeps me going.",
      es: "Me encanta descubrir, comprender y desmontar las novedades tech: nuevos modelos de IA, frameworks, gadgets, demos de fin de semana. Entender cómo funciona por dentro es lo que me hace avanzar.",
    },
    items: [
      {
        id: "tech-watch",
        label: {
          fr: "Veille technologique",
          en: "Tech watch",
          es: "Vigilancia tecnológica",
        },
      },
    ],
  },
  {
    id: "travel",
    icon: "travel",
    title: { fr: "Voyages", en: "Travel", es: "Viajes" },
    description: {
      fr: "Un an de road-trip aux États-Unis et en Amérique du Sud. L'Asie via mes 2 semestres d'études (Chine + pays voisins). Et beaucoup d'Europe entre deux missions. Voyager me garde curieux et ouvert.",
      en: "A year-long road trip across the US and South America. Asia via my 2 study-abroad semesters (China + neighbouring trips). And a lot of Europe between missions. Travel keeps me curious and open.",
      es: "Un año de road trip por EE.UU. y Sudamérica. Asia gracias a mis 2 semestres en el extranjero (China + países vecinos). Y mucha Europa entre dos misiones. Viajar me mantiene curioso y abierto.",
    },
    items: [
      {
        id: "usa",
        label: { fr: "États-Unis", en: "USA", es: "EE.UU." },
        flag: "🇺🇸",
      },
      {
        id: "south-america",
        label: {
          fr: "Amérique du Sud",
          en: "South America",
          es: "Sudamérica",
        },
        flag: "🌎",
      },
      {
        id: "asia",
        label: { fr: "Asie", en: "Asia", es: "Asia" },
        flag: "🌏",
      },
      {
        id: "europe",
        label: { fr: "Europe", en: "Europe", es: "Europa" },
        flag: "🇪🇺",
      },
    ],
  },
];
