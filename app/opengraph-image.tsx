import { ImageResponse } from "next/og";
import { OgCard } from "@/components/OgCard";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} · ${SITE.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow={SITE.slogan} title="Cinco luzes. Apagaram." subtitle="Próxima corrida, onde assistir e a história da F1" footer="Em português · Feito no Brasil" />,
    size,
  );
}
