import { motion } from "framer-motion";
import { profile, projects, experiences } from "../data/mock";
import { PreviewBar } from "./VariantA";

const colors = {
  bg: "#FFFFFF",
  ink: "#0A0A0A",
  muted: "#6B6B6B",
  line: "#E5E5E5",
  accent: "#FF6B35",
};

export default function VariantE() {
  return (
    <div
      className="min-h-dvh"
      style={{
        background: colors.bg,
        color: colors.ink,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <PreviewBar accent={colors.accent} />

      <header
        className="max-w-3xl mx-auto px-6 pt-12 pb-6 flex items-center justify-between border-b"
        style={{ borderColor: colors.line }}
      >
        <span className="text-sm font-medium tracking-tight">Mathieu Diep</span>
        <nav className="flex gap-5 text-sm">
          <span className="font-medium">FR</span>
          <span style={{ color: colors.muted }}>EN</span>
          <span style={{ color: colors.muted }}>ES</span>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p
            className="text-sm uppercase tracking-[0.2em] mb-8"
            style={{ color: colors.muted }}
          >
            — Software Engineer · Paris
          </p>
          <h1
            className="text-5xl md:text-7xl leading-[1.05] tracking-tight font-medium mb-10"
            style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
          >
            Je construis des{" "}
            <em style={{ color: colors.accent, fontStyle: "italic", fontWeight: 400 }}>
              apps mobiles
            </em>{" "}
            <br />
            et des{" "}
            <em style={{ color: colors.accent, fontStyle: "italic", fontWeight: 400 }}>
              outils web
            </em>{" "}
            avec soin.
          </h1>
          <div className="grid md:grid-cols-[2fr_1fr] gap-10 max-w-2xl">
            <p className="text-lg leading-relaxed" style={{ color: colors.muted }}>
              {profile.bio}
            </p>
            <div className="space-y-3 text-sm">
              <div>
                <p style={{ color: colors.muted }}>Email</p>
                <a href={`mailto:${profile.email}`} className="font-medium underline-offset-4 hover:underline">
                  {profile.email}
                </a>
              </div>
              <div>
                <p style={{ color: colors.muted }}>Localisation</p>
                <p className="font-medium">{profile.location}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <div className="border-t" style={{ borderColor: colors.line }} />
      </div>

      {/* Projects */}
      <section id="projets" className="max-w-3xl mx-auto px-6 pt-20 pb-20">
        <div className="flex items-baseline justify-between mb-12">
          <h2
            className="text-3xl md:text-4xl font-medium tracking-tight"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Projets <em style={{ color: colors.accent }}>sélectionnés</em>
          </h2>
          <span className="text-xs font-mono" style={{ color: colors.muted }}>
            03
          </span>
        </div>
        <div className="space-y-0">
          {projects.map((p, i) => (
            <motion.a
              href="#"
              key={p.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group grid md:grid-cols-[60px_1fr_auto] gap-6 items-baseline py-8 border-b transition"
              style={{ borderColor: colors.line }}
            >
              <span className="text-sm font-mono" style={{ color: colors.muted }}>
                0{i + 1}
              </span>
              <div>
                <h3 className="text-2xl font-medium tracking-tight mb-1 group-hover:translate-x-1 transition">
                  {p.name}
                </h3>
                <p className="text-base mb-2" style={{ color: colors.muted }}>
                  {p.tagline}
                </p>
                <div className="flex gap-3 text-xs" style={{ color: colors.muted }}>
                  {p.stack.map((s) => (
                    <span key={s}>· {s}</span>
                  ))}
                </div>
              </div>
              <span
                className="text-sm font-medium opacity-0 group-hover:opacity-100 transition"
                style={{ color: colors.accent }}
              >
                voir →
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-20 border-t" style={{ borderColor: colors.line }}>
        <h2
          className="text-3xl md:text-4xl font-medium tracking-tight mb-12"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          Parcours
        </h2>
        <div className="space-y-10">
          {experiences.map((e) => (
            <div key={e.role + e.company} className="grid md:grid-cols-[160px_1fr] gap-6">
              <span className="text-sm font-mono" style={{ color: colors.muted }}>
                {e.period}
              </span>
              <div>
                <h3 className="text-lg font-medium mb-1">
                  {e.role} <span style={{ color: colors.muted }}>· {e.company}</span>
                </h3>
                <p style={{ color: colors.muted }}>{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer
        className="max-w-3xl mx-auto px-6 py-10 border-t flex items-center justify-between text-sm"
        style={{ borderColor: colors.line, color: colors.muted }}
      >
        <span>© 2025 Mathieu Diep</span>
        <div className="flex gap-5">
          <a href={profile.links.github} className="hover:text-black">GitHub</a>
          <a href={profile.links.linkedin} className="hover:text-black">LinkedIn</a>
          <a href={`mailto:${profile.email}`} className="hover:text-black">Email</a>
        </div>
      </footer>
    </div>
  );
}
