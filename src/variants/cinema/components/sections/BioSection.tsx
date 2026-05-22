import { useTranslation } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { profile } from "@shared/data/profile";
import { MegaButton } from "../ui/MegaButton";
import { ChapterCard } from "../ui/ChapterCard";
import { Download } from "lucide-react";

export function BioSection() {
  const { t } = useTranslation();
  const paragraphs: string[] = t("bio.paragraphs", { returnObjects: true }) as unknown as string[];

  return (
    <section id="about" className="relative w-full">
      <ChapterCard
        chapter="CHAPITRE 01"
        bgSrc="https://picsum.photos/seed/barcelona-night/1800/700"
        title={
          <>
            <span style={{ fontStyle: "italic" }}>{t("hero.kicker")}</span>
            <span style={{ color: palette.teal }}>.</span>
          </>
        }
      />

      <div
        className="relative w-full"
        style={{ padding: "clamp(60px, 14vw, 140px) 0 clamp(80px, 18vw, 180px)" }}
      >
        <div
          className="mx-auto px-5 sm:px-6 grid grid-cols-12 gap-6 md:gap-8 items-start"
          style={{ maxWidth: 1440 }}
        >
          <div className="col-span-12 md:col-span-7 md:pr-10">
            <p
              style={{
                fontFamily: tokens.fontTitle,
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(26px, 3vw, 36px)",
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
                color: palette.textPrimary,
                marginBottom: 44,
                maxWidth: 680,
              }}
            >
              {t("bio.intro")}
            </p>
            {paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: palette.textPrimary,
                  opacity: 0.92,
                  marginBottom: 28,
                  maxWidth: 620,
                  fontFamily: tokens.fontBody,
                  fontWeight: 300,
                }}
              >
                {p}
              </p>
            ))}
            <div className="flex flex-wrap gap-3 mt-8">
              <MegaButton
                href="/cv/Mathieu_Diep_CV.pdf"
                variant="outline"
                bg={palette.teal}
                fg={palette.teal}
                borderColor="rgba(217,166,72,0.55)"
              >
                <Download size={14} />
                {t("nav.downloadCv")}
              </MegaButton>
              <MegaButton
                href={`mailto:${profile.email}`}
                variant="outline"
                bg={palette.textPrimary}
                fg={palette.textPrimary}
                borderColor="rgba(239,233,221,0.25)"
              >
                {t("nav.contact")}
              </MegaButton>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5">
            <div
              className="relative overflow-hidden cinema-frame"
              style={{
                width: "100%",
                aspectRatio: "2 / 3",
                maxHeight: 720,
                background: "#000",
              }}
            >
              <img
                src="/portrait.jpg"
                alt=""
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div
          className="mx-auto mt-20 md:mt-32 mx-5 sm:mx-6 md:mx-auto"
          style={{
            maxWidth: 760,
            paddingLeft: "clamp(16px, 4vw, 40px)",
            borderLeft: "1px solid rgba(239,233,221,0.22)",
          }}
        >
          <q
            style={{
              fontFamily: tokens.fontTitle,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              color: palette.teal,
              quotes: "« \" \" »",
            }}
          >
            {t("bio.intro").split(".")[0]}.
          </q>
          <div
            style={{
              marginTop: 24,
              fontFamily: tokens.fontMono,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: palette.textSecondary,
            }}
          >
            — MD, NOTES PERSONNELLES
          </div>
        </div>
      </div>
    </section>
  );
}
