import Image from "next/image";
import logo from "../../public/openmind-logo.png";
import mark from "../../public/openmind-mark.png";

/**
 * OpenMind Productions wordmark (white, transparent PNG — sits on dark
 * surfaces). Height is controlled via `className` (e.g. "h-8 w-auto") with
 * width auto so the aspect ratio is preserved. Served unoptimized: it's a
 * tiny asset and this avoids any dev image-optimizer flakiness.
 */
export function Logo({
  className = "h-8 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logo}
      alt="OpenMind Productions"
      priority={priority}
      unoptimized
      className={className}
    />
  );
}

/**
 * Stacked "OM PRO / OPEN MIND PRODUCTIONS" badge mark — the square,
 * self-contained version of the logo. White on transparent; sits on dark.
 */
export function LogoMark({
  className = "h-16 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={mark}
      alt="OpenMind Productions"
      priority={priority}
      unoptimized
      className={className}
    />
  );
}
