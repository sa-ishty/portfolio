import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { RevealObserver } from "@/components/reveal-observer";
import { themeScript } from "@/components/theme-toggle";
import { profile } from "@/data";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

const description =
  "Shahriar Adnan Ishty: network engineer intern at AIUB working where networking, security and AI meet. Projects, research, photography and contact.";

export const metadata: Metadata = {
  // Next adds the base path itself, so only the origin goes here.
  metadataBase: new URL(new URL(profile.siteUrl).origin),
  title: {
    default: `${profile.name} · Network Engineer`,
    template: `%s · ${profile.name}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: `${profile.name} · Network Engineer`,
    description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0d1b2a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bricolage.variable} ${plex.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <div className="scroll-progress" aria-hidden />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
