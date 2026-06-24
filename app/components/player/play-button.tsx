"use client";

import { episodes, releases, type Episode, type Release } from "../../lib/data";
import { usePlayer, type PlayerTrack } from "./player-context";

/* shared glyphs ---------------------------------------------------- */
function PlayGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * (16 / 14)}
      viewBox="0 0 14 16"
      fill="currentColor"
      aria-hidden
    >
      <path d="M0 0l14 8-14 8z" />
    </svg>
  );
}

function PauseGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 16" fill="currentColor" aria-hidden>
      <rect x="1" y="0" width="4" height="16" />
      <rect x="9" y="0" width="4" height="16" />
    </svg>
  );
}

/* mappers ---------------------------------------------------------- */
const releaseToTrack = (r: Release): PlayerTrack => ({
  id: `rel-${r.cat}`,
  title: r.title,
  artist: r.artist,
  src: r.track,
  cover: r.cover,
  image: r.image,
  meta: `${r.cat} · ${r.year}`,
});

const episodeToTrack = (e: Episode): PlayerTrack => ({
  id: `ep-${e.no}`,
  title: e.title,
  artist: e.guest,
  src: e.track,
  cover: ["#ccff00", "#0a0a0a"],
  meta: `${e.date} · ${e.duration}`,
});

/* ----------------------------------------------------------------- */
/*  Release play button — circular overlay used on cover art          */
/* ----------------------------------------------------------------- */
export function ReleasePlayButton({ release }: { release: Release }) {
  const p = usePlayer();
  const id = `rel-${release.cat}`;
  const active = p.current?.id === id;
  const playing = active && p.isPlaying;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        p.play(releaseToTrack(release), releases.map(releaseToTrack));
      }}
      aria-label={`${playing ? "Pause" : "Play"} ${release.title} by ${release.artist}`}
      className={`flex h-12 w-12 items-center justify-center rounded-full backdrop-blur transition duration-300 hover:scale-105 ${
        active
          ? "bg-accent text-accent-foreground opacity-100"
          : "bg-background/85 text-foreground opacity-0 group-hover:opacity-100"
      }`}
    >
      {playing ? <PauseGlyph /> : <PlayGlyph />}
    </button>
  );
}

/* ----------------------------------------------------------------- */
/*  Episode play button — icon (archive rows) or labelled (featured)  */
/* ----------------------------------------------------------------- */
export function EpisodePlayButton({
  episode,
  variant = "icon",
}: {
  episode: Episode;
  variant?: "icon" | "label";
}) {
  const p = usePlayer();
  const id = `ep-${episode.no}`;
  const active = p.current?.id === id;
  const playing = active && p.isPlaying;

  const onClick = () => p.play(episodeToTrack(episode), episodes.map(episodeToTrack));

  if (variant === "label") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="mt-2 inline-flex w-fit items-center gap-3 bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
      >
        {playing ? <PauseGlyph size={12} /> : <PlayGlyph size={12} />}
        {playing ? "Pause Episode" : "Play Episode"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${playing ? "Pause" : "Play"} ${episode.title}`}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border text-foreground group-hover:border-accent group-hover:text-accent"
      }`}
    >
      {playing ? <PauseGlyph size={11} /> : <PlayGlyph size={11} />}
    </button>
  );
}
