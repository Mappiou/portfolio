import { Link } from "react-router-dom";

const variants = [
  {
    slug: "a-pastel",
    name: "A — Pastel friendly",
    desc: "Crème + rose/violet pastel, illustrations douces, chaleureux",
    swatches: ["#FFF8E7", "#FFB5C5", "#C8A8E9", "#FFE066"],
  },
  {
    slug: "b-memphis",
    name: "B — Memphis pop",
    desc: "Couleurs vives en blocs, formes géométriques, énergique",
    swatches: ["#FF5252", "#2962FF", "#FFD600", "#69F0AE"],
  },
  {
    slug: "c-sketchbook",
    name: "C — Sketchbook",
    desc: "Papier beige, croquis SVG, typo manuscrite, artisanal",
    swatches: ["#F5EBD9", "#1A1A1A", "#D97757", "#5B8C5A"],
  },
  {
    slug: "d-y2k",
    name: "D — Y2K rétro",
    desc: "Gradients holo, fond sombre, pixel art, nostalgique geek",
    swatches: ["#0A0A1F", "#00FFE0", "#FF00C8", "#FFD600"],
  },
  {
    slug: "e-minimal-light",
    name: "E — Minimaliste éditorial",
    desc: "Blanc + accent orange, typographique, beaucoup d'espace",
    swatches: ["#FFFFFF", "#FF6B35", "#1A1A1A", "#F5F5F5"],
  },
  {
    slug: "f-minimal-dark",
    name: "F — Minimaliste dark",
    desc: "Noir + accent vert lime, sobre dark, focus typo",
    swatches: ["#0A0A0A", "#B6FF00", "#1F1F1F", "#FAFAFA"],
  },
];

export default function PreviewIndex() {
  return (
    <main className="min-h-dvh bg-neutral-50 text-neutral-900 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
            Phase 0 — Design exploration
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Choisir un style visuel
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            6 maquettes statiques rendues avec le même contenu mocké. Cliquez sur chaque variante
            pour voir le rendu en plein écran. Comparez sur desktop et mobile, puis choisissez
            celle qui vous parle le plus.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {variants.map((v) => (
            <Link
              key={v.slug}
              to={`/preview/${v.slug}`}
              className="group block border border-neutral-200 rounded-2xl p-6 bg-white hover:border-neutral-900 transition"
            >
              <div className="flex gap-1.5 mb-4">
                {v.swatches.map((c) => (
                  <span
                    key={c}
                    className="w-8 h-8 rounded-md border border-neutral-200"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <h2 className="text-xl font-semibold mb-1.5 group-hover:underline">
                {v.name}
              </h2>
              <p className="text-sm text-neutral-600">{v.desc}</p>
              <p className="text-xs text-neutral-400 mt-3 font-mono">/preview/{v.slug}</p>
            </Link>
          ))}
        </div>

        <footer className="mt-16 text-sm text-neutral-500">
          Mathieu Diep · Portfolio v0 — Phase 0 / Design exploration
        </footer>
      </div>
    </main>
  );
}
