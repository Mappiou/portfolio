import { Trans, useTranslation } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { passions, type Passion, type PassionItem } from "../../data/passions";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { ChapterCard } from "../ui/ChapterCard";
import type { Language } from "../../i18n";

const romans = ["i", "ii", "iii", "iv"];

export function PassionsSection() {
  const lang = useLanguageRoute();
  const { t } = useTranslation();
  const sport = passions.find((p) => p.id === "sport");
  const tech = passions.find((p) => p.id === "tech");

  return (
    <section id="passions" className="relative w-full" aria-labelledby="passions-heading">
      <ChapterCard
        chapter="CHAPITRE 05"
        bgSrc="https://picsum.photos/seed/mountain-cinema/1800/600"
        headingId="passions-heading"
        title={
          <>
            <Trans
              i18nKey="passions.title"
              components={{
                italic: <span style={{ fontStyle: "italic" }} />,
              }}
            />
            <span style={{ color: palette.teal }}>.</span>
          </>
        }
      />

      <div
        className="relative mx-auto px-6"
        style={{ padding: "80px 24px 140px", maxWidth: tokens.pageMaxWidth }}
      >
        {sport && (
          <SportAct passion={sport} lang={lang} t={t} />
        )}

        {tech && (
          <div className="mt-24 md:mt-32">
            <TechBlock passion={tech} lang={lang} t={t} />
          </div>
        )}
      </div>
    </section>
  );
}

function SportAct({
  passion,
  lang,
  t,
}: {
  passion: Passion;
  lang: Language;
  t: (k: string) => string;
}) {
  return (
    <div>
      {/* Block kicker */}
      <p
        className="mb-3"
        style={{
          fontFamily: tokens.fontMono,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: palette.teal,
        }}
      >
        — Acte I · {passion.title[lang]}
      </p>
      <h3
        className="mb-6"
        style={{
          fontFamily: tokens.fontTitle,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(38px, 4.5vw, 60px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.02,
          color: palette.textPrimary,
        }}
      >
        Le corps,{" "}
        <span style={{ color: palette.teal, fontStyle: "italic" }}>en mouvement</span>
        <span style={{ color: palette.teal }}>.</span>
      </h3>
      <p
        className="mb-16"
        style={{
          fontFamily: tokens.fontBody,
          fontWeight: 300,
          fontSize: 17,
          lineHeight: 1.7,
          color: palette.textPrimary,
          opacity: 0.85,
          maxWidth: 640,
        }}
      >
        {passion.description[lang]}
      </p>

      <div className="flex flex-col" style={{ gap: 0 }}>
        {passion.items.map((item, idx) => (
          <Scene
            key={item.id}
            item={item}
            lang={lang}
            t={t}
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
  t: _t,
  index,
  total,
}: {
  item: PassionItem;
  lang: Language;
  t: (k: string) => string;
  index: number;
  total: number;
}) {
  void _t;
  const reverse = index % 2 === 1;
  const isLast = index === total - 1;
  const aspect = item.aspect ?? "16/10";
  const frameLabel = `Frame ${String(index + 1).padStart(2, "0")}`;
  // Amber accent on one frame only (index 2 = patinage, like the mockup)
  const amberAccent = index === 2;
  const photoSeed = item.photoSeed ?? item.id;

  return (
    <div className="relative">
      <div
        className="grid grid-cols-1 md:grid-cols-2 items-center"
        style={{
          gap: "clamp(32px, 5vw, 72px)",
          padding: "48px 0",
          direction: "ltr",
        }}
      >
        <div
          className="cinema-frame relative"
          style={{
            order: reverse ? 2 : 1,
            width: "100%",
            aspectRatio: aspect,
          }}
        >
          <img
            src={
              item.photoSrc ??
              `https://picsum.photos/seed/${photoSeed}/${aspect === "4/5" ? "640/800" : "900/562"}`
            }
            alt=""
            aria-hidden="true"
          />
          {/* Frame tag, top-left */}
          <span
            aria-hidden="true"
            className="absolute"
            style={{
              top: 12,
              left: 12,
              padding: "4px 8px",
              fontFamily: tokens.fontMono,
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: amberAccent ? palette.teal : palette.textPrimary,
              background: amberAccent
                ? "rgba(217,166,72,0.12)"
                : "rgba(14,13,11,0.45)",
              border: amberAccent
                ? `1px solid ${palette.teal}`
                : "1px solid rgba(239,233,221,0.18)",
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
              bottom: 8,
              right: 16,
              fontFamily: tokens.fontTitle,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 64,
              lineHeight: 1,
              color: palette.textPrimary,
              opacity: 0.55,
              textShadow: "0 4px 16px rgba(0,0,0,0.5)",
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
              fontWeight: 300,
              fontSize: "clamp(30px, 3.6vw, 48px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: palette.textPrimary,
            }}
          >
            {item.label[lang]}
            <span style={{ color: palette.teal }}>.</span>
          </h4>
          {item.prose && (
            <p
              style={{
                fontFamily: tokens.fontBody,
                fontWeight: 300,
                fontSize: 16,
                lineHeight: 1.7,
                color: palette.textPrimary,
                opacity: 0.82,
                maxWidth: 460,
              }}
            >
              {item.prose[lang]}
            </p>
          )}
        </div>
      </div>

      {/* Center-weighted hairline divider between scenes */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="block"
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, rgba(239,233,221,0) 0%, rgba(239,233,221,0.18) 50%, rgba(239,233,221,0) 100%)",
          }}
        />
      )}
    </div>
  );
}

function TechBlock({
  passion,
  lang,
  t: _t,
}: {
  passion: Passion;
  lang: Language;
  t: (k: string) => string;
}) {
  void _t;
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
      <div>
        <p
          className="mb-3"
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.teal,
          }}
        >
          — Acte II
        </p>
        <h3
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(32px, 4vw, 52px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: palette.textPrimary,
          }}
        >
          {passion.title[lang]}
          <span style={{ color: palette.teal }}>.</span>
        </h3>
      </div>
      <p
        style={{
          fontFamily: tokens.fontBody,
          fontWeight: 300,
          fontSize: 17,
          lineHeight: 1.75,
          color: palette.textPrimary,
          opacity: 0.85,
        }}
      >
        {passion.description[lang]}
      </p>
    </div>
  );
}
