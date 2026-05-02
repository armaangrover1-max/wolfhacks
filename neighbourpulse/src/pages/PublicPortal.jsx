import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Globe2,
  HeartPulse,
  Home,
  MapPin,
  Search,
  ShieldCheck,
} from "lucide-react";
import ShellCard from "../components/ShellCard";
import InteractiveBramptonMap from "../components/InteractiveBramptonMap";
import { getStatus } from "../data/wards";

export default function PublicPortal({ wards, selected, setSelectedName }) {
  const [search, setSearch] = useState("");

  const filteredWards = useMemo(() => {
    return wards.filter((ward) =>
      ward.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [wards, search]);

  const status = getStatus(selected.score);
  const criticalWards = wards.filter((ward) => ward.score < 40).length;
  const atRiskWards = wards.filter(
    (ward) => ward.score >= 40 && ward.score < 70
  ).length;

  return (
    <div className="space-y-6">
      <section className="rounded-[2.4rem] border border-[#DCEFD8] bg-white/85 p-7 shadow-sm backdrop-blur">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2F6A3D]">
              Public Access
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-medium tracking-[-0.04em] text-[#24312A] sm:text-5xl">
              Community health information, made simple.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5E6B63]">
              This view helps residents understand neighbourhood-level health
              pressure without exposing personal medical information. It shows
              risk level, prevention guidance, and where support may be deployed.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#F1FBE9] p-5">
            <div className="flex items-start gap-3">
              <Bell className="mt-1 h-6 w-6 text-[#2F6A3D]" />
              <div>
                <p className="font-semibold text-[#24312A]">
                  Public advisory
                </p>
                <p className="mt-2 leading-7 text-[#4E5C53]">
                  Some neighbourhoods are showing increased health-system
                  pressure under Condition X. Residents should follow local
                  guidance and use nearby community support options where
                  available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <PublicMetric
          icon={ShieldCheck}
          label="Privacy model"
          value="No personal data"
        />
        <PublicMetric
          icon={AlertTriangle}
          label="Critical wards"
          value={criticalWards}
        />
        <PublicMetric icon={HeartPulse} label="At-risk wards" value={atRiskWards} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <InteractiveBramptonMap
          wards={wards}
          selected={selected}
          setSelectedName={setSelectedName}
        />

        <ShellCard className={`${status.bg} ${status.border}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#66756C]">
            Your selected area
          </p>

          <div className="mt-3 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-4xl font-medium tracking-[-0.04em] text-[#24312A]">
                {selected.name}
              </h2>
              <p className="mt-3 leading-7 text-[#4E5C53]">
                {selected.summary}
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${status.bg} ${status.text}`}
            >
              {status.label}
            </span>
          </div>

          <div className="mt-6 rounded-[1.6rem] bg-white/80 p-5">
            <p className="text-sm font-semibold text-[#66756C]">
              Neighbourhood resilience
            </p>
            <div className="mt-2 flex items-end gap-2">
              <p className="text-6xl font-semibold tracking-[-0.05em] text-[#24312A]">
                {selected.score}
              </p>
              <p className="pb-2 text-[#66756C]">/100</p>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#E7E9DF]">
              <div
                className="h-full rounded-full bg-[#7ED28D]"
                style={{ width: `${selected.score}%` }}
              />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <GuidanceItem text="Monitor official public health updates." />
            <GuidanceItem text="Use community care sites instead of emergency rooms for non-urgent needs." />
            <GuidanceItem text="Check on seniors, children, and people with chronic conditions." />
          </div>
        </ShellCard>
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <ShellCard>
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-[#2F6A3D]" />
            <h3 className="text-2xl font-medium tracking-[-0.03em] text-[#24312A]">
              Find a neighbourhood
            </h3>
          </div>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Brampton area..."
            className="mt-5 w-full rounded-2xl border border-[#DCEFD8] bg-white px-5 py-4 text-[#24312A] outline-none transition focus:border-[#7ED28D]"
          />

          <div className="mt-5 space-y-2">
            {filteredWards.slice(0, 6).map((ward) => {
              const wardStatus = getStatus(ward.score);

              return (
                <button
                  key={ward.id}
                  onClick={() => setSelectedName(ward.name)}
                  className="flex w-full items-center justify-between rounded-2xl bg-[#F8FCF5] px-4 py-3 text-left transition hover:bg-[#F1FBE9]"
                >
                  <div>
                    <p className="font-semibold text-[#24312A]">{ward.name}</p>
                    <p className={`text-sm font-medium ${wardStatus.text}`}>
                      {wardStatus.label}
                    </p>
                  </div>

                  <ChevronRight className="h-4 w-4 text-[#66756C]" />
                </button>
              );
            })}
          </div>
        </ShellCard>

        <ShellCard>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2F6A3D]">
            Community response timeline
          </p>

          <h3 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-[#24312A]">
            What happens when a neighbourhood becomes critical?
          </h3>

          <div className="mt-7 space-y-5">
            <TimelineItem
              icon={MapPin}
              title="1. Local pressure detected"
              text="NeighbourPulse identifies increased risk using neighbourhood-level data like air quality, density, access to care, and sensor readings."
            />
            <TimelineItem
              icon={Bell}
              title="2. Public alert issued"
              text="Residents receive simple guidance about prevention, care options, and when to seek emergency help."
            />
            <TimelineItem
              icon={Home}
              title="3. Community care activated"
              text="Mobile clinics, pop-up screening, and outreach teams are directed toward the affected area."
            />
            <TimelineItem
              icon={CalendarDays}
              title="4. Conditions monitored"
              text="The area is continuously monitored so support can be scaled up or reduced safely."
            />
          </div>
        </ShellCard>
      </section>
    </div>
  );
}

function PublicMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[1.7rem] border border-[#DCEFD8] bg-white/85 p-5 shadow-sm">
      <div className="flex items-center gap-2 text-[#66756C]">
        <Icon className="h-4 w-4 text-[#2F6A3D]" />
        <span className="text-xs font-semibold uppercase tracking-[0.18em]">
          {label}
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#24312A]">
        {value}
      </p>
    </div>
  );
}

function GuidanceItem({ text }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white/75 p-4">
      <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#2F6A3D]" />
      <p className="leading-7 text-[#4E5C53]">{text}</p>
    </div>
  );
}

function TimelineItem({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#F1FBE9] text-[#2F6A3D]">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="font-semibold text-[#24312A]">{title}</p>
        <p className="mt-1 leading-7 text-[#5E6B63]">{text}</p>
      </div>
    </div>
  );
}