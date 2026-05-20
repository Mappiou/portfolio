import type { Translated } from "./types";

export type PassionItem = {
  id: string;
  label: Translated;
  flag?: string;
  /** Optional path to a photo (e.g. /images/passions/badminton.jpg). When unset, a tinted placeholder is shown */
  photoSrc?: string;
};

export type Passion = {
  id: string;
  icon: "sport" | "tech" | "travel";
  title: Translated;
  description: Translated;
  items: PassionItem[];
};

export { passions } from "../content";
