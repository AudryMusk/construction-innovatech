export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  icon: string;
  bullets: string[];
};

export type Project = {
  title: string;
  category: "Structure" | "Commercial" | "Extérieur" | "Intérieur" | "Agrandissement";
  location: string;
  image: string;
};

export const company = {
  name: "Construction Innovatech",
  url: "https://constructioninnovatech.com",
  phone: "418 808-3760",
  phoneHref: "tel:+14188083760",
  email: "info@constructioninnovatech.com",
  addressLine1: "6232, 1ère avenue",
  addressLine2: "Québec (QC) G1H 2Z8",
};

export const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export const services: Service[] = [
  {
    slug: "structure",
    title: "Travaux de structure",
    shortTitle: "Travaux de structure",
    description:
      "Fondations, charpente et éléments porteurs réalisés selon les normes en vigueur, pour une base solide et durable.",
    image: "/img/charpente-gypse.jpg",
    icon: "hardhat",
    bullets: [
      "Fondations en béton coulé",
      "Charpente de bois ou d’acier",
      "Mise aux normes RBQ",
      "Inspection structurale complète",
    ],
  },
  {
    slug: "commercial",
    title: "Projets commerciaux",
    shortTitle: "Projets commerciaux",
    description:
      "Bureaux, commerces et bâtiments industriels livrés clé en main, avec un seul point de contact du début à la fin.",
    image: "/img/structure-apres.jpg",
    icon: "building",
    bullets: [
      "Aménagement de bureaux",
      "Locaux commerciaux",
      "Bâtiments industriels",
      "Gestion de projet complète",
    ],
  },
  {
    slug: "exterieur",
    title: "Travaux extérieurs",
    shortTitle: "Travaux extérieurs",
    description:
      "Revêtement, maçonnerie, toiture et aménagement extérieur pour protéger et embellir votre propriété.",
    image: "/img/amenagement-exterieur.jpg",
    icon: "bricks",
    bullets: [
      "Revêtement extérieur (Canexel, fibrociment)",
      "Maçonnerie et brique",
      "Toiture",
      "Patios et galeries",
    ],
  },
  {
    slug: "interieur",
    title: "Travaux intérieurs",
    shortTitle: "Travaux intérieurs",
    description:
      "Rénovation complète d’espaces résidentiels et commerciaux, de la démolition aux finitions.",
    image: "/img/finition-sous-sol.jpg",
    icon: "paint",
    bullets: [
      "Cuisines et salles de bain",
      "Finition de sous-sol",
      "Cloisons et gypse",
      "Planchers et finitions",
    ],
  },
  {
    slug: "agrandissements",
    title: "Agrandissements",
    shortTitle: "Agrandissements",
    description:
      "Ajout d’espace harmonisé avec la structure existante, étudié pour maximiser votre propriété.",
    image: "/img/extension-residentielle.jpg",
    icon: "expand",
    bullets: [
      "Étude de faisabilité",
      "Extension résidentielle",
      "Ajout d’étage",
      "Intégration architecturale",
    ],
  },
  {
    slug: "renovation-interieure",
    title: "Rénovation intérieure",
    shortTitle: "Rénovation intérieure",
    description:
      "Mise à jour complète de vos espaces intérieurs, des cuisines et salles de bain jusqu’aux planchers et finitions.",
    image: "/img/finition-sous-sol.jpg",
    icon: "brush",
    bullets: [
      "Cuisine et salle de bain",
      "Planchers et moulures",
      "Peinture et finitions",
      "Éclairage et électricité",
    ],
  },
  {
    slug: "renovation-exterieure",
    title: "Rénovation extérieure",
    shortTitle: "Rénovation extérieure",
    description:
      "Remise à neuf de l’enveloppe du bâtiment pour protéger votre propriété et rehausser son apparence.",
    image: "/img/renovation-exterieure.jpg",
    icon: "home",
    bullets: [
      "Revêtement et bardage",
      "Fenêtres et portes",
      "Galeries et balcons",
      "Toiture et gouttières",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Charpente & gypse",
    category: "Structure",
    location: "Québec, QC",
    image: "/img/charpente-gypse.jpg",
  },
  {
    title: "Charpente en cours",
    category: "Structure",
    location: "Lévis, QC",
    image: "/img/charpente-cours.jpg",
  },
  {
    title: "Structure après travaux",
    category: "Commercial",
    location: "Basse-Ville, Québec",
    image: "/img/structure-apres.jpg",
  },
  {
    title: "Aménagement extérieur",
    category: "Extérieur",
    location: "Basse-Ville, Québec",
    image: "/img/amenagement-exterieur.jpg",
  },
  {
    title: "Rénovation extérieure",
    category: "Extérieur",
    location: "Limoilou, QC",
    image: "/img/renovation-exterieure.jpg",
  },
  {
    title: "Réfection de façade",
    category: "Extérieur",
    location: "Québec, QC",
    image: "/img/refection-facade.jpg",
  },
  {
    title: "Finition sous-sol & salle de bain",
    category: "Intérieur",
    location: "Beauport, QC",
    image: "/img/finition-sous-sol.jpg",
  },
  {
    title: "Rénovation complète",
    category: "Intérieur",
    location: "Rue des Intendants, Québec",
    image: "/img/renovation-complete.jpg",
  },
  {
    title: "Extension résidentielle",
    category: "Agrandissement",
    location: "Québec, QC",
    image: "/img/extension-residentielle.jpg",
  },
];
