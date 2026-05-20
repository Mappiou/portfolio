import { useTranslation } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { profile } from "@shared/data/profile";

type Theme = "light" | "dark";

type CreditEntry = {
  label: string;
  value: string;
};

export function Footer({ theme = "dark" }: { theme?: Theme }) {
  const { t } = useTranslation();
  const borderColor =
    theme === "light" ? "rgba(14,83,77,0.15)" : "rgba(239,233,221,0.12)";

  const credits: CreditEntry[] = [
    { label: "Réalisé et écrit par", value: "Mathieu Diep" },
    { label: "Photographies", value: "Placeholder · picsum.photos" },
    { label: "Typographie", value: "Cormorant Garamond & Inter Tight" },
    { label: "Mis à jour", value: "Mai 2026" },
    { label: "©", value: "2026 — Barcelone, Espagne" },
  ];

  return (
    <footer
      className="relative z-10 mx-auto text-center"
      style={{
        padding: "120px 32px 80px",
        borderTop: `1px solid ${borderColor}`,
        background: palette.beige,
      }}
    >
      {credits.map((c) => (
        <div key={c.label} style={{ marginBottom: 28 }}>
          <div
            style={{
              fontFamily: tokens.fontMono,
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.24em",
              color: palette.textSecondary,
              marginBottom: 6,
            }}
          >
            {c.label}
          </div>
          <div
            style={{
              fontFamily: tokens.fontMono,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: palette.textPrimary,
              opacity: 0.85,
            }}
          >
            {c.value}
          </div>
        </div>
      ))}

      <div
        className="flex justify-center gap-7 mt-10 mb-10 flex-wrap"
        style={{
          fontFamily: tokens.fontMono,
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
        }}
      >
        <a
          href={`mailto:${profile.email}`}
          style={{ color: palette.textSecondary, textDecoration: "none" }}
          className="hover:!text-[#D9A648] transition-colors"
        >
          {t("contact.email")}
        </a>
        {profile.links.github && (
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            style={{ color: palette.textSecondary, textDecoration: "none" }}
            className="hover:!text-[#D9A648] transition-colors"
          >
            {t("contact.github")}
          </a>
        )}
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer"
          style={{ color: palette.textSecondary, textDecoration: "none" }}
          className="hover:!text-[#D9A648] transition-colors"
        >
          {t("contact.linkedin")}
        </a>
      </div>

      <div
        style={{
          marginTop: 48,
          fontFamily: tokens.fontTitle,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: 28,
          color: palette.textSecondary,
          letterSpacing: "-0.01em",
        }}
      >
        — Fin —
      </div>
      <p
        className="mt-6 text-xs"
        style={{
          fontFamily: tokens.fontMono,
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: palette.textSecondary,
          opacity: 0.55,
        }}
      >
        {t("footer.rights")}
      </p>
    </footer>
  );
}
