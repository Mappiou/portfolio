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
      fr: "Quand je ne suis pas devant un écran, je suis en train de courir après une balle, de glisser sur la glace ou de monter en montagne. Disciplines variées, rythmes différents.",
      en: "When I'm not at a screen, I'm chasing a ball, gliding on ice, or climbing in the mountains. Different disciplines, different rhythms.",
      es: "Cuando no estoy frente a una pantalla, persigo una pelota, me deslizo sobre el hielo o subo a la montaña. Disciplinas variadas, ritmos diferentes.",
    },
    items: [
      {
        id: "badminton",
        label: { fr: "Badminton", en: "Badminton", es: "Bádminton" },
      },
      {
        id: "beach-volley",
        label: {
          fr: "Beach volley",
          en: "Beach volley",
          es: "Vóley playa",
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
      {
        id: "trekking",
        label: {
          fr: "Trekking en autonomie",
          en: "Self-supported trekking",
          es: "Trekking en autonomía",
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
      fr: "Passion réelle pour la tech en général. Je fais de la veille continue sur tout ce qui sort — nouveaux modèles d'IA, frameworks, outils, gadgets, papers de recherche. Curieux par défaut, je passe du temps à comprendre comment ça marche sous le capot et à tester par moi-même avant de me faire un avis. Ce qui me motive : ne jamais cesser d'apprendre.",
      en: "Genuine passion for tech in general. I run continuous tech-watch on everything new — AI models, frameworks, tools, gadgets, research papers. Curious by default, I spend time understanding how things work under the hood and testing them myself before forming an opinion. What drives me: never stop learning.",
      es: "Auténtica pasión por la tech en general. Hago vigilancia continua de todas las novedades — modelos de IA, frameworks, herramientas, gadgets, papers de investigación. Curioso por defecto, dedico tiempo a entender cómo funciona por dentro y a probarlo antes de formarme una opinión. Lo que me motiva: no dejar nunca de aprender.",
    },
    items: [],
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
