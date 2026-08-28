import { Counter } from "@/components/Counter";

const stats = [
  { value: 20, suffix: "+", label: "Années d’expérience" },
  { value: 2000, suffix: "+", label: "Projets livrés" },
  { value: 98, suffix: "%", label: "Clients satisfaits" },
];

export function StatsBand() {
  return (
    <section className="stats-band" data-parallax="18" aria-label="Nos chiffres clés">
      <div className="stats-overlay" />
      <div className="container stats-grid">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>
              <Counter value={stat.value} suffix={stat.suffix} />
            </strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
