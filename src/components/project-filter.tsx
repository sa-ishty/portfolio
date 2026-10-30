"use client";

import { useState } from "react";

import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { projectCategories, projects } from "@/data";

export function ProjectFilter() {
  const [active, setActive] = useState<string>("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {["All", ...projectCategories].map((cat) => {
          const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
          return (
            <Button
              key={cat}
              size="sm"
              variant={active === cat ? "default" : "outline"}
              aria-pressed={active === cat}
              onClick={() => setActive(cat)}
              className="font-mono"
            >
              {cat} <span className="opacity-60">{count}</span>
            </Button>
          );
        })}
      </div>
      <p className="mt-4 font-mono text-xs text-muted-foreground" aria-live="polite">
        {shown.length} {shown.length === 1 ? "project" : "projects"} matched
      </p>
      {shown.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {shown.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-dashed border-border p-8 text-center font-mono text-sm text-muted-foreground">
          % No entries in this category yet.
        </p>
      )}
    </>
  );
}
