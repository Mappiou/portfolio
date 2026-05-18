import { Trans } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { passions, type Passion, type PassionItem } from "../../data/passions";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { ChapterCard } from "../ui/ChapterCard";
import type { Language } from "../../i18n";

const photoSeedFor: Record<string, string> = {
  sport: "badminton-cinema",
  tech: "tech-cinema",
  travel: "travel-cinema",
};

export function PassionsSection() {
  const lang = useLanguageRoute();

  return (
    <section id="passions" className="relative w-full" aria-labelledby="passions-heading">
      <ChapterCard
        chapter="CHAPITRE 04"
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
        style={{ padding: "100px 24px 180px", maxWidth: tokens.pageMaxWidth }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {passions.map((p) => (
            <PassionBlock key={p.id} passion={p} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PassionBlock({ passion, lang }: { passion: Passion; lang: Language }) {
  const photoSeed = photoSeedFor[passion.id] ?? `${passion.id}-cinema`;
  return (
    <div className="flex flex-col">
      <h3
        style={{
          fontFamily: tokens.fontTitle,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(36px, 4vw, 56px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          color: palette.textPrimary,
          marginBottom: 24,
        }}
      >
        {passion.title[lang]}
        <span style={{ color: palette.teal }}>.</span>
      </h3>
      <p
        style={{
          fontFamily: tokens.fontBody,
          fontWeight: 300,
          fontSize: 17,
          lineHeight: 1.7,
          color: palette.textPrimary,
          opacity: 0.85,
          marginBottom: 32,
          maxWidth: 520,
        }}
      >
        {passion.description[lang]}
      </p>
      <div
        className="cinema-frame mb-6"
        style={{
          width: "100%",
          aspectRatio: "5 / 4",
        }}
      >
        <img
          src={`https://picsum.photos/seed/${photoSeed}/500/400`}
          alt=""
          aria-hidden="true"
        />
      </div>
      {passion.items.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {passion.items.map((item) => (
            <Pill key={item.id} item={item} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}

function Pill({ item, lang }: { item: PassionItem; lang: Language }) {
  return (
    <span
      className="inline-flex items-center gap-1.5"
      style={{
        padding: "6px 14px",
        border: "1px solid rgba(239,233,221,0.18)",
        background: "rgba(239,233,221,0.03)",
        fontFamily: tokens.fontMono,
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: palette.textSecondary,
      }}
    >
      {item.flag && (
        <span aria-hidden="true" style={{ fontSize: 12 }}>
          {item.flag}
        </span>
      )}
      {item.label[lang]}
    </span>
  );
}
