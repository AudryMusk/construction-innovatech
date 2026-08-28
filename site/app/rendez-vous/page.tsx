import type { Metadata } from "next";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { company } from "@/data/site";

export const metadata: Metadata = {
  title: "Demande de soumission",
  description: "Planifiez une visite de votre projet. L’équipe de Construction Innovatech vous répond entre 24h et 48h.",
};

export default function AppointmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Prendre rendez-vous"
        title="Planifions la visite de votre projet"
        description="Remplissez le formulaire ci-dessous, notre équipe vous contacte entre 24h et 48h pour confirmer un moment."
        image="/img/hero-rdv.jpg"
      />

      <section className="section appointment-section">
        <div className="container appointment-grid">
          <AppointmentForm />

          <aside className="appointment-card">
            <h2 className="content-title">Préférez nous appeler ?</h2>
            <a className="button button-red" href={company.phoneHref}><Icon name="phone" size={20} /> {company.phone}</a>
            <ul>
              <li><Icon name="clock" size={20} /> Réponse entre 24h et 48h</li>
              <li><Icon name="mail" size={20} /> <a href={`mailto:${company.email}`}>{company.email}</a></li>
              <li><Icon name="shield" size={20} /> Sans engagement</li>
              <li><Icon name="pin" size={20} /> {company.addressLine1}, Québec</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
