"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "../lib/data";
import { Logo } from "./logo";
import { SocialLinks } from "./social-icon";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock body scroll while the full-screen menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        {/* wordmark */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-80"
          aria-label="OpenMind Productions — home"
        >
          <Logo className="h-8 w-auto sm:h-9" priority />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) =>
            item.children ? (
              /* item with a dropdown — panel opens on hover/focus */
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                    isActive(item.href)
                      ? "text-accent"
                      : "text-muted group-hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <svg
                    aria-hidden
                    viewBox="0 0 10 6"
                    className="h-1.5 w-2.5 fill-none stroke-current transition-transform duration-200 group-hover:rotate-180"
                  >
                    <path d="M1 1l4 4 4-4" strokeWidth="1.5" />
                  </svg>
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>

                {/* pt-4 bridges the gap to the trigger so hover survives the move */}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="w-56 border border-border bg-background/95 backdrop-blur">
                    <Link
                      href={item.href}
                      className="block border-b border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
                    >
                      All Events
                    </Link>
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`block px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                          isActive(c.href)
                            ? "text-accent"
                            : "text-muted hover:text-accent"
                        }`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                  isActive(item.href)
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            )
          )}
        </nav>

        {/* right side: live pill + mobile toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/radio"
            className="hidden items-center gap-2 border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent sm:flex"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            On Air
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <div className="flex w-6 flex-col items-end gap-1.5">
              <span
                className={`h-0.5 w-6 bg-foreground transition-all duration-300 ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-foreground transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-foreground transition-all duration-300 ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </header>

      {/* mobile full-screen menu — kept OUTSIDE <header> so its `fixed`
          positioning is relative to the viewport. The header's backdrop-blur
          would otherwise become the containing block and collapse this panel,
          leaving the links with no visible background. */}
      <div
        className={`fixed inset-0 top-16 z-40 flex origin-top flex-col overflow-y-auto bg-background transition-all duration-300 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col px-5 pt-4">
          {NAV.map((item, i) => (
            <div key={item.href} className="border-b border-border">
              <Link
                href={item.href}
                className={`heading flex items-center justify-between py-6 text-5xl transition-colors ${
                  isActive(item.href) ? "text-accent" : "text-foreground"
                }`}
              >
                {item.label}
                <span className="font-mono text-xs tracking-widest text-muted">
                  0{i + 1}
                </span>
              </Link>
              {item.children && (
                <div className="grid grid-cols-2 gap-x-6 pb-6">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className={`py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                        isActive(c.href) ? "text-accent" : "text-muted"
                      }`}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* social buttons pinned to the bottom of the menu */}
        <div className="mt-auto border-t border-border px-5 py-8">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Follow
          </p>
          <SocialLinks className="gap-7" />
        </div>
      </div>
    </>
  );
}
