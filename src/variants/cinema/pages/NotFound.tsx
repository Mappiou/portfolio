import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguageRoute } from "../hooks/useLanguageRoute";
import { palette, tokens } from "../styles/palette";
import { SEO } from "../components/seo/SEO";
import { VARIANT } from "../lib/variant";

export default function NotFound() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

  return (
    <>
      <SEO title={`404 · ${t("notFound.title")}`} />
      <section
        className="relative z-10 mx-auto px-6 pt-32 pb-32 text-center"
        style={{ maxWidth: tokens.pageMaxWidth }}
      >
        <p
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(96px, 16vw, 220px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: palette.teal,
            opacity: 0.6,
          }}
        >
          404
        </p>
        <h1
          className="mt-2"
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(32px, 4vw, 56px)",
            letterSpacing: "-0.02em",
            color: palette.textPrimary,
          }}
        >
          {t("notFound.title")}
        </h1>
        <p
          className="mt-3 mx-auto"
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontSize: 20,
            color: palette.textSecondary,
            maxWidth: 480,
          }}
        >
          {t("notFound.subtitle")}
        </p>
        <Link
          to={`/${VARIANT}/${lang}`}
          className="inline-block mt-10 transition hover:-translate-y-0.5"
          style={{
            background: "transparent",
            color: palette.teal,
            border: `1px solid ${palette.teal}`,
            padding: "12px 28px",
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          {t("notFound.back")}
        </Link>
      </section>
    </>
  );
}
