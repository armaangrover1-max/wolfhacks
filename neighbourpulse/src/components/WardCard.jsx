import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { getStatus } from "../data/wards";

export default function WardCard({ ward, selected, onClick }) {
  const status = getStatus(ward.score);

  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${status.panel} p-4 text-left text-white shadow-xl ring-2 transition ${
        selected ? "ring-white" : "ring-white/10"
      }`}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/15 blur-xl" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold opacity-90">{ward.name}</p>
          <p className="mt-1 text-4xl font-black tracking-tight">
            {ward.score}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] opacity-80">
            {status.label}
          </p>
        </div>

        <MapPin className="h-5 w-5 opacity-90" />
      </div>
    </motion.button>
  );
}