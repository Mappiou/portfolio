import { useTranslation, Trans } from "react-i18next";
import { palette, tokens } from "../../styles/palette";

export function Hero() {
  const { t } = useTranslation();
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100dvh",
        marginTop: 0,
      }}
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <img
          src="https://picsum.photos/seed/mathieu-cinema/1800/1100"
          alt=""
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "contrast(112%) saturate(82%) brightness(76%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,13,11,0.55) 0%, rgba(14,13,11,0.15) 30%, rgba(14,13,11,0.85) 100%), radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 flex flex-col justify-end"
        style={{
          zIndex: 2,
          padding:
            "0 clamp(20px, 6vw, 80px) clamp(48px, 10vw, 96px)",
        }}
      >
        <p
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.textPrimary,
            opacity: 0.7,
            marginBottom: 28,
          }}
        >
          {t("hero.kicker")} · MATHIEU DIEP · BARCELONA · AI ENGINEER
        </p>
        <h1
          style={{
            fontFamily: tokens.fontTitle,
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(56px, 16vw, 220px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: palette.textPrimary,
            margin: 0,
            wordBreak: "break-word",
          }}
        >
          <Trans
            i18nKey="hero.title"
            components={{
              italic: (
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontFamily: tokens.fontItalic,
                  }}
                />
              ),
            }}
          />
        </h1>
        <div
          className="flex flex-wrap gap-7"
          style={{
            marginTop: 24,
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.textPrimary,
            opacity: 0.55,
          }}
        >
          <span>{t("hero.sceneLabel")}</span>
          <span>41°23′N · 2°09′E</span>
          <span>{t("hero.dateLabel")}</span>
        </div>
      </div>
    </section>
  );
}
