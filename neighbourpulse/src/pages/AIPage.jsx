import {
    Activity,
    Brain,
    Building2,
    CloudSun,
    HeartPulse,
    Hospital,
    Users,
  } from "lucide-react";
  import ShellCard from "../components/ShellCard";
  
  const factorLabels = [
    { key: "clinicAccess", label: "Clinic Access", icon: Hospital },
    { key: "airQuality", label: "Air Quality", icon: CloudSun },
    { key: "populationDensity", label: "Population Density", icon: Users },
    { key: "housingDensity", label: "Housing Density", icon: Building2 },
    { key: "chronicDisease", label: "Chronic Risk", icon: HeartPulse },
    { key: "seniors", label: "Senior Vulnerability", icon: Activity },
  ];
  
  export default function AIPage({ wards, selected }) {
    const sortedRisk = [...wards].sort((a, b) => a.score - b.score);
  
    const recommendation =
      selected.score < 40
        ? "Deploy mobile care unit, open pop-up screening, increase community outreach, and prioritize sensor monitoring within 24 hours."
        : selected.score < 70
        ? "Increase prevention messaging, monitor sensor spikes, and prepare mobile clinic routing if Condition X growth rises."
        : "Maintain normal monitoring, keep prevention resources available, and preserve backup capacity for surge events.";
  
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
        <ShellCard>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">
            Predictive Collapse Engine
          </p>
          <h2 className="mt-2 text-3xl font-black">Explainable AI model</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            The AI compares environmental pressure, healthcare access, chronic
            disease risk, housing density, senior vulnerability, and live sensor
            readings to predict which neighbourhood will collapse first under
            Condition X.
          </p>
  
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {factorLabels.map(({ key, label, icon: Icon }) => (
              <div
                key={key}
                className="rounded-3xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-slate-500" />
                  <p className="font-black">{label}</p>
                </div>
  
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-950"
                    style={{ width: `${selected[key]}%` }}
                  />
                </div>
  
                <p className="mt-2 text-sm text-slate-500">
                  Current input: {selected[key]}/100
                </p>
              </div>
            ))}
          </div>
        </ShellCard>
  
        <ShellCard>
          <div className="rounded-3xl bg-slate-950 p-5 text-white">
            <Brain className="h-9 w-9 text-cyan-200" />
            <p className="mt-4 text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
              AI Output
            </p>
            <h3 className="mt-2 text-2xl font-black">{selected.name}</h3>
            <p className="mt-3 leading-7 text-slate-300">{recommendation}</p>
          </div>
  
          <div className="mt-5 space-y-3">
            <p className="text-sm font-black">Predicted collapse order</p>
  
            {sortedRisk.slice(0, 5).map((ward, index) => (
              <div
                key={ward.name}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4"
              >
                <span className="font-black">
                  {index + 1}. {ward.name}
                </span>
                <span className="text-sm font-black text-slate-500">
                  {ward.erHours}h
                </span>
              </div>
            ))}
          </div>
        </ShellCard>
      </div>
    );
  }