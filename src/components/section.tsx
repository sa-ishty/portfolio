import type { ReactNode } from "react";

import { Prompt } from "@/components/prompt";
import { cn } from "@/lib/utils";

export function Section({
  id,
  command,
  title,
  intro,
  children,
  className,
}: {
  id?: string;
  command: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("reveal py-16 sm:py-20", className)}>
      <Prompt command={command} />
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold">{title}</h2>
      {intro && <p className="mt-3 max-w-2xl text-muted-foreground">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
