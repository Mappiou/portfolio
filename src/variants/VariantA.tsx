import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { profile, projects, experiences } from "../data/mock";

export default function VariantA() {
  return (
    <div
      className="min-h-dvh"
      style={{
        background:
          "radial-gradient(circle at 20% 10%, #FFE066 0%, transparent 35%), radial-gradient(circle at 80% 30%, #FFB5C5 0%, transparent 40%), radial-gradient(circle at 50% 90%, #C8A8E9 0%, transparent 40%), #FFF8E7",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#3A2E45",
      }}
    >
      <PreviewBar accent="#C8A8E9" />

      <header className="max-w-5xl mx-auto px-6 pt-10 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
            style={{ background: "#FFB5C5" }}
          >
            ✿
          </div>
          <span style={{ fontFamily: "Fraunces, serif" }} className="text-xl font-semibold">
            mathieu
          </span>
        </div>
        <nav className="flex gap-1 text-sm bg-white/60 backdrop-blur-sm rounded-full px-2 py-1.5 border border-white">
          <span className="px-3 py-1 rounded-full bg-white shadow-sm">FR</span>
          <span className="px-3 py-1 text-neutral-500">EN</span>
          <span className="px-3 py-1 text-neutral-500">ES</span>
        </nav>
      </header>

      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-[1fr_auto] gap-10 items-center"
        >
          <div>
            <p
              className="inline-block text-sm px-4 py-1.5 rounded-full mb-6"
              style={{ background: "#FFE066", color: "#5C3A00" }}
            >
              ✨ Bonjour ! Je suis
            </p>
            <h1
              className="text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              {profile.name}
              <span style={{ color: "#D14A8C" }}>.</span>
            </h1>
            <p className="text-xl md:text-2xl leading-snug max-w-xl text-neutral-700 mb-8">
              {profile.bio}
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                className="px-6 py-3 rounded-full font-medium text-white shadow-lg"
                style={{ background: "#D14A8C" }}
                href="#projets"
              >
                Voir mes projets →
              </a>
              <a
                className="px-6 py-3 rounded-full font-medium border-2"
                style={{ borderColor: "#3A2E45", color: "#3A2E45" }}
                href={`mailto:${profile.email}`}
              >
                Me contacter
              </a>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div
              className="w-56 h-56 md:w-72 md:h-72 rounded-[40%] flex items-center justify-center text-7xl shadow-xl"
              style={{
                background: "linear-gradient(135deg, #FFB5C5 0%, #C8A8E9 100%)",
              }}
            >
              👋
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg"
              style={{ background: "#FFE066" }}
            >
              ✨
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="projets" className="max-w-5xl mx-auto px-6 pb-24">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <h2
            style={{ fontFamily: "Fraunces, serif" }}
            className="text-4xl md:text-5xl font-semibold tracking-tight"
          >
            Mes projets perso
          </h2>
          <p className="text-neutral-600">3 apps · téléchargeables par QR code</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{ y: -6, rotate: i % 2 === 0 ? 1 : -1 }}
              className="rounded-3xl p-6 cursor-pointer"
              style={{
                background: ["#FFB5C5", "#C8A8E9", "#FFE066"][i],
                color: i === 2 ? "#5C3A00" : "#3A2E45",
              }}
            >
              <div className="text-5xl mb-4">{p.emoji}</div>
              <h3
                style={{ fontFamily: "Fraunces, serif" }}
                className="text-2xl font-semibold mb-2"
              >
                {p.name}
              </h3>
              <p className="text-sm leading-relaxed mb-4 opacity-80">{p.tagline}</p>
              <div className="flex gap-1.5 flex-wrap">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-0.5 rounded-full bg-white/50"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between text-sm font-medium">
                <span>Voir l'app</span>
                <span className="text-xl">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2
          style={{ fontFamily: "Fraunces, serif" }}
          className="text-4xl font-semibold tracking-tight mb-8"
        >
          Mon parcours
        </h2>
        <div className="space-y-3">
          {experiences.map((e) => (
            <div
              key={e.role + e.company}
              className="bg-white/60 backdrop-blur-sm border border-white rounded-2xl p-5 flex items-start gap-4"
            >
              <div
                className="w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center text-xl"
                style={{ background: "#FFE066" }}
              >
                ★
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between flex-wrap gap-1">
                  <h3 className="font-semibold text-lg">{e.role}</h3>
                  <span className="text-sm text-neutral-500">{e.period}</span>
                </div>
                <p className="text-sm text-neutral-600">
                  <span className="font-medium">{e.company}</span> — {e.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="max-w-5xl mx-auto px-6 pb-12 text-center text-sm text-neutral-500">
        Made with ♡ in Paris · {profile.email}
      </footer>
    </div>
  );
}

export function PreviewBar({ accent }: { accent: string }) {
  return (
    <div
      className="sticky top-0 z-50 px-4 py-2 text-xs flex items-center justify-between border-b backdrop-blur"
      style={{ background: "rgba(255,255,255,0.7)", borderColor: "#0001" }}
    >
      <Link to="/preview" className="font-medium underline hover:no-underline">
        ← retour aux 6 maquettes
      </Link>
      <span className="font-mono opacity-60">
        Variante <span style={{ color: accent }}>●</span>
      </span>
    </div>
  );
}
