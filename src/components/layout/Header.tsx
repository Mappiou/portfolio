import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";

export function Header() {
  const lang = useLanguageRoute();
  const { t } = useTranslation();
  return (
    <header className="max-w-4xl mx-auto px-6 pt-10 pb-2 flex items-center justify-between">
      <Link to={`/${lang}`} className="flex items-center gap-2 group" aria-label={t("nav.home")}>
        <Logo />
        <span
          style={{ fontFamily: "Caveat, cursive" }}
          className="text-3xl group-hover:opacity-80 transition"
        >
          mathieu's notebook
        </span>
      </Link>
      <LanguageSwitcher />
    </header>
  );
}
