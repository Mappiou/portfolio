import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { projects } from "@shared/data/projects";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { ChapterCard } from "../ui/ChapterCard";
import { VARIANT } from "../../lib/variant";

export function ProjectsSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

  return (
    <section id="projects" className="relative w-full" style={{ scrollMarginTop: 96 }} aria-labelledby="projects-heading">
      <ChapterCard
        chapter="CHAPITRE 06"
        bgSrc="https://picsum.photos/seed/apps-cinema/1800/500"
        headingId="projects-heading"
        title={
          <>
            <Trans
              i18nKey="projects.title"
              components={{
                italic: <span style={{ fontStyle: "italic" }} />,
              }}
            />
            <span style={{ color: palette.teal }}>.</span>
          </>
        }
      />

      <div
        className="relative mx-auto"
        style={{
          padding:
            "clamp(60px, 14vw, 100px) clamp(16px, 5vw, 24px) clamp(80px, 18vw, 180px)",
          maxWidth: tokens.pageMaxWidth,
        }}
      >
        <p
          className="text-center mb-12 mx-auto"
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontSize: "clamp(20px, 2vw, 26px)",
            lineHeight: 1.5,
            color: palette.textSecondary,
            maxWidth: 620,
          }}
        >
          {t("projects.intro")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/${VARIANT}/${lang}/projects/${project.id}`}
              className="group flex flex-col transition-all hover:-translate-y-1"
              style={{
                textDecoration: "none",
              }}
            >
              <div
                className="cinema-frame mb-7"
                style={{
                  aspectRatio: "3 / 4",
                  width: "100%",
                }}
              >
                <img
                  src={`https://picsum.photos/seed/${project.id}/450/600`}
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <h3
                className="group-hover:!text-[#D9A648] transition-colors"
                style={{
                  fontFamily: tokens.fontTitle,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 28,
                  letterSpacing: "-0.015em",
                  color: palette.textPrimary,
                  marginBottom: 8,
                }}
              >
                {project.name}
              </h3>
              <p
                style={{
                  fontFamily: tokens.fontBody,
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: palette.textSecondary,
                  marginBottom: 18,
                }}
              >
                {project.tagline[lang]}
              </p>
              <div
                className="mt-auto"
                style={{
                  paddingTop: 18,
                  borderTop: "1px solid rgba(239,233,221,0.12)",
                  fontFamily: tokens.fontMono,
                  fontSize: 11,
                  color: palette.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                }}
              >
                {project.stack.join(" · ")}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
