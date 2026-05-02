import {
    Activity,
    ArrowRight,
    Brain,
    Building2,
    Globe2,
    HeartPulse,
    Hospital,
    RadioTower,
    ShieldCheck,
  } from "lucide-react";
  import ShellCard from "../components/ShellCard";
  import Metric from "../components/Metric";
  import MiniMap from "../components/MiniMap";
  
  export default function HomePage({ wards, selected, setSelectedName, highestRisk }) {
    return (
      <div className="space-y-6">
        <ShellCard className="overflow-hidden bg-slate-950 text-white">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-300">
                Brampton Health Resilience Platform
              </p>
  
              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
                We predict which neighbourhood needs help before the hospital overloads.
              </h2>
  
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                NeighbourPulse treats the city as the patient. Instead of waiting for
                people to show up at the ER, it uses neighbourhood-level data to
                identify which parts of Brampton are most vulnerable during Condition X.
              </p>
  
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full bg-emerald-300 px-5 py-3 text-sm font-black text-emerald-950">
                  AI Risk Prediction
                </span>
                <span className="rounded-full bg-white/10 px-5 py-3 text-sm font-black text-white">
                  Public + Official Portals
                </span>
                <span className="rounded-full bg-white/10 px-5 py-3 text-sm font-black text-white">
                  Sensor Network Ready
                </span>
              </div>
            </div>
  
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-200">
                Current Highest Risk
              </p>
              <h3 className="mt-3 text-5xl font-black">{highestRisk.name}</h3>
              <p className="mt-2 text-slate-300">
                Projected overload in{" "}
                <span className="font-black text-red-200">{highestRisk.erHours} hours</span>
              </p>
  
              <div className="mt-6 rounded-3xl bg-black/20 p-5">
                <div className="flex items-start gap-3">
                  <Brain className="mt-1 h-6 w-6 text-cyan-200" />
                  <p className="leading-7 text-slate-200">
                    AI recommends early deployment of mobile care, pop-up screening,
                    and community alerts before ER pressure peaks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ShellCard>
  
        <div className="grid gap-4 md:grid-cols-4">
          <Metric icon={Globe2} label="Public View" value="Safe alerts" />
          <Metric icon={Hospital} label="Official View" value="Resource planning" />
          <Metric icon={Brain} label="AI Model" value="Collapse prediction" />
          <Metric icon={RadioTower} label="Sensors" value="Live local data" />
        </div>
  
        <ShellCard>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">
                Why this matters
              </p>
              <h3 className="mt-2 text-3xl font-black tracking-tight">
                Condition X does not hit every neighbourhood equally.
              </h3>
              <p className="mt-4 leading-8 text-slate-600">
                Some areas are more vulnerable because of poor air quality, dense
                housing, higher chronic disease risk, fewer nearby clinics, and older
                populations. NeighbourPulse combines these risk factors into one
                Resilience Index so Brampton can respond earlier and more fairly.
              </p>
  
              <div className="mt-6 space-y-3">
                {[
                  "Tracks neighbourhood conditions, not personal medical records.",
                  "Shows public-friendly alerts without exposing private health data.",
                  "Gives officials a command centre for mobile unit deployment.",
                  "Connects to a physical TinkerCAD sensor node model.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 text-emerald-600" />
                    <p className="font-semibold text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
  
            <div>
              <MiniMap wards={wards} selected={selected} setSelectedName={setSelectedName} />
            </div>
          </div>
        </ShellCard>
  
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: Activity,
              title: "1. Detect pressure",
              text: "Live sensor and community data show which wards are becoming more vulnerable.",
            },
            {
              icon: Brain,
              title: "2. Predict collapse",
              text: "The AI engine ranks neighbourhoods by projected healthcare overload time.",
            },
            {
              icon: Building2,
              title: "3. Deploy support",
              text: "Officials can send mobile clinics, screening teams, and multilingual alerts.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <ShellCard key={title}>
              <Icon className="h-8 w-8 text-slate-700" />
              <h4 className="mt-4 text-2xl font-black">{title}</h4>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-black text-slate-950">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </ShellCard>
          ))}
        </div>
      </div>
    );
  }