import { useTranslation } from "react-i18next";
import { profile } from "../../data/profile";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer
      className="max-w-4xl mx-auto px-6 py-12 text-center"
      style={{ fontFamily: "Caveat, cursive" }}
    >
      <p className="text-2xl">{t("footer.endNote")}</p>
      <div className="flex gap-5 justify-center mt-3 text-lg" style={{ fontFamily: "Lora, serif" }}>
        <a className="hover:underline" href={`mailto:${profile.email}`}>
          {t("contact.email")}
        </a>
        <a className="hover:underline" href={profile.links.github} target="_blank" rel="noreferrer">
          {t("contact.github")}
        </a>
        <a
          className="hover:underline"
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          {t("contact.linkedin")}
        </a>
      </div>
      <p
        className="text-base opacity-70 mt-4"
        style={{ fontFamily: "Lora, serif", fontStyle: "italic" }}
      >
        {t("footer.rights")}
      </p>
    </footer>
  );
}
