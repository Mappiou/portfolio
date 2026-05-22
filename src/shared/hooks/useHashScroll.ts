import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Block = ScrollLogicalPosition;

const BLOCK_FOR_HASH: Record<string, Block> = {
  "job-lincoln": "start",
  contact: "start",
};

export function scrollToHashTarget(hash: string): boolean {
  if (typeof window === "undefined") return false;
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  const block: Block = BLOCK_FOR_HASH[id] ?? "start";
  el.scrollIntoView({ behavior: "smooth", block });
  return true;
}

export function useHashScroll() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    let attempts = 0;
    const tick = () => {
      if (scrollToHashTarget(hash)) return;
      attempts += 1;
      if (attempts < 30) {
        window.setTimeout(tick, 50);
      }
    };
    tick();
  }, [hash, pathname]);
}
