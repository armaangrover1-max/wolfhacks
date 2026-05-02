import { motion } from "framer-motion";
import { AlertTriangle, RadioTower, ShieldCheck } from "lucide-react";

export default function Header({ surge, setSurge, highestRisk }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-2xl shadow-slate-900/20 sm:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-emerald-200">
            <RadioTower className="h-4 w-4" />
            WolfHacks 2026 · Operation Code Red
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            NeighbourPulse
            <span className="block bg-gradient-to-r from-emerald-200 via-cyan-100 to-white bg-clip-text text-transparent">
              The city as the patient.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            A professional AI dashboard that helps Brampton predict neighbourhood
            healthcare pressure, protect vulnerable communities, and deploy support
            before emergency rooms are overwhelmed.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-6 w-6 text-red-200" />
              <div>
                <p className="text-sm font-bold text-slate-300">
                  Highest Risk Ward
                </p>
                <p className="mt-1 text-3xl font-black">{highestRisk.name}</p>
                <p className="mt-1 text-sm text-red-200">
                  Projected overload: {highestRisk.erHours}h
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-300">
                  Condition X Simulation
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Toggle crisis mode to stress-test the city.
                </p>
              </div>

              <button
                onClick={() => setSurge(!surge)}
                className={`rounded-full px-5 py-3 text-sm font-black transition ${
                  surge
                    ? "bg-red-400 text-red-950"
                    : "bg-emerald-300 text-emerald-950"
                }`}
              >
                {surge ? "Surge Active" : "Normal"}
              </button>
            </div>

            <div className="mt-4 flex items-start gap-2 text-sm text-slate-300">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-200" />
              Built for safety, equity, and early intervention.
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}