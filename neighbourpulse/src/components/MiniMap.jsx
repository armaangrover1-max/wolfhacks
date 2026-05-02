import WardCard from "./WardCard";

export default function MiniMap({ wards, selected, setSelectedName }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {wards.map((ward) => (
        <WardCard
          key={ward.name}
          ward={ward}
          selected={selected.name === ward.name}
          onClick={() => setSelectedName(ward.name)}
        />
      ))}
    </div>
  );
}