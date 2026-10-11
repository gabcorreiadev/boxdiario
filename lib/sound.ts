/**
 * Sons gerados no próprio navegador (Web Audio API): sem arquivo, sem licença, zero download.
 * Navegadores só tocam som depois de um clique, por isso tudo começa a partir de um botão.
 */
let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ctx ??= new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Bipe curto de cada luz de largada. */
export function beep(at = 0, freq = 720) {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime + at;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = "square";
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.08, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 0.16);
}

/** Carro passando da esquerda para a direita, com troca de marcha e efeito Doppler. */
export function carPassBy(at = 0) {
  const ac = audio();
  if (!ac) return;
  const t0 = ac.currentTime + at;
  const pass = t0 + 1.25; // momento em que o carro passa na frente
  const end = t0 + 2.8;

  const master = ac.createGain();
  const pan = ac.createStereoPanner();
  const lp = ac.createBiquadFilter();
  lp.type = "lowpass";
  lp.Q.value = 2;
  master.connect(lp).connect(pan).connect(ac.destination);

  // Motor: duas ondas "serra" levemente desafinadas soam como um V6 em alta rotação.
  const oscs = [1, 2.005, 3.01].map((mult, i) => {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "sawtooth";
    g.gain.value = [0.5, 0.28, 0.12][i];
    const f = (hz: number) => hz * mult;
    o.frequency.setValueAtTime(f(300), t0);
    o.frequency.linearRampToValueAtTime(f(395), t0 + 0.65); // acelerando
    o.frequency.linearRampToValueAtTime(f(330), t0 + 0.72); // troca de marcha
    o.frequency.linearRampToValueAtTime(f(410), pass - 0.05);
    o.frequency.exponentialRampToValueAtTime(f(285), pass + 0.25); // Doppler: o tom cai ao passar
    o.frequency.linearRampToValueAtTime(f(300), end);
    o.connect(g).connect(master);
    o.start(t0);
    o.stop(end + 0.05);
    return o;
  });

  // Vento / pneus: ruído filtrado.
  const len = Math.floor(ac.sampleRate * 3);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const noise = ac.createBufferSource();
  noise.buffer = buf;
  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1400;
  bp.Q.value = 0.7;
  const ng = ac.createGain();
  ng.gain.value = 0.35;
  noise.connect(bp).connect(ng).connect(master);
  noise.start(t0);
  noise.stop(end);

  // Volume: chega forte, passa, some.
  master.gain.setValueAtTime(0.0001, t0);
  master.gain.exponentialRampToValueAtTime(0.06, t0 + 0.6);
  master.gain.exponentialRampToValueAtTime(0.32, pass);
  master.gain.exponentialRampToValueAtTime(0.08, pass + 0.6);
  master.gain.exponentialRampToValueAtTime(0.0001, end);

  lp.frequency.setValueAtTime(900, t0);
  lp.frequency.exponentialRampToValueAtTime(4200, pass);
  lp.frequency.exponentialRampToValueAtTime(800, end);

  pan.pan.setValueAtTime(-0.95, t0);
  pan.pan.linearRampToValueAtTime(-0.5, pass - 0.3);
  pan.pan.linearRampToValueAtTime(0.5, pass + 0.3);
  pan.pan.linearRampToValueAtTime(0.95, end);

  return oscs;
}
