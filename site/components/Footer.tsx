import Image from "next/image";
import Link from "next/link";
import { company, navigation, services } from "@/data/site";
import { Icon } from "@/components/Icon";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link href="/" aria-label="Retour à l’accueil">
            <Image src="/img/logo-blanc.png" alt="Construction Innovatech" width={190} height={56} />
          </Link>
          <p>
            Construction neuve, rénovation et agrandissement partout dans la grande région de Québec depuis plus de 20 ans.
          </p>
          <a className="footer-phone" href={company.phoneHref}>
            <Icon name="phone" size={18} /> <strong>{company.phone}</strong>
          </a>
          <div className="social-links" aria-label="Réseaux sociaux">
            <span title="Facebook"><Icon name="facebook" size={17} /></span>
            <span title="Instagram"><Icon name="instagram" size={17} /></span>
            <span title="LinkedIn"><Icon name="linkedin" size={17} /></span>
          </div>
        </div>

        <div>
          <h2 className="footer-title">Navigation</h2>
          <nav className="footer-links" aria-label="Navigation de pied de page">
            {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </nav>
        </div>

        <div>
          <h2 className="footer-title">Spécialités</h2>
          <div className="footer-links">
            {services.map((service) => (
              <Link href={`/services#${service.slug}`} key={service.slug}>{service.shortTitle}</Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="footer-title">Nous joindre</h2>
          <address>
            {company.addressLine1}<br />
            {company.addressLine2}
          </address>
          <Link className="button button-red footer-button" href="/rendez-vous">
            Formulaire de soumission
          </Link>
          <a className="footer-email" href={`mailto:${company.email}`}>{company.email}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2026 Construction Innovatech. Tous droits réservés. Licence RBQ.</span>
          <span>Résidentiel &amp; Commercial — Québec, QC</span>
        </div>
      </div>
    </footer>
  );
}
