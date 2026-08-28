import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { StatsBand } from "@/components/StatsBand";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez Construction Innovatech, une équipe enracinée à Québec avec plus de 20 ans d’expérience.",
};

const values = [
  ["award", "Qualité", "Des matériaux et une exécution qui durent dans le temps."],
  ["message", "Transparence", "Des devis clairs et une communication honnête à chaque étape."],
  ["timer", "Fiabilité", "Des échéanciers respectés, chantier après chantier."],
  ["shield", "Sécurité", "Des normes strictes pour protéger nos équipes et nos clients."],
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Une équipe enracinée dans la région de Québec"
        description="Depuis plus de 20 ans, Construction Innovatech accompagne propriétaires et entreprises dans leurs projets de construction et de rénovation."
        image="/img/hero-apropos.jpg"
      />

      <section className="section story-section">
        <div className="container split-grid split-grid-image story-grid">
          <div className="image-frame image-frame-tall reveal">
            <Image src="/img/notre-histoire.jpg" alt="Un projet de rénovation réalisé à Québec" fill sizes="(max-width: 800px) 100vw, 42vw" />
          </div>
          <div className="story-copy reveal">
            <h2 className="content-title">Notre histoire</h2>
            <p>
              Construction Innovatech est née d’une passion pour le bâtiment et d’un souci constant de la qualité. Basée au 6232, 1ère avenue à Québec, notre équipe cumule plus de 20 ans d’expérience et intervient dans toute la grande région pour des projets résidentiels et commerciaux.
            </p>
            <p>
              Structure, agrandissement, rénovations intérieures et extérieures, ainsi que les travaux en lien avec des rapports d’ingénieur : nous coordonnons chaque corps de métier pour livrer un projet clé en main, dans les délais convenus.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-soft values-section">
        <div className="container">
          <SectionTitle before="Nos" highlight="valeurs" />
          <div className="values-grid">
            {values.map(([icon, title, text], index) => (
              <article className="value-card reveal" style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties} key={title}>
                <Icon name={icon} size={28} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />
      <CtaBand title="Envie de travailler avec nous ?" image="/img/band-cta-apropos.jpg" buttonLabel="Prendre rendez-vous" />
    </>
  );
}
