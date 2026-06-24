"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/* ------------------------------------------------------------------ */
/*  A single track the player understands. Releases and radio episodes */
/*  are both mapped into this shape before they reach the player.       */
/* ------------------------------------------------------------------ */
export type PlayerTrack = {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: [string, string];
  /** cover artwork in /public — overrides the gradient thumbnail when present */
  image?: string;
  /** small caption shown under the title, e.g. "OM048 · 2026" */
  meta?: string;
};

type PlayerApi = {
  current: PlayerTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  hasQueue: boolean;
  /** start (or restart) a track; pass a queue to enable next/prev */
  play: (track: PlayerTrack, queue?: PlayerTrack[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
};

const PlayerContext = createContext<PlayerApi | null>(null);

export function usePlayer(): PlayerApi {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within <PlayerProvider>");
  return ctx;
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [queue, setQueue] = useState<PlayerTrack[]>([]);
  const [index, setIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVol] = useState(0.8);

  const current = index >= 0 && index < queue.length ? queue[index] : null;

  /* advance to the next track when the current one ends — kept in a ref
     so the long-lived audio listeners always call the latest version */
  const next = useCallback(() => {
    setIndex((i) => (queue.length ? (i + 1) % queue.length : i));
  }, [queue.length]);
  const nextRef = useRef(next);
  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  const prev = useCallback(() => {
    setIndex((i) => (queue.length ? (i - 1 + queue.length) % queue.length : i));
  }, [queue.length]);

  /* one audio element for the whole session */
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = 0.8;
    audioRef.current = audio;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => nextRef.current();

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  /* load + autoplay whenever the selected track changes */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    if (audio.src !== current.src) {
      audio.src = current.src;
      setCurrentTime(0);
      setDuration(0);
    }
    audio.play().catch(() => {
      /* autoplay can be blocked until a user gesture — ignore */
    });
  }, [current]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }, []);

  const play = useCallback(
    (track: PlayerTrack, q?: PlayerTrack[]) => {
      // same track already loaded → just toggle play/pause
      if (current && current.id === track.id) {
        toggle();
        return;
      }
      const newQueue = q && q.length ? q : [track];
      const i = newQueue.findIndex((t) => t.id === track.id);
      setQueue(newQueue);
      setIndex(i >= 0 ? i : 0);
    },
    [current, toggle],
  );

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((v: number) => {
    const audio = audioRef.current;
    if (audio) audio.volume = v;
    setVol(v);
  }, []);

  const api: PlayerApi = {
    current,
    isPlaying,
    currentTime,
    duration,
    volume,
    hasQueue: queue.length > 1,
    play,
    toggle,
    next,
    prev,
    seek,
    setVolume,
  };

  return <PlayerContext.Provider value={api}>{children}</PlayerContext.Provider>;
}
