// Shared between the proxy (request gate) and the unlock server action.
// The cookie value is an HMAC keyed by SITE_PASSWORD, so rotating the
// password invalidates every cookie already handed out.

export const GATE_COOKIE = "om_gate";

const encoder = new TextEncoder();

export async function gateToken(): Promise<string | null> {
  const password = process.env.SITE_PASSWORD;
  if (!password) return null;

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode("openmind-gate-v1"),
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
