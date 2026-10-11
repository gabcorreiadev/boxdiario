import type { Broadcast } from "@/lib/types";

export function WatchChips({ broadcast }: { broadcast: Broadcast }) {
  return (
    <div className="watch">
      <span className={`chip tv ${broadcast.openTv ? "" : "off"}`}>
        <i />Globo · {broadcast.openTv ? "TV aberta" : "sem TV aberta"}
      </span>
      <span className="chip cable"><i />SporTV 3</span>
      <span className="chip stream"><i />Globoplay</span>
      <span className="chip stream"><i />F1 TV</span>
    </div>
  );
}
