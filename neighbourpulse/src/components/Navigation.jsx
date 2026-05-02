import { Brain, LayoutDashboard, MapPin, RadioTower } from "lucide-react";

const links = [
  { id: "command", label: "Command Centre", icon: LayoutDashboard },
  { id: "map", label: "Map Intelligence", icon: MapPin },
  { id: "ai", label: "AI Model", icon: Brain },
  { id: "sensors", label: "Sensor Network", icon: RadioTower },
];

export default function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className="rounded-[1.6rem] border border-[#93B884]/35 bg-[#EEE6CC]/85 px-4 py-3 shadow-sm backdrop-blur">
      <div className="flex flex-wrap gap-2">
        {links.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
              activeTab === id
                ? "bg-[#204B2B] text-[#FFF8E4] shadow-sm"
                : "bg-[#DBEACC] text-[#2B4933] hover:bg-[#C9DDB8]"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}