import type { Metadata } from "next";
import { episodes, SITE } from "../lib/data";
import { PageHero } from "../components/ui";
import { EpisodePlayButton } from "../components/player/play-button";

export const metadata: Metadata = {
  title: "Radio",
  description:
    "OpenMind Radio — a weekly hour of underground techno, label premieres and guest mixes.",
};

export default function RadioPage() {
  const [latest, ...rest] = episodes;

  return (
    <>
      <PageHero
        eyebrow="OpenMind Radio"
        title="Radio"
        intro={`A weekly hour of uncompromising techno — label premieres, guest mixes and deep cuts, hosted by ${SITE.founder} and the OpenMind roster.`}
      />

      {/* featured / latest episode */}
      <section className="mx-auto max-w-[1400px] px-5 pt-12 sm:px-8">
        <div className="grid gap-6 border border-border lg:grid-cols-[1.1fr_1fr]">
          <div
            className="relative flex aspect-[16/10] items-end p-6 lg:aspect-auto"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #ccff00 0%, #0a0a0a 75%)",
            }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-black/70">
              Latest Episode
            </span>
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
            <span className="heading text-7xl text-accent sm:text-8xl">
              {latest.no}
            </span>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {latest.guest}
              </h2>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {latest.date} · {latest.duration}
              </p>
            </div>
            <EpisodePlayButton episode={latest} variant="label" />
          </div>
        </div>
      </section>

      {/* episode archive */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <h3 className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          Episode Archive
        </h3>
        <ul className="border-t border-border">
          {rest.map((ep) => (
            <li
              key={ep.no}
              className="group flex items-center gap-4 border-b border-border py-5 sm:gap-6"
            >
              <span className="heading w-16 shrink-0 text-3xl text-accent sm:text-4xl">
                {ep.no}
              </span>
              <EpisodePlayButton episode={ep} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                  {ep.guest}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {ep.title}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[11px] tracking-widest text-muted">
                {ep.duration}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
