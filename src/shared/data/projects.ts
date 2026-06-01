import type { Project } from "@shared/types";

export const projects: Project[] = [
  {
    id: "volley-meteo",
    name: "Volley Météo",
    emoji: "🏐",
    tagline: {
      fr: "La météo idéale pour jouer au volley",
      en: "Perfect weather for beach volley",
      es: "El tiempo ideal para jugar al voley",
    },
    description: {
      fr: "Vérifie les créneaux idéaux durant les sept prochains jours pour jouer au volley.",
      en: "Check the ideal time slots over the next seven days to play volleyball.",
      es: "Consulta las franjas ideales durante los próximos siete días para jugar al voley.",
    },
    features: [
      {
        fr: "Météo horaire détaillée par jour",
        en: "Hourly weather forecast per day",
        es: "Previsión horaria detallada por día",
      },
      {
        fr: "Score d'aptitude au jeu calculé en temps réel",
        en: "Playability score computed in real time",
        es: "Puntuación de jugabilidad en tiempo real",
      },
      {
        fr: "Vue détaillée par jour avec historique",
        en: "Detailed day view with history",
        es: "Vista detallada por día con historial",
      },
    ],
    stack: ["Flutter", "Dart", "REST API"],
    apkUrl: "https://github.com/Mappiou/portfolio/releases/download/apks/volley_meteo.apk",
    githubUrl: "https://github.com/Mappiou/volley_meteo",
    accent: "blue",
    screenshots: ["/screenshots/volley-meteo.png"],
  },
  {
    id: "scan2pdf",
    name: "Scan2PDF",
    emoji: "📄",
    tagline: {
      fr: "Scanner ses documents en PDF, simplement",
      en: "Scan documents to PDF, simply",
      es: "Escanea documentos a PDF, simple",
    },
    description: {
      fr: "Scanne tes documents en PDF, simplement et gratuitement, sans publicité.",
      en: "Scan your documents to PDF, simply and for free, with no ads.",
      es: "Escanea tus documentos a PDF, de forma sencilla y gratuita, sin publicidad.",
    },
    features: [
      {
        fr: "Scan multi-pages (jusqu'à 10 pages)",
        en: "Multi-page scan (up to 10 pages)",
        es: "Escaneo multipágina (hasta 10 páginas)",
      },
      {
        fr: "Aperçu PDF avant export",
        en: "PDF preview before export",
        es: "Vista previa del PDF antes de exportar",
      },
      {
        fr: "Partage natif (AirDrop, mail, messages)",
        en: "Native sharing (AirDrop, mail, messages)",
        es: "Compartir nativo (AirDrop, mail, mensajes)",
      },
    ],
    stack: ["Flutter", "Dart", "Document Scanner", "PDF"],
    apkUrl: "https://github.com/Mappiou/portfolio/releases/download/apks/scan2pdf.apk",
    githubUrl: "https://github.com/Mappiou/scan2pdf",
    accent: "red",
    screenshots: ["/screenshots/scan2pdf.png"],
  },
  {
    id: "triolinguo",
    name: "Triolinguo",
    emoji: "🌍",
    tagline: {
      fr: "Maîtriser la conjugaison espagnole en s'amusant",
      en: "Master Spanish conjugation, the fun way",
      es: "Domina la conjugación española jugando",
    },
    description: {
      fr: "Quiz interactif de conjugaison espagnole avec retour audio (sons correct/erreur). Apprends à ton rythme, verbe par verbe.",
      en: "Interactive Spanish conjugation quiz with audio feedback (correct/wrong sounds). Learn at your own pace, verb by verb.",
      es: "Quiz interactivo de conjugación española con retorno de audio. Aprende a tu ritmo, verbo a verbo.",
    },
    features: [
      {
        fr: "Quiz à choix multiples sur les conjugaisons",
        en: "Multiple-choice quiz on conjugations",
        es: "Quiz de opción múltiple sobre conjugaciones",
      },
      {
        fr: "Retour audio (correct / erreur)",
        en: "Audio feedback (correct / wrong)",
        es: "Retorno de audio (correcto / error)",
      },
      {
        fr: "Base de verbes irréguliers et réguliers",
        en: "Database of regular and irregular verbs",
        es: "Base de verbos regulares e irregulares",
      },
    ],
    stack: ["Flutter", "Dart", "Audio"],
    apkUrl: "https://github.com/Mappiou/portfolio/releases/download/apks/triolinguo.apk",
    githubUrl: "https://github.com/Mappiou/Triolinguo",
    accent: "green",
    screenshots: ["/screenshots/triolinguo.png"],
  },
  {
    id: "torneo",
    name: "Torneo",
    emoji: "🏆",
    tagline: {
      fr: "Générateur de tournois beach-volley mixte",
      en: "Mixed beach-volley tournament generator",
      es: "Generador de torneos de voley playa mixto",
    },
    description: {
      fr: "Génère des tableaux aléatoires avec les joueurs que tu veux, pour s'éclater sur la plage.",
      en: "Generate random brackets with the players you want, to have a blast on the beach.",
      es: "Genera cuadros aleatorios con los jugadores que quieras, para pasarlo en grande en la playa.",
    },
    features: [
      {
        fr: "Rotation automatique des partenaires",
        en: "Automatic partner rotation",
        es: "Rotación automática de parejas",
      },
      {
        fr: "Classements intermédiaires et final en direct",
        en: "Live intermediate and final rankings",
        es: "Clasificaciones intermedias y final en directo",
      },
      {
        fr: "Saisie des scores et export du classement",
        en: "Score entry and standings export",
        es: "Registro de marcadores y exportación de la clasificación",
      },
    ],
    stack: ["Flutter", "Dart"],
    apkUrl: "https://github.com/Mappiou/portfolio/releases/download/apks/torneo.apk",
    githubUrl: "https://github.com/Mappiou/torneo",
    accent: "yellow",
    screenshots: ["/screenshots/torneo.png"],
  },
  {
    id: "noscroll",
    name: "NoScroll",
    emoji: "📵",
    tagline: {
      fr: "Bloque automatiquement Reels et Shorts",
      en: "Automatically blocks Reels and Shorts",
      es: "Bloquea automáticamente Reels y Shorts",
    },
    description: {
      fr: "Pour une utilisation saine des réseaux sociaux, sans reels ni shorts.",
      en: "For a healthy use of social media, without reels or shorts.",
      es: "Para un uso saludable de las redes sociales, sin reels ni shorts.",
    },
    features: [
      {
        fr: "Détection automatique des surfaces Reels/Shorts",
        en: "Automatic detection of Reels/Shorts surfaces",
        es: "Detección automática de las superficies Reels/Shorts",
      },
      {
        fr: "Pause configurable de 1 à 15 minutes",
        en: "Configurable 1-to-15-minute pause",
        es: "Pausa configurable de 1 a 15 minutos",
      },
      {
        fr: "Couvre Instagram, YouTube et Facebook",
        en: "Covers Instagram, YouTube and Facebook",
        es: "Cubre Instagram, YouTube y Facebook",
      },
    ],
    stack: ["Kotlin", "Jetpack Compose", "AccessibilityService"],
    apkUrl: "https://github.com/Mappiou/portfolio/releases/download/apks/noscroll.apk",
    githubUrl: "https://github.com/Mappiou/noscroll",
    accent: "lilac",
    screenshots: ["/screenshots/noscroll.png"],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
