import type { Metadata } from "next";
import Link from "next/link";
import { concepts, events, pastEvents } from "../lib/data";
import { EventRow, PageHero, SectionHeading } from "../components/ui";

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

        <div className="mt-16">
          <SectionHeading
            eyebrow="Formats"
            title="Concepts"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {concepts.map((c) => (
              <Link
                key={c.slug}
                href={`/events/${c.slug}`}
                className="group flex flex-col border border-border p-5 transition-colors hover:border-accent"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-10"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${c.colors[0]}, ${c.colors[1]})`,
                  }}
                />
                <h3 className="heading mt-4 text-3xl text-foreground transition-colors group-hover:text-accent">
                  {c.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {c.category}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {c.music}
                </p>
              </Link>
            ))}
          </div>
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
