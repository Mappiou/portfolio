import { useTranslation } from "react-i18next";

type Props = {
  bg: string;
  size?: number;
  src?: string;
  alt?: string;
};

export function PortraitTile({ bg, size = 420, src, alt }: Props) {
  const { t } = useTranslation();
  return (
    <div
      className="relative overflow-hidden cinema-frame"
      style={{
        width: "100%",
        aspectRatio: "1 / 1.05",
        maxHeight: size,
        borderRadius: 4,
        background: bg,
        boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
      }}
    >
      {src ? (
        <img src={src} alt={alt ?? ""} />
      ) : (
        <>
          <img
            src="https://picsum.photos/seed/mathieu-portrait-dark/600/900"
            alt={alt ?? ""}
            aria-hidden={!alt}
          />
          <span
            className="absolute bottom-3 right-4 text-xs"
            style={{
              color: "rgba(239,233,221,0.55)",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              zIndex: 4,
            }}
          >
            {t("ui.photoPlaceholder")}
          </span>
        </>
      )}
    </div>
  );
}
