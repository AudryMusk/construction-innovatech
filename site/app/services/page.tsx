import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { company, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services de construction et rénovation",
  description: "Structure, projets commerciaux, travaux intérieurs et extérieurs, agrandissements et rénovations dans la région de Québec.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title="Des solutions complètes pour chaque projet"
        description="De la structure aux finitions, une seule équipe pour tout votre projet résidentiel ou commercial."
        image="/img/hero-services.jpg"
        actions
      />

      <div className="services-list">
        {services.map((service, index) => (
          <section className={`service-row ${index % 2 ? "section-soft" : ""}`} id={service.slug} key={service.slug}>
            <div className={`container service-grid ${index % 2 ? "reverse" : ""}`}>
              <div className="service-copy reveal">
                <Icon name={service.icon} size={25} />
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ul className="check-list">
                  {service.bullets.map((bullet) => <li key={bullet}><Icon name="check" size={15} />{bullet}</li>)}
                </ul>
                <div className="service-actions">
                  <a className="button button-red button-phone" href={company.phoneHref}><Icon name="phone" size={16} /> {company.phone}</a>
                  <Link className="text-link" href="/rendez-vous">Demander une soumission <Icon name="arrow" size={14} /></Link>
                </div>
              </div>
              <div className="service-image reveal">
                <Image src={service.image} alt={service.title} fill sizes="(max-width: 800px) 100vw, 38vw" />
              </div>
            </div>
          </section>
        ))}
      </div>

      <CtaBand title="Un projet en tête ? Parlons-en." image="/img/band-cta-services.jpg" buttonLabel="Prendre rendez-vous" />
    </>
  );
}
