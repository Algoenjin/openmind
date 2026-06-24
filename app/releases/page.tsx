import type { Metadata } from "next";
import { releases } from "../lib/data";
import { PageHero, ReleaseCard } from "../components/ui";

export const metadata: Metadata = {
  title: "Releases",
  description: "The full OpenMind catalogue of underground techno releases.",
};

export default function ReleasesPage() {
  return (
    <>
      <PageHero
        eyebrow="The Catalogue"
        title="Releases"
        intro={`Every record on OpenMind, from the latest 12" to the deep catalogue. Peak-time, driving and melodic techno from the roster.`}
      />
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {releases.length} releases
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Sorted: Newest
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {releases.map((r) => (
            <ReleaseCard key={r.cat} release={r} />
          ))}
        </div>
      </section>
    </>
  );
}
