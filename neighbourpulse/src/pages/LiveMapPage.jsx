import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ShellCard from "../components/ShellCard";
import MiniMap from "../components/MiniMap";
import { getStatus } from "../data/wards";

const factorLabels = [
  { key: "clinicAccess", label: "Clinic Access" },
  { key: "airQuality", label: "Air Quality" },
  { key: "populationDensity", label: "Population Density" },
  { key: "housingDensity", label: "Housing Density" },
  { key: "chronicDisease", label: "Chronic Risk" },
  { key: "seniors", label: "Senior Vulnerability" },
];

export default function LiveMapPage({ wards, selected, setSelectedName }) {
  const selectedStatus = getStatus(selected.score);

  const factorData = factorLabels.map((factor) => ({
    name: factor.label,
    value: selected[factor.key],
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <ShellCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">
              Live Resilience Map
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Brampton ward grid
            </h2>
          </div>

          <div className="flex gap-2 text-xs font-bold">
            <span className="rounded-full bg-emerald-100 px-3 py-2 text-emerald-700">
              Green 70+
            </span>
            <span className="rounded-full bg-amber-100 px-3 py-2 text-amber-700">
              Amber 40–69
            </span>
            <span className="rounded-full bg-red-100 px-3 py-2 text-red-700">
              Red &lt;40
            </span>
          </div>
        </div>

        <div className="mt-6">
          <MiniMap
            wards={wards}
            selected={selected}
            setSelectedName={setSelectedName}
          />
        </div>
      </ShellCard>

      <ShellCard>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">
              Ward Detail
            </p>
            <h2 className="mt-2 text-3xl font-black">{selected.name}</h2>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-black ${selectedStatus.bg} ${selectedStatus.text}`}
          >
            {selectedStatus.label}
          </span>
        </div>

        <div className="mt-5 rounded-3xl bg-slate-950 p-5 text-white">
          <p className="text-sm font-bold text-slate-400">Resilience Index</p>
          <p className="mt-1 text-6xl font-black tracking-tight">
            {selected.score}
          </p>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-300 to-emerald-300"
              style={{ width: `${selected.score}%` }}
            />
          </div>
        </div>

        <div className="mt-5 h-64 rounded-3xl border border-slate-200 bg-white p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={factorData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ShellCard>
    </div>
  );
}