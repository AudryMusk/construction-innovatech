# Construction Innovatech

Site vitrine complet de Construction Innovatech, construit avec Next.js, React, TypeScript et Tailwind CSS 4. Les maquettes de référence se trouvent dans `Exports/` et les sources visuelles dans `img/`.

## Démarrage

```bash
cd site
npm install
npm run dev
```

Validation de production :

```bash
npm run typecheck
npm run build
npm audit --omit=dev
```

## Routes

- `/` — accueil
- `/services` — sept familles de services
- `/realisations` — projets avec filtres interactifs
- `/a-propos` — histoire, valeurs et chiffres clés
- `/contact` — moyens de contact, horaires et carte
- `/rendez-vous` — demande de soumission

`robots.txt`, `sitemap.xml`, les métadonnées Open Graph, les titres de page, un favicon dynamique et les données structurées `GeneralContractor` sont générés par l’App Router.

## Architecture

- `site/app/` : routes, métadonnées et styles globaux
- `site/components/` : en-tête, pied de page, héros, CTA, cartes, filtres et animations
- `site/data/site.ts` : source unique pour les coordonnées, services, projets et navigation
- `site/public/img/` : images optimisées à la volée par `next/image`

Le contenu demandé dans `coorections` est intégré : identité rouge/blanc, 20+ ans d’expérience, 2000+ projets, rénovations intérieures/extérieures, travaux liés aux rapports d’ingénieur, courriel et délai de réponse de 24h à 48h.

## Formulaire et variables d’environnement

Le formulaire de soumission est une expérience conversationnelle en cinq étapes. Il envoie les demandes à l’API interne `/api/contact`, qui utilise Resend sans exposer la clé au navigateur.

Copier le modèle puis renseigner les valeurs :

```bash
cd site
cp .env.example .env.local
```

Variables requises : `RESEND_API_KEY`, `RESEND_FROM_EMAIL` et `CONTACT_EMAIL`. Le domaine de l’adresse d’expédition doit être vérifié chez Resend. En production, ces variables doivent également être ajoutées dans les réglages de l’hébergeur.

## Points à brancher avant mise en ligne

- Renseigner les véritables URL Facebook, Instagram et LinkedIn dans le pied de page.
- Confirmer le numéro de licence RBQ, les textes juridiques et le domaine final.
- Ajouter les projets définitifs si une source CMS est prévue.

Toute la mise en page est responsive, accessible au clavier et compatible avec `prefers-reduced-motion`. Les animations de révélation sont uniquement un enrichissement : le contenu reste visible si JavaScript est désactivé.
