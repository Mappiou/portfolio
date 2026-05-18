import { useTranslation, Trans } from "react-i18next";
import { Trophy, Sparkles, Plane } from "lucide-react";
import type { ReactNode } from "react";
import { palette, tokens } from "../../styles/palette";
import { passions, type Passion, type PassionItem } from "../../data/passions";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import type { Language } from "../../i18n";

const iconFor: Record<Passion["icon"], ReactNode> = {
  sport: <Trophy size={20} />,
  tech: <Sparkles size={20} />,
  travel: <Plane size={20} />,
};

const tintFor: Record<Passion["icon"], string> = {
  sport: palette.mint,
  tech: palette.lilac,
  travel: palette.rust,
};

export function PassionsSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

  return (
    <section
      id="passions"
      className="relative z-10 mx-auto px-6 pb-24"
      style={{ maxWidth: tokens.pageMaxWidth }}
      aria-labelledby="passions-heading"
    >
      <div className="text-center mb-10">
        <p
          className="inline-block px-4 py-1.5 rounded-full mb-4"
          style={{
            background: "rgba(255,255,255,0.55)",
            color: palette.textSecondary,
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          ♡ {t("passions.kicker")}
        </p>
        <h2
          id="passions-heading"
          style={{
            fontFamily: tokens.fontTitle,
            fontWeight: 600,
            fontSize: "clamp(36px, 4.5vw, 64px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: palette.textPrimary,
          }}
        >
          <Trans
            i18nKey="passions.title"
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
      </div>

      <div className="flex flex-col gap-6">
        {passions.map((p) => (
          <PassionCard key={p.id} passion={p} lang={lang} />
        ))}
      </div>
    </section>
  );
}

function PassionCard({ passion, lang }: { passion: Passion; lang: Language }) {
  const tint = tintFor[passion.icon];
  const hasItems = passion.items.length > 0;

  return (
    <article
      className="rounded-3xl p-6 md:p-8"
      style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(14,83,77,0.10)",
      }}
    >
      {hasItems ? (
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8">
          <PassionHeader passion={passion} lang={lang} tint={tint} />
          <ItemGrid items={passion.items} lang={lang} tint={tint} />
        </div>
      ) : (
        <PassionHeader passion={passion} lang={lang} tint={tint} wide />
      )}
    </article>
  );
}

function PassionHeader({
  passion,
  lang,
  tint,
  wide,
}: {
  passion: Passion;
  lang: Language;
  tint: string;
  wide?: boolean;
}) {
  return (
    <div className="flex gap-5 md:gap-6 items-start">
      <span
        className="inline-flex items-center justify-center rounded-2xl shrink-0"
        style={{
          width: 48,
          height: 48,
          background: tint,
          color: palette.textPrimary,
        }}
        aria-hidden="true"
      >
        {iconFor[passion.icon]}
      </span>
      <div className="flex-1 min-w-0">
        <h3
          style={{
            fontFamily: tokens.fontTitle,
            fontWeight: 600,
            fontSize: "clamp(24px, 2.4vw, 34px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: palette.textPrimary,
          }}
        >
          {passion.title[lang]}
        </h3>
        <p
          className="mt-3"
          style={{
            fontSize: 15,
            lineHeight: 1.65,
            color: palette.textSecondary,
            maxWidth: wide ? 760 : 260,
          }}
        >
          {passion.description[lang]}
        </p>
      </div>
    </div>
  );
}

function ItemGrid({ items, lang, tint }: { items: PassionItem[]; lang: Language; tint: string }) {
  // Auto-fit grid: 1 → full row, 3 → 3 cols, 4 → 2x2 on mobile, 4 cols on desktop
  const cols = items.length === 1 ? "1" : items.length === 3 ? "3" : "auto";

  const gridStyle =
    cols === "1"
      ? { gridTemplateColumns: "minmax(0, 1fr)" }
      : cols === "3"
        ? { gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }
        : { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" };

  return (
    <div
      className="grid gap-3 md:gap-4 lg:[grid-template-columns:repeat(auto-fit,minmax(0,1fr))]"
      style={gridStyle}
    >
      {items.map((item) => (
        <ItemTile key={item.id} item={item} lang={lang} tint={tint} />
      ))}
    </div>
  );
}

function ItemTile({ item, lang, tint }: { item: PassionItem; lang: Language; tint: string }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-2xl"
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          background: item.photoSrc
            ? "transparent"
            : `linear-gradient(135deg, ${tint} 0%, rgba(255,255,255,0.4) 100%)`,
        }}
        aria-hidden="true"
      >
        {item.photoSrc ? (
          <img
            src={item.photoSrc}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <>
            {item.flag ? (
              <span
                style={{
                  fontSize: 48,
                  filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.12))",
                }}
              >
                {item.flag}
              </span>
            ) : null}
            <span
              className="absolute bottom-2 right-3 text-[10px]"
              style={{
                color: "rgba(14,83,77,0.55)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
              }}
            >
              {t("ui.photo")}
            </span>
          </>
        )}
      </div>
      <p
        className="mt-2 text-center"
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: palette.textPrimary,
          letterSpacing: "0.01em",
        }}
      >
        {item.label[lang]}
      </p>
    </div>
  );
}
