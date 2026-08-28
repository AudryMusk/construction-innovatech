import type { MetadataRoute } from "next";
import { company } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/realisations", "/a-propos", "/contact", "/rendez-vous"];

  return routes.map((route) => ({
    url: `${company.url}${route}`,
    lastModified: new Date("2026-08-27"),
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/rendez-vous" ? 0.9 : 0.8,
  }));
}
