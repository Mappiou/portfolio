import { useTranslation, Trans } from "react-i18next";
import { Trophy, Sparkles, Plane } from "lucide-react";
import type { ReactNode } from "react";
import { palette, tokens } from "../../styles/palette";
import { passions, type Passion, type PassionItem } from "../../data/passions";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import type { Language } from "../../i18n";

const iconFor: Record<Passion["icon"], ReactNode> = {
  sport: <Trophy size={18} />,
  tech: <Sparkles size={18} />,
  travel: <Plane size={18} />,
};

const photoSeedFor: Record<string, string> = {
  badminton: "badminton",
  "beach-volley": "beach-volley",
  skating: "skating",
  trekking: "trekking",
  usa: "usa",
  "south-america": "south-america",
  asia: "asia",
  europe: "europe",
};

export function PassionsSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

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
        className="flex items-baseline justify-between mb-16 pb-6"
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

      <div className="flex flex-col" style={{ gap: "clamp(48px, 6vw, 80px)" }}>
        {passions.map((p, i) => (
          <PassionCard key={p.id} passion={p} lang={lang} index={i} />
        ))}
      </div>
    </section>
  );
}

function PassionCard({ passion, lang, index }: { passion: Passion; lang: Language; index: number }) {
  const hasItems = passion.items.length > 0;

  return (
    <article
      className="p-7 md:p-10"
      style={{
        background: palette.cream,
        border: `1px solid ${palette.hairline}`,
        borderRadius: 6,
      }}
    >
      {hasItems ? (
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10">
          <PassionHeader passion={passion} lang={lang} index={index} />
          <ItemGrid items={passion.items} lang={lang} />
        </div>
      ) : (
        <PassionHeader passion={passion} lang={lang} index={index} wide />
      )}
    </article>
  );
}

function PassionHeader({
  passion,
  lang,
  index,
  wide,
}: {
  passion: Passion;
  lang: Language;
  index: number;
  wide?: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  const labels = ["Sport", "Tech", "Voyage"];

  return (
    <div className="flex gap-5 md:gap-6 items-start" style={{ maxWidth: wide ? 760 : 320 }}>
      <span
        className="inline-flex items-center justify-center shrink-0"
        style={{
          width: 44,
          height: 44,
          color: palette.teal,
          border: `1px solid ${palette.hairlineStrong}`,
          borderRadius: 4,
        }}
        aria-hidden="true"
      >
        {iconFor[passion.icon]}
      </span>
      <div className="flex-1 min-w-0">
        <p
          className="mb-3"
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.teal,
            fontWeight: 500,
          }}
        >
          {num} — {labels[index] ?? passion.title[lang]}
        </p>
        <h3
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(28px, 3vw, 40px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.02,
            color: palette.textPrimary,
            margin: 0,
            marginBottom: 16,
            fontFeatureSettings: '"ss01", "ss02"',
          }}
        >
          {passion.title[lang]}
        </h3>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.65,
            color: palette.textSecondary,
            maxWidth: wide ? 620 : 360,
          }}
        >
          {passion.description[lang]}
        </p>
      </div>
    </div>
  );
}

function ItemGrid({ items, lang }: { items: PassionItem[]; lang: Language }) {
  const gridStyle =
    items.length === 1
      ? { gridTemplateColumns: "minmax(0, 1fr)" }
      : items.length === 3
        ? { gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }
        : { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" };

  return (
    <div className="grid gap-4 md:gap-5" style={gridStyle}>
      {items.map((item) => (
        <ItemTile key={item.id} item={item} lang={lang} />
      ))}
    </div>
  );
}

function ItemTile({ item, lang }: { item: PassionItem; lang: Language }) {
  const seed = photoSeedFor[item.id] ?? item.id;
  const src = item.photoSrc ?? `https://picsum.photos/seed/${seed}/600/450`;
  return (
    <div className="flex flex-col">
      <div className="overflow-hidden" style={{ aspectRatio: "14 / 10" }}>
        <img
          src={src}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "sepia(10%) saturate(112%)",
          }}
        />
      </div>
      <p
        className="mt-2"
        style={{
          fontFamily: tokens.fontItalic,
          fontStyle: "italic",
          fontSize: 13,
          color: palette.textSecondary,
        }}
      >
        — {item.label[lang]}
      </p>
    </div>
  );
}
