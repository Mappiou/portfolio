export const sketchbook = {
  paper: "#F5EBD9",
  paperDark: "#E8DCC4",
  ink: "#1A1A1A",
  inkSoft: "#444",
  red: "#D97757",
  green: "#5B8C5A",
  blue: "#4A6FA5",
  yellow: "#E8B84F",
} as const;

export type SketchAccent = "red" | "green" | "blue" | "yellow";

export const accentMap: Record<SketchAccent, string> = {
  red: sketchbook.red,
  green: sketchbook.green,
  blue: sketchbook.blue,
  yellow: sketchbook.yellow,
};

export const paperBackground =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='2' /%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";
