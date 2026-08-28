"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { company } from "@/data/site";

/**
 * Phone-width action bar. A contractor's traffic is mostly mobile and the
 * decision is "call them", so the number should never be more than a thumb
 * away. Held back until the hero has scrolled past so it doesn't cover the
 * hero's own buttons.
 */
export function MobileCallBar() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The booking page is itself the conversion step — the bar would only cover
  // the form it is trying to send people to.
  if (pathname === "/rendez-vous") return null;

  return (
    <div className="mobile-call-bar" data-shown={shown} aria-hidden={!shown}>
      <a className="button button-outline-dark" href={company.phoneHref} tabIndex={shown ? 0 : -1}>
        <Icon name="phone" size={17} /> Appeler
      </a>
      <Link className="button button-red" href="/rendez-vous" tabIndex={shown ? 0 : -1}>
        Soumission gratuite
      </Link>
    </div>
  );
}
