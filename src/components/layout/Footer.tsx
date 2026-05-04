import { useTranslation } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { profile } from "../../data/profile";

type Theme = "light" | "dark";

export function Footer({ theme = "light" }: { theme?: Theme }) {
  const { t } = useTranslation();
  const colors =
    theme === "light"
      ? {
          border: "rgba(14,83,77,0.15)",
          accent: palette.teal,
          secondary: palette.textSecondary,
        }
      : {
          border: "rgba(168,225,197,0.10)",
          accent: palette.mint,
          secondary: "rgba(168, 225, 197, 0.7)",
        };

  return (
    <footer className="relative z-10 mx-auto px-6 pb-16" style={{ maxWidth: tokens.pageMaxWidth }}>
      <div
        className="pt-10 flex flex-wrap items-center justify-between gap-4"
        style={{ borderTop: `1px solid ${colors.border}` }}
      >
        <div
          style={{
            fontFamily: tokens.fontItalic,
            fontSize: 28,
            fontStyle: "italic",
            color: colors.accent,
          }}
        >
          {t("footer.signature")}
        </div>
        <div className="flex gap-5 text-sm" style={{ color: colors.secondary }}>
          {profile.links.github && (
            <a
              href={profile.links.github}
              className="hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {t("contact.github")}
            </a>
          )}
          <a
            href={profile.links.linkedin}
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {t("contact.linkedin")}
          </a>
          <a href={`mailto:${profile.email}`} className="hover:underline">
            {t("contact.email")}
          </a>
        </div>
      </div>
      <p className="mt-6 text-xs text-center" style={{ color: colors.secondary, opacity: 0.7 }}>
        {t("footer.rights")}
      </p>
    </footer>
  );
}
