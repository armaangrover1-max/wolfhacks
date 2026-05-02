import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { getStatus } from "../data/wards";

export default function InteractiveBramptonMap({ wards, selected, setSelectedName }) {
  return (
    <div className="rounded-[2rem] border border-stone-200 bg-[#fffdf7] p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-stone-500">
            Interactive Resilience Map
          </p>
          <h3 className="mt-1 text-2xl font-black text-stone-900">
            Brampton neighbourhood risk view
          </h3>
        </div>

        <div className="hidden gap-2 text-xs font-black md:flex">
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-emerald-800">
            Resilient
          </span>
          <span className="rounded-full bg-amber-50 px-3 py-2 text-amber-800">
            At Risk
          </span>
          <span className="rounded-full bg-red-50 px-3 py-2 text-red-800">
            Critical
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-[#eef7e8] via-[#fff9e6] to-[#f7fbf3] p-4">
        <svg viewBox="60 20 640 700" className="h-[560px] w-full">
          <defs>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity="0.12" />
            </filter>
          </defs>

          <path
            d="M80 85 C140 35 260 35 350 30 C480 25 615 65 670 165 C735 285 680 430 675 535 C670 655 560 720 430 700 C290 680 165 650 105 535 C45 420 55 250 80 85 Z"
            fill="#f7f2df"
            stroke="#d8d2bd"
            strokeWidth="3"
          />

          {wards.map((ward) => {
            const status = getStatus(ward.score);
            const isSelected = selected.id === ward.id;

            return (
              <motion.path
                key={ward.id}
                d={ward.shape}
                fill={status.fill}
                stroke={isSelected ? "#1f2933" : status.stroke}
                strokeWidth={isSelected ? 5 : 2.5}
                filter="url(#softShadow)"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedName(ward.name)}
                className="cursor-pointer transition"
              />
            );
          })}

          {wards.map((ward) => {
            const status = getStatus(ward.score);
            const match = ward.shape.match(/M(\d+) (\d+)/);
            const x = match ? Number(match[1]) + 45 : 300;
            const y = match ? Number(match[2]) + 55 : 300;

            return (
              <g
                key={`${ward.id}-label`}
                onClick={() => setSelectedName(ward.name)}
                className="cursor-pointer"
              >
                <circle cx={x} cy={y} r="22" fill="white" stroke={status.stroke} strokeWidth="2" />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="900"
                  fill="#1f2933"
                >
                  {ward.score}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-5 left-5 rounded-2xl border border-stone-200 bg-white/90 p-4 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-700" />
            <p className="text-sm font-black text-stone-900">
              Click any region to update the AI panel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}