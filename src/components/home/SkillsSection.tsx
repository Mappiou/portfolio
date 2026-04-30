import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { skills } from "../../data/skills";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { sketchbook } from "../../styles/sketchbook";

export function SkillsSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

  return (
    <section
      id="skills"
      className="max-w-4xl mx-auto px-6 pt-8 pb-16"
      aria-labelledby="skills-heading"
    >
      <p style={{ fontFamily: "Caveat, cursive" }} className="text-2xl mb-1 opacity-70">
        {t("sections.page")} 04 ·
      </p>
      <h2 id="skills-heading" className="text-4xl md:text-5xl font-medium tracking-tight mb-10">
        {t("sections.skills")}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {skills.map((cat, i) => (
          <motion.div
            key={cat.category[lang]}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="border-2 p-5"
            style={{
              borderColor: sketchbook.ink,
              background: `${sketchbook.paperDark}66`,
              borderRadius: "16px 4px 16px 4px",
            }}
          >
            <h3
              style={{ fontFamily: "Caveat, cursive", color: sketchbook.red }}
              className="text-2xl mb-3"
            >
              {cat.category[lang]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="text-sm px-3 py-1 border"
                  style={{
                    borderColor: `${sketchbook.ink}55`,
                    borderRadius: "999px",
                    fontFamily: "Lora, serif",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
