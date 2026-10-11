import type { GlossaryVisual as Kind } from "@/content/glossary";

const INK = "var(--color-chalk)";
const MIST = "var(--color-mist)";
const LINE = "var(--color-line)";
const RED = "var(--color-signal)";
const YEL = "var(--color-medium)";
const BLUE = "var(--color-wet)";
const GREEN = "var(--color-inter)";

const T = (p: React.SVGProps<SVGTextElement>) => <text fontFamily="var(--font-mono)" fontSize="11" fill={MIST} {...p} />;
const Big = (p: React.SVGProps<SVGTextElement>) => <text fontFamily="var(--font-display)" fontWeight="900" fill={INK} {...p} />;

function Car({ x, y, color, s = 1 }: { x: number; y: number; color: string; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="0" y="6" width="5" height="9" rx="1" fill={color} />
      <path d="M6 13 20 12 30 11 36 5 43 5 47 10 68 11 76 13 80 13 80 16 6 16Z" fill={color} />
      <circle cx="19" cy="16" r="5" fill="#05060a" /><circle cx="65" cy="16" r="5" fill="#05060a" />
    </g>
  );
}

function Lanes({ first }: { first: "you" | "rival" }) {
  // Duas linhas do tempo: quem para primeiro (undercut) ou depois (overcut).
  const youPit = first === "you" ? 110 : 190;
  const rivalPit = first === "you" ? 190 : 110;
  return (
    <>
      <T x="16" y="44">VOCÊ</T><T x="16" y="104">RIVAL</T>
      <line x1="70" x2="300" y1="40" y2="40" stroke={YEL} strokeWidth="3" strokeLinecap="round" />
      <line x1="70" x2="300" y1="100" y2="100" stroke={MIST} strokeWidth="3" strokeLinecap="round" />
      <circle cx={youPit} cy="40" r="9" fill={YEL} /><T x={youPit - 14} y="24" fill={YEL}>BOX</T>
      <circle cx={rivalPit} cy="100" r="9" fill={MIST} /><T x={rivalPit - 14} y="124">BOX</T>
      <T x="232" y="150" fill={INK}>VOCÊ NA FRENTE ✓</T>
    </>
  );
}

