// Small uppercase eyebrow above section titles.
export default function SectionLabel({ children, tone = "light" }) {
  const cls =
    tone === "dark"
      ? "text-amber-400/90"
      : "text-amber-600";
  return (
    <div className={`mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${cls}`}>
      <span className="inline-block h-px w-6 bg-current opacity-60" />
      {children}
    </div>
  );
}
