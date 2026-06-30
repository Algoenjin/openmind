import type { Metadata } from "next";
import { episodes, SITE } from "../lib/data";
import { PageHero } from "../components/ui";
import { EpisodePlayButton } from "../components/player/play-button";

export const metadata: Metadata = {
  title: "Radio",
  description:
    "OpenMind Radio — three always-on channels: Sublevel (techno), Drift (house) and Ascent (trance).",
};

/** One gradient per channel, keyed by channel number. */
const CHANNEL_GRADIENTS: Record<string, string> = {
  "01": "linear-gradient(135deg, #ccff00 0%, #0a0a0a 75%)",
  "02": "linear-gradient(135deg, #00d18f 0%, #0a0a0a 75%)",
  "03": "linear-gradient(135deg, #9b5cff 0%, #0a0a0a 75%)",
};

export default function RadioPage() {
  return (
    <>
      <PageHero
        eyebrow="OpenMind Radio"
        title="Radio"
        intro={`Three always-on channels — Sublevel, Drift and Ascent — streaming the OpenMind sound around the clock across techno, house and trance, curated by ${SITE.founder} and the roster.`}
      />

      {/* channels */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <h3 className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          Channels
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((ch) => (
            <div key={ch.no} className="flex flex-col border border-border">
              <div
                className="relative flex aspect-[16/10] items-start justify-between p-6"
                style={{ backgroundImage: CHANNEL_GRADIENTS[ch.no] }}
              >
                <span className="heading text-6xl text-black/80">{ch.no}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/70">
                  {ch.date} · {ch.duration}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 p-6">
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-foreground">
                    {ch.guest}
                  </h2>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {ch.title}
                  </p>
                </div>
                <EpisodePlayButton episode={ch} variant="label" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
