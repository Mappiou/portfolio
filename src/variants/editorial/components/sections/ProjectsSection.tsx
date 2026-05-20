import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { projects } from "@shared/data/projects";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";

export function ProjectsSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

  return (
    <section
      id="projects"
      className="relative z-10 mx-auto px-6 md:px-10"
      style={{
        maxWidth: tokens.pageMaxWidth,
        paddingTop: "clamp(80px, 11vw, 140px)",
        paddingBottom: "clamp(80px, 11vw, 140px)",
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {projects.map((project, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <Link
              key={project.id}
              to={`/${lang}/projects/${project.id}`}
              className="block transition-transform hover:-translate-y-1.5"
              style={{
                color: palette.textPrimary,
                textDecoration: "none",
              }}
            >
              <div className="overflow-hidden mb-7" style={{ aspectRatio: "1 / 1" }}>
                <img
                  src={`https://picsum.photos/seed/${project.id}/500/500`}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "sepia(8%) saturate(110%)",
                    transition: "transform 0.7s ease, filter 0.5s ease",
                  }}
                />
              </div>
              <p
                className="mb-3"
                style={{
                  fontFamily: tokens.fontMono,
                  fontSize: 11,
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
                  fontSize: 28,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: palette.textPrimary,
                  margin: 0,
                  marginBottom: 10,
                  fontFeatureSettings: '"ss01", "ss02"',
                }}
              >
                {project.name}<span style={{ color: palette.teal }}>.</span>
              </h3>
              <p
                className="mb-5"
                style={{
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: palette.textSecondary,
                  maxWidth: 320,
                }}
              >
                {project.tagline[lang]}
              </p>
              <div
                className="pt-4"
                style={{
                  borderTop: `1px solid ${palette.hairline}`,
                  fontFamily: tokens.fontMono,
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: palette.textSecondary,
                }}
              >
                {project.stack.join(" · ")}
              </div>
              <p
                className="mt-5 inline-flex items-center gap-2"
                style={{
                  fontFamily: tokens.fontMono,
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: palette.teal,
                  fontWeight: 500,
                }}
              >
                → {t("projects.viewMore")}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
