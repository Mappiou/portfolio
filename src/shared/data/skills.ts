import type { Skill } from "@shared/types";

export const skills: Skill[] = [
  {
    category: { fr: "IA & ML", en: "AI & ML", es: "IA y ML" },
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
    category: { fr: "Data Science", en: "Data Science", es: "Data Science" },
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
    category: {
      fr: "Programmation",
      en: "Programming",
      es: "Programación",
    },
    items: ["Python", "SQL", "Pandas", "NumPy", "SciPy"],
  },
  {
    category: { fr: "Outils", en: "Tools", es: "Herramientas" },
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
    category: {
      fr: "Méthodologies",
      en: "Methodologies",
      es: "Metodologías",
    },
    items: ["Agile", "Scrum", "MLOps", "Data Pipeline", "Model Deployment"],
  },
  {
    category: { fr: "Langues", en: "Languages", es: "Idiomas" },
    items: ["🇫🇷 Français — natif", "🇬🇧 English — professional", "🇪🇸 Español — A2"],
  },
];
