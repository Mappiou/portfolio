import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sketchbook, accentMap } from "../../styles/sketchbook";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { QRCode } from "./QRCode";
import type { Project } from "../../data/types";

type Props = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: Props) {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const accent = accentMap[project.accent];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.1 }}
      className="grid md:grid-cols-[80px_1fr_auto] gap-5 items-start py-6 border-b"
      style={{ borderColor: `${sketchbook.ink}33` }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2"
        style={{ borderColor: sketchbook.ink, background: `${accent}33` }}
        aria-hidden="true"
      >
        {project.emoji}
      </div>
      <div className="min-w-0">
        <Link
          to={`/${lang}/projects/${project.id}`}
          className="group inline-block"
          aria-label={`${project.name} — ${project.tagline[lang]}`}
        >
          <h3 className="text-2xl font-medium mb-1 group-hover:underline">{project.name}</h3>
        </Link>
        <p className="text-base mb-2 italic opacity-80">{project.tagline[lang]}</p>
        <p className="text-sm opacity-70 leading-relaxed">{project.description[lang]}</p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {project.stack.map((s) => (
            <span key={s} style={{ fontFamily: "Caveat, cursive" }} className="text-base">
              <span style={{ color: accent }}>#</span>
              {s.toLowerCase()}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-4">
          <Link
            to={`/${lang}/projects/${project.id}`}
            className="text-base font-medium border-b-2 hover:opacity-70 transition"
            style={{
              borderColor: sketchbook.ink,
              fontFamily: "Caveat, cursive",
              fontSize: "1.3rem",
            }}
          >
            {t("projects.seeProject")}
          </Link>
        </div>
      </div>
      <div className="text-center">
        <QRCode value={project.apkUrl} size={96} ariaLabel={`QR ${project.name}`} />
        <p style={{ fontFamily: "Caveat, cursive" }} className="text-base mt-1 opacity-70">
          {t("projects.downloadHint")}
        </p>
      </div>
    </motion.div>
  );
}
