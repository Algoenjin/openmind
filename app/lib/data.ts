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
  { cat: "OM047", title: "Surveillance", artist: "NØH", year: 2026, format: "12\" / Digital", cover: ["#2b6cff", "#0a0a0a"], image: "/covers/om047-surveillance-nyoh.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { cat: "OM046", title: "Anomaly", artist: "NØH", year: 2026, format: "Digital", cover: ["#ff4a1c", "#0a0a0a"], image: "/covers/om046-anomaly.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { cat: "OM045", title: "First Light", artist: "Ottman Gronberg", year: 2025, format: "12\" / Digital", cover: ["#7be0ff", "#0a0a0a"], image: "/covers/om045-first-light.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { cat: "OM044", title: "Square Up", artist: "Chris Iliou", year: 2025, format: "Digital", cover: ["#9b5cff", "#0a0a0a"], image: "/covers/om044-square-up.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { cat: "OM043", title: "Nightform", artist: "NØH", year: 2025, format: "12\" / Digital", cover: ["#ff2e87", "#0a0a0a"], image: "/covers/om043-nightform.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { cat: "OM042", title: "Static Bloom", artist: "Ottman Gronberg & Chris Iliou", year: 2025, format: "12\" / Digital", cover: ["#00d18f", "#0a0a0a"], image: "/covers/om042-static-bloom.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { cat: "OM041", title: "Spiral", artist: "Chris Iliou", year: 2024, format: "Digital", cover: ["#c8c8c8", "#0a0a0a"], image: "/covers/om041-spiral.png", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
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
  { slug: "not-your-ordinary-human", name: "NØH", base: "Stockholm, Sweden", portrait: ["#ff4a1c", "#0a0a0a"] },
  { slug: "inspektorn", name: "Chris Iliou", base: "Stockholm, Sweden", portrait: ["#2b6cff", "#0a0a0a"] },
  { slug: "ulrika-vincent", name: "Ulrika Vincent", base: "Stockholm, Sweden", portrait: ["#ffb000", "#0a0a0a"] },
  { slug: "junior-lindgren", name: "Junior Lindgren", base: "Stockholm, Sweden", portrait: ["#00d18f", "#0a0a0a"] },
  { slug: "joakim-ohlrogge", name: "Joakim Ohlrogge", base: "Stockholm, Sweden", portrait: ["#7be0ff", "#0a0a0a"] },
  { slug: "teh-ellis", name: "Teh Ellis", base: "Stockholm, Sweden", portrait: ["#9b5cff", "#0a0a0a"] },
  { slug: "oliver", name: "Oliver Hasselblad", base: "Stockholm, Sweden", portrait: ["#ff2e87", "#0a0a0a"] },
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
  { day: "25", month: "JUL", year: "2026", venue: "OpenMind OpenAir", city: "Stockholm", country: "SE", lineup: "Line-up coming soon", status: "tickets" },
  { day: "25", month: "JUL", year: "2026", venue: "OpenMind OpenSpace", city: "Stockholm", country: "SE", lineup: "Line-up coming soon", status: "tickets" },
  { day: "28", month: "AUG", year: "2026", venue: "Slakthuset", city: "Stockholm", country: "SE", lineup: "OpenMind Label Night Release Party", status: "tickets" },
  { day: "31", month: "OCT", year: "2026", venue: "Fact", city: "Barcelona", country: "ES", lineup: "Ottman Gronberg, NØH, Ulrika Vincent", status: "tickets" },
];

/** Past shows — most recent first. */
export const pastEvents: Eventt[] = [
  { day: "26", month: "JUN", year: "2026", venue: "Business Techno", city: "Stockholm", country: "SE", lineup: "Ottman Gronberg, NØH, Chris Iliou, Ulrika Vincent", status: "past" },
  { day: "22", month: "MAY", year: "2026", venue: "Business Techno", city: "Stockholm", country: "SE", lineup: "NØH, Ulrika Vincent", status: "past" },
];

export type Episode = {
  no: string;
  title: string;
  guest: string;
  date: string;
  duration: string;
  /** stream audio URL — demo tracks for now, swap for real streams */
  track: string;
};

/**
 * OpenMind Radio is three always-on channels — a low-to-high arc.
 * `guest` is the channel name + genre; `title` is the show name.
 * `date`/`duration` mark it as a live stream.
 */
export const episodes: Episode[] = [
  { no: "01", title: "OpenMind Radio", guest: "Sublevel — Techno", date: "Live", duration: "24/7", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { no: "02", title: "OpenMind Radio", guest: "Drift — House", date: "Live", duration: "24/7", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  { no: "03", title: "OpenMind Radio", guest: "Ascent — Trance", date: "Live", duration: "24/7", track: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
];

export type Product = {
  /** url handle — /store/<slug> */
  slug: string;
  name: string;
  kind: string;
  price: string;
  /** gradient fallback shown behind/instead of a photo */
  cover: [string, string];
  /** product photos — images[0] is the primary card image */
  images?: string[];
  /** how the image fills its frame — "cover" (photos) or "contain" (flat artwork). Defaults to "cover". */
  fit?: "cover" | "contain";
  /** available sizes shown on the product page */
  sizes?: string[];
  /** product page copy */
  description?: string;
  /** true → out of stock, not purchasable */
  soldOut?: boolean;
};

export const products: Product[] = [
  {
    slug: "openmind-pro-hoodie",
    name: "OPENMIND PRO Hoodie",
    kind: "Apparel — Black",
    price: "€60",
    cover: ["#1d1d1d", "#0a0a0a"],
    images: ["/merch/om-pro-hoodie-2.png", "/merch/om-pro-hoodie.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Heavyweight black hoodie with the OPENMIND PRO logo printed across the chest. Brushed-fleece interior, kangaroo pocket and a relaxed unisex fit.",
    soldOut: true,
  },
  {
    slug: "hypnos-hoodie",
    name: "HYPNOS Hoodie",
    kind: "Apparel — Black",
    price: "€65",
    cover: ["#1d1d1d", "#0a0a0a"],
    images: ["/merch/hypnos-hoodie-2.png", "/merch/hypnos-hoodie.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Heavyweight black hoodie featuring the HYPNOS spiral artwork from OM048, with the OPENMIND PRO mark beneath. Brushed-fleece interior and a relaxed unisex fit.",
    soldOut: true,
  },
  {
    slug: "openmind-pro-tee",
    name: "OPENMIND PRO Tee",
    kind: "Apparel — Black",
    price: "€30",
    cover: ["#1d1d1d", "#0a0a0a"],
    images: ["/merch/om-pro-tee-2.png", "/merch/om-pro-tee.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Classic-fit black tee with the OPENMIND PRO logo printed across the chest. Soft, heavyweight cotton with a clean unisex cut.",
    soldOut: true,
  },
  {
    slug: "openmind-graffiti-sticker",
    name: "OPEN MIND Sticker Pack",
    kind: "Stickers — 5-pack",
    price: "€12",
    cover: ["#1d1d1d", "#0a0a0a"],
    images: ["/merch/openmind-sticker-pack.png", "/merch/openmind-sticker-art.png"],
    description:
      "A 5-pack of die-cut OPEN MIND graffiti stickers on weatherproof vinyl. Slap them on your laptop, your record case, your slipmat or the club bathroom mirror.",
    soldOut: true,
  },
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

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
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
 * "Ottman Gronberg" -> "OG", "Joakim Ohlrogge" -> "JO", "NØH" -> "NØ".
 */
export function initials(name: string): string {
  const words = name.split(/[\s-]+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
