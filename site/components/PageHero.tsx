import Link from "next/link";
import { Icon } from "@/components/Icon";
import { company } from "@/data/site";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  actions?: boolean;
};

export function PageHero({ eyebrow, title, description, image, actions = false }: PageHeroProps) {
  return (
    <section className="page-hero" data-parallax="26" style={{ backgroundImage: `url(${image})` }}>
      <div className="page-hero-overlay" />
      <div className="container page-hero-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="page-hero-description">{description}</p>}
        {actions && (
          <div className="button-row">
            <a className="button button-light" href={company.phoneHref}>
              <Icon name="phone" size={17} /> {company.phone}
            </a>
            <Link className="button button-outline-light" href="/rendez-vous">Soumission gratuite</Link>
          </div>
        )}
      </div>
    </section>
  );
}
