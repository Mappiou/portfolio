import { useTranslation } from "react-i18next";
import { sketchbook } from "../../styles/sketchbook";

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
      className="inline-flex items-center gap-2 px-5 py-3 border-2 hover:opacity-80 transition"
      style={{
        borderColor: sketchbook.ink,
        background: sketchbook.red,
        color: sketchbook.paper,
        fontFamily: "Caveat, cursive",
        fontSize: "1.5rem",
      }}
      rel="noreferrer"
    >
      <span>↓</span>
      <span>{t("projects.downloadApk")}</span>
    </a>
  );
}
