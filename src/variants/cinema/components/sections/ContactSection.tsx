import { useTranslation, Trans } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { profile } from "@shared/data/profile";

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100dvh",
        padding: "clamp(80px, 16vw, 140px) 0",
      }}
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <img
          src="https://picsum.photos/seed/barcelona-skyline-dark/1800/900"
          alt=""
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "contrast(108%) saturate(70%) brightness(45%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(14,13,11,0.35) 0%, rgba(14,13,11,0.92) 80%), linear-gradient(180deg, #0E0D0B 0%, transparent 20%, transparent 80%, #0E0D0B 100%)",
          }}
        />
      </div>

      <div
        className="relative flex flex-col items-center justify-center text-center mx-auto"
        style={{
          zIndex: 2,
          maxWidth: 720,
          padding: "0 clamp(16px, 5vw, 32px)",
          minHeight: "calc(100dvh - clamp(160px, 32vw, 280px))",
        }}
      >
        <p
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.textSecondary,
            marginBottom: 40,
          }}
        >
          {t("contactSection.kicker")} · SCÈNE FINALE
        </p>
        <h2
          id="contact-heading"
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(64px, 9vw, 120px)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            color: palette.textPrimary,
            marginBottom: 64,
          }}
        >
          <Trans
            i18nKey="contactSection.title"
            components={{
              italic: <span style={{ fontStyle: "italic" }} />,
              br: <br />,
            }}
          />
          <span style={{ color: palette.teal }}>.</span>
        </h2>

        <div className="flex flex-col gap-4 items-center">
          <ContactLink href={`mailto:${profile.email}`}>{profile.email}</ContactLink>
          {profile.links.github && (
            <ContactLink href={profile.links.github} external>
              github.com/Mappiou
            </ContactLink>
          )}
          <ContactLink href={profile.links.linkedin} external>
            linkedin.com/in/mathieu-diep
          </ContactLink>
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="contact-link relative inline-block"
      style={{
        fontFamily: tokens.fontBody,
        fontWeight: 300,
        fontSize: 24,
        color: palette.textPrimary,
        textDecoration: "none",
        padding: "4px 0",
        letterSpacing: "0.005em",
        transition: "color 0.4s ease",
      }}
    >
      {children}
    </a>
  );
}
