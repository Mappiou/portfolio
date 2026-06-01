import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { projects } from "@shared/data/projects";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { ChapterCard } from "../ui/ChapterCard";
import { VARIANT } from "../../lib/variant";
import { PhoneMockup } from "../projects/PhoneMockup";

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

        <div className="mosaic-grid">
          {projects.map((project, i) => (
            <div className="mosaic-cell" key={project.id}>
              <Link
                to={`/${VARIANT}/${lang}/projects/${project.id}`}
                className="mosaic-inner group"
                style={{ textDecoration: "none" }}
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
                <h3
                  className="group-hover:!text-[#D9A648] transition-colors"
                  style={{
                    fontFamily: tokens.fontTitle,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 22,
                    letterSpacing: "-0.015em",
                    color: palette.textPrimary,
                    marginBottom: 6,
                  }}
                >
                  {project.name}
                </h3>
                <p
                  style={{
                    fontFamily: tokens.fontBody,
                    fontWeight: 300,
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: palette.textSecondary,
                  }}
                >
                  {project.tagline[lang]}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