export function GlossaryVisual({ kind }: { kind: Kind }) {
  let body: React.ReactNode;
  switch (kind) {
    case "radio":
      body = (<>
        {[30, 52, 74].map((r) => <path key={r} d={`M${160 - r} ${80 + r * 0.55} A ${r} ${r} 0 0 1 ${160 + r} ${80 + r * 0.55}`} fill="none" stroke={RED} strokeWidth="3" opacity={1 - r / 110} />)}
        <Big x="160" y="138" fontSize="34" textAnchor="middle">BOX, BOX</Big>
      </>);
      break;
    case "pitstop":
      body = (<>
        <Big x="160" y="92" fontSize="64" textAnchor="middle">1,80<tspan fontSize="30" fill={YEL}>s</tspan></Big>
        <T x="160" y="120" textAnchor="middle">PIT STOP MAIS RÁPIDO DA HISTÓRIA</T>
        {[60, 100, 220, 260].map((x) => <circle key={x} cx={x} cy="140" r="9" fill="none" stroke={INK} strokeWidth="4" />)}
      </>);
      break;
    case "undercut":
      body = <Lanes first="you" />;
      break;
    case "overcut":
      body = <Lanes first="rival" />;
      break;
    case "tyres":
      body = (<>
        {[["S", RED, "Macio"], ["M", YEL, "Médio"], ["H", INK, "Duro"], ["I", GREEN, "Inter."], ["W", BLUE, "Chuva"]].map(([l, c, n], i) => (
          <g key={l} transform={`translate(${36 + i * 62} 70)`}>
            <circle r="24" fill="#111" stroke={c} strokeWidth="5" />
            <circle r="13" fill="#2a2f3a" />
            <Big y="7" fontSize="18" textAnchor="middle" fill={c}>{l}</Big>
            <T y="48" textAnchor="middle">{n}</T>
          </g>
        ))}
      </>);
      break;
    case "grid":
      body = (<>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x = i % 2 === 0 ? 70 : 170, y = 18 + i * 22;
          return <g key={i}><rect x={x} y={y} width="80" height="16" rx="3" fill={i === 0 ? "color-mix(in srgb, var(--color-medium) 30%, transparent)" : "none"} stroke={i === 0 ? YEL : LINE} strokeWidth="2" /><T x={x + 6} y={y + 12} fill={i === 0 ? YEL : MIST}>P{i + 1}</T></g>;
        })}
        <T x="262" y="30" fill={YEL}>POLE</T>
      </>);
      break;
    case "quali":
      body = (<>
        {[["Q1", 22, 290], ["Q2", 16, 210], ["Q3", 10, 132]].map(([q, n, w], i) => (
          <g key={q as string} transform={`translate(${160 - (w as number) / 2} ${22 + i * 44})`}>
            <rect width={w as number} height="32" rx="6" fill={i === 2 ? "color-mix(in srgb, var(--color-medium) 25%, transparent)" : "var(--color-raised)"} stroke={i === 2 ? YEL : LINE} />
            <Big x={(w as number) / 2} y="23" fontSize="18" textAnchor="middle">{q} · {n} carros</Big>
          </g>
        ))}
      </>);
      break;
    case "lights":
      body = (<>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${62 + i * 44} 30)`}>
            <rect width="32" height="88" rx="6" fill="#05060a" stroke={LINE} />
            <circle cx="16" cy="62" r="10" fill={RED} /><circle cx="16" cy="38" r="10" fill={RED} opacity=".9" />
          </g>
        ))}
        <T x="160" y="146" textAnchor="middle" fill={INK}>APAGOU, LARGOU</T>
      </>);
      break;
    case "safety":
      body = (<>
        <rect x="20" y="58" width="72" height="26" rx="5" fill={YEL} /><Big x="56" y="78" fontSize="18" textAnchor="middle" fill="#000">SC</Big>
        {[0, 1, 2, 3].map((i) => <Car key={i} x={110 + i * 48} y={58} color={[RED, "#00d7b6", "#f47600", "#4781d7"][i]} s={0.5} />)}
        <T x="160" y="120" textAnchor="middle">FILA INDIANA · SEM ULTRAPASSAGEM</T>
      </>);
      break;
    case "vsc":
      body = (<>
        <rect x="70" y="36" width="180" height="60" rx="8" fill="#000" stroke={YEL} strokeWidth="3" />
        <Big x="160" y="80" fontSize="38" textAnchor="middle" fill={YEL}>VSC</Big>
        <T x="160" y="124" textAnchor="middle">TODOS DEVAGAR · POSIÇÕES CONGELADAS</T>
      </>);
      break;
    case "flags":
      body = (<>
        {[[YEL, "Perigo"], [RED, "Parada"], [BLUE, "Passagem"]].map(([c, n], i) => (
          <g key={n} transform={`translate(${26 + i * 72} 40)`}>
            <line x1="0" x2="0" y1="0" y2="74" stroke={MIST} strokeWidth="2" />
            <rect x="2" y="0" width="50" height="34" fill={c} />
            <T x="0" y="92">{n}</T>
          </g>
        ))}
        <g transform="translate(242 40)">
          <line x1="0" x2="0" y1="0" y2="74" stroke={MIST} strokeWidth="2" />
          {Array.from({ length: 20 }, (_, k) => <rect key={k} x={2 + (k % 5) * 10} y={Math.floor(k / 5) * 8.5} width="10" height="8.5" fill={((k % 5) + Math.floor(k / 5)) % 2 ? "#000" : "#fff"} />)}
          <T x="0" y="92">Fim</T>
        </g>
      </>);
      break;
    case "sprint":
      body = (<>
        <Big x="96" y="92" fontSize="54" textAnchor="middle">100<tspan fontSize="22" fill={MIST}>km</tspan></Big>
        <Big x="236" y="92" fontSize="54" textAnchor="middle" fill={YEL}>8<tspan fontSize="22" fill={MIST}>pts</tspan></Big>
        <T x="96" y="122" textAnchor="middle">≈ 30 MINUTOS</T><T x="236" y="122" textAnchor="middle">PARA O VENCEDOR</T>
      </>);
      break;
    case "points":
      body = (<>
        {[25, 18, 15, 12, 10, 8, 6, 4, 2, 1].map((p, i) => (
          <g key={p} transform={`translate(${24 + i * 28} 0)`}>
            <rect x="0" y={130 - p * 4} width="20" height={p * 4} rx="3" fill={i === 0 ? YEL : "var(--color-raised)"} stroke={i === 0 ? YEL : LINE} />
            <T x="10" y={124 - p * 4} textAnchor="middle" fill={i === 0 ? YEL : MIST}>{p}</T>
            <T x="10" y="146" textAnchor="middle">{i + 1}º</T>
          </g>
        ))}
      </>);
      break;
    case "penalty":
      body = (<>
        {[["+5s", YEL], ["+10s", "#f47600"], ["DRIVE", RED]].map(([t, c], i) => (
          <g key={t} transform={`translate(${30 + i * 92} 50)`}>
            <rect width="76" height="48" rx="8" fill="none" stroke={c} strokeWidth="3" />
            <Big x="38" y="33" fontSize="22" textAnchor="middle" fill={c}>{t}</Big>
          </g>
        ))}
        <T x="160" y="128" textAnchor="middle">DA MAIS LEVE PARA A MAIS GRAVE</T>
      </>);
      break;
    case "limits":
      body = (<>
        <path d="M10 120 Q160 20 310 120" fill="none" stroke="#fff" strokeWidth="4" />
        <path d="M10 140 Q160 40 310 140" fill="none" stroke={LINE} strokeWidth="40" opacity=".5" />
        <Car x={190} y={46} color={RED} s={0.6} />
        <T x="160" y="152" textAnchor="middle">UMA RODA SEMPRE DENTRO DA LINHA BRANCA</T>
      </>);
      break;
    case "parc":
      body = (<>
        <rect x="128" y="62" width="64" height="50" rx="8" fill="none" stroke={INK} strokeWidth="4" />
        <path d="M140 62 v-14 a20 20 0 0 1 40 0 v14" fill="none" stroke={INK} strokeWidth="4" />
        <circle cx="160" cy="86" r="6" fill={YEL} />
        <T x="160" y="140" textAnchor="middle">CARRO LACRADO DO SÁBADO AO DOMINGO</T>
      </>);
      break;
    case "slipstream":
      body = (<>
        {[50, 64, 78].map((y, i) => <path key={y} d={`M150 ${y} C 110 ${y}, 90 ${y + (i - 1) * 6}, 30 ${y + (i - 1) * 10}`} fill="none" stroke={BLUE} strokeWidth="2" strokeDasharray="6 6" opacity=".8" />)}
        <Car x={160} y={52} color="#00d7b6" s={0.9} />
        <Car x={40} y={98} color={RED} s={0.9} />
        <T x="160" y="148" textAnchor="middle">MENOS AR NA FRENTE = MAIS VELOCIDADE</T>
      </>);
      break;
    case "rules2026":
      body = (<>
        <rect x="40" y="40" width="110" height="56" rx="8" fill="none" stroke={GREEN} strokeWidth="3" />
        <rect x="150" y="56" width="8" height="24" rx="2" fill={GREEN} />
        <rect x="46" y="46" width="49" height="44" rx="4" fill={GREEN} />
        <Big x="95" y="124" fontSize="20" textAnchor="middle">≈50% ELÉTRICO</Big>
        <Big x="250" y="82" fontSize="44" textAnchor="middle" fill={GREEN}>100%</Big>
        <Big x="250" y="124" fontSize="20" textAnchor="middle">SUSTENTÁVEL</Big>
      </>);
      break;
  }
  return (
    <svg viewBox="0 0 320 160" className="gvisual" role="img" aria-hidden="true">
      {body}
    </svg>
  );
}
