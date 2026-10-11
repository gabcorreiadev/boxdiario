import type { Metadata } from "next";

/** Open Graph + Twitter de uma página, mantendo a arte padrão de compartilhamento. */
export function share(title: string, description: string, url: string, type: "website" | "profile" | "article" = "website"): Pick<Metadata, "openGraph" | "twitter"> {
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }];
  return {
    openGraph: { title, description, url, type, locale: "pt_BR", images },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}
