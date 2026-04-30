import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { sketchbook } from "../../styles/sketchbook";
import { PortraitIllustration } from "../illustrations/Illustrations";
import { profile } from "../../data/profile";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="max-w-4xl mx-auto px-6 pt-12 pb-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        <p
          className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full mb-3"
          style={{
            background: `${sketchbook.green}22`,
            color: sketchbook.green,
            fontFamily: "Caveat, cursive",
            fontSize: "1.2rem",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: sketchbook.green, boxShadow: `0 0 8px ${sketchbook.green}` }}
          />
          {t("home.available")}
        </p>
        <p style={{ fontFamily: "Caveat, cursive" }} className="text-3xl mb-2">
          {t("home.intro")}
        </p>
        <h1 className="text-5xl md:text-7xl font-medium leading-tight tracking-tight mb-6">
          {t("home.heroLine1")} <br />
          <span
            style={{ color: sketchbook.red, fontFamily: "Caveat, cursive" }}
            className="text-7xl md:text-9xl block leading-none mt-2"
          >
            {t("home.heroLine2")}
          </span>
          {t("home.heroLine3")}
        </h1>

        <div className="flex flex-col md:flex-row gap-8 mt-10 max-w-3xl items-start md:items-center">
          <div className="flex-1 text-lg leading-relaxed" style={{ fontStyle: "italic" }}>
            <p>{t("home.bio")}</p>
            <p className="mt-3 text-base opacity-70" style={{ fontStyle: "normal" }}>
              📍 {profile.location}
            </p>
          </div>
          <div className="shrink-0">
            <PortraitIllustration size={180} />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-10 items-center">
          <a
            href="#projects"
            className="text-lg font-medium border-b-2 hover:opacity-70 transition"
            style={{
              borderColor: sketchbook.ink,
              fontFamily: "Caveat, cursive",
              fontSize: "1.6rem",
            }}
          >
            {t("home.ctaProjects")}
          </a>
          <span style={{ fontFamily: "Caveat, cursive" }} className="text-2xl opacity-50">
            {t("home.ctaConjunction")}
          </span>
          <a href={`mailto:${profile.email}`} className="text-lg italic hover:underline">
            {t("home.ctaContact")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
