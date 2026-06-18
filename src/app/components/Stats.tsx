const stats = [
  { value: "0", label: "Tests effectués aujourd'hui", color: "text-[#4298b4]" },
  { value: "0", label: "Tests effectués en France", color: "text-[#e4ae3a]" },
  { value: "0", label: "Total de tests effectués", color: "text-[#88619a]" },
  { value: "—", label: "Évaluation de la pertinence", color: "text-[#33a474]" },
];

export default function Stats() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-10 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className={`text-4xl md:text-5xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-gray-500 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
