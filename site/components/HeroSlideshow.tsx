"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Slide = { src: string; alt: string };

const HOLD = 6000; // how long a slide rests before the next crossfade starts

/**
 * Auto-advancing hero backdrop. Slides crossfade rather than push, and the
 * visible one drifts on a slow scale the whole time — the movement reads as
 * continuous rather than as a carousel stepping.
 *
 * Advancing stops whenever it would be wasted or unwanted: reduced-motion
 * visitors, a hidden tab, a hero scrolled out of view, or a pointer resting
 * on it.
 */
export function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const blocked = useRef({ motion: false, hidden: false, offscreen: false, hover: false });

  const sync = useCallback(() => {
    const b = blocked.current;
    setRunning(!b.motion && !b.hidden && !b.offscreen && !b.hover);
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      blocked.current.motion = motion.matches;
      sync();
    };
    const onVisibility = () => {
      blocked.current.hidden = document.hidden;
      sync();
    };

    onMotion();
    onVisibility();
    motion.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);

    let observer: IntersectionObserver | undefined;
    if (rootRef.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          blocked.current.offscreen = !entry.isIntersecting;
          sync();
        },
        { threshold: 0.15 },
      );
      observer.observe(rootRef.current);
    }

    return () => {
      motion.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, [sync]);

  useEffect(() => {
    if (!running || slides.length < 2) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), HOLD);
    return () => window.clearTimeout(timer);
  }, [running, index, slides.length]);

  const hover = (state: boolean) => {
    blocked.current.hover = state;
    sync();
  };

  return (
    <div
      className="hero-slideshow"
      ref={rootRef}
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
    >
      {/* Decorative: the headline already carries the message. */}
      <div className="hero-slides" aria-hidden="true">
        {slides.map((slide, i) => (
          <div className="hero-slide" data-active={i === index} key={slide.src}>
            <Image src={slide.src} alt="" fill sizes="100vw" priority={i === 0} quality={80} />
          </div>
        ))}
      </div>

      <div className="hero-dots">
        {slides.map((slide, i) => (
          <button
            aria-current={i === index}
            aria-label={`Photo ${i + 1} sur ${slides.length} — ${slide.alt}`}
            className={i === index ? "is-active" : ""}
            key={slide.src}
            onClick={() => setIndex(i)}
            type="button"
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}
