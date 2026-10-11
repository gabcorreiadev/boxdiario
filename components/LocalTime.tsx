"use client";

import { useEffect, useState } from "react";

const FORMATS = {
  full: { weekday: "short", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" },
  time: { weekday: "short", hour: "2-digit", minute: "2-digit" },
  day: { day: "2-digit", month: "short" },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

/** Mostra a data no fuso do visitante. No servidor, usa o horário de Brasília. */
export function LocalTime({ iso, format = "full" }: { iso: string; format?: keyof typeof FORMATS }) {
  const opts = FORMATS[format];
  const [text, setText] = useState(() =>
    new Intl.DateTimeFormat("pt-BR", { ...opts, timeZone: "America/Sao_Paulo" }).format(new Date(iso)),
  );
  useEffect(() => {
    setText(new Intl.DateTimeFormat("pt-BR", opts).format(new Date(iso)));
  }, [iso, opts]);
  return <time dateTime={iso}>{text}</time>;
}
