/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║                                                                          ║
 * ║   src/content.ts — SOURCE UNIQUE DU CONTENU DU SITE                      ║
 * ║                                                                          ║
 * ║   👉 Pour modifier n'importe quel texte ou n'importe quelle photo        ║
 * ║      du site, c'est ici, et seulement ici.                               ║
 * ║                                                                          ║
 * ║   Les autres fichiers (src/data/*.ts, src/i18n/index.ts) ne font que     ║
 * ║   ré-exporter ce qui est défini ci-dessous.                              ║
 * ║                                                                          ║
 * ║   Sections :                                                             ║
 * ║     1. PHOTOS         (chemins vers les images du site)                  ║
 * ║     2. PROFILE        (nom, contact, liens)                              ║
 * ║     3. UI STRINGS     (libellés FR / EN / ES — nav, boutons, titres)     ║
 * ║     4. EXPERIENCES    (timeline pro — Hexamind, Lincoln, …)              ║
 * ║     5. EDUCATION      (timeline formation — Bac, UTT, Master, …)         ║
 * ║     6. PROJECTS       (cartes projets — Volley Météo, Scan2PDF, …)       ║
 * ║     7. SKILLS         (catégories de compétences)                        ║
 * ║     8. PASSIONS       (sport / tech / voyages, avec items)               ║
 * ║                                                                          ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

import type { Language } from "./i18n/languages";
import type { Experience, Education, Skill, Project, Translated } from "./data/types";
import type { Passion } from "./data/passions";

/* ════════════════════════════════════════════════════════════════════════════
 * 1. 📸  PHOTOS
 * ────────────────────────────────────────────────────────────────────────────
 * Toutes les photos du site sont référencées ici par un nom indicatif.
 *
 * Où poser le fichier image ?
 *   • Pour qu'une image soit servie par Vite, place-la dans `public/images/...`
 *     puis renseigne le chemin ABSOLU (commençant par /) ci-dessous.
 *     Exemple : `/images/passions/badminton.jpg`
 *
 * Tant qu'une valeur reste à `""` (chaîne vide), le site affiche un
 * placeholder dégradé à la place de l'image.
 * ════════════════════════════════════════════════════════════════════════════ */

export const photos = {
  /** Portrait carré affiché dans la section Bio (à côté de "Salut, je suis Mathieu."). */
  bioPortrait: "",

  /** Photos illustrant chaque étape de la frise Formation. */
  education: {
    bac: "", // photo Bac
    uttStart: "", // photo entrée UTT
    uttPrepaEnd: "", // photo fin de prépa intégrée
    exchangeCanada: "", // photo Erasmus Canada
    exchangeChina: "", // photo Erasmus Chine
    internshipOrangeLabs: "", // photo stage Orange Labs
    internshipAubay: "", // photo stage Aubay
    internshipCapgemini: "", // photo stage Capgemini
    engineeringUtt: "", // photo diplôme d'ingénieur UTT
    masterCybersecurity: "", // photo Master Cybersécurité
  },

  /** Photos illustrant chaque item de la section Passions. */
  passions: {
    sport: {
      badminton: "", // photo badminton
      beachVolley: "", // photo beach volley
      iceSkating: "", // photo patin à glace
      trekking: "", // photo trekking
    },
    travel: {
      usa1: "", // photo USA 1
      usa2: "", // photo USA 2
      southAmerica1: "", // photo Chili 1
      southAmerica2: "", // photo Chili 2
      southAmerica3: "", // photo Chili 3
      southAmerica4: "", // photo Chili 4
      asia1: "", // photo Asie 1
      asia2: "", // photo Asie 2
      europe1: "", // photo Europe 1
      europe2: "", // photo Europe 2
    },
  },

  /** Screenshots des apps Android (page détail projet). 3 max recommandés. */
  projects: {
    volleyMeteo: [] as string[], // screenshots Volley Météo (ex: ["/images/apps/volley/1.png", ...])
    scan2pdf: [] as string[], // screenshots Scan2PDF
    triolinguo: [] as string[], // screenshots Triolinguo
  },
} as const;

/* ════════════════════════════════════════════════════════════════════════════
 * 2. 👤  PROFILE
 * ════════════════════════════════════════════════════════════════════════════ */

export const profile = {
  name: "Mathieu Diep",
  title: "AI Engineer",
  email: "mathieu.diep.95@gmail.com",
  phone: "+33 6 02 37 03 24",
  location: "Barcelona, Spain",
  links: {
    github: "https://github.com/Mappiou",
    linkedin: "https://linkedin.com/in/mathieu-diep",
  },
} as const;

/* ════════════════════════════════════════════════════════════════════════════
 * 3. 🇫🇷🇬🇧🇪🇸  UI STRINGS  (libellés i18n)
 * ────────────────────────────────────────────────────────────────────────────
 * Toutes les chaînes affichées dans l'interface (navigation, titres de
 * sections, boutons, kickers, footer, page 404…), dans les 3 langues.
 *
 * Les balises `<italic>...</italic>` à l'intérieur des titres sont
 * traitées par le composant <Trans> de react-i18next pour les passer en
 * italique élégant (Instrument Serif).
 *
 * Garde IMPÉRATIVEMENT les mêmes clés dans `fr`, `en` et `es`
 * (un test unitaire vérifie la parité).
 * ════════════════════════════════════════════════════════════════════════════ */

type UiBundle = {
  meta: { siteTitle: string; siteDescription: string };
  nav: { home: string; projects: string; contact: string; language: string; downloadCv: string };
  language: {
    fr: string;
    en: string;
    es: string;
    fr_short: string;
    en_short: string;
    es_short: string;
  };
  hero: { kicker: string; title: string };
  bio: { intro: string; paragraphs: string[] };
  timeline: {
    title: string;
    note: string;
    expandHint: string;
    stackLabel: string;
    expand: string;
    collapse: string;
  };
  education: {
    kicker: string;
    title: string;
    expandHint: string;
    kind: { milestone: string; exchange: string; internship: string; degree: string };
  };
  passions: { kicker: string; title: string };
  projects: {
    kicker: string;
    title: string;
    intro: string;
    viewMore: string;
    downloadHint: string;
    downloadApk: string;
    viewSource: string;
    scanQr: string;
    androidNote: string;
    stack: string;
    features: string;
    back: string;
  };
  contactSection: { kicker: string; title: string; body: string };
  footer: { signature: string; rights: string };
  notFound: { title: string; subtitle: string; back: string };
  contact: { email: string; github: string; linkedin: string; location: string };
  ui: { photo: string; photoPlaceholder: string };
};

export const uiStrings: Record<Language, UiBundle> = {
  fr: {
    meta: {
      siteTitle: "Mathieu Diep — AI Engineer",
      siteDescription:
        "Portfolio de Mathieu Diep, AI Engineer LLM/RAG basé à Barcelone. Parcours, principes, et 3 apps Android téléchargeables par QR code.",
    },
    nav: {
      home: "Accueil",
      projects: "Projets",
      contact: "Contact",
      language: "Langue",
      downloadCv: "Télécharger le CV",
    },
    language: {
      fr: "Français",
      en: "Anglais",
      es: "Espagnol",
      fr_short: "FR",
      en_short: "EN",
      es_short: "ES",
    },
    hero: {
      kicker: "À propos",
      title: "Salut, je suis <italic>Mathieu.</italic>",
    },
    bio: {
      intro:
        "AI Engineer basé à Barcelone, je conçois et déploie des systèmes LLM/RAG que de vraies personnes utilisent, tous les jours.",
      paragraphs: [
        "Je travaille actuellement chez Hexamind sur la generative AI — entre autres, un chatbot servant 90 000+ utilisateurs en production, articulé autour d'une architecture RAG et d'OpenAI.",
        "Mon obsession : la couture entre la recherche AI et les apps qu'on peut tendre à quelqu'un. J'écris beaucoup de Python, je sors des apps mobiles en Flutter en parallèle, et je cherche à rendre les choses techniques calmes et un peu joueuses.",
      ],
    },
    timeline: {
      title: "Quelques étapes <italic>en chemin.</italic>",
      note: "5 expériences · 6 années dans l'IA appliquée",
      expandHint: "Cliquez sur une expérience pour voir le détail",
      stackLabel: "Stack",
      expand: "Voir le détail",
      collapse: "Replier",
    },
    education: {
      kicker: "Formation",
      title: "6 ans, du baccalauréat <italic>au double diplôme.</italic>",
      expandHint: "Faites défiler la frise et cliquez sur une étape pour voir les détails",
      kind: {
        milestone: "Étape",
        exchange: "Échange universitaire",
        internship: "Stage",
        degree: "Diplôme",
      },
    },
    passions: {
      kicker: "Passions",
      title: "Ce que j'aime <italic>en dehors du code.</italic>",
    },
    projects: {
      kicker: "Projets perso",
      title: "Trois apps, <italic>scannables.</italic>",
      intro:
        "Trois apps Android que je construis sur mon temps libre. Scannez le QR code pour installer directement, ou cliquez pour les détails.",
      viewMore: "Voir le projet",
      downloadHint: "Scanner pour installer",
      downloadApk: "Télécharger l'APK",
      viewSource: "Code source",
      scanQr: "Scanner pour télécharger",
      androidNote:
        "Android uniquement. Activez « sources inconnues » lors de l'installation.",
      stack: "Stack",
      features: "Fonctionnalités",
      back: "Retour à l'accueil",
    },
    contactSection: {
      kicker: "Contact",
      title: "Construisons<br /> <italic>quelque chose ensemble.</italic>",
      body: "Je suis ouvert à discuter d'un nouveau poste, d'une mission, ou simplement d'un café (vrai ou virtuel) si vous travaillez sur des choses intéressantes.",
    },
    footer: {
      signature: "— Mathieu, à Barcelone.",
      rights: "© 2026 Mathieu Diep. Tous droits réservés.",
    },
    notFound: {
      title: "Page introuvable",
      subtitle: "Cette page n'existe pas. Peut-être un mauvais lien, ou peut-être que je l'ai déplacée ?",
      back: "← Retour à l'accueil",
    },
    contact: {
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      location: "Localisation",
    },
    ui: {
      photo: "photo",
      photoPlaceholder: "photo à venir",
    },
  },

  en: {
    meta: {
      siteTitle: "Mathieu Diep — AI Engineer",
      siteDescription:
        "Portfolio of Mathieu Diep, LLM/RAG AI Engineer based in Barcelona. Career, principles, and 3 Android apps downloadable by QR code.",
    },
    nav: {
      home: "Home",
      projects: "Projects",
      contact: "Contact",
      language: "Language",
      downloadCv: "Download CV",
    },
    language: {
      fr: "French",
      en: "English",
      es: "Spanish",
      fr_short: "FR",
      en_short: "EN",
      es_short: "ES",
    },
    hero: {
      kicker: "About me",
      title: "Hi, I'm <italic>Mathieu.</italic>",
    },
    bio: {
      intro:
        "AI Engineer based in Barcelona, building LLM/RAG systems that real people use, every day.",
      paragraphs: [
        "I currently lead generative-AI work at Hexamind — among other things, a chatbot serving 90,000+ users in production, built around RAG architectures and OpenAI under the hood.",
        "My focus is the seam between research-grade AI and apps you can hand to a friend. I write a lot of Python, ship Flutter mobile apps on the side, and obsess over making technical things feel calm and a little playful.",
      ],
    },
    timeline: {
      title: "A few stops <italic>along the way.</italic>",
      note: "5 roles · 6 years in applied AI",
      expandHint: "Click an experience to see the details",
      stackLabel: "Stack",
      expand: "See details",
      collapse: "Collapse",
    },
    education: {
      kicker: "Education",
      title: "6 years, from high school <italic>to a double degree.</italic>",
      expandHint: "Scroll the timeline and click a step to see the details",
      kind: {
        milestone: "Milestone",
        exchange: "Academic exchange",
        internship: "Internship",
        degree: "Degree",
      },
    },
    passions: {
      kicker: "Passions",
      title: "What I love <italic>outside the code.</italic>",
    },
    projects: {
      kicker: "Side projects",
      title: "Three apps, <italic>scannable.</italic>",
      intro:
        "Three Android apps I build on my own time. Scan the QR code to install directly, or click through for details.",
      viewMore: "View project",
      downloadHint: "Scan to install",
      downloadApk: "Download APK",
      viewSource: "Source code",
      scanQr: "Scan to download",
      androidNote: "Android only. Allow “unknown sources” during install.",
      stack: "Stack",
      features: "Features",
      back: "Back to home",
    },
    contactSection: {
      kicker: "Get in touch",
      title: "Let's build<br /> <italic>something together.</italic>",
      body: "I'm open to talking about new roles, a mission, or just a coffee (real or virtual) if you're working on something interesting.",
    },
    footer: {
      signature: "— Mathieu, in Barcelona.",
      rights: "© 2026 Mathieu Diep. All rights reserved.",
    },
    notFound: {
      title: "Page not found",
      subtitle: "This page doesn't exist. Maybe a stale link, or maybe I moved it?",
      back: "← Back home",
    },
    contact: {
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      location: "Location",
    },
    ui: {
      photo: "photo",
      photoPlaceholder: "photo coming soon",
    },
  },

  es: {
    meta: {
      siteTitle: "Mathieu Diep — AI Engineer",
      siteDescription:
        "Portfolio de Mathieu Diep, AI Engineer LLM/RAG basado en Barcelona. Trayectoria, principios, y 3 apps Android descargables por QR.",
    },
    nav: {
      home: "Inicio",
      projects: "Proyectos",
      contact: "Contacto",
      language: "Idioma",
      downloadCv: "Descargar CV",
    },
    language: {
      fr: "Francés",
      en: "Inglés",
      es: "Español",
      fr_short: "FR",
      en_short: "EN",
      es_short: "ES",
    },
    hero: {
      kicker: "Sobre mí",
      title: "Hola, soy <italic>Mathieu.</italic>",
    },
    bio: {
      intro:
        "AI Engineer basado en Barcelona, construyendo sistemas LLM/RAG que personas reales usan, cada día.",
      paragraphs: [
        "Actualmente lidero el trabajo de IA generativa en Hexamind — entre otras cosas, un chatbot que sirve a más de 90 000 usuarios en producción, construido sobre arquitecturas RAG y OpenAI.",
        "Mi obsesión es la costura entre la IA de investigación y las apps que se le pueden pasar a un amigo. Escribo mucho Python, lanzo apps móviles en Flutter en paralelo, y trabajo en hacer que las cosas técnicas se sientan calmadas y un poco juguetonas.",
      ],
    },
    timeline: {
      title: "Algunas paradas <italic>en el camino.</italic>",
      note: "5 puestos · 6 años de IA aplicada",
      expandHint: "Haz clic en una experiencia para ver los detalles",
      stackLabel: "Stack",
      expand: "Ver detalles",
      collapse: "Plegar",
    },
    education: {
      kicker: "Formación",
      title: "6 años, del bachillerato <italic>al doble título.</italic>",
      expandHint: "Desplaza la línea y haz clic en una etapa para ver los detalles",
      kind: {
        milestone: "Hito",
        exchange: "Intercambio universitario",
        internship: "Prácticas",
        degree: "Título",
      },
    },
    passions: {
      kicker: "Pasiones",
      title: "Lo que me gusta <italic>fuera del código.</italic>",
    },
    projects: {
      kicker: "Proyectos personales",
      title: "Tres apps, <italic>escaneables.</italic>",
      intro:
        "Tres apps Android que construyo en mi tiempo libre. Escanea el QR para instalar directamente, o haz clic para los detalles.",
      viewMore: "Ver el proyecto",
      downloadHint: "Escanear para instalar",
      downloadApk: "Descargar APK",
      viewSource: "Código fuente",
      scanQr: "Escanear para descargar",
      androidNote: "Solo Android. Activa «fuentes desconocidas» al instalar.",
      stack: "Stack",
      features: "Funciones",
      back: "Volver al inicio",
    },
    contactSection: {
      kicker: "Contacto",
      title: "Construyamos<br /> <italic>algo juntos.</italic>",
      body: "Estoy abierto a hablar de un nuevo puesto, una misión, o simplemente un café (real o virtual) si trabajas en algo interesante.",
    },
    footer: {
      signature: "— Mathieu, en Barcelona.",
      rights: "© 2026 Mathieu Diep. Todos los derechos reservados.",
    },
    notFound: {
      title: "Página no encontrada",
      subtitle: "Esta página no existe. ¿Quizás un enlace antiguo, o quizás la he movido?",
      back: "← Volver al inicio",
    },
    contact: {
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      location: "Ubicación",
    },
    ui: {
      photo: "foto",
      photoPlaceholder: "foto próximamente",
    },
  },
};

/* ════════════════════════════════════════════════════════════════════════════
 * 4. 💼  EXPERIENCES  (timeline professionnelle)
 * ════════════════════════════════════════════════════════════════════════════ */

const tr = <T extends Translated>(v: T): T => v;

export const experiences: Experience[] = [
  {
    id: "hexamind",
    role: tr({
      fr: "AI Engineer — Generative AI",
      en: "AI Engineer — Generative AI",
      es: "AI Engineer — Generative AI",
    }),
    company: "Hexamind",
    location: tr({ fr: "Paris", en: "Paris", es: "París" }),
    period: tr({
      fr: "Janvier 2024 — présent",
      en: "January 2024 — present",
      es: "Enero 2024 — presente",
    }),
    description: tr({
      fr: "Conception et déploiement d'un chatbot LLM/RAG en production servant 90 000+ utilisateurs.",
      en: "Designed and shipped an LLM/RAG chatbot in production, serving 90,000+ users.",
      es: "Diseño y despliegue de un chatbot LLM/RAG en producción para más de 90 000 usuarios.",
    }),
    bullets: [
      tr({
        fr: "Développement de systèmes IA multi-agents : architectures à plusieurs agents collaborant pour résoudre des tâches complexes",
        en: "Multi-agent AI systems development: architectures where several agents collaborate to solve complex tasks",
        es: "Desarrollo de sistemas IA multi-agente: arquitecturas con varios agentes colaborando para resolver tareas complejas",
      }),
      tr({
        fr: "Adoption de Claude Code (Anthropic) au quotidien pour accélérer la livraison (review, génération de tests, refactor, agents custom)",
        en: "Daily use of Claude Code (Anthropic) to speed up delivery (review, test generation, refactor, custom agents)",
        es: "Uso diario de Claude Code (Anthropic) para acelerar la entrega (review, generación de tests, refactor, agentes personalizados)",
      }),
      tr({
        fr: "Architectures RAG (Retrieval-Augmented Generation) pour améliorer la précision des réponses du chatbot",
        en: "RAG (Retrieval-Augmented Generation) architectures to improve chatbot response accuracy",
        es: "Arquitecturas RAG (Retrieval-Augmented Generation) para mejorar la precisión del chatbot",
      }),
      tr({
        fr: "Optimisation de LLM (OpenAI) avec LangChain et bases vectorielles pour des cas d'usage entreprise",
        en: "LLM optimization (OpenAI) with LangChain and vector databases for enterprise use cases",
        es: "Optimización de LLM (OpenAI) con LangChain y bases vectoriales para casos de uso empresarial",
      }),
      tr({
        fr: "Déploiement de pipelines ML en production dans un environnement startup en forte croissance",
        en: "Deployment of ML pipelines in production in a fast-growing startup environment",
        es: "Despliegue de pipelines ML en producción en un entorno startup en rápido crecimiento",
      }),
      tr({
        fr: "Suite d'évaluation continue pour mesurer les performances du bot en production",
        en: "Continuous evaluation suite to assess bot performance in production",
        es: "Suite de evaluación continua para medir el rendimiento del bot en producción",
      }),
    ],
    stack: [
      "LLM",
      "RAG",
      "Multi-agent",
      "Claude Code",
      "Python",
      "LangChain",
      "OpenAI",
      "Vector DB",
      "MLOps",
    ],
    illustration: "chatbot",
  },
  {
    id: "lincoln",
    role: tr({
      fr: "Data Scientist / AI Engineer",
      en: "Data Scientist / AI Engineer",
      es: "Data Scientist / AI Engineer",
    }),
    company: "Lincoln",
    location: tr({ fr: "Paris", en: "Paris", es: "París" }),
    period: tr({
      fr: "Octobre 2021 — Mars 2023 · 18 mois",
      en: "October 2021 — March 2023 · 18 months",
      es: "Octubre 2021 — Marzo 2023 · 18 meses",
    }),
    description: tr({
      fr: "Mission de 18 mois sur le chatbot Orange (1M+ requêtes/mois) en équipe Agile/Scrum, déclinée en 4 sous-missions.",
      en: "18-month mission on the Orange chatbot (1M+ queries/month) in an Agile/Scrum team, split into 4 sub-missions.",
      es: "Misión de 18 meses sobre el chatbot Orange (más de 1M de consultas/mes) en equipo Agile/Scrum, dividida en 4 submisiones.",
    }),
    bullets: [
      tr({
        fr: "6 mois — ORANGE RASA Chatbot : développement, optimisation et maintenance (équipe Agile/Scrum)",
        en: "6 months — ORANGE RASA chatbot: development, optimization and maintenance (Agile/Scrum team)",
        es: "6 meses — Chatbot ORANGE RASA: desarrollo, optimización y mantenimiento (equipo Agile/Scrum)",
      }),
      tr({
        fr: "5 mois — Réseau de neurones custom from scratch sur la base de données : +20% de performance vs solution linguiste",
        en: "5 months — Custom neural network from scratch on the dataset: +20% performance vs linguist-based solution",
        es: "5 meses — Red neuronal personalizada desde cero sobre la base de datos: +20% de rendimiento frente a la solución lingüista",
      }),
      tr({
        fr: "2 mois — Transformation du chatbot en voicebot (Microsoft STT/TTS APIs, style Siri)",
        en: "2 months — Chatbot to voicebot transformation (Microsoft STT/TTS APIs, Siri-like)",
        es: "2 meses — Transformación del chatbot en voicebot (Microsoft STT/TTS APIs, estilo Siri)",
      }),
      tr({
        fr: "1 mois — Export d'un modèle Computer Vision dans un site web avec interface Angular",
        en: "1 month — Export of a Computer Vision model into a website with Angular interface",
        es: "1 mes — Exportación de un modelo de Computer Vision a un sitio web con interfaz Angular",
      }),
      tr({
        fr: "Behind the Mask : reconstruction faciale par computer vision (UI React, période COVID)",
        en: "Behind the Mask: facial reconstruction via computer vision (React UI, COVID period)",
        es: "Behind the Mask: reconstrucción facial por computer vision (UI React, período COVID)",
      }),
    ],
    stack: ["RASA", "Python", "NLP", "Computer Vision", "Angular", "React", "Voicebot", "Agile"],
    illustration: "rasa",
  },
  {
    id: "capgemini",
    role: tr({
      fr: "Stage — Data / Blockchain",
      en: "Internship — Data / Blockchain",
      es: "Prácticas — Data / Blockchain",
    }),
    company: "Capgemini",
    location: tr({ fr: "Toulouse", en: "Toulouse", es: "Toulouse" }),
    period: tr({
      fr: "Décembre 2020 — Mai 2021 · 6 mois",
      en: "December 2020 — May 2021 · 6 months",
      es: "Diciembre 2020 — Mayo 2021 · 6 meses",
    }),
    description: tr({
      fr: "Stage de fin d'études : évaluation et optimisation des performances d'un réseau blockchain.",
      en: "End-of-studies internship: evaluation and optimization of a blockchain network's performance.",
      es: "Prácticas de fin de estudios: evaluación y optimización del rendimiento de una red blockchain.",
    }),
    bullets: [
      tr({
        fr: "Évaluation de la performance du réseau (latence, throughput, scalabilité)",
        en: "Network performance evaluation (latency, throughput, scalability)",
        es: "Evaluación del rendimiento de la red (latencia, throughput, escalabilidad)",
      }),
      tr({
        fr: "Modélisation statistique et reporting des goulots d'étranglement identifiés",
        en: "Statistical modeling and reporting of identified bottlenecks",
        es: "Modelado estadístico y reporting de los cuellos de botella identificados",
      }),
    ],
    stack: ["Python", "Data Analysis", "Statistics", "Blockchain"],
    illustration: "blockchain",
  },
  {
    id: "aubay",
    role: tr({
      fr: "Stage — Recherche IA",
      en: "Internship — AI Research",
      es: "Prácticas — Investigación IA",
    }),
    company: "Aubay",
    location: tr({ fr: "Paris", en: "Paris", es: "París" }),
    period: tr({
      fr: "Février 2019 — Juillet 2019 · 6 mois",
      en: "February 2019 — July 2019 · 6 months",
      es: "Febrero 2019 — Julio 2019 · 6 meses",
    }),
    description: tr({
      fr: "Stage de recherche en IA : exploration de la composition musicale assistée par ordinateur.",
      en: "Research internship in AI: exploring computer-assisted musical composition.",
      es: "Prácticas de investigación en IA: exploración de la composición musical asistida por ordenador.",
    }),
    bullets: [
      tr({
        fr: "Recherche sur les architectures de réseaux de neurones appliquées à la génération de musique",
        en: "Research on neural network architectures applied to music generation",
        es: "Investigación sobre arquitecturas de redes neuronales aplicadas a la generación de música",
      }),
      tr({
        fr: "Implémentation et entraînement de modèles deep learning sur des séquences MIDI",
        en: "Implementation and training of deep learning models on MIDI sequences",
        es: "Implementación y entrenamiento de modelos de deep learning sobre secuencias MIDI",
      }),
    ],
    stack: ["Deep Learning", "PyTorch", "Neural Networks", "Research"],
    illustration: "music",
  },
  {
    id: "orange-labs",
    role: tr({
      fr: "Stage — Développement",
      en: "Internship — Software development",
      es: "Prácticas — Desarrollo",
    }),
    company: "Orange Labs",
    location: tr({ fr: "Caen", en: "Caen", es: "Caen" }),
    period: tr({
      fr: "Janvier 2018 — Juin 2018 · 6 mois",
      en: "January 2018 — June 2018 · 6 months",
      es: "Enero 2018 — Junio 2018 · 6 meses",
    }),
    description: tr({
      fr: "Premier stage en R&D : développement d'une application logicielle de santé avec interface de visualisation.",
      en: "First R&D internship: development of a health software application with a visualization interface.",
      es: "Primeras prácticas en I+D: desarrollo de una aplicación de salud con interfaz de visualización.",
    }),
    bullets: [
      tr({
        fr: "Développement de l'application : back-end de traitement et front-end de visualisation",
        en: "App development: processing back-end and visualization front-end",
        es: "Desarrollo de la aplicación: back-end de procesamiento y front-end de visualización",
      }),
      tr({
        fr: "Première expérience en R&D dans un grand groupe télécom (Orange)",
        en: "First R&D experience in a large telecom group (Orange)",
        es: "Primera experiencia en I+D en un gran grupo de telecomunicaciones (Orange)",
      }),
    ],
    stack: ["Software Development", "Visualization"],
    illustration: "health",
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 * 5. 🎓  EDUCATION  (timeline formation)
 * ────────────────────────────────────────────────────────────────────────────
 * Chaque entrée peut référencer une photo via `photoSrc` (voir section 1).
 * ════════════════════════════════════════════════════════════════════════════ */

export const education: Education[] = [
  {
    id: "bac",
    year: 2015,
    kind: "milestone",
    title: tr({
      fr: "Baccalauréat S — mention Bien",
      en: "French baccalaureate (S) — with honours",
      es: "Bachillerato S — con mención",
    }),
    school: tr({ fr: "Lycée", en: "High school", es: "Instituto" }),
    location: tr({ fr: "France", en: "France", es: "Francia" }),
    period: tr({ fr: "2015 · mention Bien", en: "2015 · with honours", es: "2015 · con mención" }),
    summary: tr({
      fr: "Bac S, spécialité Mathématiques + SI, mention Bien.",
      en: "Scientific track, Maths + Engineering Sciences major, honours.",
      es: "Bachillerato científico, Matemáticas + Ciencias de la Ingeniería, con mención.",
    }),
    description: tr({
      fr: "Baccalauréat scientifique avec spécialité Mathématiques et Sciences de l'Ingénieur (SI), obtenu mention Bien. C'est là que la combinaison maths + résolution de problèmes concrets a déclenché l'envie de continuer en école d'ingénieur.",
      en: "Scientific baccalaureate with a Mathematics + Engineering Sciences (SI) major, earned with honours. The mix of maths and concrete problem-solving is what made me want to continue toward an engineering school.",
      es: "Bachillerato científico con especialidad en Matemáticas y Ciencias de la Ingeniería (SI), obtenido con mención. La combinación de matemáticas y resolución de problemas concretos fue lo que me motivó a continuar en una escuela de ingeniería.",
    }),
    photoSrc: photos.education.bac || undefined,
  },
  {
    id: "utt-start",
    year: 2015,
    kind: "milestone",
    title: tr({
      fr: "Entrée à l'UTT",
      en: "Joining UTT",
      es: "Ingreso en la UTT",
    }),
    school: tr({
      fr: "UTT — Université de Technologie de Troyes",
      en: "UTT — Troyes University of Technology",
      es: "UTT — Universidad Tecnológica de Troyes",
    }),
    location: tr({ fr: "Troyes, France", en: "Troyes, France", es: "Troyes, Francia" }),
    period: tr({
      fr: "Septembre 2015 · début prépa intégrée",
      en: "September 2015 · start of integrated prep",
      es: "Septiembre 2015 · inicio del ciclo preparatorio",
    }),
    summary: tr({
      fr: "Premier jour du cursus ingénieur — début de la prépa intégrée (2 ans).",
      en: "First day of the engineering programme — start of the 2-year integrated prep.",
      es: "Primer día del programa de ingeniería — inicio del ciclo preparatorio (2 años).",
    }),
    description: tr({
      fr: "Première rentrée à l'UTT, début de la prépa intégrée (TC1 + TC2). 2 ans de tronc commun en sciences de l'ingénieur : maths, physique, informatique, mécanique, électronique, gestion de projet. Une base solide avant de choisir une branche en 3ème année.",
      en: "First day at UTT, start of the integrated preparatory cycle (TC1 + TC2). 2 years of common engineering core: maths, physics, computer science, mechanics, electronics, project management. A solid foundation before choosing a major in year 3.",
      es: "Primer día en la UTT, inicio del ciclo preparatorio integrado (TC1 + TC2). 2 años de tronco común en ciencias de la ingeniería: matemáticas, física, informática, mecánica, electrónica, gestión de proyectos. Una base sólida antes de elegir una rama en el 3er año.",
    }),
    photoSrc: photos.education.uttStart || undefined,
  },
  {
    id: "internship-orange-labs",
    year: 2018.4,
    kind: "internship",
    title: tr({
      fr: "Stage R&D — Orange Labs",
      en: "R&D internship — Orange Labs",
      es: "Prácticas I+D — Orange Labs",
    }),
    school: tr({ fr: "Orange Labs", en: "Orange Labs", es: "Orange Labs" }),
    location: tr({ fr: "Caen, France", en: "Caen, France", es: "Caen, Francia" }),
    period: tr({
      fr: "Janvier — Juin 2018 · 6 mois",
      en: "January — June 2018 · 6 months",
      es: "Enero — Junio 2018 · 6 meses",
    }),
    summary: tr({
      fr: "Premier stage R&D dans un grand groupe télécom.",
      en: "First R&D internship in a large telecom group.",
      es: "Primeras prácticas de I+D en un gran grupo telecom.",
    }),
    description: tr({
      fr: "Premier stage en R&D au sein d'Orange Labs : développement d'une application logicielle de santé avec interface de visualisation. Back-end de traitement et front-end de visualisation. Première expérience concrète en grand groupe.",
      en: "First R&D internship at Orange Labs: development of a health software application with a visualization interface. Both processing back-end and visualization front-end. First hands-on experience in a large company.",
      es: "Primeras prácticas de I+D en Orange Labs: desarrollo de una aplicación de salud con interfaz de visualización. Back-end de procesamiento y front-end de visualización. Primera experiencia práctica en un gran grupo.",
    }),
    photoSrc: photos.education.internshipOrangeLabs || undefined,
  },
  {
    id: "exchange-canada",
    year: 2018.85,
    kind: "exchange",
    title: tr({
      fr: "Échange universitaire — Canada",
      en: "Academic exchange — Canada",
      es: "Intercambio universitario — Canadá",
    }),
    school: tr({
      fr: "Université canadienne · échange UTT",
      en: "Canadian university · UTT exchange",
      es: "Universidad canadiense · intercambio UTT",
    }),
    location: tr({ fr: "Canada", en: "Canada", es: "Canadá" }),
    period: tr({
      fr: "1 semestre · 2018",
      en: "1 semester · 2018",
      es: "1 semestre · 2018",
    }),
    summary: tr({
      fr: "Un semestre en immersion académique nord-américaine.",
      en: "One semester immersed in the North American academic system.",
      es: "Un semestre en inmersión académica norteamericana.",
    }),
    description: tr({
      fr: "Échange universitaire classique d'un semestre. J'y ai approfondi mes compétences techniques (IA, dev) tout en découvrant un nouvel environnement académique, une autre méthode de travail et la culture nord-américaine. Beaucoup de travail en équipe, projets pratiques, rythme intense.",
      en: "Classic one-semester academic exchange. I deepened my technical skills (AI, dev) while discovering a new academic environment, a different way of working, and the North American culture. Lots of teamwork, practical projects, intense rhythm.",
      es: "Intercambio universitario clásico de un semestre. Profundicé mis competencias técnicas (IA, desarrollo) mientras descubría un nuevo entorno académico, otra forma de trabajar y la cultura norteamericana. Mucho trabajo en equipo, proyectos prácticos, ritmo intenso.",
    }),
    flag: "🇨🇦",
    photoSrc: photos.education.exchangeCanada || undefined,
  },
  {
    id: "internship-aubay",
    year: 2019.4,
    kind: "internship",
    title: tr({
      fr: "Stage Recherche IA — Aubay",
      en: "AI Research internship — Aubay",
      es: "Prácticas Investigación IA — Aubay",
    }),
    school: tr({ fr: "Aubay", en: "Aubay", es: "Aubay" }),
    location: tr({ fr: "Paris, France", en: "Paris, France", es: "París, Francia" }),
    period: tr({
      fr: "Février — Juillet 2019 · 6 mois",
      en: "February — July 2019 · 6 months",
      es: "Febrero — Julio 2019 · 6 meses",
    }),
    summary: tr({
      fr: "Stage de recherche IA appliquée à la composition musicale.",
      en: "AI research internship on computer-assisted music composition.",
      es: "Prácticas de investigación IA aplicada a la composición musical.",
    }),
    description: tr({
      fr: "Stage de recherche en IA explorant la composition musicale assistée par ordinateur. Recherche sur les architectures de réseaux de neurones appliquées à la génération de musique, implémentation et entraînement de modèles deep learning sur des séquences MIDI. Premier vrai contact avec la recherche appliquée.",
      en: "Research internship in AI exploring computer-assisted music composition. Research on neural network architectures applied to music generation, implementation and training of deep learning models on MIDI sequences. First real contact with applied research.",
      es: "Prácticas de investigación en IA explorando la composición musical asistida por ordenador. Investigación sobre arquitecturas de redes neuronales aplicadas a la generación de música, implementación y entrenamiento de modelos de deep learning sobre secuencias MIDI. Primer contacto real con la investigación aplicada.",
    }),
    photoSrc: photos.education.internshipAubay || undefined,
  },
  {
    id: "utt-prepa-end",
    year: 2017,
    kind: "milestone",
    title: tr({
      fr: "Fin de prépa intégrée",
      en: "End of integrated prep cycle",
      es: "Fin del ciclo preparatorio",
    }),
    school: tr({
      fr: "UTT — Université de Technologie de Troyes",
      en: "UTT — Troyes University of Technology",
      es: "UTT — Universidad Tecnológica de Troyes",
    }),
    location: tr({ fr: "Troyes, France", en: "Troyes, France", es: "Troyes, Francia" }),
    period: tr({
      fr: "Janvier 2017 · entrée en branche ISI",
      en: "January 2017 · joining the ISI branch",
      es: "Enero 2017 · entrada en la rama ISI",
    }),
    summary: tr({
      fr: "Validation TC1+TC2 → branche Informatique & SI, spécialisation IA.",
      en: "TC1+TC2 validated → joined the Computer Science & IS branch, AI specialization.",
      es: "TC1+TC2 validados → entrada en la rama Informática & SI, especialización IA.",
    }),
    description: tr({
      fr: "Validation des 2 ans de tronc commun (le semestre en Chine ayant clôturé la prépa intégrée). Choix de la branche : Informatique et Systèmes d'Information (ISI) avec spécialisation IA. Place à plusieurs années de spécialité jusqu'au diplôme d'ingénieur.",
      en: "Validation of the 2-year common core (the semester in China being the closing semester of the integrated prep). Branch choice: Computer Science & Information Systems (ISI) with an AI specialization. Several years of focused study ahead before the engineering degree.",
      es: "Validación de los 2 años de tronco común (el semestre en China cerró el ciclo preparatorio). Elección de rama: Informática & Sistemas de Información (ISI) con especialización en IA. Varios años de especialidad por delante hasta el título de ingeniero.",
    }),
    photoSrc: photos.education.uttPrepaEnd || undefined,
  },
  {
    id: "exchange-china",
    year: 2016.5,
    kind: "exchange",
    title: tr({
      fr: "Échange universitaire — Chine",
      en: "Academic exchange — China",
      es: "Intercambio universitario — China",
    }),
    school: tr({
      fr: "Université chinoise · échange UTT",
      en: "Chinese university · UTT exchange",
      es: "Universidad china · intercambio UTT",
    }),
    location: tr({ fr: "Chine", en: "China", es: "China" }),
    period: tr({
      fr: "1 semestre · 2016-2017",
      en: "1 semester · 2016-2017",
      es: "1 semestre · 2016-2017",
    }),
    summary: tr({
      fr: "Semestre business multiculturel en Asie — clôture de la prépa intégrée.",
      en: "Multicultural business semester in Asia — closing semester of the integrated prep.",
      es: "Semestre de negocios multiculturales en Asia — cierre del ciclo preparatorio.",
    }),
    description: tr({
      fr: "Semestre de fin de prépa intégrée, orienté business multiculturel : stratégie internationale, négociation interculturelle, immersion dans l'écosystème tech asiatique. Une perspective complètement différente sur le travail en équipe et la culture d'entreprise. Voyages dans les pays voisins en parallèle.",
      en: "Closing semester of the integrated prep, focused on multicultural business: international strategy, cross-cultural negotiation, immersion in the Asian tech ecosystem. A completely different perspective on teamwork and corporate culture. Trips to neighbouring countries on the side.",
      es: "Semestre final del ciclo preparatorio, orientado a negocios multiculturales: estrategia internacional, negociación intercultural, inmersión en el ecosistema tech asiático. Una perspectiva completamente distinta sobre el trabajo en equipo y la cultura de empresa. Viajes a países vecinos en paralelo.",
    }),
    flag: "🇨🇳",
    photoSrc: photos.education.exchangeChina || undefined,
  },
  {
    id: "engineering-utt",
    year: 2020,
    kind: "degree",
    title: tr({
      fr: "Diplôme d'ingénieur — Informatique & SI",
      en: "Engineering Degree — Computer Science & IS",
      es: "Título de Ingeniero — Informática & SI",
    }),
    school: tr({
      fr: "UTT — Université de Technologie de Troyes",
      en: "UTT — Troyes University of Technology",
      es: "UTT — Universidad Tecnológica de Troyes",
    }),
    location: tr({ fr: "Troyes, France", en: "Troyes, France", es: "Troyes, Francia" }),
    period: tr({ fr: "Juin 2020 · 5 ans", en: "June 2020 · 5 years", es: "Junio 2020 · 5 años" }),
    summary: tr({
      fr: "Diplôme d'ingénieur en poche, spécialisation IA.",
      en: "Engineering degree obtained, AI specialization.",
      es: "Título de ingeniero obtenido, especialización en IA.",
    }),
    description: tr({
      fr: "Cursus complet d'ingénieur sur 5 ans avec spécialisation en Intelligence Artificielle. Stages, projets longs, deux semestres à l'étranger (Canada + Chine). Diplôme reconnu par la CTI.",
      en: "Full 5-year engineering programme with a specialization in Artificial Intelligence. Internships, long-form projects, two semesters abroad (Canada + China). CTI-accredited diploma.",
      es: "Programa completo de 5 años de ingeniería con especialización en Inteligencia Artificial. Prácticas, proyectos largos, dos semestres en el extranjero (Canadá + China). Diploma acreditado por la CTI.",
    }),
    photoSrc: photos.education.engineeringUtt || undefined,
  },
  {
    id: "internship-capgemini",
    year: 2020.85,
    kind: "internship",
    title: tr({
      fr: "Stage Data / Blockchain — Capgemini",
      en: "Data / Blockchain internship — Capgemini",
      es: "Prácticas Data / Blockchain — Capgemini",
    }),
    school: tr({ fr: "Capgemini", en: "Capgemini", es: "Capgemini" }),
    location: tr({ fr: "Toulouse, France", en: "Toulouse, France", es: "Toulouse, Francia" }),
    period: tr({
      fr: "Décembre 2020 — Mai 2021 · 6 mois",
      en: "December 2020 — May 2021 · 6 months",
      es: "Diciembre 2020 — Mayo 2021 · 6 meses",
    }),
    summary: tr({
      fr: "Stage de fin d'études : performance et optimisation blockchain.",
      en: "End-of-studies internship: blockchain performance and optimisation.",
      es: "Prácticas de fin de estudios: rendimiento y optimización blockchain.",
    }),
    description: tr({
      fr: "Stage de fin d'études (Master 2) : évaluation et optimisation des performances d'un réseau blockchain. Mesures de latence, throughput et scalabilité, modélisation statistique et reporting des goulots d'étranglement. Une mission concrète qui clôt 6 ans de cursus.",
      en: "End-of-studies internship (Master 2): evaluation and optimization of a blockchain network's performance. Latency, throughput and scalability measurements, statistical modeling and bottleneck reporting. A concrete mission to close 6 years of studies.",
      es: "Prácticas de fin de estudios (Máster 2): evaluación y optimización del rendimiento de una red blockchain. Mediciones de latencia, throughput y escalabilidad, modelado estadístico y reporting de cuellos de botella. Una misión concreta para cerrar 6 años de estudios.",
    }),
    photoSrc: photos.education.internshipCapgemini || undefined,
  },
  {
    id: "master-cybersecurity",
    year: 2021,
    kind: "degree",
    title: tr({
      fr: "Master de Cybersécurité",
      en: "Master's degree in Cybersecurity",
      es: "Máster en Ciberseguridad",
    }),
    school: tr({
      fr: "UTT — Université de Technologie de Troyes",
      en: "UTT — Troyes University of Technology",
      es: "UTT — Universidad Tecnológica de Troyes",
    }),
    location: tr({ fr: "Troyes, France", en: "Troyes, France", es: "Troyes, Francia" }),
    period: tr({
      fr: "2020 — 2021 · double diplôme",
      en: "2020 — 2021 · double degree",
      es: "2020 — 2021 · doble titulación",
    }),
    summary: tr({
      fr: "Double diplôme cybersécurité — fin du parcours académique.",
      en: "Cybersecurity double degree — end of the academic journey.",
      es: "Doble titulación en ciberseguridad — fin del recorrido académico.",
    }),
    description: tr({
      fr: "Master de Cybersécurité (double diplôme) : cryptographie, primitives et protocoles cryptographiques, sécurité des réseaux, audit, gouvernance, gestion des risques. Six ans après le bac, fin du parcours étudiant — direction la vie pro.",
      en: "Master's degree in Cybersecurity (double degree): cryptography, cryptographic primitives and protocols, network security, audit, governance, risk management. Six years after the baccalaureate, the student journey ends — heading into the professional world.",
      es: "Máster en Ciberseguridad (doble titulación): criptografía, primitivas y protocolos criptográficos, seguridad de redes, auditoría, gobernanza, gestión de riesgos. Seis años después del bachillerato, fin del recorrido estudiantil — rumbo al mundo profesional.",
    }),
    photoSrc: photos.education.masterCybersecurity || undefined,
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 * 6. 📱  PROJECTS  (apps Android présentées avec QR code)
 * ════════════════════════════════════════════════════════════════════════════ */

export const projects: Project[] = [
  {
    id: "volley-meteo",
    name: "Volley Météo",
    emoji: "🏐",
    tagline: tr({
      fr: "La météo idéale pour jouer au volley",
      en: "Perfect weather for beach volley",
      es: "El tiempo ideal para jugar al voley",
    }),
    description: tr({
      fr: "App qui croise prévisions météo horaires et conditions idéales pour jouer au beach-volley à Barcelone. Affiche les meilleures fenêtres de la journée pour aller jouer.",
      en: "App that combines hourly weather forecasts with ideal conditions for beach volleyball in Barcelona. Shows you the best windows of the day to play.",
      es: "App que cruza previsiones meteorológicas horarias y condiciones ideales para jugar al voley playa en Barcelona. Muestra las mejores franjas del día para jugar.",
    }),
    features: [
      tr({
        fr: "Météo horaire détaillée par jour",
        en: "Hourly weather forecast per day",
        es: "Previsión horaria detallada por día",
      }),
      tr({
        fr: "Score d'aptitude au jeu calculé en temps réel",
        en: "Playability score computed in real time",
        es: "Puntuación de jugabilidad en tiempo real",
      }),
      tr({
        fr: "Vue détaillée par jour avec historique",
        en: "Detailed day view with history",
        es: "Vista detallada por día con historial",
      }),
    ],
    stack: ["Flutter", "Dart", "REST API"],
    apkUrl: "/apks/volley_meteo.apk",
    githubUrl: "https://github.com/Mappiou/volley_meteo",
    accent: "blue",
    screenshots: photos.projects.volleyMeteo,
  },
  {
    id: "scan2pdf",
    name: "Scan2PDF",
    emoji: "📄",
    tagline: tr({
      fr: "Scanner ses documents en PDF, simplement",
      en: "Scan documents to PDF, simply",
      es: "Escanea documentos a PDF, simple",
    }),
    description: tr({
      fr: "Scanner multi-pages avec détection automatique des bords. Convertit instantanément en PDF partageable via AirDrop, mail ou message.",
      en: "Multi-page scanner with automatic edge detection. Instantly creates a PDF you can share via AirDrop, email or message.",
      es: "Escáner multipágina con detección automática de bordes. Crea al instante un PDF compartible por AirDrop, mail o mensaje.",
    }),
    features: [
      tr({
        fr: "Scan multi-pages (jusqu'à 10 pages)",
        en: "Multi-page scan (up to 10 pages)",
        es: "Escaneo multipágina (hasta 10 páginas)",
      }),
      tr({
        fr: "Aperçu PDF avant export",
        en: "PDF preview before export",
        es: "Vista previa del PDF antes de exportar",
      }),
      tr({
        fr: "Partage natif (AirDrop, mail, messages)",
        en: "Native sharing (AirDrop, mail, messages)",
        es: "Compartir nativo (AirDrop, mail, mensajes)",
      }),
    ],
    stack: ["Flutter", "Dart", "Document Scanner", "PDF"],
    apkUrl: "/apks/scan2pdf.apk",
    githubUrl: "https://github.com/Mappiou/scan2pdf",
    accent: "red",
    screenshots: photos.projects.scan2pdf,
  },
  {
    id: "triolinguo",
    name: "Triolinguo",
    emoji: "🌍",
    tagline: tr({
      fr: "Maîtriser la conjugaison espagnole en s'amusant",
      en: "Master Spanish conjugation, the fun way",
      es: "Domina la conjugación española jugando",
    }),
    description: tr({
      fr: "Quiz interactif de conjugaison espagnole avec retour audio (sons correct/erreur). Apprends à ton rythme, verbe par verbe.",
      en: "Interactive Spanish conjugation quiz with audio feedback (correct/wrong sounds). Learn at your own pace, verb by verb.",
      es: "Quiz interactivo de conjugación española con retorno de audio. Aprende a tu ritmo, verbo a verbo.",
    }),
    features: [
      tr({
        fr: "Quiz à choix multiples sur les conjugaisons",
        en: "Multiple-choice quiz on conjugations",
        es: "Quiz de opción múltiple sobre conjugaciones",
      }),
      tr({
        fr: "Retour audio (correct / erreur)",
        en: "Audio feedback (correct / wrong)",
        es: "Retorno de audio (correcto / error)",
      }),
      tr({
        fr: "Base de verbes irréguliers et réguliers",
        en: "Database of regular and irregular verbs",
        es: "Base de verbos regulares e irregulares",
      }),
    ],
    stack: ["Flutter", "Dart", "Audio"],
    apkUrl: "/apks/triolinguo.apk",
    githubUrl: "https://github.com/Mappiou/Triolinguo",
    accent: "green",
    screenshots: photos.projects.triolinguo,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

/* ════════════════════════════════════════════════════════════════════════════
 * 7. 🛠️  SKILLS  (catégories de compétences)
 * ════════════════════════════════════════════════════════════════════════════ */

export const skills: Skill[] = [
  {
    category: tr({ fr: "IA & ML", en: "AI & ML", es: "IA y ML" }),
    items: [
      "LLM",
      "RAG",
      "Generative AI",
      "Prompt Engineering",
      "Fine-tuning",
      "NLP",
      "NLU",
      "Computer Vision",
      "GANs",
      "Machine Learning",
      "Deep Learning",
    ],
  },
  {
    category: tr({ fr: "Data Science", en: "Data Science", es: "Data Science" }),
    items: [
      "Statistics",
      "Data Analysis",
      "Data Visualization",
      "Predictive Modeling",
      "Feature Engineering",
      "Model Evaluation",
    ],
  },
  {
    category: tr({
      fr: "Programmation",
      en: "Programming",
      es: "Programación",
    }),
    items: ["Python", "SQL", "Pandas", "NumPy", "SciPy"],
  },
  {
    category: tr({ fr: "Outils", en: "Tools", es: "Herramientas" }),
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Docker",
      "CI/CD",
      "LangChain",
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Hugging Face",
      "FastAPI",
      "Flask",
      "React",
    ],
  },
  {
    category: tr({
      fr: "Méthodologies",
      en: "Methodologies",
      es: "Metodologías",
    }),
    items: ["Agile", "Scrum", "MLOps", "Data Pipeline", "Model Deployment"],
  },
  {
    category: tr({ fr: "Langues", en: "Languages", es: "Idiomas" }),
    items: ["🇫🇷 Français — natif", "🇬🇧 English — professional", "🇪🇸 Español — A2"],
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 * 8. ❤️  PASSIONS  (sport / tech / voyages)
 * ────────────────────────────────────────────────────────────────────────────
 * Chaque item peut référencer une photo via `photoSrc` (voir section 1).
 * ════════════════════════════════════════════════════════════════════════════ */

export const passions: Passion[] = [
  {
    id: "sport",
    icon: "sport",
    title: tr({ fr: "Sport", en: "Sport", es: "Deporte" }),
    description: tr({
      fr: "Quand je ne suis pas devant un écran, je suis en train de courir après une balle, de glisser sur la glace ou de monter en montagne. Disciplines variées, rythmes différents.",
      en: "When I'm not at a screen, I'm chasing a ball, gliding on ice, or climbing in the mountains. Different disciplines, different rhythms.",
      es: "Cuando no estoy frente a una pantalla, persigo una pelota, me deslizo sobre el hielo o subo a la montaña. Disciplinas variadas, ritmos diferentes.",
    }),
    items: [
      {
        id: "badminton",
        label: tr({ fr: "Badminton", en: "Badminton", es: "Bádminton" }),
        photoSrc: photos.passions.sport.badminton || undefined,
      },
      {
        id: "beach-volley",
        label: tr({
          fr: "Beach volley",
          en: "Beach volley",
          es: "Vóley playa",
        }),
        photoSrc: photos.passions.sport.beachVolley || undefined,
      },
      {
        id: "skating",
        label: tr({
          fr: "Patin à glace",
          en: "Ice skating",
          es: "Patinaje sobre hielo",
        }),
        photoSrc: photos.passions.sport.iceSkating || undefined,
      },
      {
        id: "trekking",
        label: tr({
          fr: "Trekking en autonomie",
          en: "Self-supported trekking",
          es: "Trekking en autonomía",
        }),
        photoSrc: photos.passions.sport.trekking || undefined,
      },
    ],
  },
  {
    id: "tech",
    icon: "tech",
    title: tr({
      fr: "Nouvelles technologies",
      en: "New technologies",
      es: "Nuevas tecnologías",
    }),
    description: tr({
      fr: "Passion réelle pour la tech en général. Je fais de la veille continue sur tout ce qui sort — nouveaux modèles d'IA, frameworks, outils, gadgets, papers de recherche. Curieux par défaut, je passe du temps à comprendre comment ça marche sous le capot et à tester par moi-même avant de me faire un avis. Ce qui me motive : ne jamais cesser d'apprendre.",
      en: "Genuine passion for tech in general. I run continuous tech-watch on everything new — AI models, frameworks, tools, gadgets, research papers. Curious by default, I spend time understanding how things work under the hood and testing them myself before forming an opinion. What drives me: never stop learning.",
      es: "Auténtica pasión por la tech en general. Hago vigilancia continua de todas las novedades — modelos de IA, frameworks, herramientas, gadgets, papers de investigación. Curioso por defecto, dedico tiempo a entender cómo funciona por dentro y a probarlo antes de formarme una opinión. Lo que me motiva: no dejar nunca de aprender.",
    }),
    items: [],
  },
  {
    id: "travel",
    icon: "travel",
    title: tr({ fr: "Voyages", en: "Travel", es: "Viajes" }),
    description: tr({
      fr: "Un an de road-trip aux États-Unis et en Amérique du Sud. L'Asie via mes 2 semestres d'études (Chine + pays voisins). Et beaucoup d'Europe entre deux missions. Voyager me garde curieux et ouvert.",
      en: "A year-long road trip across the US and South America. Asia via my 2 study-abroad semesters (China + neighbouring trips). And a lot of Europe between missions. Travel keeps me curious and open.",
      es: "Un año de road trip por EE.UU. y Sudamérica. Asia gracias a mis 2 semestres en el extranjero (China + países vecinos). Y mucha Europa entre dos misiones. Viajar me mantiene curioso y abierto.",
    }),
    items: [
      {
        id: "usa",
        label: tr({ fr: "États-Unis", en: "USA", es: "EE.UU." }),
        flag: "🇺🇸",
        photoSrc: photos.passions.travel.usa1 || undefined,
      },
      {
        id: "south-america",
        label: tr({
          fr: "Amérique du Sud",
          en: "South America",
          es: "Sudamérica",
        }),
        flag: "🌎",
        photoSrc: photos.passions.travel.southAmerica1 || undefined,
      },
      {
        id: "asia",
        label: tr({ fr: "Asie", en: "Asia", es: "Asia" }),
        flag: "🌏",
        photoSrc: photos.passions.travel.asia1 || undefined,
      },
      {
        id: "europe",
        label: tr({ fr: "Europe", en: "Europe", es: "Europa" }),
        flag: "🇪🇺",
        photoSrc: photos.passions.travel.europe1 || undefined,
      },
    ],
  },
];
