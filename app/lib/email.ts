import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

// Created lazily so a missing key (e.g. local dev without secrets) doesn't crash
// the app at import time. When the key is absent we log-and-skip instead.
const resend = apiKey ? new Resend(apiKey) : null;

// Sender — must be on a domain verified in your Resend account.
const FROM = process.env.RESEND_FROM ?? "OpenMind <noreply@openmindpro.com>";
// Team inbox that receives form submissions.
const TO = process.env.RESEND_TO ?? "community@openmindpro.com";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  /** Set to the submitter's address so replying goes straight to them. */
  replyTo?: string;
}

/**
 * In dev, write a copy of every outgoing email to email-previews/ (gitignored)
 * so the flow can be inspected in localhost — independent of whether Resend is
 * configured or the sending domain is verified. No-ops in production.
 */
async function writeDevPreview(subject: string, html: string): Promise<void> {
  if (process.env.NODE_ENV === "production") return;
  try {
    const { mkdir, writeFile } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const dir = join(process.cwd(), "email-previews");
    await mkdir(dir, { recursive: true });
    const slug =
      subject
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 60) || "email";
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const file = join(dir, `${stamp}-${slug}.html`);
    await writeFile(file, html, "utf8");
    console.log(`[email] dev preview written: ${file}`);
  } catch (err) {
    console.warn("[email] could not write dev preview:", err);
  }
}

/**
 * Send an email via Resend.
 *
 * If RESEND_API_KEY is not set we log and return (so dev/builds work without
 * credentials). When a key IS set, a send failure throws so the caller can
 * surface an error and ask the visitor to retry — email is currently the only
 * place form submissions are stored.
 */
export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailOptions): Promise<void> {
  await writeDevPreview(subject, html);

  if (!resend) {
    console.warn(
      `[email] RESEND_API_KEY not set — skipping send. Subject: ${subject}`
    );
    return;
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    console.error("[email] Resend send failed:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

export interface TeamNotification {
  subject: string;
  html: string;
  /** Set to the submitter's address so replying goes straight to them. */
  replyTo?: string;
}

/** Email a form submission to the team inbox. Thin wrapper over sendEmail. */
export async function sendTeamNotification({
  subject,
  html,
  replyTo,
}: TeamNotification): Promise<void> {
  await sendEmail({ to: TO, subject, html, replyTo });
}

/** Escape user-supplied text before interpolating it into email HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Render a list of [label, value] pairs as a simple HTML table, skipping any
 * empty/optional values and escaping everything.
 */
export function renderFields(
  fields: Array<[string, string | undefined | null]>
): string {
  const rows = fields
    .filter(([, v]) => v != null && String(v).trim() !== "")
    .map(
      ([label, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(
          label
        )}</td><td style="padding:6px 0;white-space:pre-wrap;">${escapeHtml(
          String(v)
        )}</td></tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;font-family:system-ui,-apple-system,sans-serif;font-size:14px;line-height:1.5;color:#111;">${rows}</table>`;
}
