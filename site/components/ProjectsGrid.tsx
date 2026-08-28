"use client";

import { useEffect, useMemo, useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/data/site";

const filters = ["Tous", "Structure", "Commercial", "Extérieur", "Intérieur", "Agrandissement"] as const;
type Filter = (typeof filters)[number];

const slugify = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("Tous");
  const [open, setOpen] = useState<number | null>(null);

  // Restore the filter from the URL so a filtered view can be linked and shared.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("categorie");
    const match = filters.find((item) => slugify(item) === wanted);
    if (match) setFilter(match);
  }, []);

  const select = (next: Filter) => {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === "Tous") url.searchParams.delete("categorie");
    else url.searchParams.set("categorie", slugify(next));
    // replaceState keeps the page static and avoids a scroll jump.
    window.history.replaceState(null, "", url);
  };

  const filtered = useMemo(
    () => (filter === "Tous" ? projects : projects.filter((project) => project.category === filter)),
    [filter, projects],
  );

  return (
    <>
      <div className="project-filters" role="group" aria-label="Filtrer les réalisations">
        {filters.map((item) => (
          <button
            aria-pressed={filter === item}
            className={filter === item ? "active" : ""}
            key={item}
            onClick={() => select(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <p className="filter-count" aria-live="polite">
        {filtered.length} projet{filtered.length > 1 ? "s" : ""}
        {filter !== "Tous" ? ` en ${filter.toLowerCase()}` : ""}
      </p>

      <div className="projects-grid" data-stagger="60">
        {filtered.map((project, index) => (
          <ProjectCard project={project} key={project.title} onOpen={() => setOpen(index)} />
        ))}
      </div>

      {open !== null && (
        <Lightbox
          projects={filtered}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={setOpen}
        />
      )}
    </>
  );
}
