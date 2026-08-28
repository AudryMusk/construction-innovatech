import { LoaderArtwork } from "@/components/LoaderArtwork";

export default function Loading() {
  return (
    <div aria-label="Chargement" aria-live="polite" className="branded-loader route-loader" role="status">
      <LoaderArtwork />
      <span className="sr-only">Chargement…</span>
    </div>
  );
}
