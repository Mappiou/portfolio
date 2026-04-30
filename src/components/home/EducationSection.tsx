import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { education } from "../../data/education";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { sketchbook } from "../../styles/sketchbook";
import { DiplomaIllustration, WorldIllustration } from "../illustrations/Illustrations";

const illustrationMap = {
  diploma: DiplomaIllustration,
  world: WorldIllustration,
  scroll: DiplomaIllustration,
} as const;

export function EducationSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

  return (
    <section
      id="education"
      className="max-w-4xl mx-auto px-6 pt-8 pb-16"
      aria-labelledby="edu-heading"
    >
      <p style={{ fontFamily: "Caveat, cursive" }} className="text-2xl mb-1 opacity-70">
        {t("sections.page")} 03 ·
      </p>
      <h2 id="edu-heading" className="text-4xl md:text-5xl font-medium tracking-tight mb-10">
        {t("sections.education")}
      </h2>
      <div className="space-y-5">
        {education.map((edu, i) => {
          const Illustration = illustrationMap[edu.illustration];
          return (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="grid md:grid-cols-[80px_1fr] gap-5 items-start py-6 border-b"
              style={{ borderColor: `${sketchbook.ink}33` }}
            >
              <Illustration size={64} />
              <div>
                <span style={{ fontFamily: "Caveat, cursive" }} className="text-xl opacity-70">
                  {edu.period[lang]}
                </span>
                <h3 className="text-xl font-medium mt-1">{edu.degree[lang]}</h3>
                <p className="italic opacity-80 mt-1">{edu.school}</p>
                <p className="text-sm opacity-70 mt-2">{edu.detail[lang]}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
