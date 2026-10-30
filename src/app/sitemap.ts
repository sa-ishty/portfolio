import type { MetadataRoute } from "next";

import { profile } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/projects", "/journey", "/content", "/photography"].map((path) => ({
    url: `${profile.siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
