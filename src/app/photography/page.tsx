import type { Metadata } from "next";

import { Container } from "@/components/container";
import { GalleryGrid } from "@/components/gallery-grid";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Todo } from "@/components/todo";
import { gallery, leadership, type Photo } from "@/data";

export const metadata: Metadata = {
  title: "Photography",
  description: "Photography by Shahriar Adnan Ishty, former president of a photographers' club who organised two national exhibitions.",
};

// Shown until the real gallery photos are added to src/data/gallery.json.
const placeholder: Photo[] = [
  {
    src: "/images/portrait-full.webp",
    alt: "Shahriar Adnan Ishty standing beside a rooftop pool under a steel roof",
    width: 1200,
    height: 1800,
    exif: "f/1.8 · 50mm · 1/200s · ISO 1000 · Sony A7 IV",
  },
];

export default function PhotographyPage() {
  const photos = gallery.length > 0 ? gallery : placeholder;

  return (
    <Container className="max-w-6xl pb-20">
      <PageHeader
        command="show camera"
        title="Photography"
        intro={`Stories told with a camera. ${leadership.gear.join(" · ")}.`}
      />
      <GalleryGrid photos={photos} />
      {gallery.length === 0 && (
        <div className="mt-6">
          <Todo>Add 12 to 24 best photos to public/gallery/ and list them in src/data/gallery.json.</Todo>
        </div>
      )}

      <Section command="show exhibitions" title="National exhibitions">
        <p className="max-w-2xl text-muted-foreground">{leadership.roles[0].summary}</p>
        {leadership.exhibitions.length > 0 ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {leadership.exhibitions.map((ex) => (
              <li key={ex.name} className="rounded-xl border border-border bg-card p-5">
                <p className="font-mono text-xs text-muted-foreground">{ex.date} · {ex.venue}</p>
                <h3 className="mt-1 text-lg font-semibold">{ex.name}</h3>
                {ex.detail && <p className="mt-2 text-sm text-muted-foreground">{ex.detail}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6">
            <Todo>Exhibition names, dates, venues, number of participants or photos, and 5 to 10 photos.</Todo>
          </div>
        )}
      </Section>
    </Container>
  );
}
