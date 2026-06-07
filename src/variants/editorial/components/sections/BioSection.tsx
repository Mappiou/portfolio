import { useTranslation } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { profile } from "@shared/data/profile";
import { MegaButton } from "../ui/MegaButton";
import { Download } from "lucide-react";

export function BioSection() {
  const { t } = useTranslation();
  const paragraphs: string[] = t("bio.paragraphs", { returnObjects: true }) as unknown as string[];

  return (
    <section
      id="about"
      className="relative z-10 mx-auto px-6 md:px-10"
      style={{
        maxWidth: tokens.pageMaxWidth,
        paddingTop: "clamp(60px, 9vw, 120px)",
        paddingBottom: "clamp(60px, 9vw, 120px)",
      }}
    >
      <div
        className="flex items-baseline justify-between mb-16 pb-6"
        style={{ borderBottom: `1px solid ${palette.hairline}` }}
      >
        <h2
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(40px, 5.5vw, 72px)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: palette.textPrimary,
            margin: 0,
            fontFeatureSettings: '"ss01", "ss02"',
          }}
        >
          À propos<span style={{ color: palette.teal }}>.</span>
        </h2>
        <span
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.textSecondary,
          }}
        >
          § ABOUT
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-4">
          <div className="overflow-hidden">
            <img
              src="/photo1.jpg"
              alt=""
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                filter: "sepia(8%) saturate(110%)",
              }}
            />
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6" style={{ paddingTop: 12 }}>
          <p
            style={{
              fontFamily: tokens.fontTitle,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(24px, 2.8vw, 30px)",
              lineHeight: 1.32,
              letterSpacing: "-0.015em",
              color: palette.textPrimary,
              marginBottom: 40,
            }}
          >
            {t("bio.intro")}
          </p>

          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="mb-7"
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: i === 0 ? palette.textPrimary : palette.textSecondary,
                maxWidth: 580,
              }}
            >
              {p}
            </p>
          ))}

          <blockquote
            className="mt-12 mb-8"
            style={{
              paddingTop: 32,
              paddingBottom: 32,
              borderTop: `1px solid ${palette.hairline}`,
              borderBottom: `1px solid ${palette.hairline}`,
              fontFamily: tokens.fontTitle,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.4vw, 32px)",
              lineHeight: 1.28,
              letterSpacing: "-0.015em",
              color: palette.textPrimary,
              maxWidth: 640,
              margin: 0,
            }}
          >
            <span style={{ color: palette.teal, fontWeight: 500 }}>«</span>{" "}
            {t("bio.pullquote")}{" "}
            <span style={{ color: palette.teal, fontWeight: 500 }}>»</span>
          </blockquote>

          <div className="flex flex-wrap gap-3 mt-8">
            <MegaButton href="/cv/Mathieu_Diep_CV.pdf" bg={palette.teal} fg={palette.cream}>
              <Download size={14} />
              {t("nav.downloadCv")}
            </MegaButton>
            <MegaButton
              href={`mailto:${profile.email}`}
              variant="outline"
              bg={palette.teal}
              fg={palette.teal}
              borderColor={palette.hairlineStrong}
            >
              {t("nav.contact")}
            </MegaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
