import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { projects } from "@shared/data/projects";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { VARIANT } from "../../lib/variant";
import { PhoneMockup } from "../projects/PhoneMockup";

export function ProjectsSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

  return (
    <section
      id="projects"
      className="relative z-10 mx-auto px-6 md:px-10"
      style={{
        maxWidth: tokens.pageMaxWidth,
        paddingTop: "clamp(40px, 6vw, 80px)",
        paddingBottom: "clamp(80px, 11vw, 140px)",
        scrollMarginTop: 32,
      }}
      aria-labelledby="projects-heading"
    >
      <div
        className="flex items-baseline justify-between mb-16 pb-6"
        style={{ borderBottom: `1px solid ${palette.hairline}` }}
      >
        <h2
          id="projects-heading"
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(40px, 5.5vw, 72px)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: palette.textPrimary,
            margin: 0,
            fontFeatureSettings: '"ss01", "ss02"',
          }}
        >
          <Trans
            i18nKey="projects.title"
            components={{
              italic: <span style={{ fontStyle: "italic", color: palette.teal }} />,
            }}
          />
        </h2>
        <span
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.textSecondary,
            whiteSpace: "nowrap",
          }}
        >
          02 / 03 — {t("projects.kicker")}
        </span>
      </div>

      <p
        className="mb-12"
        style={{
          fontSize: 17,
          lineHeight: 1.65,
          color: palette.textSecondary,
          maxWidth: 640,
        }}
      >
        {t("projects.intro")}
      </p>

      <div className="mosaic-grid">
        {projects.map((project, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <div className="mosaic-cell" key={project.id}>
              <Link
                to={`/${VARIANT}/${lang}/projects/${project.id}`}
                className="mosaic-inner group"
                style={{ color: palette.textPrimary, textDecoration: "none" }}
              >
                <div className="flex justify-center mb-5">
                  <div className="w-full max-w-[190px] mx-auto">
                    <PhoneMockup
                      project={project}
                      lang={lang}
                      src={project.screenshots?.[0]}
                      index={i}
                      width="100%"
                    />
                  </div>
                </div>
                <p
                  className="mb-2"
                  style={{
                    fontFamily: tokens.fontMono,
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: palette.teal,
                    fontWeight: 500,
                  }}
                >
                  {num} — {project.stack[0] ?? "Mobile"}
                </p>
                <h3
                  style={{
                    fontFamily: tokens.fontTitle,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    color: palette.textPrimary,
                    margin: 0,
                    marginBottom: 6,
                    fontFeatureSettings: '"ss01", "ss02"',
                  }}
                >
                  {project.name}<span style={{ color: palette.teal }}>.</span>
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.45,
                    color: palette.textSecondary,
                  }}
                >
                  {project.tagline[lang]}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
