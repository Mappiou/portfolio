import type { Translated } from "./types";

export type Principle = {
  n: string;
  title: Translated;
  desc: Translated;
};

export const principles: Principle[] = [
  {
    n: "01",
    title: {
      fr: "Livrer le chatbot, pas la démo.",
      en: "Ship the chatbot, not the demo.",
      es: "Entregar el chatbot, no la demo.",
    },
    desc: {
      fr: "Les vrais utilisateurs cassent des choses qu'aucun dataset de recherche n'avait imaginées. Mettre en place de l'eval, instrumenter la latence, et faire confiance aux logs prod plus qu'au F1 offline.",
      en: "Real users break things research datasets never thought of. Build evals, instrument latency, and trust the production logs over the offline F1 score.",
      es: "Los usuarios reales rompen cosas que ningún dataset de investigación había imaginado. Construir evals, instrumentar latencia, y confiar en los logs de producción más que en el F1 offline.",
    },
  },
  {
    n: "02",
    title: {
      fr: "Le calme bat l'astuce.",
      en: "Calm beats clever.",
      es: "La calma vence al ingenio.",
    },
    desc: {
      fr: "Une UI bien rythmée, une phrase qui touche, un bouton qui fait exactement une chose — ça compte plus que n'importe quel choix de framework.",
      en: "A well-paced UI, a sentence that lands, a button that does exactly one thing — these matter more than any framework choice.",
      es: "Una UI bien ritmada, una frase que da en el clavo, un botón que hace exactamente una cosa — eso importa más que cualquier elección de framework.",
    },
  },
  {
    n: "03",
    title: {
      fr: "Les apps mobiles enseignent l'humilité.",
      en: "Mobile apps teach humility.",
      es: "Las apps móviles enseñan humildad.",
    },
    desc: {
      fr: "Les projets Flutter perso me gardent proche de l'utilisateur. Si je ne peux pas faire comprendre l'app à ma mère en 30 secondes, le design n'est pas fini.",
      en: "Flutter side-projects keep me close to the user. If I can't make my mum understand it in 30 seconds, the design isn't done.",
      es: "Los side-projects en Flutter me mantienen cerca del usuario. Si no puedo hacer que mi madre lo entienda en 30 segundos, el diseño no está terminado.",
    },
  },
  {
    n: "04",
    title: {
      fr: "Deux semestres à l'étranger m'ont reconnecté.",
      en: "Two semesters abroad rewired me.",
      es: "Dos semestres en el extranjero me reconfiguraron.",
    },
    desc: {
      fr: "Étudier au Canada et en Chine pendant mon diplôme d'ingénieur m'a montré qu'une grande culture d'ingénierie peut prendre des formes très différentes selon les endroits.",
      en: "Studying in Canada and China during my engineering degree showed me that great engineering culture wears very different clothes in different places.",
      es: "Estudiar en Canadá y China durante mi ingeniería me mostró que una gran cultura de ingeniería puede tomar formas muy distintas en diferentes lugares.",
    },
  },
];
