import Image from "next/image";
import Link from "next/link";
import {
  artists,
  episodes,
  events,
  products,
  releases,
  SITE,
} from "./lib/data";
import {
  EventRow,
  Marquee,
  ProductCard,
  ReleaseCard,
  SectionHeading,
} from "./components/ui";

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------- */}
      {/*  HERO                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="relative border-b border-border">
        {/* OpenMind abstract — full-bleed hero background */}
        <Image
          src="/openmind-bg.png"
          alt=""
          width={1672}
          height={941}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />

        {/* event copy — scaled in vw so it tracks the artwork at every width */}
        <div className="absolute inset-0 text-white">
          {/* label / producer — top right */}
          <div className="absolute right-[4%] top-[13%] text-right leading-none">
            <p className="text-[1.5vw] font-bold uppercase tracking-[0.12em]">
              Open Mind
            </p>
            <p className="mt-[0.4vw] text-[0.8vw] uppercase tracking-[0.45em] text-white/70">
              Productions
            </p>
          </div>

          {/* title + line-up — left */}
          <div className="absolute left-[6%] top-1/2 -translate-y-1/2">
            <h1 className="text-[8.5vw] font-light uppercase leading-[0.92] tracking-[0.02em]">
              Dark
              <br />
              Room
            </h1>
            <div className="mt-[1.6vw] h-px w-[22vw] bg-gradient-to-r from-white via-[#5b9dff] to-transparent" />
            <p className="mt-[1.1vw] text-[1.5vw] font-light uppercase tracking-[0.55em] text-white/85">
              Line Up
            </p>
            <ul className="mt-[1vw] flex flex-col gap-[0.5vw]">
              {[
                "Ottman Gronberg",
                "NØH",
                "Chris Iliou",
                "Junior Lindgren",
                "Teh Ellis",
              ].map((name) => (
                <li
                  key={name}
                  className="text-[1.5vw] font-light uppercase tracking-[0.12em]"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* date & location — bottom right */}
          <div className="absolute bottom-[9%] right-[6%] text-right">
            <p className="text-[1vw] font-semibold uppercase tracking-[0.3em] text-[#7cc4ff]">
              Date &amp; Location
            </p>
            <p className="mt-[0.5vw] text-[2vw] font-light uppercase tracking-[0.12em]">
              Coming Soon
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  MARQUEE                                                    */}
      {/* ---------------------------------------------------------- */}
      <Marquee
        items={[
          "New: OM048 — Hypnos",
          "OpenMind Label Night · Stockholm · Aug 01",
          "Radio — Now in 3 Channels",
          "Demos open",
          "Keep an open mind",
        ]}
      />

      {/* ---------------------------------------------------------- */}
      {/*  LATEST RELEASES                                            */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
        <SectionHeading
          eyebrow="The Catalogue"
          title="Latest Releases"
          href="/releases"
        />
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {releases.slice(0, 8).map((r) => (
            <ReleaseCard key={r.cat} release={r} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  ARTISTS                                                    */}
      {/* ---------------------------------------------------------- */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
          <SectionHeading
            eyebrow="The Roster"
            title="Artists"
            href="/artists"
          />
          <ul>
            {artists.slice(0, 8).map((a) => (
              <li key={a.name}>
                <Link
                  href={`/artists/${a.slug}`}
                  className="group flex items-center justify-between border-b border-border py-5"
                >
                  <span className="heading text-3xl text-foreground transition-colors group-hover:text-accent sm:text-5xl">
                    {a.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {a.base}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  EVENTS                                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
        <SectionHeading
          eyebrow="On Tour"
          title="Events"
          href="/events"
          linkLabel="All dates"
        />
        <div>
          {events.slice(0, 5).map((e) => (
            <EventRow key={`${e.day}-${e.venue}`} event={e} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  RADIO FEATURE                                              */}
      {/* ---------------------------------------------------------- */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              OpenMind Radio
            </p>
            <h2 className="heading mt-3 text-5xl text-foreground sm:text-6xl">
              Three Channels,
              <br />
              Always On
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              Three always-on channels — Sublevel, Drift and Ascent — streaming
              techno, house and trance around the clock, curated by{" "}
              {SITE.founder} and the roster.
            </p>
            <Link
              href="/radio"
              className="mt-8 inline-block bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
            >
              ▸ Listen to Radio
            </Link>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {episodes.slice(0, 4).map((ep) => (
              <li key={ep.no}>
                <Link
                  href="/radio"
                  className="group flex items-center gap-4 py-4"
                >
                  <span className="heading w-14 shrink-0 text-3xl text-accent">
                    {ep.no}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                    <svg
                      width="10"
                      height="12"
                      viewBox="0 0 14 16"
                      fill="currentColor"
                    >
                      <path d="M0 0l14 8-14 8z" />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                      {ep.guest}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {ep.date} · {ep.duration}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  STORE TEASER                                               */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
        <SectionHeading
          eyebrow="Merch"
          title="Store"
          href="/store"
        />
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  DEMOS / CTA                                                */}
      {/* ---------------------------------------------------------- */}
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-5 py-20 sm:px-8 md:flex-row md:items-center md:justify-between">
          <h2 className="heading text-4xl text-foreground sm:text-6xl">
            Send us your music
          </h2>
          <a
            href="mailto:demo@openmindpro.com"
            className="border border-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            demo@openmindpro.com
          </a>
        </div>
      </section>
    </>
  );
}
