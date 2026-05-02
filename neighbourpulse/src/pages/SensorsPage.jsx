import {
    CloudSun,
    RadioTower,
    ThermometerSun,
    Waves,
  } from "lucide-react";
  import ShellCard from "../components/ShellCard";
  import Metric from "../components/Metric";
  
  export default function SensorsPage({ wards }) {
    return (
      <ShellCard>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">
              TinkerCAD Connection
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Neighbourhood sensor network
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              Each outdoor node can be mounted on a lamp post, school fence, park
              fence, or community centre. It feeds AQI, temperature, and noise
              values into the Resilience Index.
            </p>
          </div>
  
          <RadioTower className="h-10 w-10 text-emerald-600" />
        </div>
  
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {wards.slice(0, 9).map((ward) => (
            <div
              key={ward.name}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="font-black">{ward.name} Node</p>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                  Live
                </span>
              </div>
  
              <div className="mt-5 grid grid-cols-3 gap-3">
                <Metric icon={CloudSun} label="AQI" value={ward.sensorAQI} />
                <Metric
                  icon={ThermometerSun}
                  label="Temp"
                  value={`${ward.temperature}°`}
                />
                <Metric icon={Waves} label="Noise" value={ward.noise} />
              </div>
            </div>
          ))}
        </div>
      </ShellCard>
    );
  }