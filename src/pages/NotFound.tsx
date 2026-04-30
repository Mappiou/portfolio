import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguageRoute } from "../hooks/useLanguageRoute";
import { sketchbook } from "../styles/sketchbook";
import { SEO } from "../components/seo/SEO";

export default function NotFound() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

  return (
    <>
      <SEO title={`404 · ${t("notFound.title")}`} />
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-32 text-center">
        <p
          style={{ fontFamily: "Caveat, cursive", color: sketchbook.red }}
          className="text-7xl md:text-9xl"
        >
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-medium mt-4">{t("notFound.title")}</h1>
        <p className="mt-3 italic opacity-80">{t("notFound.subtitle")}</p>
        <Link
          to={`/${lang}`}
          className="inline-block mt-10 text-lg border-b-2 hover:opacity-70 transition"
          style={{ borderColor: sketchbook.ink, fontFamily: "Caveat, cursive", fontSize: "1.6rem" }}
        >
          {t("notFound.back")}
        </Link>
      </section>
    </>
  );
}
