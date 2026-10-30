import { ArrowUpRight } from "lucide-react";

import { ExtLink } from "@/components/ext-link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group h-full transition-colors hover:border-ring">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-highlight">{project.category}</span>
          {project.upcoming && <Badge variant="learning">Upcoming</Badge>}
        </div>
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <CardDescription>{project.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tools">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="outline" className="font-mono">{tag}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {project.link ? (
          <ExtLink
            href={project.link}
            className="inline-flex items-center gap-1 font-mono text-sm text-foreground underline-offset-4 hover:underline"
          >
            View on GitHub <ArrowUpRight className="size-4" aria-hidden />
          </ExtLink>
        ) : (
          <span className="font-mono text-sm text-muted-foreground">Repo coming soon</span>
        )}
      </CardFooter>
    </Card>
  );
}
