const stats = [
  { value: "96%", label: "De précision", color: "rgba(51,164,116,0.75)" },
  { value: "48", label: "Profils détaillés", color: "rgba(51,164,116,0.75)" },
  { value: "10 min", label: "Pour faire le test", color: "rgba(51,164,116,0.75)" },
];

export default function Stats() {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 md:gap-10 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: s.color }}>
              {s.value}
            </p>
            <p className="text-gray-500 mt-2 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
