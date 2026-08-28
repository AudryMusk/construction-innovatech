"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives every scroll-triggered effect on the site from a single pass:
 *
 *  - `.reveal`            elements animate in once when they enter the viewport
 *  - `[data-stagger]`     children of that container are delayed in sequence
 *  - `[data-parallax]`    background drifts against the scroll
 *  - `.site-header`       gets `is-stuck` once the page has moved
 *
 * All of it is transform/opacity only, and all of it is skipped outright when
 * the visitor asks for reduced motion.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const header = document.querySelector<HTMLElement>(".site-header");

    // Header state is worth keeping even without motion — it is a shadow, not a move.
    let ticking = false;
    const onScrollHeader = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        header?.classList.toggle("is-stuck", window.scrollY > 12);
        ticking = false;
      });
    };
    onScrollHeader();
    window.addEventListener("scroll", onScrollHeader, { passive: true });

    if (reduced) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((item) => {
        item.dataset.shown = "true";
      });
      return () => window.removeEventListener("scroll", onScrollHeader);
    }

    // Sequence the children of a staggered container before anything is shown.
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
      const step = Number(group.dataset.stagger) || 80;
      Array.from(group.children).forEach((child, index) => {
        (child as HTMLElement).style.setProperty("--reveal-delay", `${index * step}ms`);
      });
    });

    const items = document.querySelectorAll<HTMLElement>(".reveal");

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => (item.dataset.shown = "true"));
      return () => window.removeEventListener("scroll", onScrollHeader);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.shown = "true";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );

    items.forEach((item) => observer.observe(item));

    // Parallax: nudge the background against the scroll, clamped so the image
    // never pulls away from its own edges.
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let parallaxTicking = false;

    const onScrollParallax = () => {
      if (parallaxTicking) return;
      parallaxTicking = true;
      requestAnimationFrame(() => {
        const viewport = window.innerHeight;
        layers.forEach((layer) => {
          const box = layer.getBoundingClientRect();
          if (box.bottom < 0 || box.top > viewport) return;
          const strength = Number(layer.dataset.parallax) || 14;
          const progress = (box.top + box.height / 2 - viewport / 2) / viewport;
          layer.style.setProperty("--parallax", `${(-progress * strength).toFixed(2)}px`);
        });
        parallaxTicking = false;
      });
    };

    if (layers.length) {
      onScrollParallax();
      window.addEventListener("scroll", onScrollParallax, { passive: true });
      window.addEventListener("resize", onScrollParallax, { passive: true });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollHeader);
      window.removeEventListener("scroll", onScrollParallax);
      window.removeEventListener("resize", onScrollParallax);
    };
  }, [pathname]);

  return null;
}
