import { QRCodeSVG } from "qrcode.react";
import { sketchbook } from "../../styles/sketchbook";

type Props = {
  value: string;
  size?: number;
  ariaLabel?: string;
};

export function QRCode({ value, size = 160, ariaLabel }: Props) {
  return (
    <div
      className="inline-block p-3 border-2"
      style={{ borderColor: sketchbook.ink, background: sketchbook.paper }}
    >
      <QRCodeSVG
        value={value}
        size={size}
        bgColor={sketchbook.paper}
        fgColor={sketchbook.ink}
        level="M"
        marginSize={0}
        title={ariaLabel ?? value}
      />
    </div>
  );
}
