import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found section">
      <div className="container">
        <p className="eyebrow">Erreur 404</p>
        <h1 className="content-title">Cette page n’existe pas.</h1>
        <p>Le chantier s’arrête ici. Revenez à l’accueil pour poursuivre votre visite.</p>
        <Link className="button button-red" href="/">Retour à l’accueil</Link>
      </div>
    </section>
  );
}
