import { QRCodeSVG } from "qrcode.react";
import { resolveAbsoluteUrl } from "../../lib/url";

type Props = {
  value: string;
  size?: number;
  bg?: string;
  fg?: string;
  ariaLabel?: string;
};

export function QRCode({ value, size = 160, bg = "#FFFFFF", fg = "#0E534D", ariaLabel }: Props) {
  const absoluteUrl = resolveAbsoluteUrl(value);
  return (
    <div
      className="inline-block p-3 rounded-2xl"
      style={{ background: bg, boxShadow: "0 4px 16px -6px rgba(14,83,77,0.18)" }}
    >
      <QRCodeSVG
        value={absoluteUrl}
        size={size}
        bgColor={bg}
        fgColor={fg}
        level="M"
        marginSize={0}
        title={ariaLabel ?? absoluteUrl}
      />
    </div>
  );
}
