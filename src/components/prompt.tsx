import { cn } from "@/lib/utils";

/** The IOS-style command printed above a heading, e.g. AIUB#show projects */
export function Prompt({
  command,
  host = "AIUB#",
  className,
}: {
  command: string;
  host?: string;
  className?: string;
}) {
  return (
    <p className={cn("font-mono text-xs sm:text-sm text-muted-foreground", className)}>
      <span className="text-highlight">{host}</span>
      {command}
    </p>
  );
}
