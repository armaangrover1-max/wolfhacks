import {
    AlertTriangle,
    Brain,
    Building2,
    CloudSun,
    HeartPulse,
    Hospital,
    ThermometerSun,
    Users,
    Waves,
  } from "lucide-react";
  import InteractiveBramptonMap from "../components/InteractiveBramptonMap";
  import ShellCard from "../components/ShellCard";
  import Metric from "../components/Metric";
  import { getStatus } from "../data/wards";
  
  export default function LiveMapPage({ wards, selected, setSelectedName }) {
    const status = getStatus(selected.score);
  
    const riskFactors = [
      { label: "Clinic Access", value: selected.clinicAccess, icon: Hospital },
      { label: "Air Quality", value: selected.airQuality, icon: CloudSun },
      { label: "Population Density", value: selected.populationDensity, icon: Users },
      { label: "Housing Density", value: selected.housingDensity, icon: Building2 },
      { label: "Chronic Risk", value: selected.chronicDisease, icon: HeartPulse },
    ];
  
    return (
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <InteractiveBramptonMap
          wards={wards}
          selected={selected}
          setSelectedName={setSelectedName}
        />
  
        <div className="space-y-6">
          <ShellCard className={`${status.bg} ${status.border}`}>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-stone-500">
              Selected Neighbourhood
            </p>
  
            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-4xl font-black text-stone-950">{selected.name}</h2>
                <p className="mt-3 leading-7 text-stone-700">{selected.summary}</p>
              </div>
  
              <span className={`rounded-full px-4 py-2 text-sm font-black ${status.bg} ${status.text}`}>
                {status.label}
              </span>
            </div>
  
            <div className="mt-6 rounded-[1.5rem] bg-white/80 p-5">
              <p className="text-sm font-black text-stone-500">Resilience Index</p>
              <div className="mt-2 flex items-end gap-3">
                <p className="text-6xl font-black text-stone-950">{selected.score}</p>
                <p className="pb-2 text-stone-500">/100</p>
              </div>
  
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-300 via-yellow-300 to-emerald-300"
                  style={{ width: `${selected.score}%` }}
                />
              </div>
            </div>
          </ShellCard>
  
          <div className="grid grid-cols-3 gap-3">
            <Metric icon={CloudSun} label="AQI" value={selected.sensorAQI} />
            <Metric icon={ThermometerSun} label="Temp" value={`${selected.temperature}°`} />
            <Metric icon={Waves} label="Noise" value={selected.noise} />
          </div>
  
          <ShellCard>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-emerald-700" />
              <h3 className="text-xl font-black text-stone-950">AI Interpretation</h3>
            </div>
  
            <p className="mt-3 leading-7 text-stone-700">
              NeighbourPulse flags this ward based on combined neighbourhood pressure,
              not individual health records. The model weighs healthcare access,
              air quality, density, chronic illness vulnerability, and live sensor readings.
            </p>
  
            <div className="mt-5 space-y-3">
              {riskFactors.map(({ label, value, icon: Icon }) => (
                <div key={label}>
                  <div className="mb-1 flex items-center justify-between text-sm font-bold text-stone-700">
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {label}
                    </span>
                    <span>{value}/100</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full bg-emerald-300"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ShellCard>
  
          <ShellCard className="border-red-100 bg-red-50">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-6 w-6 text-red-600" />
              <div>
                <h3 className="text-xl font-black text-red-950">
                  Response Recommendation
                </h3>
                <p className="mt-2 leading-7 text-red-800">
                  Deploy a mobile clinic, open a pop-up screening point, and send
                  multilingual public alerts before projected overload in{" "}
                  <span className="font-black">{selected.erHours} hours</span>.
                </p>
              </div>
            </div>
          </ShellCard>
        </div>
      </div>
    );
  }