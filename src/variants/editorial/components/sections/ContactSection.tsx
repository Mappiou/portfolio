import { useTranslation, Trans } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { profile } from "@shared/data/profile";

export function ContactSection() {
  const { t } = useTranslation();

  const lines = [
    {
      key: "email",
      label: t("contact.email"),
      value: profile.email,
      href: `mailto:${profile.email}`,
      external: false,
    },
    {
      key: "github",
      label: t("contact.github"),
      value: profile.links.github?.replace(/^https?:\/\//, "") ?? "",
      href: profile.links.github ?? "#",
      external: true,
    },
    {
      key: "linkedin",
      label: t("contact.linkedin"),
      value: profile.links.linkedin.replace(/^https?:\/\//, ""),
      href: profile.links.linkedin,
      external: true,
    },
  ].filter((l) => l.value);

  return (
    <section
      id="contact"
      className="relative z-10 mx-auto px-6 md:px-10"
      style={{
        maxWidth: tokens.pageMaxWidth,
        paddingTop: "clamp(120px, 14vw, 180px)",
        paddingBottom: "clamp(100px, 12vw, 160px)",
        borderTop: `1px solid ${palette.hairline}`,
        scrollMarginTop: -140,
      }}
      aria-labelledby="contact-heading"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <h2
          id="contact-heading"
          className="md:col-span-7"
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(56px, 8vw, 120px)",
            letterSpacing: "-0.035em",
            lineHeight: 0.95,
            color: palette.textPrimary,
            margin: 0,
            marginBottom: 80,
            fontFeatureSettings: '"ss01", "ss02"',
          }}
        >
          <Trans
            i18nKey="contactSection.title"
            components={{
              italic: <span style={{ fontStyle: "italic", color: palette.teal }} />,
              br: <br />,
            }}
          />
        </h2>
        <div className="md:col-span-4 md:col-start-9" style={{ paddingTop: 12 }}>
          <p
            className="mb-4"
            style={{
              fontFamily: tokens.fontMono,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: palette.textSecondary,
            }}
          >
            § {t("contactSection.kicker")}
          </p>
        </div>

        <div
          className="md:col-span-12"
          style={{
            borderTop: `1px solid ${palette.hairline}`,
            paddingTop: 8,
          }}
        >
          {lines.map((line) => (
            <a
              key={line.key}
              href={line.href}
              target={line.external ? "_blank" : undefined}
              rel={line.external ? "noreferrer" : undefined}
              className="contact-line flex flex-col md:grid md:items-center"
              style={{
                gridTemplateColumns: "minmax(100px, 140px) 1fr auto",
                gap: 8,
                padding: "20px 0",
                borderBottom: `1px solid ${palette.hairline}`,
                color: palette.textPrimary,
                textDecoration: "none",
                transition: "padding-left 0.4s ease",
              }}
            >
              <span
                style={{
                  fontFamily: tokens.fontMono,
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: palette.textSecondary,
                }}
              >
                {line.label} →
              </span>
              <span
                className="contact-value"
                style={{
                  fontFamily: tokens.fontTitle,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(20px, 5.5vw, 40px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  position: "relative",
                  display: "inline-block",
                  color: palette.textPrimary,
                  borderBottom: `1px solid transparent`,
                  paddingBottom: 2,
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                }}
              >
                {line.value}
              </span>
              <span
                className="hidden md:inline"
                style={{
                  fontFamily: tokens.fontMono,
                  fontSize: 18,
                  color: palette.textSecondary,
                  transition: "color 0.4s ease, transform 0.4s ease",
                }}
                aria-hidden="true"
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
