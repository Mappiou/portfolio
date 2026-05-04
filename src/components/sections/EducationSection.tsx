import { useTranslation, Trans } from "react-i18next";
import { GraduationCap, Plane, MapPin } from "lucide-react";
import { palette, tokens } from "../../styles/palette";
import { education } from "../../data/education";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import type { Education } from "../../data/types";
import type { Language } from "../../i18n";

export function EducationSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

  const degrees = education.filter((e) => e.kind === "degree");
  const exchanges = education.filter((e) => e.kind === "exchange");

  return (
    <section
      id="education"
      className="relative z-10 mx-auto px-6 pb-24"
      style={{ maxWidth: tokens.pageMaxWidth }}
      aria-labelledby="education-heading"
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
          ✱ {t("education.kicker")}
        </p>
        <h2
          id="education-heading"
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
            i18nKey="education.title"
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

      {/* Degrees: 2-col grid on md+ */}
      <p
        className="text-xs uppercase tracking-[0.18em] text-center mb-5"
        style={{ color: palette.textSecondary, fontWeight: 600 }}
      >
        — {t("education.degreesLabel")} —
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {degrees.map((edu) => (
          <DegreeCard key={edu.id} edu={edu} lang={lang} />
        ))}
      </div>

      {/* Exchanges: 2-col grid on md+, with photo placeholder */}
      <p
        className="text-xs uppercase tracking-[0.18em] text-center mb-5"
        style={{ color: palette.textSecondary, fontWeight: 600 }}
      >
        — {t("education.exchangesLabel")} —
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {exchanges.map((edu, i) => (
          <ExchangeCard key={edu.id} edu={edu} lang={lang} accentIndex={i} />
        ))}
      </div>
    </section>
  );
}

function DegreeCard({ edu, lang }: { edu: Education; lang: Language }) {
  return (
    <article
      className="rounded-3xl p-6 md:p-7 flex flex-col"
      style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(14,83,77,0.10)",
      }}
    >
      <div className="flex items-start gap-4 mb-3">
        <span
          className="shrink-0 inline-flex items-center justify-center rounded-2xl"
          style={{
            width: 48,
            height: 48,
            background: palette.teal,
            color: palette.beige,
          }}
          aria-hidden="true"
        >
          <GraduationCap size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p
            className="text-xs uppercase tracking-[0.15em]"
            style={{ color: palette.textSecondary, fontWeight: 600 }}
          >
            {edu.period[lang]}
          </p>
          <h3
            className="mt-1"
            style={{
              fontFamily: tokens.fontTitle,
              fontWeight: 600,
              fontSize: "clamp(18px, 1.6vw, 22px)",
              letterSpacing: "-0.015em",
              lineHeight: 1.2,
              color: palette.textPrimary,
            }}
          >
            {edu.title[lang]}
          </h3>
        </div>
      </div>
      <p className="text-sm mb-3 italic" style={{ color: palette.textSecondary }}>
        {edu.school}
      </p>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: palette.textPrimary,
          opacity: 0.85,
        }}
      >
        {edu.description[lang]}
      </p>
    </article>
  );
}

function ExchangeCard({
  edu,
  lang,
  accentIndex,
}: {
  edu: Education;
  lang: Language;
  accentIndex: number;
}) {
  // Different pastel for Canada vs China
  const accents = [palette.lilac, palette.rust];
  const tint = accents[accentIndex % accents.length] ?? palette.mint;

  return (
    <article
      className="rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(14,83,77,0.10)",
      }}
    >
      <PhotoPlaceholder photoSrc={edu.photoSrc} flag={edu.flag} tint={tint} alt={edu.location} />
      <div className="p-6 md:p-7 flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          <span
            className="shrink-0 inline-flex items-center justify-center rounded-2xl"
            style={{
              width: 44,
              height: 44,
              background: tint,
              color: palette.textPrimary,
            }}
            aria-hidden="true"
          >
            <Plane size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p
              className="text-xs uppercase tracking-[0.15em]"
              style={{ color: palette.textSecondary, fontWeight: 600 }}
            >
              {edu.period[lang]}
            </p>
            <h3
              className="mt-1 flex items-center gap-2"
              style={{
                fontFamily: tokens.fontTitle,
                fontWeight: 600,
                fontSize: "clamp(20px, 1.8vw, 26px)",
                letterSpacing: "-0.015em",
                lineHeight: 1.15,
                color: palette.textPrimary,
              }}
            >
              <span>{edu.title[lang]}</span>
              {edu.flag && (
                <span aria-hidden="true" style={{ fontSize: "0.85em" }}>
                  {edu.flag}
                </span>
              )}
            </h3>
          </div>
        </div>
        <p
          className="inline-flex items-center gap-1.5 text-xs mb-3"
          style={{ color: palette.textSecondary }}
        >
          <MapPin size={12} aria-hidden="true" />
          <span>{edu.location}</span>
        </p>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: palette.textPrimary,
            opacity: 0.85,
          }}
        >
          {edu.description[lang]}
        </p>
      </div>
    </article>
  );
}

function PhotoPlaceholder({
  photoSrc,
  flag,
  tint,
  alt,
}: {
  photoSrc?: string;
  flag?: string;
  tint: string;
  alt: string;
}) {
  if (photoSrc) {
    return (
      <img
        src={photoSrc}
        alt={alt}
        style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }}
      />
    );
  }
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        background: `linear-gradient(135deg, ${tint} 0%, rgba(255,255,255,0.4) 100%)`,
      }}
      aria-hidden="true"
    >
      {flag && (
        <span
          style={{
            fontSize: 80,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
          }}
        >
          {flag}
        </span>
      )}
      <span
        className="absolute bottom-3 right-4 text-xs"
        style={{
          color: "rgba(14,83,77,0.55)",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
        }}
      >
        photo placeholder
      </span>
    </div>
  );
}
