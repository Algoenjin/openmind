import type { Metadata } from "next";
import Link from "next/link";
import { artists } from "../lib/data";
import { PageHero } from "../components/ui";

export const metadata: Metadata = {
  title: "Artists",
  description: "The OpenMind roster — residents and affiliates.",
};

export default function ArtistsPage() {
  return (
    <>
      <PageHero
        eyebrow="The Roster"
        title="Artists"
        intro="The DJs and producers who define the OpenMind sound — based in Stockholm, Sweden."
      />
      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-16">
        <ul className="border-t border-border">
          {artists.map((a, i) => (
            <li key={a.name}>
              <Link
                href={`/artists/${a.slug}`}
                className="group flex items-center gap-4 border-b border-border py-6 sm:gap-8"
              >
                <span className="hidden w-12 shrink-0 font-mono text-xs tracking-widest text-muted sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="heading flex-1 text-4xl text-foreground transition-colors group-hover:text-accent sm:text-6xl">
                  {a.name}
                </span>
                <span className="hidden text-right font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:block">
                  {a.base}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-lg text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
