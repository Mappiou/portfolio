export const profile = {
  name: "Mathieu Diep",
  title: "Software Engineer",
  bio: "Je construis des apps mobiles et web — de l'idée au déploiement. Spécialisé Flutter, Next.js et IA appliquée.",
  location: "Paris, France",
  email: "contact@mathieudiep.fr",
  links: {
    github: "https://github.com/mathieudiep",
    linkedin: "https://linkedin.com/in/mathieudiep",
  },
};

export type Project = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  stack: string[];
  apkUrl: string;
};

export const projects: Project[] = [
  {
    id: "volley-meteo",
    name: "Volley Météo",
    emoji: "🏐",
    tagline: "La météo idéale pour jouer au volley",
    description:
      "App qui croise les prévisions météo horaires avec les conditions idéales pour jouer au beach-volley à Barcelone.",
    stack: ["Flutter", "Dart", "REST API"],
    apkUrl:
      "https://github.com/mathieudiep/volley_meteo/releases/latest/download/volley_meteo.apk",
  },
  {
    id: "scan2pdf",
    name: "Scan2PDF",
    emoji: "📄",
    tagline: "Scanner ses documents en PDF, simplement",
    description:
      "Scan multi-pages avec partage natif (AirDrop, mail). Détection automatique des bords du document.",
    stack: ["Flutter", "Dart", "Document Scanner"],
    apkUrl:
      "https://github.com/mathieudiep/scan2pdf/releases/latest/download/scan2pdf.apk",
  },
  {
    id: "triolinguo",
    name: "Triolinguo",
    emoji: "🌍",
    tagline: "Maîtriser la conjugaison espagnole en s'amusant",
    description:
      "Quiz interactif de conjugaison espagnole avec retour audio. Apprend en jouant, à ton rythme.",
    stack: ["Flutter", "Dart", "Audio"],
    apkUrl:
      "https://github.com/mathieudiep/Triolinguo/releases/latest/download/triolinguo.apk",
  },
];

export const experiences = [
  {
    role: "Software Engineer",
    company: "Hexamind",
    period: "2024 — présent",
    description: "IA appliquée et applications web modernes.",
  },
  {
    role: "Échange universitaire",
    company: "Canada",
    period: "2023",
    description: "Semestre d'échange — informatique et culture nord-américaine.",
  },
  {
    role: "Échange universitaire",
    company: "Chine",
    period: "2022",
    description: "Semestre d'échange — découverte de l'écosystème tech asiatique.",
  },
];
