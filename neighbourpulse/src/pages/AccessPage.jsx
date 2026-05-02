import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Globe2,
  Lock,
  ShieldCheck,
} from "lucide-react";

export default function AccessPage({ setScreen }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <button
          onClick={() => setScreen("landing")}
          className="inline-flex items-center gap-2 rounded-full bg-[#EEE6CC] px-4 py-2 text-sm font-medium text-[#4D5D51] shadow-sm transition hover:bg-[#E6DFC8]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="mt-12 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2F6A3D]">
            Access selection
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-medium tracking-[-0.045em] text-[#1F2A22] sm:text-6xl">
            Choose your{" "}
            <span className="font-display font-bold text-[#204B2B]">
              NeighbourPulse
            </span>{" "}
            experience
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#4D5D51]">
            One platform, two views: a public-facing guidance portal and an
            official response workspace.
          </p>
        </motion.section>

        <section className="mt-14 grid gap-6 md:grid-cols-2">
          <AccessCard
            icon={Globe2}
            title="Public Access"
            text="For residents. View neighbourhood risk, simple guidance, public alerts, and community care options."
            points={[
              "Neighbourhood risk view",
              "Plain-language public guidance",
              "No personal health records",
              "Community support information",
            ]}
            accent="yellow"
            onClick={() => setScreen("public")}
          />

          <AccessCard
            icon={Lock}
            title="Official Access"
            text="For response teams. Review risk rankings, simulate interventions, and plan resource deployment."
            points={[
              "AI collapse forecasting",
              "Ward-level response planning",
              "Resource deployment simulator",
              "Sensor intelligence",
            ]}
            accent="green"
            onClick={() => setScreen("official")}
          />
        </section>
      </div>
    </main>
  );
}

function AccessCard({ icon: Icon, title, text, points, accent, onClick }) {
  const isGreen = accent === "green";

  return (
    <motion.button
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
      onClick={onClick}
      className={`group rounded-[2.4rem] p-8 text-left transition hover:-translate-y-1 ${
        isGreen
          ? "card border-[#93B884]/45 hover:bg-[#DBEACC]"
          : "card border-[#E6CF4A]/45 hover:bg-[#EFE4B5]"
      }`}
    >
      <div
        className={`grid h-14 w-14 place-items-center rounded-2xl ${
          isGreen ? "bg-[#C9DDB8] text-[#204B2B]" : "bg-[#EAD969] text-[#5B4E0B]"
        }`}
      >
        <Icon className="h-7 w-7" />
      </div>

      <h2 className="mt-8 text-4xl font-semibold tracking-[-0.04em] text-[#1F2A22]">
        {title}
      </h2>

      <p className="mt-4 text-lg leading-8 text-[#4D5D51]">{text}</p>

      <div className="mt-7 space-y-3">
        {points.map((item) => (
          <div key={item} className="flex items-center gap-3">
            {isGreen ? (
              <Building2 className="h-5 w-5 text-[#2F6A3D]" />
            ) : (
              <ShieldCheck className="h-5 w-5 text-[#2F6A3D]" />
            )}
            <span className="font-medium text-[#38483D]">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#204B2B]">
        Continue
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </motion.button>
  );
}