import { motion } from "framer-motion";
import { profile, projects, experiences } from "../data/mock";
import { PreviewBar } from "./VariantA";

const colors = {
  bg: "#0A0A1F",
  bgMid: "#1A0F2E",
  cyan: "#00FFE0",
  magenta: "#FF00C8",
  yellow: "#FFD600",
  text: "#E0E0FF",
};

export default function VariantD() {
  return (
    <div
      className="min-h-dvh relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at top, ${colors.bgMid} 0%, ${colors.bg} 70%)`,
        color: colors.text,
        fontFamily: "'IBM Plex Mono', monospace",
      }}
    >
      {/* Scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)",
          mixBlendMode: "overlay",
        }}
      />
      {/* Grid floor */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 h-[55vh] opacity-30"
        style={{
          background: `linear-gradient(to top, ${colors.magenta}30 0%, transparent 100%)`,
          backgroundImage: `
            linear-gradient(${colors.cyan} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.cyan} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />

      <PreviewBar accent={colors.magenta} />

      <header className="max-w-6xl mx-auto px-6 pt-8 pb-2 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 flex items-center justify-center font-bold text-lg"
            style={{
              background: `linear-gradient(135deg, ${colors.cyan}, ${colors.magenta})`,
              color: colors.bg,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "10px",
            }}
          >
            MD
          </div>
          <span style={{ fontFamily: "VT323, monospace" }} className="text-3xl">
            mathieu_diep.exe
          </span>
        </div>
        <nav style={{ fontFamily: "VT323, monospace" }} className="text-2xl flex gap-1">
          <span
            className="px-2 border-2"
            style={{ borderColor: colors.cyan, color: colors.cyan, background: `${colors.cyan}20` }}
          >
            [FR]
          </span>
          <span className="px-2 opacity-50">[EN]</span>
          <span className="px-2 opacity-50">[ES]</span>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ fontFamily: "VT323, monospace", color: colors.cyan }}
          className="text-2xl mb-4"
        >
          ▸ welcome_to_my_portfolio.exe — loading...
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-7xl md:text-9xl font-bold leading-none mb-6 tracking-tight"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            color: colors.text,
            textShadow: `4px 4px 0 ${colors.magenta}, 8px 8px 0 ${colors.cyan}`,
          }}
        >
          MATHIEU
          <br />
          DIEP
        </motion.h1>
        <p
          className="text-2xl md:text-3xl mt-8 mb-2"
          style={{ fontFamily: "VT323, monospace", color: colors.yellow }}
        >
          ★ {profile.title} ★
        </p>
        <p className="text-lg max-w-2xl mx-auto opacity-80 mb-10">
          {profile.bio}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#projets"
            className="px-8 py-3 font-bold border-2 text-lg"
            style={{
              fontFamily: "VT323, monospace",
              fontSize: "1.6rem",
              background: colors.magenta,
              color: colors.bg,
              borderColor: colors.cyan,
              boxShadow: `0 0 20px ${colors.magenta}80`,
            }}
          >
            ▶ ENTER_PROJECTS
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href={`mailto:${profile.email}`}
            className="px-8 py-3 font-bold border-2 text-lg"
            style={{
              fontFamily: "VT323, monospace",
              fontSize: "1.6rem",
              background: "transparent",
              color: colors.cyan,
              borderColor: colors.cyan,
              boxShadow: `0 0 20px ${colors.cyan}40`,
            }}
          >
            ✉ CONTACT.MSG
          </motion.a>
        </div>
      </section>

      {/* Projects */}
      <section id="projets" className="max-w-6xl mx-auto px-6 pb-20 relative z-10">
        <p
          style={{ fontFamily: "VT323, monospace", color: colors.cyan }}
          className="text-2xl mb-2"
        >
          ▸ /projects
        </p>
        <h2
          style={{ fontFamily: "'Press Start 2P', monospace" }}
          className="text-3xl md:text-4xl mb-10"
        >
          MY APPS.zip
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.a
              href="#"
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="block border-2 p-5 backdrop-blur-sm relative overflow-hidden"
              style={{
                borderColor: [colors.cyan, colors.magenta, colors.yellow][i],
                background: `${colors.bgMid}99`,
                boxShadow: `0 0 25px ${[colors.cyan, colors.magenta, colors.yellow][i]}40`,
              }}
            >
              <div
                className="absolute top-2 right-2 text-xs font-mono"
                style={{ color: [colors.cyan, colors.magenta, colors.yellow][i] }}
              >
                [0{i + 1}]
              </div>
              <div className="text-5xl mb-4">{p.emoji}</div>
              <h3
                style={{ fontFamily: "VT323, monospace" }}
                className="text-3xl mb-2 leading-none"
              >
                {p.name}
              </h3>
              <p className="text-sm opacity-80 mb-4">{p.tagline}</p>
              <div className="flex gap-1 flex-wrap mb-5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-0.5 border"
                    style={{
                      borderColor: [colors.cyan, colors.magenta, colors.yellow][i],
                      color: [colors.cyan, colors.magenta, colors.yellow][i],
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div
                className="flex items-center justify-between text-sm font-bold"
                style={{ color: [colors.cyan, colors.magenta, colors.yellow][i] }}
              >
                <span>▶ DOWNLOAD.APK</span>
                <span>↗</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="max-w-5xl mx-auto px-6 pb-24 relative z-10">
        <p
          style={{ fontFamily: "VT323, monospace", color: colors.cyan }}
          className="text-2xl mb-2"
        >
          ▸ /timeline
        </p>
        <h2
          style={{ fontFamily: "'Press Start 2P', monospace" }}
          className="text-3xl mb-10"
        >
          BACKLOG.LOG
        </h2>
        <div
          className="border-2 p-6 font-mono text-sm space-y-3"
          style={{
            borderColor: colors.cyan,
            background: `${colors.bg}cc`,
          }}
        >
          {experiences.map((e) => (
            <div key={e.role + e.company} className="flex gap-3 items-baseline">
              <span style={{ color: colors.yellow }}>[{e.period}]</span>
              <span style={{ color: colors.magenta }}>{e.role}</span>
              <span className="opacity-60">@</span>
              <span style={{ color: colors.cyan }}>{e.company}</span>
              <span className="opacity-70">— {e.description}</span>
            </div>
          ))}
        </div>
      </section>

      <footer
        className="max-w-6xl mx-auto px-6 pb-12 text-center text-sm relative z-10"
        style={{ fontFamily: "VT323, monospace" }}
      >
        <p className="text-xl">
          <span style={{ color: colors.cyan }}>$</span> mailto:{profile.email}
        </p>
        <p className="text-base opacity-50 mt-2">© 2025 — Mathieu Diep · v1.0.0</p>
      </footer>
    </div>
  );
}
