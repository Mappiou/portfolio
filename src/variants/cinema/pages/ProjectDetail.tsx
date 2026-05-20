import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { GithubIcon } from "../components/ui/BrandIcons";
import { useLanguageRoute } from "../hooks/useLanguageRoute";
import { getProjectById } from "@shared/data/projects";
import { palette, tokens } from "../styles/palette";
import { QRCode } from "../components/projects/QRCode";
import { DownloadButton } from "../components/projects/DownloadButton";
import { PhoneMockup } from "../components/projects/PhoneMockup";
import { MegaButton } from "../components/ui/MegaButton";
import { SEO } from "../components/seo/SEO";

export default function ProjectDetail() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project) return <Navigate to={`/${lang}`} replace />;

  return (
    <>
      <SEO
        title={`${project.name} — ${project.tagline[lang]} · Mathieu Diep`}
        description={project.description[lang]}
      />
      <article
        className="relative z-10 mx-auto px-6 pt-24 pb-24"
        style={{ maxWidth: tokens.pageMaxWidth }}
      >
        <Link
          to={`/${lang}`}
          className="inline-flex items-center gap-1.5 mb-12 hover:!text-[#D9A648] transition-colors"
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.textSecondary,
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={14} /> {t("projects.back")}
        </Link>

        <header className="text-center mb-16">
          <p
            className="mb-8"
            style={{
              fontFamily: tokens.fontMono,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: palette.textSecondary,
            }}
          >
            {project.stack.join(" · ")}
          </p>
          <h1
            style={{
              fontFamily: tokens.fontTitle,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(56px, 8vw, 112px)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: palette.textPrimary,
              margin: 0,
            }}
          >
            {project.name}
            <span style={{ color: palette.teal }}>.</span>
          </h1>
          <p
            className="mt-6 mx-auto"
            style={{
              fontFamily: tokens.fontTitle,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(20px, 2vw, 28px)",
              color: palette.textSecondary,
              maxWidth: 640,
            }}
          >
            {project.tagline[lang]}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start">
          <div>
            <p
              style={{
                fontFamily: tokens.fontBody,
                fontWeight: 300,
                fontSize: "clamp(18px, 1.8vw, 22px)",
                lineHeight: 1.6,
                color: palette.textPrimary,
                opacity: 0.9,
              }}
            >
              {project.description[lang]}
            </p>

            <h2
              className="mt-12 mb-6"
              style={{
                fontFamily: tokens.fontMono,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: palette.textSecondary,
              }}
            >
              {t("projects.features")}
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {project.features.map((f, i) => (
                <li
                  key={i}
                  className="flex gap-3 items-baseline"
                  style={{
                    fontSize: 17,
                    lineHeight: 1.7,
                    color: palette.textPrimary,
                    opacity: 0.85,
                    marginBottom: 12,
                    fontFamily: tokens.fontBody,
                    fontWeight: 300,
                  }}
                >
                  <span style={{ color: palette.teal, opacity: 0.7 }}>→</span>
                  <span>{f[lang]}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside
            className="flex flex-col sm:flex-row items-center sm:items-stretch gap-5"
            aria-label={t("projects.scanQr")}
          >
            <PhoneMockup project={project} lang={lang} src={project.screenshots?.[0]} index={0} />

            <div
              className="p-6 text-center flex flex-col"
              style={{
                background: "rgba(239,233,221,0.04)",
                border: "1px solid rgba(239,233,221,0.12)",
                width: 220,
              }}
            >
              <p
                style={{
                  fontFamily: tokens.fontMono,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: palette.textSecondary,
                  marginBottom: 14,
                }}
              >
                {t("projects.scanQr")}
              </p>
              <div className="flex justify-center mb-4">
                <QRCode
                  value={project.apkUrl}
                  size={150}
                  bg={palette.textPrimary}
                  fg={palette.beige}
                  ariaLabel={`QR ${project.name}`}
                />
              </div>
              <p
                className="mb-4"
                style={{
                  fontFamily: tokens.fontBody,
                  fontWeight: 300,
                  fontSize: 12,
                  color: palette.textSecondary,
                  lineHeight: 1.5,
                }}
              >
                {t("projects.androidNote")}
              </p>
              <div className="flex flex-col gap-2 items-center mt-auto">
                <DownloadButton href={project.apkUrl} filename={`${project.id}.apk`} />
                {project.githubUrl && (
                  <MegaButton
                    href={project.githubUrl}
                    external
                    variant="outline"
                    bg={palette.textPrimary}
                    fg={palette.textPrimary}
                    borderColor="rgba(239,233,221,0.25)"
                  >
                    <GithubIcon size={14} />
                    {t("projects.viewSource")}
                  </MegaButton>
                )}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
