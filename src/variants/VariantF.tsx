import { motion } from "framer-motion";
import { profile, projects, experiences } from "../data/mock";
import { PreviewBar } from "./VariantA";

const colors = {
  bg: "#0A0A0A",
  surface: "#141414",
  border: "#262626",
  text: "#FAFAFA",
  muted: "#737373",
  accent: "#B6FF00",
};

export default function VariantF() {
  return (
    <div
      className="min-h-dvh"
      style={{
        background: colors.bg,
        color: colors.text,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <PreviewBar accent={colors.accent} />

      <header
        className="max-w-5xl mx-auto px-6 pt-10 pb-6 flex items-center justify-between border-b"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: colors.accent, boxShadow: `0 0 12px ${colors.accent}` }}
          />
          <span className="text-sm font-medium">Mathieu Diep</span>
          <span className="text-sm" style={{ color: colors.muted }}>
            / Software Engineer
          </span>
        </div>
        <nav className="flex gap-1 text-xs">
          <span
            className="px-2.5 py-1 rounded font-medium"
            style={{ background: colors.surface, color: colors.text }}
          >
            FR
          </span>
          <span className="px-2.5 py-1 rounded" style={{ color: colors.muted }}>
            EN
          </span>
          <span className="px-2.5 py-1 rounded" style={{ color: colors.muted }}>
            ES
          </span>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p
            className="text-sm font-mono mb-6 flex items-center gap-2"
            style={{ color: colors.accent }}
          >
            <span>›</span> Disponible pour de nouveaux projets
          </p>
          <h1 className="text-5xl md:text-7xl font-medium leading-[1.05] tracking-tighter mb-8">
            Software engineer
            <br />
            qui construit des{" "}
            <span style={{ color: colors.accent }}>apps utiles</span>.
          </h1>
          <p
            className="text-lg max-w-2xl leading-relaxed mb-10"
            style={{ color: colors.muted }}
          >
            {profile.bio}
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href="#projets"
              className="px-5 py-2.5 rounded-lg font-medium text-sm transition hover:opacity-90"
              style={{ background: colors.accent, color: colors.bg }}
            >
              Voir mes projets →
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="px-5 py-2.5 rounded-lg font-medium text-sm border transition"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              Me contacter
            </a>
          </div>
        </motion.div>
      </section>

      {/* Stats line */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div
          className="grid grid-cols-3 border-y py-6"
          style={{ borderColor: colors.border }}
        >
          {[
            { v: "3", l: "Apps Flutter" },
            { v: "2+", l: "Années d'XP" },
            { v: "FR/EN/ES", l: "Langues" },
          ].map((s) => (
            <div key={s.l} className="text-center border-r last:border-r-0" style={{ borderColor: colors.border }}>
              <p className="text-3xl font-medium tracking-tight" style={{ color: colors.accent }}>
                {s.v}
              </p>
              <p className="text-xs uppercase tracking-wider mt-1" style={{ color: colors.muted }}>
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projets" className="max-w-5xl mx-auto px-6 pb-24">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">Projets</h2>
          <span className="text-xs font-mono" style={{ color: colors.muted }}>
            ↘ 03 / téléchargeables APK
          </span>
        </div>
        <div className="space-y-3">
          {projects.map((p, i) => (
            <motion.a
              href="#"
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 4 }}
              className="group block border rounded-xl p-6 transition"
              style={{ borderColor: colors.border, background: colors.surface }}
            >
              <div className="flex items-center justify-between gap-6 flex-wrap">
                <div className="flex items-center gap-5 flex-1 min-w-0">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-xl shrink-0"
                    style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                  >
                    {p.emoji}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-medium tracking-tight mb-0.5">{p.name}</h3>
                    <p className="text-sm truncate" style={{ color: colors.muted }}>
                      {p.tagline}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{ background: colors.bg, color: colors.muted, border: `1px solid ${colors.border}` }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <span
                  className="text-sm font-medium transition opacity-50 group-hover:opacity-100"
                  style={{ color: colors.accent }}
                >
                  télécharger →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter mb-10">Parcours</h2>
        <div
          className="border rounded-xl overflow-hidden"
          style={{ borderColor: colors.border }}
        >
          {experiences.map((e, i) => (
            <div
              key={e.role + e.company}
              className={`p-5 grid md:grid-cols-[140px_1fr] gap-4 ${
                i < experiences.length - 1 ? "border-b" : ""
              }`}
              style={{ borderColor: colors.border, background: colors.surface }}
            >
              <span className="text-sm font-mono" style={{ color: colors.accent }}>
                {e.period}
              </span>
              <div>
                <h3 className="font-medium mb-1">
                  {e.role}{" "}
                  <span style={{ color: colors.muted }}>· {e.company}</span>
                </h3>
                <p className="text-sm" style={{ color: colors.muted }}>
                  {e.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer
        className="max-w-5xl mx-auto px-6 py-8 border-t flex items-center justify-between text-xs"
        style={{ borderColor: colors.border, color: colors.muted }}
      >
        <span className="font-mono">v0.1.0 · {profile.email}</span>
        <div className="flex gap-4">
          <a href={profile.links.github}>github</a>
          <a href={profile.links.linkedin}>linkedin</a>
        </div>
      </footer>
    </div>
  );
}
