import type { Metadata } from "next";
import { events } from "../lib/data";
import { EventRow, PageHero } from "../components/ui";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming OpenMind label nights and tour dates worldwide.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="On Tour"
        title="Events"
        intro="Label nights, festival appearances and club shows. Catch OpenMind on a dancefloor near you."
      />
      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {events.length} upcoming
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            2026 Season
          </span>
        </div>
        <div>
          {events.map((e) => (
            <EventRow key={`${e.day}-${e.venue}`} event={e} />
          ))}
        </div>
      </section>
    </>
  );
}
