import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import { palette, tokens } from "../../styles/palette";

type Props = {
  href: string;
  filename?: string;
};

export function DownloadButton({ href, filename }: Props) {
  const { t } = useTranslation();
  return (
    <a
      href={href}
      download={filename}
      rel="noreferrer"
      className="inline-flex items-center gap-2 transition-all hover:-translate-y-0.5"
      style={{
        background: palette.teal,
        color: palette.beige,
        border: `1px solid ${palette.teal}`,
        padding: "14px 28px",
        minHeight: 44,
        fontFamily: tokens.fontMono,
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        textDecoration: "none",
      }}
    >
      <Download size={14} />
      <span>{t("projects.downloadApk")}</span>
    </a>
  );
}
