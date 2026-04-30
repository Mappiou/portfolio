import type { Experience } from "./types";

export const experiences: Experience[] = [
  {
    id: "hexamind",
    role: {
      fr: "AI Engineer — Generative AI",
      en: "AI Engineer — Generative AI",
      es: "AI Engineer — Generative AI",
    },
    company: "Hexamind",
    location: "Paris",
    period: {
      fr: "Janvier 2024 — présent",
      en: "January 2024 — present",
      es: "Enero 2024 — presente",
    },
    description: {
      fr: "Conception et déploiement d'un chatbot LLM/RAG en production servant 90 000+ utilisateurs.",
      en: "Designed and shipped an LLM/RAG chatbot in production, serving 90,000+ users.",
      es: "Diseño y despliegue de un chatbot LLM/RAG en producción para más de 90 000 usuarios.",
    },
    bullets: [
      {
        fr: "Architectures RAG (Retrieval-Augmented Generation) pour améliorer la précision des réponses",
        en: "RAG (Retrieval-Augmented Generation) architectures to improve response accuracy",
        es: "Arquitecturas RAG (Retrieval-Augmented Generation) para mejorar la precisión",
      },
      {
        fr: "Intégration de LLM (OpenAI) avec LangChain et bases vectorielles",
        en: "LLM (OpenAI) integration with LangChain and vector databases",
        es: "Integración de LLM (OpenAI) con LangChain y bases vectoriales",
      },
      {
        fr: "Suite de tests pour évaluer en continu les performances du bot",
        en: "Continuous evaluation suite to assess bot performance",
        es: "Suite de evaluación continua para medir el rendimiento del bot",
      },
    ],
    stack: ["LLM", "RAG", "Python", "LangChain", "OpenAI", "Vector DB"],
    illustration: "chatbot",
  },
  {
    id: "lincoln",
    role: {
      fr: "AI Engineer",
      en: "AI Engineer",
      es: "AI Engineer",
    },
    company: "Lincoln",
    location: "Paris",
    period: {
      fr: "Octobre 2021 — Mars 2023",
      en: "October 2021 — March 2023",
      es: "Octubre 2021 — Marzo 2023",
    },
    description: {
      fr: "Optimisation du chatbot Orange RASA traitant 1M+ requêtes/mois.",
      en: "Optimization of the Orange RASA chatbot handling 1M+ queries per month.",
      es: "Optimización del chatbot Orange RASA con más de 1M de consultas mensuales.",
    },
    bullets: [
      {
        fr: "Fine-tuning et augmentation de dataset (+3% F1 score)",
        en: "Model fine-tuning and dataset augmentation (+3% F1 score)",
        es: "Fine-tuning y aumento de dataset (+3% F1 score)",
      },
      {
        fr: "PoC VoiceBot avec Microsoft STT/TTS (style Siri)",
        en: "VoiceBot PoC with Microsoft STT/TTS (Siri-like)",
        es: "PoC VoiceBot con Microsoft STT/TTS (tipo Siri)",
      },
      {
        fr: "Behind the Mask : modèle Computer Vision pour reconstruction faciale (interface React)",
        en: "Behind the Mask: Computer Vision model for facial reconstruction (React UI)",
        es: "Behind the Mask: modelo de Computer Vision para reconstrucción facial (UI React)",
      },
      {
        fr: "Réseau de neurones custom : +20% de performance vs solution linguiste",
        en: "Custom neural network: +20% performance vs linguist-based solution",
        es: "Red neuronal personalizada: +20% de rendimiento frente a solución lingüista",
      },
    ],
    stack: ["RASA", "Python", "NLP", "Computer Vision", "React", "A/B Testing"],
    illustration: "rasa",
  },
  {
    id: "capgemini",
    role: {
      fr: "Stage — Data / Blockchain",
      en: "Internship — Data / Blockchain",
      es: "Prácticas — Data / Blockchain",
    },
    company: "Capgemini",
    location: "Toulouse",
    period: {
      fr: "Décembre 2020 — Mai 2021",
      en: "December 2020 — May 2021",
      es: "Diciembre 2020 — Mayo 2021",
    },
    description: {
      fr: "Analyse de données et optimisation des performances d'un réseau blockchain.",
      en: "Data analysis and performance optimization of a blockchain network.",
      es: "Análisis de datos y optimización del rendimiento de una red blockchain.",
    },
    bullets: [
      {
        fr: "Modélisation statistique et reporting",
        en: "Statistical modeling and reporting",
        es: "Modelado estadístico e informes",
      },
    ],
    stack: ["Python", "Data Analysis", "Statistics", "Blockchain"],
    illustration: "blockchain",
  },
  {
    id: "aubay",
    role: {
      fr: "Stage — Recherche IA",
      en: "Internship — AI Research",
      es: "Prácticas — Investigación IA",
    },
    company: "Aubay",
    location: "Paris",
    period: {
      fr: "Février 2019 — Juillet 2019",
      en: "February 2019 — July 2019",
      es: "Febrero 2019 — Julio 2019",
    },
    description: {
      fr: "Intelligence artificielle pour la composition musicale assistée par ordinateur.",
      en: "Artificial intelligence for computer-assisted musical composition.",
      es: "Inteligencia artificial para la composición musical asistida por ordenador.",
    },
    bullets: [
      {
        fr: "Recherche sur les architectures de réseaux de neurones et deep learning",
        en: "Research on neural networks and deep learning architectures",
        es: "Investigación sobre redes neuronales y arquitecturas de deep learning",
      },
    ],
    stack: ["Deep Learning", "PyTorch", "Neural Networks", "Research"],
    illustration: "music",
  },
  {
    id: "orange-labs",
    role: {
      fr: "Stage — Développement",
      en: "Internship — Software development",
      es: "Prácticas — Desarrollo",
    },
    company: "Orange Labs",
    location: "Caen",
    period: {
      fr: "Janvier 2018 — Juin 2018",
      en: "January 2018 — June 2018",
      es: "Enero 2018 — Junio 2018",
    },
    description: {
      fr: "Développement d'une application logicielle de santé — interface de visualisation.",
      en: "Health software application development — visualization interface.",
      es: "Desarrollo de una aplicación de salud — interfaz de visualización.",
    },
    bullets: [],
    stack: ["Software Development", "Visualization"],
    illustration: "health",
  },
];
