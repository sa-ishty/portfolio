"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const TopologyGlobe = dynamic(() => import("@/components/topology-globe"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center font-mono text-xs text-muted-foreground">
      Loading topology…
    </div>
  ),
});

/** 3D network globe. three.js is only downloaded once the globe is about to scroll into view. */
export function Topology() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-xl border border-border bg-card">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="relative h-[340px] sm:h-[440px]">
        {near && <TopologyGlobe />}
      </div>
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
        <span className="hidden sm:inline">Drag to rotate · each lit node is a focus area</span>
        <span className="sm:hidden">Each lit node is a focus area</span>
        <span className="flex gap-3">
          <span>
            <span className="text-up">●</span> up
          </span>
          <span>
            <span className="text-learning">●</span> learning
          </span>
          <span>
            <span className="text-muted-foreground">●</span> planned
          </span>
        </span>
      </div>
    </div>
  );
}
