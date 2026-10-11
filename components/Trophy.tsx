export function Trophy({ kind }: { kind: "g" | "s" }) {
  return (
    <svg className={kind} viewBox="0 0 16 18" aria-hidden="true">
      <path d="M3 1h10v2h3v2a4 4 0 0 1-4 4h-.3A4.5 4.5 0 0 1 9 11.6V14h3v3H4v-3h3v-2.4A4.5 4.5 0 0 1 4.3 9H4a4 4 0 0 1-4-4V3h3zm0 4H2v.1A2 2 0 0 0 3 6.8zm10 0v1.8A2 2 0 0 0 14 5.1V5z" />
    </svg>
  );
}
