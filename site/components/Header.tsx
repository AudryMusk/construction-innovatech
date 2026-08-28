"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, navigation } from "@/data/site";
import { Icon } from "@/components/Icon";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Construction Innovatech — Accueil">
          <Image src="/img/logo-noir.png" alt="Construction Innovatech" width={195} height={57} priority />
        </Link>

        <nav id="main-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navigation principale">
          {navigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link className={active ? "active" : ""} href={item.href} key={item.href}>
                {item.label}
              </Link>
            );
          })}
          <a className="mobile-nav-phone" href={company.phoneHref}>
            <Icon name="phone" size={17} /> {company.phone}
          </a>
          <Link className="button button-red mobile-nav-quote" href="/rendez-vous">
            Soumission gratuite
          </Link>
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={company.phoneHref}>
            <Icon name="phone" size={18} />
            <strong>{company.phone}</strong>
          </a>
          <Link className="button button-red header-quote" href="/rendez-vous">
            Soumission gratuite
          </Link>
          <button
            aria-controls="main-navigation"
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="menu-toggle"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <Icon name={open ? "close" : "menu"} size={27} />
          </button>
        </div>
      </div>
    </header>
  );
}
