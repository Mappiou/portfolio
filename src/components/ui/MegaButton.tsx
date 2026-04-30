import type { ReactNode } from "react";

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
      ? { background: bg, color: fg, border: `1.5px solid ${bg}` }
      : {
          background: "transparent",
          color: bg,
          border: `1.5px solid ${borderColor ?? bg}`,
        };

  return (
    <Element
      href={href}
      type={href ? undefined : "button"}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-full font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg"
      style={{
        ...baseStyle,
        padding: "16px 32px",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 17,
        textDecoration: "none",
      }}
    >
      {children}
    </Element>
  );
}
