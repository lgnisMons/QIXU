import type { MetadataRoute } from "next";
import { brandConfig } from "@qixu/config/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brandConfig.name,
    short_name: brandConfig.nameEn,
    description: brandConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    lang: "zh-CN",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
