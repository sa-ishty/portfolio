import Link from "next/link";
import { ArrowDown, FileText, Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { ExtLink } from "@/components/ext-link";
import { HeroPortrait } from "@/components/hero-portrait";
import { ScrambleText } from "@/components/scramble-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { profile } from "@/data";

const boot = [
  "Booting IOS-XE (ishty-portfolio) ...",
  "Loading networking.bin, security.bin, ml-research.bin ...... [OK]",
  "Interfaces up. Camera attached.",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_75%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <span className="orb -top-24 left-[10%] size-[360px] bg-[var(--slate)]" />
        <span className="orb top-1/3 right-[5%] size-[300px] bg-[var(--steel)] [animation-delay:-6s]" />
      </div>
      <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="font-mono text-xs leading-relaxed text-muted-foreground" aria-hidden>
            {boot.map((line) => (
              <p key={line} className="boot-line">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-6 font-mono text-sm">
            <span className="text-up">ishty@dhaka</span>
            <span className="text-muted-foreground">:~$ </span>
            <span className="typing">whoami</span>
            <span className="cursor-blink" />
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-[1.05] sm:text-6xl">
            <ScrambleText text={profile.name} />
          </h1>
          <p
            className="rise-soft mt-5 max-w-xl text-lg text-muted-foreground"
            style={{ "--delay": "0.5s" } as React.CSSProperties}
          >
            {profile.tagline}
          </p>

          <div className="rise mt-6" style={{ "--delay": "0.65s" } as React.CSSProperties}>
            <Badge variant="up" className="font-mono">
              <span className="relative flex size-2" aria-hidden>
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-up opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-up" />
              </span>
              Open to roles, master&apos;s and collaborations
            </Badge>
          </div>

          <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--delay": "0.8s" } as React.CSSProperties}>
            <Button asChild size="lg">
              <ExtLink href={profile.links.linkedin!}>
                <LinkedinIcon /> LinkedIn
              </ExtLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <ExtLink href={profile.links.github!}>
                <GithubIcon /> GitHub
              </ExtLink>
            </Button>
            {profile.cv ? (
              <Button asChild size="lg" variant="outline">
                <a href={profile.cv} download>
                  <FileText aria-hidden /> Download CV
                </a>
              </Button>
            ) : (
              <Button size="lg" variant="outline" disabled title="CV coming soon">
                <FileText aria-hidden /> CV coming soon
              </Button>
            )}
            <Button asChild size="lg" variant="ghost">
              <Link href="/#contact">
                <Mail aria-hidden /> Contact
              </Link>
            </Button>
          </div>
        </div>

        <div
          className="rise-soft relative mx-auto w-full max-w-xs md:max-w-none"
          style={{ "--delay": "0.3s" } as React.CSSProperties}
        >
          <HeroPortrait />
        </div>
      </div>
      <div className="relative mx-auto hidden max-w-5xl px-6 pb-8 md:block">
        <a
          href="#focus"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowDown className="size-3.5" aria-hidden /> scroll to explore
        </a>
      </div>
    </section>
  );
}
