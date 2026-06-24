"use client";

import Image from "next/image";
import { useEffect } from "react";
import { usePlayer } from "./player-context";

function fmt(s: number): string {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/** acid-lime fill up to `pct`, hairline track after */
function fill(pct: number): string {
  const p = Math.max(0, Math.min(100, pct));
  return `linear-gradient(to right, var(--accent) ${p}%, var(--border) ${p}%)`;
}

function IconButton({
  label,
  onClick,
  children,
  size = "md",
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  size?: "md" | "lg";
}) {
  const dim = size === "lg" ? "h-11 w-11" : "h-9 w-9";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex ${dim} items-center justify-center rounded-full transition-colors ${
        size === "lg"
          ? "bg-accent text-accent-foreground hover:opacity-90"
          : "text-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function PlayerBar() {
  const p = usePlayer();
  const { current } = p;

  // keep the page bottom clear of the fixed bar
  useEffect(() => {
    document.body.style.paddingBottom = current ? "5.5rem" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [current]);

  if (!current) return null;

  const progressPct = p.duration ? (p.currentTime / p.duration) * 100 : 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 sm:gap-5 sm:px-8">
        {/* track identity */}
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:w-64 sm:flex-none">
          <div
            className="relative h-12 w-12 shrink-0 overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(135deg, ${current.cover[0]} 0%, ${current.cover[1]} 70%)`,
            }}
          >
            {current.image ? (
              <Image src={current.image} alt="" fill sizes="48px" className="object-cover" />
            ) : (
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {current.title}
            </p>
            <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {current.artist}
            </p>
          </div>
        </div>

        {/* transport + scrubber */}
        <div className="flex flex-[2] flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5 sm:gap-3">
            <IconButton label="Previous track" onClick={p.prev}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M5 2v12H3V2zm9 0v12L6 8z" />
              </svg>
            </IconButton>
            <IconButton label={p.isPlaying ? "Pause" : "Play"} onClick={p.toggle} size="lg">
              {p.isPlaying ? (
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
                  <rect x="1" y="0" width="4" height="16" />
                  <rect x="9" y="0" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
                  <path d="M0 0l14 8-14 8z" />
                </svg>
              )}
            </IconButton>
            <IconButton label="Next track" onClick={p.next}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M11 2v12h2V2zM2 2v12l8-6z" />
              </svg>
            </IconButton>
          </div>

          <div className="flex w-full max-w-xl items-center gap-2">
            <span className="w-9 shrink-0 text-right font-mono text-[10px] tabular-nums text-muted">
              {fmt(p.currentTime)}
            </span>
            <input
              type="range"
              className="range h-1 flex-1"
              min={0}
              max={p.duration || 0}
              step={0.1}
              value={p.currentTime}
              onChange={(e) => p.seek(Number(e.target.value))}
              style={{ background: fill(progressPct) }}
              aria-label="Seek"
            />
            <span className="w-9 shrink-0 font-mono text-[10px] tabular-nums text-muted">
              {fmt(p.duration)}
            </span>
          </div>
        </div>

        {/* volume — desktop only */}
        <div className="hidden w-32 items-center gap-2 sm:flex">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden
            className="shrink-0 text-muted"
          >
            <path d="M7 3L3.5 6H1v4h2.5L7 13zM10.5 5.5a3 3 0 010 5M12.5 3.5a6 6 0 010 9" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <path d="M7 3L3.5 6H1v4h2.5L7 13z" />
          </svg>
          <input
            type="range"
            className="range h-1 flex-1"
            min={0}
            max={1}
            step={0.01}
            value={p.volume}
            onChange={(e) => p.setVolume(Number(e.target.value))}
            style={{ background: fill(p.volume * 100) }}
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
