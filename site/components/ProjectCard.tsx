import Image from "next/image";
import type { Project } from "@/data/site";

type Props = {
  project: Project;
  /** Supplied by the gallery to open the lightbox; omitted on static previews. */
  onOpen?: () => void;
  priority?: boolean;
};

export function ProjectCard({ project, onOpen, priority }: Props) {
  const image = (
    <Image
      src={project.image}
      alt={project.title}
      fill
      sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
      priority={priority}
    />
  );

  return (
    <article className="project-card">
      {onOpen ? (
        <button
          className="project-image project-image-button"
          onClick={onOpen}
          type="button"
          aria-label={`Agrandir la photo — ${project.title}`}
        >
          {image}
          <span className="project-zoom" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.2-3.2M11 8v6M8 11h6" />
            </svg>
          </span>
        </button>
      ) : (
        <div className="project-image">{image}</div>
      )}
      <div className="project-copy">
        <span>{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.location}</p>
      </div>
    </article>
  );
}
