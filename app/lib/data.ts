/* ------------------------------------------------------------------ */
/*  OpenMind catalogue — mock content                                  */
/*  Swap these arrays for a CMS / database later; the UI reads from     */
/*  here so the whole site updates from one place.                      */
/* ------------------------------------------------------------------ */

export const SITE = {
  name: "OpenMind",
  founder: "Ottman Gronberg",
  city: "Stockholm",
  country: "Sweden",
  est: 2018,
  statement:
    "OpenMind is one of the world's most influential underground techno record labels and events brands. Founded by Swedish DJ and producer Ottman Gronberg, it is known for driving the global popularity of peak-time, driving and melodic techno, operating from its base in Stockholm, Sweden.",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "SoundCloud", href: "https://soundcloud.com" },
    { label: "Bandcamp", href: "https://bandcamp.com" },
    { label: "Spotify", href: "https://spotify.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
};

export type Release = {
  cat: string;
  title: string;
  artist: string;
  year: number;
  format: string;
  /** two colors used to render the cover gradient (fallback when no image) */
  cover: [string, string];
  /** cover artwork in /public — overrides the gradient when present */
  image?: string;
  /** streaming/preview audio URL — demo tracks for now, swap for real masters */
  track: string;
};

export const releases: Release[] = [
  { cat: "OM048", title: "Hypnos", artist: "Ottman Gronberg", year: 2026, format: "12\" / Digital", cover: ["#ccff00", "#0a0a0a"], image: "/covers/om048-hypnos.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { cat: "OM047", title: "Surveillance", artist: "Not Your Ordinary Human", year: 2026, format: "12\" / Digital", cover: ["#2b6cff", "#0a0a0a"], image: "/covers/om047-surveillance-nyoh.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { cat: "OM046", title: "Anomaly", artist: "Not Your Ordinary Human", year: 2026, format: "Digital", cover: ["#ff4a1c", "#0a0a0a"], image: "/covers/om046-anomaly.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { cat: "OM045", title: "First Light", artist: "Ottman Gronberg", year: 2025, format: "12\" / Digital", cover: ["#7be0ff", "#0a0a0a"], image: "/covers/om045-first-light.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { cat: "OM044", title: "Square Up", artist: "Inspektorn", year: 2025, format: "Digital", cover: ["#9b5cff", "#0a0a0a"], image: "/covers/om044-square-up.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { cat: "OM043", title: "Nightform", artist: "Not Your Ordinary Human", year: 2025, format: "12\" / Digital", cover: ["#ff2e87", "#0a0a0a"], image: "/covers/om043-nightform.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { cat: "OM042", title: "Static Bloom", artist: "Ottman Gronberg & Inspektorn", year: 2025, format: "12\" / Digital", cover: ["#00d18f", "#0a0a0a"], image: "/covers/om042-static-bloom.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { cat: "OM041", title: "Spiral", artist: "Inspektorn", year: 2024, format: "Digital", cover: ["#c8c8c8", "#0a0a0a"], image: "/covers/om041-spiral.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
];

export type SocialLink = { label: string; href: string };

export type Artist = {
  slug: string;
  name: string;
  base: string;
  /** active since (year) */
  since?: number;
  /** one-line descriptor shown under the name */
  tagline?: string;
  genres?: string[];
  /** each string is a paragraph */
  bio?: string[];
  links?: SocialLink[];
  /** two colors for the portrait gradient */
  portrait?: [string, string];
};

export const artists: Artist[] = [
  {
    slug: "ottman-gronberg",
    name: "Ottman Gronberg",
    base: "Stockholm, Sweden",
    since: 2014,
    tagline: "Driving, hypnotic techno from Stockholm.",
    genres: ["Techno", "Peak-Time", "Hypnotic", "Melodic Techno"],
    bio: [
      "Ottman Gronberg is a Swedish DJ and producer and the founder of OpenMind. Operating from Stockholm, he has spent the last decade shaping a sound that sits between peak-time power and hypnotic restraint — driving, melodic techno built for the deepest hours of the night.",
      "Since launching OpenMind in 2018, Gronberg has used the label as a platform for an uncompromising vision of underground techno: releasing across its catalogue, building a roster of Stockholm's most uncompromising techno talent, and hosting the weekly OpenMind Radio show that documents the label's evolving sound.",
      "As a performer he is known for long-form, narrative-driven sets that move from brooding ambient openings to relentless climaxes — holding rooms from Berghain to Slakthuset and stages across Europe and Asia.",
    ],
    links: [
      { label: "SoundCloud", href: "https://soundcloud.com" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Spotify", href: "https://spotify.com" },
      { label: "Bandcamp", href: "https://bandcamp.com" },
      { label: "Resident Advisor", href: "https://ra.co" },
    ],
    portrait: ["#ccff00", "#0a0a0a"],
  },
  { slug: "not-your-ordinary-human", name: "Not Your Ordinary Human", base: "Stockholm, Sweden", portrait: ["#ff4a1c", "#0a0a0a"] },
  { slug: "inspektorn", name: "Inspektorn", base: "Stockholm, Sweden", portrait: ["#2b6cff", "#0a0a0a"] },
  { slug: "ulrika-vincent", name: "Ulrika Vincent", base: "Stockholm, Sweden", portrait: ["#ffb000", "#0a0a0a"] },
  { slug: "junior-lindgren", name: "Junior Lindgren", base: "Stockholm, Sweden", portrait: ["#00d18f", "#0a0a0a"] },
  { slug: "teh-ellis", name: "Teh Ellis", base: "Stockholm, Sweden", portrait: ["#9b5cff", "#0a0a0a"] },
  { slug: "oliver", name: "Oliver Hasselblad", base: "Stockholm, Sweden", portrait: ["#ff2e87", "#0a0a0a"] },
  { slug: "chef-and-slave", name: "Chef & Slave", base: "Stockholm, Sweden", portrait: ["#7be0ff", "#0a0a0a"] },
  { slug: "elias-aranciba", name: "Elias Aranciba", base: "Stockholm, Sweden", portrait: ["#ccff00", "#0a0a0a"] },
];

export type Eventt = {
  day: string;
  month: string;
  year: string;
  venue: string;
  city: string;
  country: string;
  lineup: string;
  status: "tickets" | "low" | "sold out" | "past";
};

export const events: Eventt[] = [
  { day: "26", month: "JUN", year: "2026", venue: "Business Techno", city: "Stockholm", country: "SE", lineup: "Ottman Gronberg, Not Your Ordinary Human, Inspektorn", status: "low" },
  { day: "24", month: "JUL", year: "2026", venue: "OpenMind Private", city: "Stockholm", country: "SE", lineup: "Line-up coming soon", status: "tickets" },
  { day: "24", month: "AUG", year: "2026", venue: "Slakthuset", city: "Stockholm", country: "SE", lineup: "OpenMind Label Night", status: "tickets" },
  { day: "31", month: "OCT", year: "2026", venue: "Fact", city: "Barcelona", country: "ES", lineup: "Ottman Gronberg, Not Your Ordinary Human, Ulrika Vincent", status: "tickets" },
];

/** Past shows — most recent first. */
export const pastEvents: Eventt[] = [
  { day: "22", month: "MAY", year: "2026", venue: "Business Techno", city: "Stockholm", country: "SE", lineup: "Not Your Ordinary Human", status: "past" },
];

export type Episode = {
  no: string;
  title: string;
  guest: string;
  date: string;
  duration: string;
  /** stream audio URL — demo tracks for now, swap for real mixes */
  track: string;
};

export const episodes: Episode[] = [
  { no: "048", title: "OpenMind Radio 048", guest: "Ottman Gronberg", date: "Jun 2026", duration: "60:00", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { no: "047", title: "OpenMind Radio 047", guest: "Not Your Ordinary Human", date: "Jun 2026", duration: "60:00", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  { no: "046", title: "OpenMind Radio 046", guest: "Inspektorn", date: "May 2026", duration: "60:00", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
  { no: "045", title: "OpenMind Radio 045", guest: "Ulrika Vincent", date: "May 2026", duration: "60:00", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
  { no: "044", title: "OpenMind Radio 044", guest: "Junior Lindgren", date: "Apr 2026", duration: "60:00", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
  { no: "043", title: "OpenMind Radio 043", guest: "Teh Ellis", date: "Apr 2026", duration: "60:00", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },
];

export type Product = {
  name: string;
  kind: string;
  price: string;
  cover: [string, string];
};

export const products: Product[] = [
  { name: "Hypnos — OM048", kind: "12\" Vinyl", price: "€14", cover: ["#ccff00", "#0a0a0a"] },
  { name: "OpenMind Logo Tee", kind: "Apparel — Black", price: "€30", cover: ["#1d1d1d", "#0a0a0a"] },
  { name: "OpenMind Hoodie", kind: "Apparel — Black", price: "€65", cover: ["#1d1d1d", "#0a0a0a"] },
  { name: "Roster Tote Bag", kind: "Accessory", price: "€18", cover: ["#2a2a2a", "#0a0a0a"] },
  { name: "OpenMind Cap", kind: "Apparel — Black", price: "€28", cover: ["#1d1d1d", "#0a0a0a"] },
  { name: "Sticker Pack", kind: "Accessory", price: "€6", cover: ["#ccff00", "#1a1a1a"] },
];

export const NAV = [
  { label: "Releases", href: "/releases" },
  { label: "Artists", href: "/artists" },
  { label: "Events", href: "/events" },
  { label: "Radio", href: "/radio" },
  { label: "Store", href: "/store" },
];

/* ------------------------------------------------------------------ */
/*  Lookups — used by the artist detail template                       */
/* ------------------------------------------------------------------ */

export function getArtist(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

/** Releases credited to an artist (matches collaborations too). */
export function releasesByArtist(name: string): Release[] {
  return releases.filter((r) => r.artist.includes(name));
}

/** Upcoming events whose line-up features the artist. */
export function eventsByArtist(name: string): Eventt[] {
  return events.filter((e) => e.lineup.includes(name));
}

/** Radio episodes hosted by or featuring the artist. */
export function episodesByArtist(name: string): Episode[] {
  return episodes.filter((e) => e.guest.includes(name));
}

/**
 * Two-letter monogram from a name. Skips non-word tokens like "&".
 * "Ottman Gronberg" -> "OG", "Chef & Slave" -> "CS", "Inspektorn" -> "IN".
 */
export function initials(name: string): string {
  const words = name.split(/[\s-]+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
