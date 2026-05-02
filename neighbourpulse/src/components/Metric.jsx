export default function Metric({ icon: Icon, label, value }) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm">
        <div className="flex items-center gap-2 text-slate-500">
          <Icon className="h-4 w-4" />
          <span className="text-xs font-black uppercase tracking-[0.16em]">
            {label}
          </span>
        </div>
  
        <p className="mt-3 text-2xl font-black text-slate-950">{value}</p>
      </div>
    );
  }