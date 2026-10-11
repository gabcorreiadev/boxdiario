import { ImageResponse } from "next/og";
import { OgCard } from "@/components/OgCard";
import { getSeason } from "@/lib/jolpica";

export const alt = "Corrida de F1: horário e onde assistir";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ round: string }> }) {
  const round = Number((await params).round);
  const race = (await getSeason()).find((r) => r.round === round);
  const when = race
    ? new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }).format(new Date(race.startsAt))
    : "";
  return new ImageResponse(
    <OgCard
      eyebrow={race ? `Etapa ${race.round} · ${race.locality}` : "Fórmula 1"}
      title={race?.name ?? "Corrida"}
      subtitle={when ? `${when} (Brasília)` : undefined}
      footer={race ? (race.broadcast.openTv ? "Globo (TV aberta) · SporTV 3 · Globoplay · F1 TV" : "SporTV 3 · Globoplay · F1 TV") : ""}
    />,
    size,
  );
}
