import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { GithubIcon } from "../components/ui/BrandIcons";
import { useLanguageRoute } from "../hooks/useLanguageRoute";
import { getProjectById } from "../data/projects";
import { palette, tokens } from "../styles/palette";
import { QRCode } from "../components/projects/QRCode";
import { DownloadButton } from "../components/projects/DownloadButton";
import { PhoneMockup } from "../components/projects/PhoneMockup";
import { MegaButton } from "../components/ui/MegaButton";
import { SEO } from "../components/seo/SEO";

const cardBg: Record<string, string> = {
  red: palette.rust,
  green: palette.mint,
  blue: palette.babyblue,
  yellow: palette.yellow,
};

export default function ProjectDetail() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project) return <Navigate to={`/${lang}`} replace />;
  const bg = cardBg[project.accent] ?? palette.mint;

  return (
    <>
      <SEO
        title={`${project.name} — ${project.tagline[lang]} · Mathieu Diep`}
        description={project.description[lang]}
      />
      <article
        className="relative z-10 mx-auto px-6 pt-12 pb-24"
        style={{ maxWidth: tokens.pageMaxWidth }}
      >
        <Link
          to={`/${lang}`}
          className="inline-flex items-center gap-1.5 text-sm hover:underline mb-8"
          style={{ color: palette.textSecondary }}
        >
          <ArrowLeft size={14} /> {t("projects.back")}
        </Link>

        <header className="text-center mb-12">
          <p
            className="inline-block px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(255,255,255,0.55)",
              color: palette.textSecondary,
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {project.stack.join(" · ")}
          </p>
          <div
            className="mx-auto mb-6 inline-flex items-center justify-center rounded-3xl"
            style={{
              width: 100,
              height: 100,
              background: bg,
              fontSize: 56,
            }}
            aria-hidden="true"
          >
            {project.emoji}
          </div>
          <h1
            style={{
              fontFamily: tokens.fontTitle,
              fontWeight: 600,
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: palette.textPrimary,
              margin: 0,
            }}
          >
            {project.name}
            <span style={{ color: palette.teal, opacity: 0.7 }}>.</span>
          </h1>
          <p
            className="mt-5 mx-auto"
            style={{
              fontFamily: tokens.fontItalic,
              fontStyle: "italic",
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
                fontFamily: tokens.fontTitle,
                fontWeight: 500,
                fontSize: "clamp(22px, 2.4vw, 30px)",
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
                color: palette.textPrimary,
              }}
            >
              {project.description[lang]}
            </p>

            <h2
              className="mt-10 mb-4"
              style={{
                fontFamily: tokens.fontTitle,
                fontWeight: 600,
                fontSize: 26,
                color: palette.textPrimary,
                letterSpacing: "-0.015em",
              }}
            >
              {t("projects.features")}
            </h2>
            <ul className="space-y-3" style={{ listStyle: "none", padding: 0 }}>
              {project.features.map((f, i) => (
                <li
                  key={i}
                  className="flex gap-3 items-baseline"
                  style={{ fontSize: 17, lineHeight: 1.55, color: palette.textSecondary }}
                >
                  <span style={{ color: palette.teal, fontWeight: 700 }}>✱</span>
                  <span>{f[lang]}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside
            className="flex flex-col sm:flex-row items-center sm:items-stretch gap-5"
            aria-label={t("projects.scanQr")}
          >
            {/* Phone mockup (real screenshot when project.screenshots[0] is set, placeholder otherwise) */}
            <PhoneMockup project={project} lang={lang} src={project.screenshots?.[0]} index={0} />

            {/* QR + download card to the right of the mockup */}
            <div
              className="rounded-[28px] p-5 text-center flex flex-col"
              style={{
                background: bg,
                boxShadow: "0 6px 24px -10px rgba(14,83,77,0.18)",
                width: 220,
              }}
            >
              <p
                style={{
                  fontFamily: tokens.fontTitle,
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: palette.textPrimary,
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                {t("projects.scanQr")}
              </p>
              <div className="flex justify-center mb-3">
                <QRCode
                  value={project.apkUrl}
                  size={150}
                  bg="#FFFFFF"
                  fg={palette.teal}
                  ariaLabel={`QR ${project.name}`}
                />
              </div>
              <p
                className="text-xs mb-3"
                style={{ color: palette.textPrimary, opacity: 0.8, lineHeight: 1.4 }}
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
                    bg={palette.teal}
                    fg={palette.teal}
                    borderColor="rgba(14,83,77,0.3)"
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
