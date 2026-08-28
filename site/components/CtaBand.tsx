import Link from "next/link";
import { Icon } from "@/components/Icon";
import { backgroundImageSet } from "@/lib/background";
import { company } from "@/data/site";

type CtaBandProps = {
  title: string;
  image?: string;
  buttonLabel?: string;
};

export function CtaBand({ title, image = "/img/band-cta.jpg", buttonLabel = "Demander une soumission" }: CtaBandProps) {
  return (
    <section className="cta-band" data-parallax="22" style={{ backgroundImage: backgroundImageSet(image) }}>
      <div className="cta-overlay" />
      <div className="container cta-content reveal">
        <h2>{title}</h2>
        <div className="button-row">
          <a className="button button-light" href={company.phoneHref}>
            <Icon name="phone" size={17} /> {company.phone}
          </a>
          <Link className="button button-outline-light" href="/rendez-vous">{buttonLabel}</Link>
        </div>
      </div>
    </section>
  );
}
