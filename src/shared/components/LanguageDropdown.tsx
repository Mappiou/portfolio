const LANGUAGES = ["fr", "en", "es"] as const;
export type DropdownLang = (typeof LANGUAGES)[number];

type Props = {
  value: DropdownLang;
  onChange: (lang: DropdownLang) => void;
};

export function LanguageDropdown({ value, onChange }: Props) {
  return (
    <div
      role="group"
      aria-label="Choisir la langue"
      style={{
        display: "flex",
        gap: "0.75rem",
        fontFamily: "'Inter Tight', system-ui, sans-serif",
        fontSize: "0.95rem",
        letterSpacing: "0.04em",
      }}
    >
      {LANGUAGES.map((lang) => {
        const isActive = lang === value;
        return (
          <button
            key={lang}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(lang)}
            style={{
              background: "transparent",
              border: "none",
              padding: "0.25rem 0",
              color: "inherit",
              cursor: "pointer",
              textTransform: "uppercase",
              textDecoration: isActive ? "underline" : "none",
              opacity: isActive ? 1 : 0.65,
            }}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
}
