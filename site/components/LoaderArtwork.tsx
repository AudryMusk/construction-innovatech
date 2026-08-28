import Image from "next/image";

export function LoaderArtwork() {
  return (
    <div className="loader-artwork">
      <span className="loader-corner loader-corner-top" aria-hidden="true" />
      <div className="loader-brand">
        <div className="loader-logo-mask">
          <Image
            className="loader-logo"
            src="/img/logo-noir.png"
            alt="Construction Innovatech"
            width={312}
            height={92}
            priority
          />
        </div>
        <p>Vos projets. Notre savoir-faire.</p>
        <div className="loader-track" aria-hidden="true"><span /></div>
      </div>
      <span className="loader-corner loader-corner-bottom" aria-hidden="true" />
    </div>
  );
}
