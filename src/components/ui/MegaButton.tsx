import type { ReactNode } from "react";
import { tokens } from "../../styles/palette";

type Variant = "primary" | "outline";
type Props = {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  bg: string;
  fg: string;
  borderColor?: string;
  download?: string | boolean;
  external?: boolean;
};

export function MegaButton({
  variant = "primary",
  href,
  children,
  bg,
  fg,
  borderColor,
  download,
  external,
}: Props) {
  const Element = href ? "a" : "button";
  const baseStyle =
    variant === "primary"
      ? { background: bg, color: fg, border: `1px solid ${bg}` }
      : {
          background: "transparent",
          color: bg,
          border: `1px solid ${borderColor ?? bg}`,
        };

  return (
    <Element
      href={href}
      type={href ? undefined : "button"}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2.5 transition-all hover:-translate-y-0.5"
      style={{
        ...baseStyle,
        padding: "14px 26px",
        fontFamily: tokens.fontMono,
        fontSize: 11,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        textDecoration: "none",
        fontWeight: 500,
      }}
    >
      {children}
    </Element>
  );
}
