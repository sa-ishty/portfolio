import type { Metadata } from "next";
import Image from "next/image";
import { PlayCircle } from "lucide-react";

import { Container } from "@/components/container";
import { ExtLink } from "@/components/ext-link";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Todo } from "@/components/todo";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { content, profile } from "@/data";
import { asset } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Content",
  description: "Videos by Shahriar Adnan Ishty: AI er Itihash, networking tutorials in Bangla and English, and student-life reels.",
};

const channels = [
  { name: "YouTube", href: profile.links.youtube },
  { name: "Facebook", href: profile.links.facebook },
  { name: "Instagram", href: profile.links.instagram },
];

export default function ContentPage() {
  const live = channels.filter((c) => c.href);

  return (
    <Container className="pb-20">
      <PageHeader command="show video-channels" title="Content" intro={content.summary} />

      <div className="flex flex-wrap gap-3">
        {live.map((c) => (
          <Button key={c.name} asChild variant="outline">
            <ExtLink href={c.href!}>{c.name}</ExtLink>
          </Button>
        ))}
      </div>
      {live.length === 0 && <Todo>YouTube, Facebook and Instagram channel links and channel name.</Todo>}

      <Section command="show series" title="Series" className="pt-12 sm:pt-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {content.series.map((s) => (
            <Card key={s.name}>
              <CardHeader>
                <CardTitle className="text-xl">{s.name}</CardTitle>
                <CardDescription>{s.detail}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section command="show videos | last 6" title="Latest videos" className="pt-0 sm:pt-0">
        {content.videos.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.videos.slice(0, 6).map((v) => (
              <li key={v.url}>
                <ExtLink href={v.url} className="group block overflow-hidden rounded-xl border border-border bg-card">
                  <div className="relative aspect-video">
                    <Image src={v.thumbnail.startsWith("/") ? asset(v.thumbnail) : v.thumbnail} alt="" fill sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform group-hover:scale-105" />
                    <PlayCircle className="absolute inset-0 m-auto size-12 text-white/90 drop-shadow" aria-hidden />
                  </div>
                  <p className="p-4 text-sm font-medium">{v.title}</p>
                </ExtLink>
              </li>
            ))}
          </ul>
        ) : (
          <Todo>Add 3 to 6 recent videos to src/data/content.json (title, url, thumbnail).</Todo>
        )}
      </Section>
    </Container>
  );
}
