import Link from "next/link";
import { Fragment } from "react";
import { NAV, SITE } from "../lib/data";
import { Logo, LogoMark } from "./logo";

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

/* minimal monochrome brand icons */
function SocialIcon({ name }: { name: string }) {
  const common = "h-5 w-5";
  switch (name) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "SoundCloud":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common}>
          <rect x="1.5" y="12" width="1.3" height="5" rx=".65" />
          <rect x="4" y="10.5" width="1.3" height="6.5" rx=".65" />
          <rect x="6.5" y="9.2" width="1.3" height="7.8" rx=".65" />
          <rect x="9" y="8" width="1.3" height="9" rx=".65" />
          <path d="M12 7.7c.35-.12.5.05.5.36V17h5a3.25 3.25 0 0 0 .15-6.49A4.6 4.6 0 0 0 12 7.7z" />
        </svg>
      );
    case "Bandcamp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common}>
          <path d="M0 18.75l7.4-13.5H24l-7.4 13.5z" />
        </svg>
      );
    case "Spotify":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common}>
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14C9.6 9.9 15 10.56 18.72 12.84c.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common}>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />
        </svg>
      );
    default:
      return null;
  }
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
              href="mailto:demos@openmind.se"
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
            <LogoMark className="h-12 w-auto" />
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
          <div className="flex items-center gap-6">
            {SITE.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-muted transition-colors hover:text-accent"
              >
                <SocialIcon name={s.label} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
