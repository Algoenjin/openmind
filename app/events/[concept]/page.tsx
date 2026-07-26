import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { concepts, eventsByConcept, getConcept } from "../../lib/data";
import { EventRow } from "../../components/ui";

// only the slugs below are valid routes; anything else 404s
export const dynamicParams = false;

export function generateStaticParams() {
  return concepts.map((c) => ({ concept: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ concept: string }>;
}): Promise<Metadata> {
  const { concept: slug } = await params;
  const concept = getConcept(slug);
  if (!concept) return {};
  return {
    title: `${concept.name} — Events`,
    description: `${concept.name}: ${concept.music} — ${concept.setting}.`,
  };
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ concept: string }>;
}) {
  const { concept: slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();

  const upcoming = eventsByConcept(concept.slug);
  const others = concepts.filter((c) => c.slug !== concept.slug);

  return (
    <>
      {/* breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-4 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <Link href="/events" className="transition-colors hover:text-accent">
              Events
            </Link>
            <span className="px-2 text-border">/</span>
            <span className="text-foreground">{concept.name}</span>
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/*  HERO                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/2 left-1/2 h-[140%] w-[120%] -translate-x-1/2 opacity-25"
          style={{
            backgroundImage: `radial-gradient(ellipse at center, ${concept.colors[0]}33, transparent 60%)`,
          }}
        />
        <div className="relative mx-auto grid max-w-[1400px] gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14">
          {/* artwork panel */}
          <div
            className="relative aspect-square w-full overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(135deg, ${concept.colors[0]} 0%, ${concept.colors[1]} 72%)`,
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
            <span className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-black/70 mix-blend-overlay">
              OpenMind Concept
            </span>
            <span className="heading absolute bottom-4 left-5 text-[96px] leading-none text-background/25 sm:text-[120px]">
              {concept.name}
            </span>
          </div>

          {/* details */}
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              {concept.category}
            </p>
            <h1 className="heading mt-4 text-6xl text-foreground sm:text-7xl lg:text-8xl">
              {concept.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              {concept.description[0]}
            </p>

            {/* meta row */}
            <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-3 border-t border-border pt-6">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Category
                </dt>
                <dd className="mt-1 text-sm text-foreground">
                  {concept.category}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Core music
                </dt>
                <dd className="mt-1 text-sm text-foreground">{concept.music}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Primary setting
                </dt>
                <dd className="mt-1 text-sm text-foreground">
                  {concept.setting}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  ABOUT                                                      */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-14">
          <h2 className="heading text-3xl text-foreground sm:text-4xl">
            The Concept
          </h2>
          <div className="max-w-3xl space-y-5">
            {concept.description.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground/90">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  UPCOMING DATES                                             */}
      {/* ---------------------------------------------------------- */}
      {upcoming.length > 0 && (
        <section className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Upcoming {concept.name} dates
              </span>
              <Link
                href="/events"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
              >
                All dates →
              </Link>
            </div>
            <div>
              {upcoming.map((e) => (
                <EventRow key={`${e.day}-${e.venue}`} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- */}
      {/*  OTHER CONCEPTS                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            More concepts
          </p>
          <div className="flex flex-wrap gap-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/events/${c.slug}`}
                className="border border-border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  BOOKING CTA                                                */}
      {/* ---------------------------------------------------------- */}
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="heading text-4xl text-foreground sm:text-5xl">
              Bring {concept.name} to your city
            </h2>
            <p className="mt-2 text-sm text-muted">
              Venue, festival and partner enquiries for the {concept.name}{" "}
              concept.
            </p>
          </div>
          <a
            href="mailto:bookings@openmindpro.com"
            className="border border-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            bookings@openmindpro.com
          </a>
        </div>
      </section>
    </>
  );
}
