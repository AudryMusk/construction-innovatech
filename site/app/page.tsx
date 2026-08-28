import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { Icon } from "@/components/Icon";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionTitle } from "@/components/SectionTitle";
import { StatsBand } from "@/components/StatsBand";
import { company, projects, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Construction et rénovation à Québec",
};

const heroSlides = [
  { src: "/img/hero-accueil.jpg", alt: "Structure de bois d’une pergola en construction" },
  { src: "/img/slide-nacelle.jpg", alt: "Pose de revêtement extérieur à la nacelle" },
  { src: "/img/slide-chantier.jpg", alt: "Équipe au travail sur un chantier de brique" },
  { src: "/img/slide-facade.jpg", alt: "Réfection de façade sur échafaudage" },
];

const commitments = [
  ["award", "Licence RBQ & assurance complète", "Travaux couverts et conformes aux normes du Québec."],
  ["hardhat", "20+ ans d’expérience", "Une équipe stable qui connaît chaque étape du chantier."],
  ["calendar", "Échéanciers respectés", "Communication constante, pas de surprises de dernière minute."],
  ["shield", "Un seul contact, du début à la fin", "Coordination complète des corps de métier par notre équipe."],
] as const;

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <HeroSlideshow slides={heroSlides} />
        <div className="home-hero-overlay" />
        <div className="container home-hero-content">
          <h1>On bâtit<br />votre <mark>avenir</mark>.</h1>
          <p>Construction neuve, rénovation et agrandissement partout au Canada.<br />Un seul partenaire, du plan à la remise des clés.</p>
          <div className="button-row hero-buttons">
            <Link className="button button-light" href="/rendez-vous">Demander une soumission</Link>
            <Link className="button button-outline-light" href="/realisations">Voir nos réalisations</Link>
          </div>
          <div className="hero-trust">
            <span>RBQ licenciée</span><span>Assurée &amp; cautionnée</span><span>20+ ans d’expérience</span><span>2000+ projets livrés</span>
          </div>
        </div>
      </section>

      <section className="section why-section">
        <div className="container split-grid split-grid-image">
          <div className="image-frame reveal" data-reveal="zoom">
            <Image src="/img/equipe-batiment.jpg" alt="Projet de réfection réalisé par Construction Innovatech" fill sizes="(max-width: 800px) 100vw, 42vw" />
          </div>
          <div className="reveal">
            <p className="eyebrow">Pourquoi nous choisir</p>
            <h2 className="content-title">Une équipe qui respecte ses engagements</h2>
            <div className="commitment-list" data-stagger="90">
              {commitments.map(([icon, title, text]) => (
                <div className="commitment reveal" key={title}>
                  <Icon name={icon} size={19} />
                  <div><h3>{title}</h3><p>{text}</p></div>
                </div>
              ))}
            </div>
            <a className="inline-phone" href={company.phoneHref}><Icon name="phone" size={17} /> {company.phone} — parlez à notre équipe</a>
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="section section-soft specialties-section">
        <div className="container">
          <SectionTitle before="Nos" highlight="spécialités" />
          <div className="specialty-grid" data-stagger="70">
            {services.map((service) => (
              <article className="specialty-card reveal" key={service.slug}>
                <Icon name={service.icon} size={24} />
                <h3>{service.shortTitle}</h3>
                <p>{service.description}</p>
                <Link href={`/services#${service.slug}`}>Voir les projets <Icon name="arrow" size={14} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Prêt à démarrer votre projet ?" image="/img/band-cta-accueil.jpg" buttonLabel="Soumission gratuite" />

      <section className="section projects-preview-section">
        <div className="container">
          <SectionTitle before="Nos" highlight="réalisations" />
          <div className="projects-grid projects-grid-preview" data-stagger="70">
            {projects.slice(0, 6).map((project) => (
              <div className="reveal" key={project.title}><ProjectCard project={project} /></div>
            ))}
          </div>
          <div className="center-action">
            <Link className="button button-outline-dark" href="/realisations">Voir toutes nos réalisations <Icon name="arrow" size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="testimonial section-soft">
        <div className="container reveal">
          <div className="stars" aria-label="Note de 5 sur 5">★ ★ ★ ★ ★</div>
          <blockquote>« Équipe professionnelle du début à la fin. Échéancier respecté, communication constante et un résultat qui dépasse nos attentes. »</blockquote>
          <cite>Marc-André T. — Agrandissement résidentiel, Québec</cite>
        </div>
      </section>
    </>
  );
}
