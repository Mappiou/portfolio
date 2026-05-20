import type { Translated } from "@shared/types";

export type PassionItem = {
  id: string;
  label: Translated;
  flag?: string;
  /** Optional path to a photo (e.g. /images/passions/badminton.jpg). When unset, a tinted placeholder is shown */
  photoSrc?: string;
  /** Picsum seed for the placeholder photo */
  photoSeed?: string;
  /** Longer prose for a "scene" rendering (sport scenes) */
  prose?: Translated;
  /** Aspect ratio for the scene image (default 16/10, "4/5" for the tall portrait) */
  aspect?: "16/10" | "4/5" | "5/4";
  /** Mono kicker shown above the scene title */
  kicker?: Translated;
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
        photoSeed: "badminton-court-shuttle",
        aspect: "16/10",
        kicker: {
          fr: "Salle · Réflexes",
          en: "Indoor · Reflexes",
          es: "Sala · Reflejos",
        },
        prose: {
          fr: "Sport indoor, intensité en bursts courts. Quinze ans que j'y joue régulièrement — pour les réflexes et la fatigue propre des matchs serrés.",
          en: "Indoor sport, intensity in short bursts. Fifteen years of regular play — for the reflexes and the clean exhaustion of tight matches.",
          es: "Deporte de interior, intensidad en ráfagas cortas. Quince años jugando con regularidad — por los reflejos y el cansancio limpio de los partidos ajustados.",
        },
      },
      {
        id: "beach-volley",
        label: {
          fr: "Beach volley",
          en: "Beach volley",
          es: "Vóley playa",
        },
        photoSeed: "beachvolley-bcn-sunset",
        aspect: "16/10",
        kicker: {
          fr: "Plage · Été",
          en: "Beach · Summer",
          es: "Playa · Verano",
        },
        prose: {
          fr: "Été sur Barceloneta, fin de journée, le sable encore chaud. Le rythme à trois touches qui devient lisible avec le temps.",
          en: "Summer evenings on Barceloneta, sand still warm. The three-touch rhythm that becomes legible over time.",
          es: "Tardes de verano en la Barceloneta, la arena aún caliente. El ritmo de tres toques que se vuelve legible con el tiempo.",
        },
      },
      {
        id: "skating",
        label: {
          fr: "Patin à glace",
          en: "Ice skating",
          es: "Patinaje sobre hielo",
        },
        photoSeed: "iceskating-rink-night",
        aspect: "4/5",
        kicker: {
          fr: "Glace · Précision",
          en: "Ice · Precision",
          es: "Hielo · Precisión",
        },
        prose: {
          fr: "Depuis l'adolescence — la précision, le silence sur la glace, l'équilibre dans la vitesse. Une discipline qui exige du calme.",
          en: "Since adolescence — precision, the silence on the ice, balance at speed. A discipline that demands calm.",
          es: "Desde la adolescencia — precisión, el silencio sobre el hielo, equilibrio en la velocidad. Una disciplina que exige calma.",
        },
      },
      {
        id: "trekking",
        label: {
          fr: "Nature, trekking & bivouac",
          en: "Nature, trekking & bivouac",
          es: "Naturaleza, trekking & vivac",
        },
        photoSeed: "trekking-mountain-bivouac",
        aspect: "16/10",
        kicker: {
          fr: "Montagne · Lenteur",
          en: "Mountain · Slowness",
          es: "Montaña · Lentitud",
        },
        prose: {
          fr: "Plusieurs jours en autonomie, sac sur le dos, bivouac à la frontale. La lenteur des sommets, la nuit pure loin des lumières.",
          en: "Multi-day self-supported treks, pack on, bivouac by headlamp. The slowness of summits, pure dark away from city light.",
          es: "Travesías de varios días en autonomía, mochila a cuestas, vivac con frontal. La lentitud de las cumbres, la oscuridad pura lejos de las luces.",
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
];
