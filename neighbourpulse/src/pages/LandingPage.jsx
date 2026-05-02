import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function LandingPage({ setScreen }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#93B884]/40 bg-[#EEE6CC]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#204B2B] shadow-sm">
            <Sparkles className="h-4 w-4" />
            Brampton Health Resilience AI
          </div>

          <p className="mt-8 text-base font-medium tracking-[0.2em] text-[#2F6A3D]">
            See the city before the crisis reaches the hospital
          </p>

          <h1 className="mt-4 text-4xl font-medium tracking-[-0.045em] text-[#1F2A22] sm:text-5xl lg:text-6xl">
            Meet{" "}
            <span className="font-display text-6xl font-bold text-[#204B2B] sm:text-7xl lg:text-8xl">
              NeighbourPulse
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-9 text-[#4D5D51] lg:mx-0"
          >
            A neighbourhood-level health resilience platform that helps Brampton
            identify vulnerable areas early, guide public action, and support
            official response during Condition X.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <button
              onClick={() => setScreen("access")}
              className="group inline-flex items-center gap-3 rounded-full bg-[#204B2B] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#FFF8E4] shadow-lg shadow-[#204B2B]/20 transition hover:-translate-y-0.5 hover:bg-[#2F6A3D]"
            >
              Enter
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2 text-sm font-medium text-[#5D6B60]">
              <ShieldCheck className="h-4 w-4 text-[#2F6A3D]" />
              Privacy-first. Equity-focused. Built for early response.
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#93B884]/35 via-[#E6CF4A]/25 to-[#2F6A3D]/15 blur-2xl" />

          <div className="card relative overflow-hidden rounded-[2.5rem] p-6">
            <div className="rounded-[2rem] bg-[#EEE6CC] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5D6B60]">
                    Live Resilience Snapshot
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-[#1F2A22]">
                    Brampton, 2030
                  </p>
                </div>

                <div className="rounded-full bg-[#DBEACC] px-4 py-2 text-xs font-semibold text-[#204B2B]">
                  Monitoring
                </div>
              </div>

              <div className="space-y-3">
                {[
                  ["Rosedale", 24, "#efd0c9"],
                  ["Downtown", 29, "#efd0c9"],
                  ["Bramalea", 31, "#efd0c9"],
                  ["Sandringham", 58, "#eadb8a"],
                  ["Castlemore", 81, "#c9ddb8"],
                ].map(([name, score, bg]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-2xl px-4 py-3"
                    style={{ backgroundColor: bg }}
                  >
                    <div>
                      <p className="font-semibold text-[#1F2A22]">{name}</p>
                      <p className="text-sm text-[#4D5D51]">Ward resilience</p>
                    </div>
                    <p className="text-2xl font-semibold text-[#1F2A22]">
                      {score}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] border border-[#93B884]/35 bg-[#DBEACC] p-5">
              <p className="text-sm font-semibold text-[#204B2B]">
                AI recommendation
              </p>
              <p className="mt-2 leading-7 text-[#2B4933]">
                Rosedale is projected to face severe pressure first. Prioritize
                mobile care deployment before overload occurs.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}