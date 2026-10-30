import { Prompt } from "@/components/prompt";

export function PageHeader({ command, title, intro }: { command: string; title: string; intro?: string }) {
  return (
    <header className="pt-14 pb-8 sm:pt-20">
      <Prompt command={command} />
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{title}</h1>
      {intro && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
    </header>
  );
}
