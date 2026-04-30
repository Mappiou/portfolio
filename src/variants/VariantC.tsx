import { motion } from "framer-motion";
import { profile, projects, experiences } from "../data/mock";
import { PreviewBar } from "./VariantA";

const colors = {
  paper: "#F5EBD9",
  paperDark: "#E8DCC4",
  ink: "#1A1A1A",
  red: "#D97757",
  green: "#5B8C5A",
  blue: "#4A6FA5",
};

export default function VariantC() {
  return (
    <div
      className="min-h-dvh"
      style={{
        background: `${colors.paper} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='2' /%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        color: colors.ink,
        fontFamily: "Lora, Georgia, serif",
      }}
    >
      <PreviewBar accent={colors.red} />

      <header className="max-w-4xl mx-auto px-6 pt-10 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="17" stroke={colors.ink} strokeWidth="2" fill={colors.paper} />
            <path d="M12 22 Q14 18 18 20 T28 16" stroke={colors.red} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: "Caveat, cursive" }} className="text-3xl">
            mathieu's notebook
          </span>
        </div>
        <nav style={{ fontFamily: "Caveat, cursive" }} className="text-2xl flex gap-3">
          <span className="underline decoration-wavy" style={{ textDecorationColor: colors.red }}>fr</span>
          <span className="opacity-50">en</span>
          <span className="opacity-50">es</span>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <p style={{ fontFamily: "Caveat, cursive" }} className="text-3xl mb-2" >
            Hey there ! ✎
          </p>
          <h1 className="text-5xl md:text-7xl font-medium leading-tight tracking-tight mb-6">
            Je m'appelle Mathieu, <br />
            <span style={{ color: colors.red, fontFamily: "Caveat, cursive" }} className="text-7xl md:text-9xl block leading-none mt-2">
              et je dessine
            </span>
            des choses avec du code.
          </h1>
          <div className="flex gap-6 mt-10 max-w-3xl">
            <div className="flex-1 text-lg leading-relaxed italic">
              <p>{profile.bio}</p>
            </div>
            <div className="hidden md:block">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  d="M20 100 Q40 20 60 60 T100 40"
                  stroke={colors.ink}
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.8 }}
                  cx="100"
                  cy="40"
                  r="6"
                  fill={colors.red}
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-4 mt-10 items-center">
            <a
              href="#projets"
              className="text-lg font-medium border-b-2 hover:opacity-70 transition"
              style={{ borderColor: colors.ink, fontFamily: "Caveat, cursive", fontSize: "1.6rem" }}
            >
              → voir mon carnet de projets
            </a>
            <span style={{ fontFamily: "Caveat, cursive" }} className="text-2xl opacity-50">
              ou bien
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="text-lg italic hover:underline"
            >
              écris-moi un mot
            </a>
          </div>
        </motion.div>
      </section>

      {/* Page tear separator */}
      <div className="relative h-12 my-4">
        <svg className="w-full h-full" viewBox="0 0 1000 40" preserveAspectRatio="none">
          <path
            d="M0 20 Q50 10 100 20 T200 20 T300 20 T400 20 T500 20 T600 20 T700 20 T800 20 T900 20 T1000 20"
            stroke={colors.ink}
            strokeWidth="1.5"
            strokeDasharray="6 4"
            fill="none"
          />
        </svg>
      </div>

      {/* Projects */}
      <section id="projets" className="max-w-4xl mx-auto px-6 pt-8 pb-16">
        <div className="mb-10">
          <p style={{ fontFamily: "Caveat, cursive" }} className="text-2xl mb-1">
            Page 02 ·
          </p>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
            Mes projets perso —{" "}
            <span style={{ fontFamily: "Caveat, cursive", color: colors.red }}>
              à scanner ✎
            </span>
          </h2>
        </div>

        <div className="space-y-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid md:grid-cols-[80px_1fr_auto] gap-5 items-start py-6 border-b"
              style={{ borderColor: `${colors.ink}33` }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2"
                style={{
                  borderColor: colors.ink,
                  background: [colors.red, colors.green, colors.blue][i] + "33",
                }}
              >
                {p.emoji}
              </div>
              <div>
                <h3 className="text-2xl font-medium mb-1">{p.name}</h3>
                <p className="text-base mb-2 italic opacity-80">{p.tagline}</p>
                <p className="text-sm opacity-70">{p.description}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      style={{ fontFamily: "Caveat, cursive" }}
                      className="text-base"
                    >
                      <span style={{ color: colors.red }}>#</span>
                      {s.toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div
                  className="w-20 h-20 border-2 grid grid-cols-4 gap-0.5 p-1.5 mb-2"
                  style={{ borderColor: colors.ink, background: colors.paper }}
                >
                  {Array.from({ length: 16 }).map((_, k) => (
                    <span
                      key={k}
                      className="aspect-square"
                      style={{
                        background:
                          [3, 5, 6, 8, 11, 12, 14].includes(k) ? colors.ink : "transparent",
                      }}
                    />
                  ))}
                </div>
                <p style={{ fontFamily: "Caveat, cursive" }} className="text-base">
                  ← scan me
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experiences */}
      <section className="max-w-4xl mx-auto px-6 pt-8 pb-20">
        <p style={{ fontFamily: "Caveat, cursive" }} className="text-2xl mb-1">
          Page 03 ·
        </p>
        <h2 className="text-4xl font-medium mb-8">Mon parcours</h2>
        <div className="relative pl-6 border-l-2" style={{ borderColor: colors.ink }}>
          {experiences.map((e) => (
            <div key={e.role + e.company} className="mb-8 relative">
              <div
                className="absolute -left-[31px] w-4 h-4 rounded-full border-2 bg-[#F5EBD9]"
                style={{ borderColor: colors.red }}
              />
              <span style={{ fontFamily: "Caveat, cursive" }} className="text-xl opacity-70">
                {e.period}
              </span>
              <h3 className="text-xl font-medium">
                {e.role} <span className="opacity-60">— {e.company}</span>
              </h3>
              <p className="italic opacity-80">{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer
        className="max-w-4xl mx-auto px-6 pb-12 text-center"
        style={{ fontFamily: "Caveat, cursive" }}
      >
        <p className="text-2xl">— fin du carnet — </p>
        <p className="text-lg opacity-70 mt-2">{profile.email}</p>
      </footer>
    </div>
  );
}
