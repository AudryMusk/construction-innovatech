"use client";

import { useEffect, useRef, useState } from "react";

type Props = { value: number; suffix?: string };

const DURATION = 1400;
// Ease-out cubic: fast off the mark, settles gently on the final number.
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts up once, when the number actually scrolls into view. Renders the
 * final value on the server so the figure is correct with JS disabled and for
 * anything reading the markup.
 */
export function Counter({ value, suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          setShown(Math.round(ease(progress) * value));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        setShown(0);
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {shown.toLocaleString("fr-CA")}
      {suffix}
    </span>
  );
}
