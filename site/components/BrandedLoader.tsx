"use client";

import { useEffect, useState } from "react";
import { LoaderArtwork } from "@/components/LoaderArtwork";

export function BrandedLoader() {
  const [phase, setPhase] = useState<"visible" | "leaving" | "hidden">("visible");

  useEffect(() => {
    document.body.classList.add("loader-active");

    const leaveTimer = window.setTimeout(() => setPhase("leaving"), 850);
    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
      document.body.classList.remove("loader-active");
    }, 1250);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      document.body.classList.remove("loader-active");
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      aria-label="Chargement de Construction Innovatech"
      aria-live="polite"
      className={`branded-loader ${phase === "leaving" ? "is-leaving" : ""}`}
      role="status"
    >
      <LoaderArtwork />
      <span className="sr-only">Chargement…</span>
    </div>
  );
}
