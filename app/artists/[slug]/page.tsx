import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  artists,
  episodesByArtist,
  eventsByArtist,
  getArtist,
  initials,
  releasesByArtist,
  SITE,
} from "../../lib/data";
import { EventRow, ReleaseCard, SectionHeading } from "../../components/ui";
import { EpisodePlayButton } from "../../components/player/play-button";

// only the slugs below are valid routes; anything else 404s
export const dynamicParams = false;

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) return {};
  return {
    title: artist.name,
    description:
      artist.tagline ??
      `${artist.name} — OpenMind artist based in ${artist.base}.`,
  };
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();

  const releases = releasesByArtist(artist.name);
  const events = eventsByArtist(artist.name);
  const episodes = episodesByArtist(artist.name);

  const bio = artist.bio ?? [
    `${artist.name} is part of the OpenMind roster, based in ${artist.base}. A full biography is coming soon.`,
  ];
  const genres = artist.genres ?? ["Techno"];
  const portrait = artist.portrait ?? ["#2a2a2a", "#0a0a0a"];
  const city = artist.base.split(",")[0];

  return (
    <>
      {/* breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-4 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <Link href="/artists" className="transition-colors hover:text-accent">
              Artists
            </Link>
            <span className="px-2 text-border">/</span>
            <span className="text-foreground">{artist.name}</span>
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/*  HERO                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14">
          {/* portrait */}
          <div
            className="relative aspect-square w-full overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(135deg, ${portrait[0]} 0%, ${portrait[1]} 72%)`,
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
            <span className="heading absolute bottom-4 left-5 text-[120px] leading-none text-background/25 sm:text-[160px]">
              {initials(artist.name)}
            </span>
          </div>

          {/* details */}
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              {city}
              {artist.since ? ` · Since ${artist.since}` : ""}
            </p>
            <h1 className="heading mt-4 text-6xl text-foreground sm:text-7xl lg:text-8xl">
              {artist.name}
            </h1>
            {artist.tagline && (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                {artist.tagline}
              </p>
            )}

            {/* meta row */}
            <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-3 border-t border-border pt-6">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Based in
                </dt>
                <dd className="mt-1 text-sm text-foreground">{artist.base}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Releases
                </dt>
                <dd className="mt-1 text-sm text-foreground">{releases.length}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Genres
                </dt>
                <dd className="mt-1 text-sm text-foreground">{genres.join(", ")}</dd>
              </div>
            </dl>

            {/* actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="mailto:bookings@openmind.se"
                className="bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                Book
              </a>
              {artist.links?.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  BIOGRAPHY                                                  */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-14">
          <h2 className="heading text-3xl text-foreground sm:text-4xl">
            Biography
          </h2>
          <div className="max-w-3xl space-y-5">
            {bio.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground/90">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  RELEASES                                                   */}
      {/* ---------------------------------------------------------- */}
      {releases.length > 0 && (
        <section className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
            <SectionHeading
              eyebrow="Discography"
              title="Releases"
              href="/releases"
            />
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {releases.map((r) => (
                <ReleaseCard key={r.cat} release={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- */}
      {/*  EVENTS                                                     */}
      {/* ---------------------------------------------------------- */}
      {events.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
          <SectionHeading
            eyebrow="On Tour"
            title="Upcoming Shows"
            href="/events"
            linkLabel="All dates"
          />
          <div>
            {events.map((e) => (
              <EventRow key={`${e.day}-${e.venue}`} event={e} />
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- */}
      {/*  RADIO                                                      */}
      {/* ---------------------------------------------------------- */}
      {episodes.length > 0 && (
        <section className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
            <SectionHeading
              eyebrow="OpenMind Radio"
              title="Mixes & Episodes"
              href="/radio"
            />
            <ul className="border-t border-border">
              {episodes.map((ep) => (
                <li
                  key={ep.no}
                  className="group flex items-center gap-4 border-b border-border py-5 sm:gap-6"
                >
                  <span className="heading w-16 shrink-0 text-3xl text-accent sm:text-4xl">
                    {ep.no}
                  </span>
                  <EpisodePlayButton episode={ep} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                      {ep.guest}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {ep.title} · {ep.date}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[11px] tracking-widest text-muted">
                    {ep.duration}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- */}
      {/*  BOOKING CTA                                                */}
      {/* ---------------------------------------------------------- */}
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="heading text-4xl text-foreground sm:text-5xl">
              Book {artist.name}
            </h2>
            <p className="mt-2 text-sm text-muted">
              Worldwide booking enquiries via {SITE.name} management.
            </p>
          </div>
          <a
            href="mailto:bookings@openmind.se"
            className="border border-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            bookings@openmind.se
          </a>
        </div>
      </section>
    </>
  );
}
