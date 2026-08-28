import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Découvrez une sélection de projets de construction et rénovation réalisés à Québec en plus de 20 ans d’expérience.",
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos réalisations"
        title="Plus de 2000 projets livrés"
        description="Plus de 2000 projets réalisés en 20 ans, partout dans la grande région de Québec."
        image="/img/hero-realisations.jpg"
      />
      <section className="section projects-page">
        <div className="container">
          <ProjectsGrid projects={projects} />
        </div>
      </section>
      <CtaBand title="Votre projet pourrait être le prochain" image="/img/band-cta.jpg" />
    </>
  );
}
