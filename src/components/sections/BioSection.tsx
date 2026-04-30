import { useTranslation } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { profile } from "../../data/profile";
import { PortraitTile } from "../ui/PortraitTile";
import { MegaButton } from "../ui/MegaButton";
import { Download } from "lucide-react";

export function BioSection() {
  const { t } = useTranslation();
  const paragraphs: string[] = t("bio.paragraphs", { returnObjects: true }) as unknown as string[];

  return (
    <section className="relative z-10 mx-auto px-6 pb-20" style={{ maxWidth: tokens.pageMaxWidth }}>
      <div className="grid grid-cols-12 gap-6 md:gap-8 items-center">
        <div className="col-span-12 md:col-span-5">
          <PortraitTile bg={palette.mint} size={420} />
        </div>
        <div className="col-span-12 md:col-span-7 flex flex-col">
          <p
            style={{
              fontFamily: tokens.fontTitle,
              fontWeight: 500,
              fontSize: "clamp(26px, 3vw, 42px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: palette.textPrimary,
            }}
          >
            {t("bio.intro")}
          </p>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="mt-4"
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: palette.textSecondary,
                maxWidth: 560,
              }}
            >
              {p}
            </p>
          ))}
          <div className="flex flex-wrap gap-3 mt-7">
            <MegaButton href="/cv/Mathieu_Diep_CV.pdf" bg={palette.teal} fg={palette.beige}>
              <Download size={16} />
              {t("nav.downloadCv")}
            </MegaButton>
            <MegaButton
              href={`mailto:${profile.email}`}
              variant="outline"
              bg={palette.teal}
              fg={palette.teal}
              borderColor="rgba(14,83,77,0.3)"
            >
              {t("nav.contact")}
            </MegaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
