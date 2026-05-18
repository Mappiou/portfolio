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
    location: { fr: "Paris", en: "Paris", es: "París" },
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
        fr: "Développement de systèmes IA multi-agents : architectures à plusieurs agents collaborant pour résoudre des tâches complexes",
        en: "Multi-agent AI systems development: architectures where several agents collaborate to solve complex tasks",
        es: "Desarrollo de sistemas IA multi-agente: arquitecturas con varios agentes colaborando para resolver tareas complejas",
      },
      {
        fr: "Adoption de Claude Code (Anthropic) au quotidien pour accélérer la livraison (review, génération de tests, refactor, agents custom)",
        en: "Daily use of Claude Code (Anthropic) to speed up delivery (review, test generation, refactor, custom agents)",
        es: "Uso diario de Claude Code (Anthropic) para acelerar la entrega (review, generación de tests, refactor, agentes personalizados)",
      },
      {
        fr: "Architectures RAG (Retrieval-Augmented Generation) pour améliorer la précision des réponses du chatbot",
        en: "RAG (Retrieval-Augmented Generation) architectures to improve chatbot response accuracy",
        es: "Arquitecturas RAG (Retrieval-Augmented Generation) para mejorar la precisión del chatbot",
      },
      {
        fr: "Optimisation de LLM (OpenAI) avec LangChain et bases vectorielles pour des cas d'usage entreprise",
        en: "LLM optimization (OpenAI) with LangChain and vector databases for enterprise use cases",
        es: "Optimización de LLM (OpenAI) con LangChain y bases vectoriales para casos de uso empresarial",
      },
      {
        fr: "Déploiement de pipelines ML en production dans un environnement startup en forte croissance",
        en: "Deployment of ML pipelines in production in a fast-growing startup environment",
        es: "Despliegue de pipelines ML en producción en un entorno startup en rápido crecimiento",
      },
      {
        fr: "Suite d'évaluation continue pour mesurer les performances du bot en production",
        en: "Continuous evaluation suite to assess bot performance in production",
        es: "Suite de evaluación continua para medir el rendimiento del bot en producción",
      },
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
    role: {
      fr: "Data Scientist / AI Engineer",
      en: "Data Scientist / AI Engineer",
      es: "Data Scientist / AI Engineer",
    },
    company: "Lincoln",
    location: { fr: "Paris", en: "Paris", es: "París" },
    period: {
      fr: "Octobre 2021 — Mars 2023 · 18 mois",
      en: "October 2021 — March 2023 · 18 months",
      es: "Octubre 2021 — Marzo 2023 · 18 meses",
    },
    description: {
      fr: "Mission de 18 mois sur le chatbot Orange (1M+ requêtes/mois) en équipe Agile/Scrum, déclinée en 4 sous-missions.",
      en: "18-month mission on the Orange chatbot (1M+ queries/month) in an Agile/Scrum team, split into 4 sub-missions.",
      es: "Misión de 18 meses sobre el chatbot Orange (más de 1M de consultas/mes) en equipo Agile/Scrum, dividida en 4 submisiones.",
    },
    bullets: [
      {
        fr: "6 mois — ORANGE RASA Chatbot : développement, optimisation et maintenance (équipe Agile/Scrum)",
        en: "6 months — ORANGE RASA chatbot: development, optimization and maintenance (Agile/Scrum team)",
        es: "6 meses — Chatbot ORANGE RASA: desarrollo, optimización y mantenimiento (equipo Agile/Scrum)",
      },
      {
        fr: "5 mois — Réseau de neurones custom from scratch sur la base de données : +20% de performance vs solution linguiste",
        en: "5 months — Custom neural network from scratch on the dataset: +20% performance vs linguist-based solution",
        es: "5 meses — Red neuronal personalizada desde cero sobre la base de datos: +20% de rendimiento frente a la solución lingüista",
      },
      {
        fr: "2 mois — Transformation du chatbot en voicebot (Microsoft STT/TTS APIs, style Siri)",
        en: "2 months — Chatbot to voicebot transformation (Microsoft STT/TTS APIs, Siri-like)",
        es: "2 meses — Transformación del chatbot en voicebot (Microsoft STT/TTS APIs, estilo Siri)",
      },
      {
        fr: "1 mois — Export d'un modèle Computer Vision dans un site web avec interface Angular",
        en: "1 month — Export of a Computer Vision model into a website with Angular interface",
        es: "1 mes — Exportación de un modelo de Computer Vision a un sitio web con interfaz Angular",
      },
      {
        fr: "Behind the Mask : reconstruction faciale par computer vision (UI React, période COVID)",
        en: "Behind the Mask: facial reconstruction via computer vision (React UI, COVID period)",
        es: "Behind the Mask: reconstrucción facial por computer vision (UI React, período COVID)",
      },
    ],
    stack: ["RASA", "Python", "NLP", "Computer Vision", "Angular", "React", "Voicebot", "Agile"],
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
    location: { fr: "Toulouse", en: "Toulouse", es: "Toulouse" },
    period: {
      fr: "Décembre 2020 — Mai 2021 · 6 mois",
      en: "December 2020 — May 2021 · 6 months",
      es: "Diciembre 2020 — Mayo 2021 · 6 meses",
    },
    description: {
      fr: "Stage de fin d'études : évaluation et optimisation des performances d'un réseau blockchain.",
      en: "End-of-studies internship: evaluation and optimization of a blockchain network's performance.",
      es: "Prácticas de fin de estudios: evaluación y optimización del rendimiento de una red blockchain.",
    },
    bullets: [
      {
        fr: "Évaluation de la performance du réseau (latence, throughput, scalabilité)",
        en: "Network performance evaluation (latency, throughput, scalability)",
        es: "Evaluación del rendimiento de la red (latencia, throughput, escalabilidad)",
      },
      {
        fr: "Modélisation statistique et reporting des goulots d'étranglement identifiés",
        en: "Statistical modeling and reporting of identified bottlenecks",
        es: "Modelado estadístico y reporting de los cuellos de botella identificados",
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
    location: { fr: "Paris", en: "Paris", es: "París" },
    period: {
      fr: "Février 2019 — Juillet 2019 · 6 mois",
      en: "February 2019 — July 2019 · 6 months",
      es: "Febrero 2019 — Julio 2019 · 6 meses",
    },
    description: {
      fr: "Stage de recherche en IA : exploration de la composition musicale assistée par ordinateur.",
      en: "Research internship in AI: exploring computer-assisted musical composition.",
      es: "Prácticas de investigación en IA: exploración de la composición musical asistida por ordenador.",
    },
    bullets: [
      {
        fr: "Recherche sur les architectures de réseaux de neurones appliquées à la génération de musique",
        en: "Research on neural network architectures applied to music generation",
        es: "Investigación sobre arquitecturas de redes neuronales aplicadas a la generación de música",
      },
      {
        fr: "Implémentation et entraînement de modèles deep learning sur des séquences MIDI",
        en: "Implementation and training of deep learning models on MIDI sequences",
        es: "Implementación y entrenamiento de modelos de deep learning sobre secuencias MIDI",
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
    location: { fr: "Caen", en: "Caen", es: "Caen" },
    period: {
      fr: "Janvier 2018 — Juin 2018 · 6 mois",
      en: "January 2018 — June 2018 · 6 months",
      es: "Enero 2018 — Junio 2018 · 6 meses",
    },
    description: {
      fr: "Premier stage en R&D : développement d'une application logicielle de santé avec interface de visualisation.",
      en: "First R&D internship: development of a health software application with a visualization interface.",
      es: "Primeras prácticas en I+D: desarrollo de una aplicación de salud con interfaz de visualización.",
    },
    bullets: [
      {
        fr: "Développement de l'application : back-end de traitement et front-end de visualisation",
        en: "App development: processing back-end and visualization front-end",
        es: "Desarrollo de la aplicación: back-end de procesamiento y front-end de visualización",
      },
      {
        fr: "Première expérience en R&D dans un grand groupe télécom (Orange)",
        en: "First R&D experience in a large telecom group (Orange)",
        es: "Primera experiencia en I+D en un gran grupo de telecomunicaciones (Orange)",
      },
    ],
    stack: ["Software Development", "Visualization"],
    illustration: "health",
  },
];
