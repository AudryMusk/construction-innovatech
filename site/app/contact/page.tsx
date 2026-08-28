import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { company } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Appelez, écrivez ou planifiez une rencontre avec Construction Innovatech à Québec.",
};

const contactWays = [
  {
    icon: "phone",
    title: "Appeler maintenant",
    description: "Une question ? Parlez directement à notre équipe.",
    label: company.phone,
    href: company.phoneHref,
  },
  {
    icon: "calendar",
    title: "Prendre rendez-vous",
    description: "Planifiez une visite de votre projet sur place.",
    label: "Choisir un moment",
    href: "/rendez-vous",
    featured: true,
  },
  {
    icon: "document",
    title: "Soumission écrite",
    description: "Décrivez votre projet par courriel ou par formulaire. Réponse entre 24h et 48h.",
    label: "Remplir le formulaire",
    href: "/rendez-vous",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Nous joindre"
        title="Parlons de votre projet"
        description="Trois façons simples de nous joindre — choisissez celle qui vous convient."
        image="/img/hero-contact.jpg"
      />

      <section className="section contact-ways-section">
        <div className="container">
          <SectionTitle before="3 façons de" highlight="nous joindre" />
          <div className="contact-ways-grid">
            {contactWays.map((way, index) => (
              <article className={`contact-way reveal ${"featured" in way && way.featured ? "featured" : ""}`} style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties} key={way.title}>
                <Icon name={way.icon} size={28} />
                <h2>{way.title}</h2>
                <p>{way.description}</p>
                <Link href={way.href}>{way.label} <Icon name="arrow" size={16} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-details section-soft">
        <div className="container contact-details-grid">
          <div className="contact-details-copy reveal">
            <h2 className="content-title">Nos coordonnées</h2>
            <dl>
              <div><Icon name="pin" size={22} /><dt>Adresse</dt><dd>{company.addressLine1}<br />{company.addressLine2}</dd></div>
              <div><Icon name="phone" size={22} /><dt>Téléphone</dt><dd><a href={company.phoneHref}>{company.phone}</a></dd></div>
              <div><Icon name="mail" size={22} /><dt>Courriel</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
              <div><Icon name="clock" size={22} /><dt>Heures d’ouverture</dt><dd>Lundi – Vendredi : 7h30 – 17h00<br />Samedi – Dimanche : Fermé</dd></div>
            </dl>
          </div>
          <a className="map-image reveal" href="https://www.google.com/maps/search/?api=1&query=6232+1ere+avenue+Quebec+QC" target="_blank" rel="noreferrer" aria-label="Voir l’adresse sur Google Maps">
            <Image src="/img/carte-quebec.jpg" alt="Carte de l’emplacement de Construction Innovatech à Québec" fill sizes="(max-width: 800px) 100vw, 50vw" />
            <span>{company.addressLine1}, Québec (QC)</span>
          </a>
        </div>
      </section>
    </>
  );
}
