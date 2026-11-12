// Brand mark (orange G) + wordmark.
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src="/favicon.svg" alt="" width={30} height={30} className="h-[30px] w-[30px]" />
      <span className="text-[19px] font-semibold tracking-[-0.03em] text-ink">GearGrid</span>
    </span>
  )
}
