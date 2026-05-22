import { useTranslation } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { profile } from "@shared/data/profile";

type Theme = "light" | "dark";

export function Footer({ theme = "light" }: { theme?: Theme }) {
  const { t } = useTranslation();
  const colors =
    theme === "light"
      ? {
          border: palette.hairline,
          accent: palette.teal,
          textInk: palette.textSecondary,
          mark: palette.textSecondary,
        }
      : {
          border: "rgba(250,245,235,0.10)",
          accent: palette.teal,
          textInk: "rgba(250,245,235,0.7)",
          mark: "rgba(250,245,235,0.6)",
        };

  return (
    <footer
      className="relative z-10 mx-auto px-6 md:px-10"
      style={{
        maxWidth: tokens.pageMaxWidth,
        paddingTop: 60,
        paddingBottom: 48,
      }}
    >
      <div
        className="flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-between gap-4"
        style={{ borderTop: `1px solid ${colors.border}`, paddingTop: 40 }}
      >
        <div
          style={{
            fontFamily: tokens.fontItalic,
            fontStyle: "italic",
            fontSize: 14,
            color: colors.mark,
          }}
        >
          M<span style={{ color: colors.accent }}>.</span>D — {t("footer.signature")}
        </div>
        <div
          className="flex flex-wrap gap-2 md:gap-6"
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: colors.textInk,
          }}
        >
          {profile.links.github && (
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[color:var(--accent)] inline-flex items-center"
              style={
                {
                  color: colors.textInk,
                  textDecoration: "none",
                  "--accent": colors.accent,
                  minHeight: 44,
                  padding: "10px 4px",
                } as React.CSSProperties
              }
            >
              {t("contact.github")}
            </a>
          )}
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[color:var(--accent)] inline-flex items-center"
            style={
              {
                color: colors.textInk,
                textDecoration: "none",
                "--accent": colors.accent,
                minHeight: 44,
                padding: "10px 4px",
              } as React.CSSProperties
            }
          >
            {t("contact.linkedin")}
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-[color:var(--accent)] inline-flex items-center"
            style={
              {
                color: colors.textInk,
                textDecoration: "none",
                "--accent": colors.accent,
                minHeight: 44,
                padding: "10px 4px",
              } as React.CSSProperties
            }
          >
            {t("contact.email")}
          </a>
        </div>
      </div>
      <p
        className="mt-6"
        style={{
          fontFamily: tokens.fontMono,
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: colors.textInk,
          opacity: 0.7,
          textAlign: "center",
        }}
      >
        © 2026 Mathieu Diep · Barcelone · Set in Newsreader &amp; Inter Tight &amp; JetBrains Mono · {t("footer.rights")}
      </p>
    </footer>
  );
}
