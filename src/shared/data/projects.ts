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
      fr: "App qui croise prévisions météo horaires et conditions idéales pour jouer au beach-volley à Barcelone. Affiche les meilleures fenêtres de la journée pour aller jouer.",
      en: "App that combines hourly weather forecasts with ideal conditions for beach volleyball in Barcelona. Shows you the best windows of the day to play.",
      es: "App que cruza previsiones meteorológicas horarias y condiciones ideales para jugar al voley playa en Barcelona. Muestra las mejores franjas del día para jugar.",
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
    apkUrl: "/apks/volley_meteo.apk",
    githubUrl: "https://github.com/Mappiou/volley_meteo",
    accent: "blue",
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
      fr: "Scanner multi-pages avec détection automatique des bords. Convertit instantanément en PDF partageable via AirDrop, mail ou message.",
      en: "Multi-page scanner with automatic edge detection. Instantly creates a PDF you can share via AirDrop, email or message.",
      es: "Escáner multipágina con detección automática de bordes. Crea al instante un PDF compartible por AirDrop, mail o mensaje.",
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
    apkUrl: "/apks/scan2pdf.apk",
    githubUrl: "https://github.com/Mappiou/scan2pdf",
    accent: "red",
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
    apkUrl: "/apks/triolinguo.apk",
    githubUrl: "https://github.com/Mappiou/Triolinguo",
    accent: "green",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
