import { ExtLink } from "@/components/ext-link";
import { profile } from "@/data";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-highlight">AIUB#</span>copy running-config startup-config · ©{" "}
          {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="flex gap-4 font-mono text-xs">
          <li>
            <ExtLink href={profile.links.linkedin!} className="text-muted-foreground hover:text-foreground">
              LinkedIn
            </ExtLink>
          </li>
          <li>
            <ExtLink href={profile.links.github!} className="text-muted-foreground hover:text-foreground">
              GitHub
            </ExtLink>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className="text-muted-foreground hover:text-foreground">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
