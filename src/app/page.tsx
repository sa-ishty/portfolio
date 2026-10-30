import Link from "next/link";
import { ArrowRight, ArrowUpRight, Camera, GraduationCap, MapPin } from "lucide-react";

import { Container } from "@/components/container";
import { CopyEmail } from "@/components/copy-email";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { ExtLink } from "@/components/ext-link";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { StatusTable } from "@/components/status-table";
import { Todo } from "@/components/todo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { education, experience, leadership, profile, projects, research, skills, ventures } from "@/data";

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <Hero />
      <Container>
        <Section id="focus" command="show interfaces status" title="Focus areas">
          <StatusTable />
        </Section>

        <Section id="experience" command="show experience" title="Experience and education">
          <ol className="relative space-y-8 border-l border-border pl-6">
            {experience.map((job) => (
              <li key={job.title} className="relative">
                <span className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-background bg-up" aria-hidden />
                <p className="font-mono text-xs text-muted-foreground">{job.period}</p>
                <h3 className="mt-1 text-xl font-semibold">{job.title}</h3>
                <p className="text-muted-foreground">
                  {job.org}, {job.place}
                </p>
                <p className="mt-3">{job.summary}</p>
                {job.bullets.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {job.todo && <div className="mt-3"><Todo>{job.todo}</Todo></div>}
              </li>
            ))}
            {education.map((ed) => (
              <li key={ed.degree} className="relative">
                <span className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-background bg-highlight" aria-hidden />
                <p className="font-mono text-xs text-muted-foreground">{ed.period}</p>
                <h3 className="mt-1 flex items-center gap-2 text-xl font-semibold">
                  <GraduationCap className="size-5 text-highlight" aria-hidden />
                  {ed.degree}
                </h3>
                <p className="text-muted-foreground">
                  {ed.school} · {ed.detail}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Coursework">
                  {ed.coursework.map((c) => (
                    <li key={c}>
                      <Badge variant="outline">{c}</Badge>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="research" command="show research" title="Research">
          <div className="grid gap-4">
            {research.map((r, i) => (
              <Card key={r.title}>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="text-highlight">[{String(i + 1).padStart(2, "0")}]</span>
                    <span className="text-muted-foreground">{r.type}</span>
                    <Badge variant="learning">{r.status}</Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{r.title}</CardTitle>
                  <CardDescription className="text-base">{r.summary}</CardDescription>
                </CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
                    {r.tags.map((t) => (
                      <li key={t}>
                        <Badge variant="outline" className="font-mono">{t}</Badge>
                      </li>
                    ))}
                  </ul>
                  {r.link && (
                    <ExtLink href={r.link} className="inline-flex items-center gap-1 font-mono text-sm hover:underline">
                      Read paper <ArrowUpRight className="size-4" aria-hidden />
                    </ExtLink>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="projects" command="show projects | begin featured" title="Featured projects">
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/projects">
              All projects <ArrowRight aria-hidden />
            </Link>
          </Button>
        </Section>

        <Section id="ventures" command="show ventures" title="Ventures">
          <div className="grid gap-4 sm:grid-cols-2">
            {ventures.map((v) => (
              <Card key={v.name}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{v.place}</span>
                    {!v.link && <Badge variant="learning">{v.launch}</Badge>}
                  </div>
                  <CardTitle className="text-lg">{v.name}</CardTitle>
                  <CardDescription>{v.summary}</CardDescription>
                </CardHeader>
                {v.link && (
                  <ExtLink href={v.link} className="mt-auto inline-flex items-center gap-1 font-mono text-sm hover:underline">
                    Visit site <ArrowUpRight className="size-4" aria-hidden />
                  </ExtLink>
                )}
              </Card>
            ))}
          </div>
        </Section>

        <Section id="photography" command="show leadership | include camera" title="Photography and leadership">
          <div className="grid gap-4 sm:grid-cols-2">
            {leadership.roles.map((role) => (
              <Card key={role.title}>
                <CardHeader>
                  <span className="font-mono text-xs text-muted-foreground">{role.period}</span>
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                  <CardDescription>{role.summary}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
              <Camera className="size-4" aria-hidden />
              {leadership.gear.join(" · ")}
            </p>
            <Button asChild variant="outline">
              <Link href="/photography">
                See the gallery <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </Section>

        <Section id="skills" command="show running-config | include skills" title="Skills and certifications">
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.groups.map((group) => (
              <div key={group.name} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-mono text-sm text-highlight">{group.name.toLowerCase().replace(/ /g, "-")}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge variant="secondary">{item}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-mono text-sm text-highlight">certifications</h3>
              <ul className="mt-3 space-y-3">
                {skills.certifications.map((c) => (
                  <li key={c.name}>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {c.issuer} · {c.date}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                languages: {skills.languages.join(", ")}
              </p>
            </div>
          </div>
        </Section>

        <Section id="contact" command="ping ishty" title="Contact" intro={profile.availability}>
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <p className="font-mono text-xs text-up">!!!!! Success rate is 100 percent (5/5)</p>
            <div className="mt-4">
              <CopyEmail email={profile.email} />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href={`mailto:${profile.email}`}>Send an email</a>
              </Button>
              <Button asChild variant="outline">
                <ExtLink href={profile.links.linkedin!}>
                  <LinkedinIcon /> LinkedIn
                </ExtLink>
              </Button>
              <Button asChild variant="outline">
                <ExtLink href={profile.links.github!}>
                  <GithubIcon /> GitHub
                </ExtLink>
              </Button>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" aria-hidden /> {profile.location}
              </span>
            </div>
          </div>
        </Section>
      </Container>
    </>
  );
}
