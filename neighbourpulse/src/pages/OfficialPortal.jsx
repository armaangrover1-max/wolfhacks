import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Ambulance,
  ArrowRight,
  BellRing,
  Brain,
  Building2,
  CheckCircle2,
  Clock,
  Database,
  Hospital,
  MapPin,
  RadioTower,
  Users,
} from "lucide-react";
import ShellCard from "../components/ShellCard";
import { getStatus } from "../data/wards";

export default function OfficialPortal({
  wards,
  selected,
  setSelectedName,
  setSection,
}) {
  const [mobileUnits, setMobileUnits] = useState(2);
  const [outreachTeams, setOutreachTeams] = useState(5);
  const [alertLevel, setAlertLevel] = useState(2);

  const sortedRisk = useMemo(
    () => [...wards].sort((a, b) => a.score - b.score),
    [wards]
  );

  const interventionImpact = Math.min(
    35,
    mobileUnits * 6 + outreachTeams * 2 + alertLevel * 3
  );

  const adjustedHours = Math.round(selected.erHours + interventionImpact);
  const status = getStatus(selected.score);

  return (
    <div className="space-y-6">
      <section className="rounded-[2.4rem] border border-[#DCEFD8] bg-white/85 p-7 shadow-sm backdrop-blur">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2F6A3D]">
              Official Command Centre
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-medium tracking-[-0.04em] text-[#24312A] sm:text-5xl">
              Turn neighbourhood risk into an early response plan.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5E6B63]">
              This view is designed for public health officials, hospitals, and
              emergency planners. It turns the Resilience Index into operational
              decisions: where to send mobile clinics, outreach teams, alerts,
              and sensor checks.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#F1FBE9] p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-6 w-6 text-[#2F6A3D]" />
              <div>
                <p className="font-semibold text-[#24312A]">
                  Current highest priority
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#24312A]">
                  {sortedRisk[0].name}
                </p>
                <p className="mt-2 leading-7 text-[#4E5C53]">
                  Projected healthcare overload in{" "}
                  <span className="font-semibold">{sortedRisk[0].erHours} hours</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        <CommandMetric icon={Hospital} label="Mobile units" value={mobileUnits} />
        <CommandMetric icon={Users} label="Outreach teams" value={outreachTeams} />
        <CommandMetric icon={BellRing} label="Alert level" value={alertLevel} />
        <CommandMetric icon={Clock} label="Time gained" value={`+${interventionImpact}h`} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <ShellCard>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2F6A3D]">
            Priority queue
          </p>

          <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-[#24312A]">
            Collapse risk ranking
          </h2>

          <div className="mt-6 space-y-3">
            {sortedRisk.slice(0, 7).map((ward, index) => {
              const wardStatus = getStatus(ward.score);
              const isSelected = selected.name === ward.name;

              return (
                <button
                  key={ward.id}
                  onClick={() => setSelectedName(ward.name)}
                  className={`w-full rounded-[1.3rem] border p-4 text-left transition ${
                    isSelected
                      ? "border-[#7ED28D] bg-[#F1FBE9]"
                      : "border-[#E5E9DF] bg-white hover:bg-[#F8FCF5]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-[#2F6A3D] text-sm font-semibold text-white">
                        {index + 1}
                      </div>

                      <div>
                        <p className="font-semibold text-[#24312A]">
                          {ward.name}
                        </p>
                        <p className={`text-sm font-medium ${wardStatus.text}`}>
                          {wardStatus.label}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-[#24312A]">
                        {ward.erHours}h
                      </p>
                      <p className="text-xs text-[#66756C]">to overload</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ShellCard>

        <ShellCard className={`${status.bg} ${status.border}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#66756C]">
            Deployment simulator
          </p>

          <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-4xl font-medium tracking-[-0.04em] text-[#24312A]">
                {selected.name}
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[#4E5C53]">
                Adjust resources to estimate how early intervention can delay
                neighbourhood healthcare overload.
              </p>
            </div>

            <span
              className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${status.bg} ${status.text}`}
            >
              {status.label}
            </span>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.7rem] bg-white/80 p-5">
              <SliderControl
                icon={Ambulance}
                label="Mobile care units"
                value={mobileUnits}
                setValue={setMobileUnits}
                min={0}
                max={6}
              />

              <SliderControl
                icon={Users}
                label="Outreach teams"
                value={outreachTeams}
                setValue={setOutreachTeams}
                min={0}
                max={12}
              />

              <SliderControl
                icon={BellRing}
                label="Public alert level"
                value={alertLevel}
                setValue={setAlertLevel}
                min={0}
                max={5}
              />
            </div>

            <div className="rounded-[1.7rem] bg-white/80 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#66756C]">
                AI response estimate
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#F8FCF5] p-4">
                  <p className="text-sm text-[#66756C]">Before response</p>
                  <p className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-[#24312A]">
                    {selected.erHours}h
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F1FBE9] p-4">
                  <p className="text-sm text-[#66756C]">After response</p>
                  <p className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-[#2F6A3D]">
                    {adjustedHours}h
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-[#DCEFD8] bg-[#F8FCF5] p-4">
                <p className="font-semibold text-[#24312A]">
                  Recommended operational plan
                </p>
                <div className="mt-3 space-y-2">
                  <PlanItem text="Deploy mobile care unit within the next 24 hours." />
                  <PlanItem text="Open temporary screening point near highest-density area." />
                  <PlanItem text="Issue multilingual public advisory for prevention and care routing." />
                  <PlanItem text="Increase sensor check frequency for air quality and temperature spikes." />
                </div>
              </div>
            </div>
          </div>
        </ShellCard>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <ActionCard
          icon={MapPin}
          title="Open map intelligence"
          text="Review the selected ward on the interactive resilience map."
          onClick={() => setSection("map")}
        />
        <ActionCard
          icon={Brain}
          title="Inspect AI model"
          text="See the factors driving this ward’s collapse prediction."
          onClick={() => setSection("ai")}
        />
        <ActionCard
          icon={RadioTower}
          title="Check sensors"
          text="Review AQI, temperature, and noise from neighbourhood nodes."
          onClick={() => setSection("sensors")}
        />
      </section>
    </div>
  );
}

function CommandMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[1.7rem] border border-[#DCEFD8] bg-white/85 p-5 shadow-sm">
      <div className="flex items-center gap-2 text-[#66756C]">
        <Icon className="h-4 w-4 text-[#2F6A3D]" />
        <span className="text-xs font-semibold uppercase tracking-[0.18em]">
          {label}
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#24312A]">
        {value}
      </p>
    </div>
  );
}

function SliderControl({ icon: Icon, label, value, setValue, min, max }) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-[#2F6A3D]" />
          <p className="font-semibold text-[#24312A]">{label}</p>
        </div>
        <p className="font-semibold text-[#2F6A3D]">{value}</p>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="w-full accent-[#2F6A3D]"
      />
    </div>
  );
}

function PlanItem({ text }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2F6A3D]" />
      <p className="text-sm leading-6 text-[#4E5C53]">{text}</p>
    </div>
  );
}

function ActionCard({ icon: Icon, title, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group rounded-[1.8rem] border border-[#DCEFD8] bg-white/85 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:bg-[#F8FCF5]"
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F1FBE9] text-[#2F6A3D]">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-5 text-2xl font-medium tracking-[-0.035em] text-[#24312A]">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-[#5E6B63]">{text}</p>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#2F6A3D]">
        Continue
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </button>
  );
}