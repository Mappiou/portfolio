import { useTranslation, Trans } from "react-i18next";
import { Mail } from "lucide-react";
import { palette, tokens } from "../../styles/palette";
import { profile } from "../../data/profile";
import { MegaButton } from "../ui/MegaButton";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="relative z-10 mx-auto px-6 pb-32"
      style={{ maxWidth: tokens.pageMaxWidth }}
      aria-labelledby="contact-heading"
    >
      <div className="text-center">
        <p
          className="inline-block px-4 py-1.5 rounded-full mb-5"
          style={{
            background: "rgba(255,255,255,0.55)",
            color: palette.textSecondary,
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          ✉ {t("contactSection.kicker")}
        </p>
        <h2
          id="contact-heading"
          style={{
            fontFamily: tokens.fontTitle,
            fontWeight: 600,
            fontSize: "clamp(40px, 5.5vw, 80px)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: palette.textPrimary,
          }}
        >
          <Trans
            i18nKey="contactSection.title"
            components={{
              italic: (
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontFamily: tokens.fontItalic,
                  }}
                />
              ),
            }}
          />
        </h2>
        <p
          className="mt-6 mx-auto"
          style={{
            fontSize: "clamp(17px, 1.4vw, 22px)",
            lineHeight: 1.55,
            color: palette.textSecondary,
            maxWidth: 580,
          }}
        >
          {t("contactSection.body")}
        </p>

        <div className="flex flex-wrap gap-3 mt-10 justify-center">
          <MegaButton href={`mailto:${profile.email}`} bg={palette.teal} fg={palette.beige}>
            <Mail size={16} />
            {profile.email}
          </MegaButton>
          {profile.links.github && (
            <MegaButton
              href={profile.links.github}
              external
              variant="outline"
              bg={palette.teal}
              fg={palette.teal}
              borderColor="rgba(14,83,77,0.3)"
            >
              <GithubIcon size={16} />
              GitHub
            </MegaButton>
          )}
          <MegaButton
            href={profile.links.linkedin}
            external
            variant="outline"
            bg={palette.teal}
            fg={palette.teal}
            borderColor="rgba(14,83,77,0.3)"
          >
            <LinkedinIcon size={16} />
            LinkedIn
          </MegaButton>
        </div>
      </div>
    </section>
  );
}
