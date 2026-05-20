import { useTranslation, Trans } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { passions, type Passion, type PassionItem } from "@shared/data/passions";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import type { Language } from "@shared/i18n";

const romans = ["i", "ii", "iii", "iv"];

export function PassionsSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const sport = passions.find((p) => p.id === "sport");
  const tech = passions.find((p) => p.id === "tech");

  return (
    <section
      id="passions"
      className="relative z-10 mx-auto px-6 md:px-10"
      style={{
        maxWidth: tokens.pageMaxWidth,
        paddingTop: "clamp(80px, 11vw, 140px)",
        paddingBottom: "clamp(80px, 11vw, 140px)",
      }}
      aria-labelledby="passions-heading"
    >
      <div
        className="flex items-baseline justify-between mb-12 pb-6"
        style={{ borderBottom: `1px solid ${palette.hairline}` }}
      >
        <h2
          id="passions-heading"
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
          <Trans
            i18nKey="passions.title"
            components={{
              italic: (
                <span style={{ fontStyle: "italic", color: palette.teal }} />
              ),
            }}
          />
        </h2>
        <span
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.textSecondary,
            whiteSpace: "nowrap",
          }}
        >
          § {t("passions.kicker").toUpperCase()}
        </span>
      </div>

      {sport && <SportAct passion={sport} lang={lang} />}

      {tech && (
        <div className="mt-20 md:mt-28">
          <TechBlock passion={tech} lang={lang} />
        </div>
      )}
    </section>
  );
}

function SportAct({ passion, lang }: { passion: Passion; lang: Language }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-10 mb-12">
        <div>
          <p
            className="mb-2"
            style={{
              fontFamily: tokens.fontMono,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: palette.teal,
              fontWeight: 500,
            }}
          >
            I — {passion.title[lang]}
          </p>
          <p
            style={{
              fontFamily: tokens.fontMono,
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: palette.textSecondary,
            }}
          >
            4 disciplines
          </p>
        </div>
        <div>
          <h3
            className="mb-4"
            style={{
              fontFamily: tokens.fontTitle,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(34px, 4vw, 52px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: palette.textPrimary,
              fontFeatureSettings: '"ss01", "ss02"',
              maxWidth: 720,
            }}
          >
            Le corps, <span style={{ color: palette.teal }}>en mouvement.</span>
          </h3>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: palette.textSecondary,
              maxWidth: 640,
            }}
          >
            {passion.description[lang]}
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        {passion.items.map((item, idx) => (
          <Scene
            key={item.id}
            item={item}
            lang={lang}
            index={idx}
            total={passion.items.length}
          />
        ))}
      </div>
    </div>
  );
}

function Scene({
  item,
  lang,
  index,
  total,
}: {
  item: PassionItem;
  lang: Language;
  index: number;
  total: number;
}) {
  const reverse = index % 2 === 1;
  const isLast = index === total - 1;
  const aspect = item.aspect ?? "16/10";
  const frameLabel = `No. ${String(index + 1).padStart(2, "0")} / IV`;
  const rustAccent = index === 2;
  const photoSeed = item.photoSeed ?? item.id;

  return (
    <div className="relative">
      <div
        className="grid grid-cols-1 md:grid-cols-2 items-center"
        style={{
          gap: "clamp(32px, 5vw, 72px)",
          padding: "clamp(36px, 4vw, 56px) 0",
        }}
      >
        <div
          className="overflow-hidden relative"
          style={{
            order: reverse ? 2 : 1,
            width: "100%",
            aspectRatio: aspect,
            background: palette.beigeDeep,
          }}
        >
          <img
            src={
              item.photoSrc ??
              `https://picsum.photos/seed/${photoSeed}/${aspect === "4/5" ? "640/800" : "900/562"}`
            }
            alt=""
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "sepia(8%) saturate(110%) contrast(0.97)",
            }}
          />
          {/* Folio label, top-left */}
          <span
            aria-hidden="true"
            className="absolute"
            style={{
              top: 10,
              left: 10,
              padding: "4px 8px",
              fontFamily: tokens.fontMono,
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: rustAccent ? palette.cream : palette.textPrimary,
              background: rustAccent ? palette.teal : palette.cream,
              border: `1px solid ${rustAccent ? palette.teal : palette.hairlineStrong}`,
              zIndex: 3,
            }}
          >
            {frameLabel}
          </span>
          {/* Italic roman numeral, bottom-right */}
          <span
            aria-hidden="true"
            className="absolute"
            style={{
              bottom: 4,
              right: 14,
              fontFamily: tokens.fontTitle,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 64,
              lineHeight: 1,
              color: palette.cream,
              opacity: 0.75,
              textShadow: "0 2px 8px rgba(31,26,20,0.35)",
              zIndex: 3,
            }}
          >
            {romans[index]}
          </span>
        </div>

        <div style={{ order: reverse ? 1 : 2 }}>
          {item.kicker && (
            <p
              className="mb-3"
              style={{
                fontFamily: tokens.fontMono,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: palette.textSecondary,
              }}
            >
              {String(index + 1).padStart(2, "0")} — {item.kicker[lang]}
            </p>
          )}
          <h4
            className="mb-4"
            style={{
              fontFamily: tokens.fontTitle,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(28px, 3.4vw, 44px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: palette.textPrimary,
              fontFeatureSettings: '"ss01", "ss02"',
            }}
          >
            {item.label[lang]}
            <span style={{ color: palette.teal }}>.</span>
          </h4>
          {item.prose && (
            <p
              style={{
                fontFamily: tokens.fontBody,
                fontSize: 16,
                lineHeight: 1.7,
                color: palette.textPrimary,
                maxWidth: 460,
              }}
            >
              {item.prose[lang]}
            </p>
          )}
        </div>
      </div>

      {!isLast && (
        <span
          aria-hidden="true"
          className="block"
          style={{
            height: 1,
            background: `linear-gradient(90deg, transparent 0%, ${palette.hairlineStrong} 50%, transparent 100%)`,
          }}
        />
      )}
    </div>
  );
}

function TechBlock({ passion, lang }: { passion: Passion; lang: Language }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-10 items-start">
      <div>
        <p
          className="mb-2"
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.teal,
            fontWeight: 500,
          }}
        >
          II — Tech
        </p>
      </div>
      <div>
        <h3
          className="mb-4"
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(28px, 3.4vw, 44px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            color: palette.textPrimary,
            fontFeatureSettings: '"ss01", "ss02"',
          }}
        >
          {passion.title[lang]}
          <span style={{ color: palette.teal }}>.</span>
        </h3>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: palette.textPrimary,
            maxWidth: 720,
          }}
        >
          {passion.description[lang]}
        </p>
      </div>
    </div>
  );
}
