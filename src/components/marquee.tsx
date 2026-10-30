/** Endless strip of skills. The second copy is hidden from screen readers. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="marquee-row flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8 font-mono text-sm whitespace-nowrap text-muted-foreground">
          <span>{item}</span>
          <span className="text-highlight" aria-hidden>
            ◆
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee group flex overflow-hidden border-b border-border/60 py-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      {row(false)}
      {row(true)}
    </div>
  );
}
