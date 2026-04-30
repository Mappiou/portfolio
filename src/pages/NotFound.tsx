import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguageRoute } from "../hooks/useLanguageRoute";
import { palette, tokens } from "../styles/palette";
import { SEO } from "../components/seo/SEO";

export default function NotFound() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

  return (
    <>
      <SEO title={`404 · ${t("notFound.title")}`} />
      <section
        className="relative z-10 mx-auto px-6 pt-24 pb-32 text-center"
        style={{ maxWidth: tokens.pageMaxWidth }}
      >
        <p
          style={{
            fontFamily: tokens.fontTitle,
            fontWeight: 600,
            fontSize: "clamp(96px, 16vw, 220px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: palette.teal,
            opacity: 0.5,
          }}
        >
          404
        </p>
        <h1
          className="mt-2"
          style={{
            fontFamily: tokens.fontTitle,
            fontWeight: 600,
            fontSize: "clamp(28px, 3vw, 44px)",
            letterSpacing: "-0.02em",
            color: palette.textPrimary,
          }}
        >
          {t("notFound.title")}
        </h1>
        <p
          className="mt-3 mx-auto"
          style={{
            fontFamily: tokens.fontItalic,
            fontStyle: "italic",
            fontSize: 20,
            color: palette.textSecondary,
            maxWidth: 480,
          }}
        >
          {t("notFound.subtitle")}
        </p>
        <Link
          to={`/${lang}`}
          className="inline-block mt-10 rounded-full px-7 py-3 font-medium transition hover:-translate-y-0.5"
          style={{
            background: palette.teal,
            color: palette.beige,
            textDecoration: "none",
          }}
        >
          {t("notFound.back")}
        </Link>
      </section>
    </>
  );
}
