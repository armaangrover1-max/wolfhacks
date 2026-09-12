import { useMemo, useState } from "react";
import LandingPage from "./pages/LandingPage";
import AccessPage from "./pages/AccessPage";
import PublicPortal from "./pages/PublicPortal";
import OfficialPortal from "./pages/OfficialPortal";
import LiveMapPage from "./pages/LiveMapPage";
import AIPage from "./pages/AIPage";
import SensorsPage from "./pages/SensorsPage";
import Navigation from "./components/Navigation";
import { BASE_WARDS, computeSurgeWard } from "./data/wards";
import './App.css';

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [section, setSection] = useState("command");
  const [surge, setSurge] = useState(false);
  const [selectedName, setSelectedName] = useState("Rosedale");

  const wards = useMemo(
    () => BASE_WARDS.map((ward) => computeSurgeWard(ward, surge)),
    [surge]
  );

  const selected = wards.find((ward) => ward.name === selectedName) || wards[0];

  if (screen === "landing") {
    return <LandingPage setScreen={setScreen} />;
  }

  if (screen === "access") {
    return <AccessPage setScreen={setScreen} />;
  }

  function renderOfficialSection() {
    if (section === "command") {
      return (
        <OfficialPortal
          wards={wards}
          selected={selected}
          setSelectedName={setSelectedName}
          setSection={setSection}
        />
      );
    }

    if (section === "map") {
      return (
        <LiveMapPage
          wards={wards}
          selected={selected}
          setSelectedName={setSelectedName}
        />
      );
    }

    if (section === "ai") {
      return <AIPage wards={wards} selected={selected} />;
    }

    if (section === "sensors") {
      return <SensorsPage wards={wards} />;
    }

    return null;
  }

  if (screen === "public") {
    return (
      <main className="min-h-screen px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <TopBar
            label="Public Access"
            setScreen={setScreen}
            surge={surge}
            setSurge={setSurge}
            showSurge={false}
          />

          <div className="mt-6">
            <PublicPortal
              wards={wards}
              selected={selected}
              setSelectedName={setSelectedName}
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-6">
      <div className="mx-auto max-w-7xl">
        <TopBar
          label="Official Access"
          setScreen={setScreen}
          surge={surge}
          setSurge={setSurge}
          showSurge
        />

        <div className="mt-5">
          <Navigation activeTab={section} setActiveTab={setSection} />
        </div>

        <div className="mt-6">{renderOfficialSection()}</div>
      </div>
    </main>
  );
}

function TopBar({ label, setScreen, surge, setSurge, showSurge }) {
  return (
    <header className="rounded-[1.8rem] border border-[#DCEFD8] bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <button onClick={() => setScreen("access")} className="text-left">
          <p className="font-display text-3xl font-bold tracking-tight text-[#2F6A3D]">
            NeighbourPulse
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#66756C]">
            {label}
          </p>
        </button>

        <div className="flex flex-wrap gap-3">
          {showSurge && (
            <button
              onClick={() => setSurge(!surge)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                surge
                  ? "bg-red-100 text-red-800"
                  : "bg-[#F1FBE9] text-[#2F6A3D]"
              }`}
            >
              {surge ? "Condition X Surge Active" : "Normal Conditions"}
            </button>
          )}

          <button
            onClick={() => setScreen("access")}
            className="rounded-full bg-[#2F6A3D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#255530]"
          >
            Change Access
          </button>
        </div>
      </div>
    </header>
  );
}