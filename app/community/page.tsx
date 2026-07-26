import type { Metadata } from "next";
import Link from "next/link";
import { memberships } from "../lib/data";
import { PageHero } from "../components/ui";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the OpenMind community — event and release updates for everyone, private parties for members.",
};

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="Join Us"
        title="Community"
        intro="OpenMind is nothing without it's community. Join the OpenMind community for event and release updates or go all in and unlock the parties we never announce and more."
      />

      {/* ---------------------------------------------------------- */}
      {/*  PRICING                                                    */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-[1400px] px-5 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {memberships.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col border p-7 sm:p-9 ${
                tier.featured ? "border-accent" : "border-border"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-7 bg-accent px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent-foreground sm:left-9">
                  Inner Circle
                </span>
              )}

              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                {tier.tagline}
              </p>
              <h2 className="heading mt-3 text-4xl text-foreground sm:text-5xl">
                {tier.name}
              </h2>

              <p className="mt-6 flex items-baseline gap-3">
                <span
                  className={`heading text-6xl sm:text-7xl ${
                    tier.featured ? "text-accent" : "text-foreground"
                  }`}
                >
                  {tier.price}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {tier.period}
                </span>
              </p>

              <ul className="mt-8 space-y-3 border-t border-border pt-7">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent"
                    />
                    <span className="text-sm leading-relaxed text-foreground/90">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-9">
                <Link
                  href={`/community/join?plan=${tier.id}`}
                  className={`inline-block px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                    tier.featured
                      ? "bg-accent text-accent-foreground hover:opacity-90"
                      : "border border-border text-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {tier.cta}
                </Link>
                {tier.featured && (
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Curious what you unlock?{" "}
                    <Link
                      href="/events/private"
                      className="text-foreground transition-colors hover:text-accent"
                    >
                      About private parties →
                    </Link>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  FAQ-ish footer note                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="heading text-4xl text-foreground sm:text-5xl">
              Questions?
            </h2>
            <p className="mt-2 text-sm text-muted">
              Anything about membership, billing or the community? Get in
              touch with us.
            </p>
          </div>
          <a
            href="mailto:community@openmindpro.com"
            className="border border-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            community@openmindpro.com
          </a>
        </div>
      </section>
    </>
  );
}
