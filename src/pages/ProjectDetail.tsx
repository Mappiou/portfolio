import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLanguageRoute } from "../hooks/useLanguageRoute";
import { getProjectById } from "../data/projects";
import { sketchbook, accentMap } from "../styles/sketchbook";
import { QRCode } from "../components/projects/QRCode";
import { DownloadButton } from "../components/projects/DownloadButton";
import { SEO } from "../components/seo/SEO";

export default function ProjectDetail() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project) return <Navigate to={`/${lang}`} replace />;
  const accent = accentMap[project.accent];

  return (
    <>
      <SEO
        title={`${project.name} — ${project.tagline[lang]} · Mathieu Diep`}
        description={project.description[lang]}
      />
      <article className="max-w-4xl mx-auto px-6 pt-6 pb-16">
        <Link
          to={`/${lang}`}
          className="text-base inline-flex items-center gap-1 hover:underline"
          style={{ fontFamily: "Caveat, cursive", fontSize: "1.4rem" }}
        >
          {t("projects.back")}
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 grid md:grid-cols-[100px_1fr] gap-6 items-start"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-5xl border-2"
            style={{ borderColor: sketchbook.ink, background: `${accent}33` }}
            aria-hidden="true"
          >
            {project.emoji}
          </div>
          <div>
            <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-2">{project.name}</h1>
            <p style={{ fontFamily: "Caveat, cursive", color: accent }} className="text-3xl">
              {project.tagline[lang]}
            </p>
          </div>
        </motion.header>

        <section className="mt-10 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-lg leading-relaxed italic opacity-90">{project.description[lang]}</p>

            <h2 className="mt-8 text-2xl font-medium">{t("projects.features")}</h2>
            <ul className="mt-3 space-y-2 list-none">
              {project.features.map((f, i) => (
                <li key={i} className="flex gap-3 leading-relaxed">
                  <span style={{ color: accent }}>✎</span>
                  <span>{f[lang]}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-2xl font-medium">{t("projects.stack")}</h2>
            <div className="flex gap-2 mt-3 flex-wrap">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="text-sm px-3 py-1 border"
                  style={{
                    borderColor: `${sketchbook.ink}55`,
                    borderRadius: "999px",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <aside
            className="border-2 p-6 text-center"
            style={{
              borderColor: sketchbook.ink,
              background: `${sketchbook.paperDark}88`,
              borderRadius: "16px 4px 16px 4px",
            }}
            aria-label={t("projects.scanQr")}
          >
            <p style={{ fontFamily: "Caveat, cursive" }} className="text-2xl mb-3">
              {t("projects.scanQr")}
            </p>
            <div className="flex justify-center mb-4">
              <QRCode value={project.apkUrl} size={200} ariaLabel={`QR ${project.name}`} />
            </div>
            <p className="text-sm opacity-70 mb-5 leading-relaxed">{t("projects.androidNote")}</p>
            <div className="flex flex-col gap-3 items-center">
              <DownloadButton href={project.apkUrl} filename={`${project.id}.apk`} />
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm underline opacity-70 hover:opacity-100"
              >
                {t("projects.viewSource")} ↗
              </a>
            </div>
          </aside>
        </section>
      </article>
    </>
  );
}
