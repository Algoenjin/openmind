import { SITE } from "../lib/data";

/* minimal monochrome brand icons */
export function SocialIcon({ name }: { name: string }) {
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

/** Row of social links from SITE.socials. Shared by the footer + mobile menu. */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
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
  );
}
