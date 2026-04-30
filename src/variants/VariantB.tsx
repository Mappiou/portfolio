import { motion } from "framer-motion";
import { profile, projects, experiences } from "../data/mock";
import { PreviewBar } from "./VariantA";

const colors = {
  red: "#FF5252",
  blue: "#2962FF",
  yellow: "#FFD600",
  green: "#69F0AE",
  ink: "#0A0A0A",
  paper: "#FFF8F0",
};

export default function VariantB() {
  return (
    <div
      className="min-h-dvh"
      style={{
        background: colors.paper,
        color: colors.ink,
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}
    >
      <PreviewBar accent={colors.red} />

      <header className="max-w-6xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 flex items-center justify-center font-black border-[3px]"
            style={{ background: colors.yellow, borderColor: colors.ink }}
          >
            MD
          </div>
          <span className="text-xl font-bold tracking-tight">mathieu.diep</span>
        </div>
        <nav className="flex border-[3px]" style={{ borderColor: colors.ink }}>
          <span
            className="px-3 py-1.5 font-bold border-r-[3px]"
            style={{ borderColor: colors.ink, background: colors.green }}
          >
            FR
          </span>
          <span className="px-3 py-1.5 font-bold border-r-[3px]" style={{ borderColor: colors.ink }}>
            EN
          </span>
          <span className="px-3 py-1.5 font-bold">ES</span>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-20 relative overflow-hidden">
        <div className="absolute top-12 right-0 w-32 h-32 rounded-full" style={{ background: colors.yellow }} />
        <div
          className="absolute top-52 right-32 w-16 h-16 rotate-45"
          style={{ background: colors.red }}
        />
        <div
          className="absolute top-32 right-44 w-10 h-10 rounded-full border-[6px]"
          style={{ borderColor: colors.ink }}
        />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p
            className="inline-block text-sm font-bold uppercase tracking-wider px-4 py-2 mb-8 border-[3px]"
            style={{ background: colors.green, borderColor: colors.ink }}
          >
            ↓ scroll · {profile.location}
          </p>
          <h1 className="text-7xl md:text-9xl font-black leading-[0.9] tracking-tighter mb-8">
            Hello,
            <br />
            I'm{" "}
            <span
              className="inline-block px-4 py-1"
              style={{
                background: colors.red,
                color: colors.paper,
                transform: "rotate(-2deg)",
              }}
            >
              Mathieu.
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl font-medium leading-snug mb-10">
            {profile.bio}
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              className="px-7 py-4 font-bold text-lg border-[3px] shadow-[6px_6px_0_0_currentColor]"
              style={{
                background: colors.blue,
                color: colors.paper,
                borderColor: colors.ink,
              }}
              href="#projets"
            >
              VOIR PROJETS →
            </a>
            <a
              className="px-7 py-4 font-bold text-lg border-[3px] shadow-[6px_6px_0_0_currentColor]"
              style={{
                background: colors.paper,
                color: colors.ink,
                borderColor: colors.ink,
              }}
              href={`mailto:${profile.email}`}
            >
              CONTACT
            </a>
          </div>
        </motion.div>
      </section>

      {/* Marquee */}
      <div
        className="border-y-[3px] py-4 overflow-hidden whitespace-nowrap"
        style={{ background: colors.ink, color: colors.yellow, borderColor: colors.ink }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="inline-block text-2xl font-black"
        >
          {Array.from({ length: 8 })
            .map(() => "FLUTTER ◆ NEXT.JS ◆ TYPESCRIPT ◆ AI ◆ MOBILE ◆ WEB ◆ ")
            .join("")}
        </motion.div>
      </div>

      {/* Projects */}
      <section id="projets" className="max-w-6xl mx-auto px-6 pt-20 pb-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-3">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
            ↘ Projets
          </h2>
          <span
            className="text-sm font-bold px-3 py-1 border-[3px]"
            style={{ background: colors.yellow, borderColor: colors.ink }}
          >
            APK · QR CODE
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.a
              key={p.id}
              href="#"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="block border-[3px] p-6 shadow-[8px_8px_0_0_currentColor] transition"
              style={{
                background: [colors.red, colors.blue, colors.green][i],
                color: i === 2 ? colors.ink : colors.paper,
                borderColor: colors.ink,
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-5xl">{p.emoji}</div>
                <span className="font-mono text-xs">0{i + 1}</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-2">{p.name}</h3>
              <p className="text-sm font-medium mb-4 opacity-90">{p.tagline}</p>
              <div className="flex gap-1.5 flex-wrap mb-5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-bold px-2 py-0.5 border-[2px]"
                    style={{ borderColor: i === 2 ? colors.ink : colors.paper }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between font-bold uppercase tracking-wide text-sm">
                <span>Télécharger</span>
                <span className="text-2xl">↗</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Experiences */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-5xl font-black tracking-tighter mb-8">↗ Parcours</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {experiences.map((e, i) => (
            <div
              key={e.role + e.company}
              className="border-[3px] p-5"
              style={{
                borderColor: colors.ink,
                background: [colors.yellow, colors.paper, colors.green][i],
              }}
            >
              <span className="font-mono text-xs">{e.period}</span>
              <h3 className="text-xl font-bold mt-2 mb-1 tracking-tight">{e.role}</h3>
              <p className="text-sm font-medium opacity-80 mb-2">{e.company}</p>
              <p className="text-sm">{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer
        className="border-t-[3px] py-8 text-center font-bold tracking-wider uppercase text-sm"
        style={{ borderColor: colors.ink }}
      >
        © Mathieu Diep · {profile.email}
      </footer>
    </div>
  );
}
