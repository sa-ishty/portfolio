import Link from "next/link";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-20">
      <div className="rounded-xl border border-border bg-card p-6 font-mono text-sm sm:p-8">
        <p>
          <span className="text-highlight">AIUB#</span>ping this-page
        </p>
        <p className="mt-2 text-muted-foreground">Type escape sequence to abort.</p>
        <p className="text-muted-foreground">Sending 5, 100-byte ICMP Echos, timeout is 2 seconds:</p>
        <p className="mt-1 text-learning">.....</p>
        <p className="text-learning">Success rate is 0 percent (0/5)</p>
      </div>
      <h1 className="mt-8 text-4xl font-bold">404: route not found</h1>
      <p className="mt-3 text-muted-foreground">This page doesn&apos;t exist or has moved.</p>
      <Button asChild className="mt-6 w-fit">
        <Link href="/">Back to home</Link>
      </Button>
    </Container>
  );
}
