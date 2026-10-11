/**
 * Arte de compartilhamento (1200x630) usada no WhatsApp, redes e Google.
 * Feita com JSX + estilos inline porque é renderizada como imagem pelo next/og.
 */
export function OgCard({ eyebrow, title, subtitle, footer }: { eyebrow: string; title: string; subtitle?: string; footer: string }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0d0f14", color: "#eef0f4", padding: "64px 72px", position: "relative", fontFamily: "sans-serif" }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 18, display: "flex" }}>
        {Array.from({ length: 60 }, (_, i) => <div key={i} style={{ width: 20, height: 18, background: i % 2 ? "#0d0f14" : "#eef0f4" }} />)}
      </div>
      <div style={{ position: "absolute", right: -120, top: -120, width: 520, height: 520, borderRadius: 520, background: "radial-gradient(circle, rgba(255,42,31,0.35), rgba(13,15,20,0) 70%)", display: "flex" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <div style={{ display: "flex", gap: 12 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ width: 40, height: 40, borderRadius: 40, background: "#ff2a1f", boxShadow: "0 0 24px #ff2a1f", display: "flex" }} />
          ))}
        </div>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 2, display: "flex" }}>BOX NA VEIA</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#8c94a6", textTransform: "uppercase", display: "flex" }}>{eyebrow}</div>
        <div style={{ fontSize: title.length > 26 ? 76 : 96, fontWeight: 900, lineHeight: 1, textTransform: "uppercase", display: "flex", maxWidth: 1000 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 34, color: "#f5c518", display: "flex" }}>{subtitle}</div>}
      </div>
      <div style={{ fontSize: 26, color: "#c9ced9", display: "flex", marginBottom: 20 }}>{footer}</div>
    </div>
  );
}
