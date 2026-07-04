import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Lanny Santana",
    description: "Agende sua consulta de nutrição personalizada.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4ED",
    theme_color: "#5E685A",
    icons: [
      { src: "/logo/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/logo/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
