"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { Icon } from "@/components/Icon";
import type { Project } from "@/data/site";

type Props = {
  projects: Project[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ projects, index, onClose, onNavigate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const project = projects[index];

  const go = useCallback(
    (step: number) => onNavigate((index + step + projects.length) % projects.length),
    [index, projects.length, onNavigate],
  );

  useEffect(() => {
    closeRef.current?.focus();
    document.body.classList.add("menu-open");
    return () => document.body.classList.remove("menu-open");
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onClose();
      if (event.key === "ArrowRight") return go(1);
      if (event.key === "ArrowLeft") return go(-1);
      if (event.key !== "Tab") return;

      // Keep focus inside the dialog while it is open.
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button");
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  if (!project) return null;

  return (
    <div
      className="lightbox"
      onClick={(event) => event.target === event.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — ${project.location}`}
      ref={dialogRef}
    >
      <div className="lightbox-inner">
        <button className="lightbox-close" onClick={onClose} type="button" ref={closeRef} aria-label="Fermer">
          <Icon name="close" size={26} />
        </button>

        <button className="lightbox-nav prev" onClick={() => go(-1)} type="button" aria-label="Projet précédent">
          <Icon name="arrow" size={22} />
        </button>

        <figure className="lightbox-figure">
          <Image
            src={project.image}
            alt={project.title}
            width={1400}
            height={800}
            sizes="(max-width: 900px) 94vw, 80vw"
            priority
          />
          <figcaption>
            <span>{project.category}</span>
            <strong>{project.title}</strong>
            <em>{project.location}</em>
            <small>
              {index + 1} / {projects.length}
            </small>
          </figcaption>
        </figure>

        <button className="lightbox-nav next" onClick={() => go(1)} type="button" aria-label="Projet suivant">
          <Icon name="arrow" size={22} />
        </button>
      </div>
    </div>
  );
}
