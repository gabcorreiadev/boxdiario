import { getSeason } from "@/lib/jolpica";

export const revalidate = 86400;

const stamp = (iso: string) => iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Feed de calendário: cada corrida com alarme 1 h antes. Assine uma vez e receba todos os avisos. */
export async function GET() {
  const races = await getSeason();
  const now = stamp(new Date().toISOString());
  const events = races.map((r) => {
    const start = new Date(r.startsAt);
    const end = new Date(start.getTime() + 2 * 3600_000);
    const where = r.broadcast.openTv ? "Globo (TV aberta), SporTV 3, Globoplay, F1 TV" : "SporTV 3, Globoplay, F1 TV";
    return [
      "BEGIN:VEVENT",
      `UID:boxnaveia-${start.getUTCFullYear()}-r${r.round}@boxnaveia`,
      `DTSTAMP:${now}`,
      `DTSTART:${stamp(start.toISOString())}`,
      `DTEND:${stamp(end.toISOString())}`,
      `SUMMARY:🏁 ${r.name}`,
      `LOCATION:${r.circuit}\\, ${r.locality}`,
      `DESCRIPTION:Onde assistir: ${where}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT1H",
      "ACTION:DISPLAY",
      `DESCRIPTION:${r.name} começa em 1 hora`,
      "END:VALARM",
      "END:VEVENT",
    ].join("\r\n");
  });
  const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Box na Veia//Calendario F1//PT-BR", "CALSCALE:GREGORIAN", "X-WR-CALNAME:Corridas de F1", ...events, "END:VCALENDAR"].join("\r\n");
  return new Response(body, { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'inline; filename="corridas.ics"' } });
}
