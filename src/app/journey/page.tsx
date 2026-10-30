import type { Metadata } from "next";

import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { journey, type JourneyStatus } from "@/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Learning journey",
  description: "Shahriar Adnan Ishty's learning log: network automation, CCNA and AWS milestones.",
};

const dot: Record<JourneyStatus, string> = {
  done: "bg-up",
  now: "bg-learning ring-4 ring-learning/25",
  next: "bg-background border-2 border-muted-foreground",
};

const badge: Record<JourneyStatus, "up" | "learning" | "outline"> = {
  done: "up",
  now: "learning",
  next: "outline",
};

export default function JourneyPage() {
  return (
    <Container className="pb-20">
      <PageHeader
        command="show logging | include milestone"
        title="Learning journey"
        intro="The plan from network engineering into automation and cloud, kept up to date as each step lands."
      />
      <ol className="relative max-w-3xl border-l border-border pl-8">
        {journey.map((item) => (
          <li key={item.title} className="reveal relative pb-10 last:pb-0">
            <span className={cn("absolute -left-[39px] top-1.5 size-3.5 rounded-full", dot[item.status])} aria-hidden />
            <div className="flex flex-wrap items-center gap-3">
              <time className="font-mono text-sm text-muted-foreground">{item.date}</time>
              <Badge variant={badge[item.status]} className="font-mono">
                {item.status === "now" ? "now learning" : item.status}
              </Badge>
            </div>
            <h2 className={cn("mt-2 text-xl font-semibold", item.status === "next" && "text-foreground/80")}>
              {item.title}
            </h2>
            <p className="mt-1 text-muted-foreground">{item.detail}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
}
