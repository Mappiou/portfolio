import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { experiences } from "../../data/experiences";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { sketchbook } from "../../styles/sketchbook";
import {
  ChatbotIllustration,
  RasaIllustration,
  BlockchainIllustration,
  MusicIllustration,
  HealthIllustration,
} from "../illustrations/Illustrations";
import type { Experience } from "../../data/types";

const illustrationMap = {
  chatbot: ChatbotIllustration,
  rasa: RasaIllustration,
  blockchain: BlockchainIllustration,
  music: MusicIllustration,
  health: HealthIllustration,
} as const;

export function ExperienceSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

  return (
    <section
      id="experiences"
      className="max-w-4xl mx-auto px-6 pt-8 pb-16"
      aria-labelledby="exp-heading"
    >
      <p style={{ fontFamily: "Caveat, cursive" }} className="text-2xl mb-1 opacity-70">
        {t("sections.page")} 02 ·
      </p>
      <h2 id="exp-heading" className="text-4xl md:text-5xl font-medium tracking-tight mb-10">
        {t("sections.experiences")}
      </h2>
      <div className="relative pl-8 border-l-2" style={{ borderColor: sketchbook.ink }}>
        {experiences.map((exp, i) => (
          <ExperienceItem key={exp.id} exp={exp} index={i} lang={lang} />
        ))}
      </div>
    </section>
  );
}

function ExperienceItem({
  exp,
  index,
  lang,
}: {
  exp: Experience;
  index: number;
  lang: "fr" | "en" | "es";
}) {
  const Illustration = illustrationMap[exp.illustration];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08 }}
      className="relative mb-10"
    >
      <div
        className="absolute -left-[42px] w-5 h-5 rounded-full border-2"
        style={{ borderColor: sketchbook.red, background: sketchbook.paper }}
      />
      <div className="grid md:grid-cols-[80px_1fr] gap-5">
        <div className="shrink-0">
          <Illustration size={64} />
        </div>
        <div>
          <span style={{ fontFamily: "Caveat, cursive" }} className="text-xl opacity-70 block">
            {exp.period[lang]} · {exp.location}
          </span>
          <h3 className="text-xl md:text-2xl font-medium mt-1">
            {exp.role[lang]}
            <span className="opacity-60 font-normal"> — {exp.company}</span>
          </h3>
          <p className="italic opacity-90 mt-2">{exp.description[lang]}</p>
          {exp.bullets.length > 0 && (
            <ul className="mt-3 space-y-1.5 list-none">
              {exp.bullets.map((b, k) => (
                <li key={k} className="flex gap-2 text-sm leading-relaxed">
                  <span style={{ color: sketchbook.red }}>✎</span>
                  <span className="opacity-85">{b[lang]}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            {exp.stack.map((s) => (
              <span key={s} style={{ fontFamily: "Caveat, cursive" }} className="text-base">
                <span style={{ color: sketchbook.red }}>#</span>
                {s.toLowerCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
