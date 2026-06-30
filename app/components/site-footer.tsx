import Link from "next/link";
import { Fragment } from "react";
import { NAV, SITE } from "../lib/data";
import { Logo, LogoMark } from "./logo";
import { SocialLinks } from "./social-icon";

/* diagonal "/" divider, RA-style */
function Slash() {
  return (
    <span
      aria-hidden
      className="h-8 w-px shrink-0 rotate-[24deg] bg-muted/50 sm:h-11"
    />
  );
}

/* a row of big display links separated by diagonal slashes */
function SlashLinks({
  links,
}: {
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-5">
      {links.map((link, i) => (
        <Fragment key={link.label}>
          {i > 0 && <Slash />}
          {link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="heading text-4xl text-foreground transition-colors hover:text-accent sm:text-5xl"
            >
              {link.label}
            </a>
          ) : (
            <Link
              href={link.href}
              className="heading text-4xl text-foreground transition-colors hover:text-accent sm:text-5xl"
            >
              {link.label}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
        {/* logo */}
        <Link
          href="/"
          className="inline-block transition-opacity hover:opacity-80"
          aria-label="OpenMind Productions — home"
        >
          <Logo className="h-10 w-auto sm:h-12" />
        </Link>

        {/* main grid: explore + listen / stamp */}
        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
          {/* left — discover links + demo CTA */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Discover
            </p>
            <SlashLinks links={NAV} />

            <p className="heading mt-14 text-4xl text-muted sm:text-5xl">
              Got a demo?
            </p>
            <a
              href="mailto:demo@openmindpro.com"
              className="mt-6 inline-flex items-center rounded-full border border-accent px-7 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Submit demo
            </a>
          </div>

          {/* right — listen links + stamp */}
          <div className="flex flex-col gap-12 lg:items-end">
            <div className="lg:text-right">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                Listen on
              </p>
              <SlashLinks
                links={[
                  { label: "Spotify", href: "https://spotify.com", external: true },
                  { label: "Bandcamp", href: "https://bandcamp.com", external: true },
                ]}
              />
            </div>

            {/* badge mark (echoes RA's B-Corp badge placement) */}
            <LogoMark className="h-12 w-auto self-start lg:self-end" />
          </div>
        </div>

        {/* baseline row 1 — location / language + legal */}
        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-7 text-sm">
            <span className="flex items-center gap-2 text-foreground">
              <span aria-hidden className="text-base">🇸🇪</span>
              {SITE.city}
            </span>
            <span className="text-muted">
              Language <span className="text-foreground">English</span>
            </span>
          </div>
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            {["Privacy", "Terms", "Cookies", "Sitemap"].map((item, i) => (
              <Fragment key={item}>
                {i > 0 && <span aria-hidden>·</span>}
                <a href="#" className="transition-colors hover:text-foreground">
                  {item}
                </a>
              </Fragment>
            ))}
          </nav>
        </div>

        {/* baseline row 2 — copyright + socials */}
        <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            © {SITE.est}–2026 {SITE.name}. All rights reserved.
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
