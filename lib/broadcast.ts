import local from "@/data/broadcast.json";
import type { Broadcast, Channel } from "./types";

type BroadcastFile = {
  season: number;
  default: { openTv: boolean; channels: Channel[] };
  openTvRounds: number[];
};

/**
 * Lê o broadcast.json. Se BROADCAST_URL estiver definido (URL raw do GitHub),
 * busca de lá com cache de 6 h: editar o arquivo no GitHub atualiza o site sem novo deploy.
 * Se a busca falhar, usa a cópia local.
 */
async function load(): Promise<BroadcastFile> {
  const url = process.env.BROADCAST_URL;
  if (url) {
    try {
      const res = await fetch(url, { next: { revalidate: 60 * 60 * 6 } });
      if (res.ok) return (await res.json()) as BroadcastFile;
    } catch {
      /* cai para o arquivo local */
    }
  }
  return local as BroadcastFile;
}

export async function getBroadcastMap(): Promise<(round: number) => Broadcast> {
  const file = await load();
  const open = new Set(file.openTvRounds);
  return (round) => {
    const openTv = open.has(round);
    const channels: Channel[] = openTv ? ["GLOBO", ...file.default.channels] : [...file.default.channels];
    return { openTv, channels };
  };
}
