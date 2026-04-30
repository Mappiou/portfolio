import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { projects } from "../../data/projects";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { QRCode } from "../projects/QRCode";

const cardBg: Record<string, string> = {
  red: palette.rust,
  green: palette.mint,
  blue: palette.babyblue,
  yellow: palette.yellow,
};

export function ProjectsSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

  return (
    <section
      id="projects"
      className="relative z-10 mx-auto px-6 pb-24"
      style={{ maxWidth: tokens.pageMaxWidth }}
      aria-labelledby="projects-heading"
    >
      <div className="text-center mb-12">
        <p
          className="inline-block px-4 py-1.5 rounded-full mb-4"
          style={{
            background: "rgba(255,255,255,0.55)",
            color: palette.textSecondary,
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          ✦ {t("projects.kicker")}
        </p>
        <h2
          id="projects-heading"
          style={{
            fontFamily: tokens.fontTitle,
            fontWeight: 600,
            fontSize: "clamp(36px, 4.5vw, 64px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: palette.textPrimary,
          }}
        >
          <Trans
            i18nKey="projects.title"
            components={{
              italic: (
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontFamily: tokens.fontItalic,
                  }}
                />
              ),
            }}
          />
        </h2>
        <p
          className="mt-4 mx-auto"
          style={{
            fontSize: 17,
            lineHeight: 1.65,
            color: palette.textSecondary,
            maxWidth: 540,
          }}
        >
          {t("projects.intro")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {projects.map((project) => {
          const bg = cardBg[project.accent] ?? palette.mint;
          return (
            <Link
              key={project.id}
              to={`/${lang}/projects/${project.id}`}
              className="block rounded-[28px] p-7 transition hover:-translate-y-1"
              style={{
                background: bg,
                color: palette.textPrimary,
                textDecoration: "none",
                boxShadow: "0 6px 24px -10px rgba(14,83,77,0.18)",
              }}
            >
              <div className="flex items-start justify-between mb-5">
                <span style={{ fontSize: 38 }} aria-hidden="true">
                  {project.emoji}
                </span>
                <QRCode
                  value={project.apkUrl}
                  size={64}
                  bg="rgba(255,255,255,0.7)"
                  fg={palette.teal}
                  ariaLabel={project.name}
                />
              </div>
              <h3
                style={{
                  fontFamily: tokens.fontTitle,
                  fontWeight: 600,
                  fontSize: 26,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: palette.textPrimary,
                }}
              >
                {project.name}
              </h3>
              <p
                className="mt-2"
                style={{
                  fontFamily: tokens.fontItalic,
                  fontStyle: "italic",
                  fontSize: 16,
                  color: palette.textPrimary,
                  opacity: 0.85,
                }}
              >
                {project.tagline[lang]}
              </p>
              <p
                className="mt-4"
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: palette.textPrimary,
                  opacity: 0.75,
                }}
              >
                {project.description[lang]}
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-2.5 py-0.5 text-xs"
                    style={{
                      background: "rgba(255,255,255,0.5)",
                      color: palette.textPrimary,
                      fontWeight: 500,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium"
                style={{ color: palette.teal }}
              >
                {t("projects.viewMore")} →
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
