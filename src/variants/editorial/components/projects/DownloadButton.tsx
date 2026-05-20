import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import { palette } from "../../styles/palette";

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
      className="inline-flex items-center gap-2 rounded-full font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg"
      style={{
        background: palette.teal,
        color: palette.beige,
        border: `1.5px solid ${palette.teal}`,
        padding: "14px 26px",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 16,
        textDecoration: "none",
      }}
    >
      <Download size={16} />
      <span>{t("projects.downloadApk")}</span>
    </a>
  );
}
