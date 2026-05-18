import { useTranslation } from "react-i18next";
import { palette, tokens } from "../../styles/palette";

type Props = {
  bg: string;
  size?: number;
  src?: string;
  alt?: string;
};

export function PortraitTile({ bg, size = 420, src, alt }: Props) {
  const { t } = useTranslation();
  const fallback = "https://picsum.photos/seed/mathieu-portrait-tile/600/720";
  const finalSrc = src ?? fallback;
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "100%",
        aspectRatio: "4 / 5",
        maxHeight: size,
        background: bg,
      }}
    >
      <img
        src={finalSrc}
        alt={alt ?? ""}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "sepia(8%) saturate(110%)",
        }}
      />
      {!src && (
        <span
          className="absolute bottom-3 right-4"
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: palette.cream,
            mixBlendMode: "difference",
          }}
        >
          {t("ui.photoPlaceholder")}
        </span>
      )}
    </div>
  );
}
