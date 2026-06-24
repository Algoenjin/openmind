import Image from "next/image";
import Link from "next/link";
import type { Eventt, Product, Release } from "../lib/data";
import { ReleasePlayButton } from "./player/play-button";

/* ---------------------------------------------------------------- */
/*  Page hero — title band reused across sub-pages                   */
/* ---------------------------------------------------------------- */
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/2 left-1/2 h-[140%] w-[120%] -translate-x-1/2 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(204,255,0,0.12), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-5 pb-12 pt-14 sm:px-8 sm:pt-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </p>
        <h1 className="heading mt-4 text-7xl text-foreground sm:text-8xl lg:text-9xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Marquee ticker                                                   */
/* ---------------------------------------------------------------- */
export function Marquee({
  items,
  fast = false,
}: {
  items: string[];
  fast?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className="flex overflow-hidden border-y border-border bg-accent">
      <div
        className={`flex shrink-0 items-center whitespace-nowrap ${
          fast ? "animate-marquee-fast" : "animate-marquee"
        }`}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="heading flex items-center gap-6 px-6 py-2.5 text-base text-accent-foreground"
          >
            {item}
            <span aria-hidden className="text-accent-foreground/60">
              ✶
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Section heading — eyebrow + title + optional "view all" link     */
/* ---------------------------------------------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel = "View all",
}: {
  eyebrow: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 border-b border-border pb-5">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </p>
        <h2 className="heading mt-2 text-4xl text-foreground sm:text-5xl">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Gradient cover art (no images needed)                            */
/* ---------------------------------------------------------------- */
function Cover({
  colors,
  label,
  image,
  alt,
}: {
  colors: [string, string];
  label?: string;
  image?: string;
  alt?: string;
}) {
  return (
    <div
      className="relative aspect-square w-full overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 70%)`,
      }}
    >
      {image ? (
        /* real cover artwork */
        <Image
          src={image}
          alt={alt ?? ""}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
      ) : (
        <>
          {/* grain / vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
          {label && (
            <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-black/70 mix-blend-overlay">
              {label}
            </span>
          )}
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Release card                                                     */
/* ---------------------------------------------------------------- */
export function ReleaseCard({ release }: { release: Release }) {
  return (
    <article className="group">
      <div className="relative">
        <Cover
          colors={release.cover}
          label={release.cat}
          image={release.image}
          alt={`${release.title} — ${release.artist}`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <ReleasePlayButton release={release} />
        </div>
      </div>
      <div className="mt-3">
        <h3 className="heading text-xl text-foreground transition-colors group-hover:text-accent">
          {release.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{release.artist}</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {release.cat} · {release.format} · {release.year}
        </p>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- */
/*  Product card                                                     */
/* ---------------------------------------------------------------- */
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group cursor-pointer">
      <div className="relative aspect-square w-full overflow-hidden border border-border">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(135deg, ${product.cover[0]} 0%, ${product.cover[1]} 75%)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="heading text-2xl text-foreground/15">OPENMIND</span>
        </div>
        <span className="absolute right-3 top-3 bg-accent px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-accent-foreground">
          {product.price}
        </span>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
          {product.name}
        </h3>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {product.kind}
        </p>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- */
/*  Event row (RA-style list)                                        */
/* ---------------------------------------------------------------- */
const statusStyles: Record<Eventt["status"], string> = {
  tickets: "border-accent text-accent hover:bg-accent hover:text-accent-foreground",
  low: "border-accent text-accent hover:bg-accent hover:text-accent-foreground",
  "sold out": "border-border text-muted cursor-not-allowed",
};

const statusLabel: Record<Eventt["status"], string> = {
  tickets: "Tickets",
  low: "Low Tickets",
  "sold out": "Sold Out",
};

export function EventRow({ event }: { event: Eventt }) {
  return (
    <div className="group flex flex-col gap-4 border-b border-border py-6 transition-colors hover:bg-card/60 sm:flex-row sm:items-center sm:gap-6 sm:px-2">
      {/* date block */}
      <div className="flex w-20 shrink-0 flex-col items-start">
        <span className="heading text-4xl leading-none text-foreground transition-colors group-hover:text-accent">
          {event.day}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          {event.month} {event.year}
        </span>
      </div>

      {/* details */}
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-foreground">
          {event.venue}
          <span className="text-muted">
            {" "}
            — {event.city}, {event.country}
          </span>
        </h3>
        <p className="mt-1 truncate text-sm text-muted">{event.lineup}</p>
      </div>

      {/* status */}
      <div className="shrink-0">
        <span
          className={`inline-block border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${statusStyles[event.status]}`}
        >
          {statusLabel[event.status]}
        </span>
      </div>
    </div>
  );
}
