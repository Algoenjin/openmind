import type { Metadata } from "next";
import { events, pastEvents } from "../lib/data";
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
      <section className="mx-auto max-w-[1400px] px-5 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-20">
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

        {pastEvents.length > 0 && (
          <div className="mt-16">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Past Events
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {pastEvents.length} archived
              </span>
            </div>
            <div className="opacity-70">
              {pastEvents.map((e) => (
                <EventRow key={`${e.day}-${e.venue}`} event={e} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
