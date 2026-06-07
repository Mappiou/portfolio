import type { Translated } from "@shared/types";

export type PassionItem = {
  id: string;
  label: Translated;
  flag?: string;
  /** Optional path to a single photo. When unset, a tinted placeholder is shown */
  photoSrc?: string;
  /** Optional list of photos rendered side-by-side as a strip. Takes precedence over photoSrc when set */
  photoSrcs?: string[];
  /** Picsum seed for the placeholder photo */
  photoSeed?: string;
  /** Longer prose for a "scene" rendering (sport scenes) */
  prose?: Translated;
  /** Aspect ratio for the scene image (default 16/10, "4/5" for the tall portrait, "9/16" for full portrait) */
  aspect?: "16/10" | "4/5" | "5/4" | "9/16";
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
      fr: "En dehors du travail, j'adore être à l'extérieur et faire des activités en tout genre.",
      en: "Outside of work, I love being outdoors and trying all kinds of activities.",
      es: "Fuera del trabajo, me encanta estar al aire libre y hacer actividades de todo tipo.",
    },
    items: [
      {
        id: "trekking",
        label: {
          fr: "Nature, trekking & bivouac",
          en: "Nature, trekking & bivouac",
          es: "Naturaleza, trekking & vivac",
        },
        photoSrcs: [
          "/passions/trek2.jpg",
          "/passions/trek1.jpg",
          "/passions/trek3.jpg",
          "/passions/trek4.jpg",
        ],
        photoSeed: "trekking-mountain-bivouac",
        aspect: "16/10",
        kicker: {
          fr: "Montagne · Lenteur",
          en: "Mountain · Slowness",
          es: "Montaña · Lentitud",
        },
        prose: {
          fr: "Partir plusieurs jours, sac sur le dos, dormir sous tente loin de tout. J'adore ce moment où l'on se réveille en altitude, le silence total et le lever du soleil rien que pour soi.",
          en: "Heading out for days, pack on my back, sleeping in a tent far from everything. I love waking up high in the mountains, the total silence and a sunrise all to myself.",
          es: "Salir varios días, mochila a la espalda, dormir en tienda lejos de todo. Me encanta ese momento en que te despiertas en altura, el silencio total y un amanecer solo para mí.",
        },
      },
      {
        id: "beach-volley",
        label: {
          fr: "Beach volley",
          en: "Beach volley",
          es: "Vóley playa",
        },
        photoSrc: "/passions/beach.jpg",
        photoSeed: "beachvolley-bcn-sunset",
        aspect: "16/10",
        kicker: {
          fr: "Plage · Été",
          en: "Beach · Summer",
          es: "Playa · Verano",
        },
        prose: {
          fr: "Du sport, des amis et un lever de soleil sur la mer : voilà comment démarrer parfaitement une journée.",
          en: "Sport, friends and a sunrise over the sea: the perfect way to start a day.",
          es: "Deporte, amigos y un amanecer sobre el mar: la manera perfecta de empezar el día.",
        },
      },
      {
        id: "badminton",
        label: { fr: "Badminton", en: "Badminton", es: "Bádminton" },
        photoSrc: "/passions/badminton.jpg",
        photoSeed: "badminton-court-shuttle",
        aspect: "4/5",
        kicker: {
          fr: "En famille · Salle",
          en: "Family · Indoor",
          es: "En familia · Sala",
        },
        prose: {
          fr: "Une passion de famille : on joue entre frères, sœurs, cousins et tontons. Sport indoor, intensité en bursts courts — quinze ans que j'y joue, pour les réflexes et la fatigue propre des matchs serrés.",
          en: "A family passion: we play between brothers, sisters, cousins and uncles. Indoor sport, intensity in short bursts — fifteen years of regular play, for the reflexes and the clean exhaustion of tight matches.",
          es: "Una pasión familiar: jugamos entre hermanos, hermanas, primos y tíos. Deporte de interior, intensidad en ráfagas cortas — quince años jugando, por los reflejos y el cansancio limpio de los partidos ajustados.",
        },
      },
      {
        id: "skating",
        label: {
          fr: "Patin à glace",
          en: "Ice skating",
          es: "Patinaje sobre hielo",
        },
        photoSrc: "/passions/skating.jpg",
        photoSeed: "iceskating-rink-night",
        aspect: "4/5",
        kicker: {
          fr: "Glace · Précision",
          en: "Ice · Precision",
          es: "Hielo · Precisión",
        },
        prose: {
          fr: "Depuis ma découverte intense au Canada, je ne peux plus me passer de glisser sur la glace chaque hiver.",
          en: "Ever since an intense first taste in Canada, I can't go a winter without gliding on the ice.",
          es: "Desde un descubrimiento intenso en Canadá, no puedo pasar un invierno sin deslizarme sobre el hielo.",
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
      fr: "Je suis un grand curieux de la tech. Modèles d'IA, frameworks, gadgets, nouvelles technologies, papiers de recherche : je fais de la veille au quotidien par pure curiosité. Apprendre en continu, c'est mon petit plaisir quotidien.",
      en: "I'm endlessly curious about tech. AI models, frameworks, gadgets, new technologies, research papers: I keep up with it all every day, purely out of curiosity. Constantly learning is my little daily pleasure.",
      es: "Soy un gran curioso de la tecnología. Modelos de IA, frameworks, gadgets, nuevas tecnologías, papers de investigación: me mantengo al día cada día por pura curiosidad. Aprender sin parar es mi pequeño placer diario.",
    },
    items: [],
  },
];
