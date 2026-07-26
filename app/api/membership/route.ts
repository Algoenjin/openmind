import {
  saveMembershipApplication,
  type MembershipApplication,
} from "../../lib/membership";

const REQUIRED: (keyof MembershipApplication)[] = [
  "firstName",
  "lastName",
  "email",
  "reason",
  "tier",
];

export async function POST(request: Request) {
  let data: Partial<MembershipApplication>;
  try {
    data = (await request.json()) as Partial<MembershipApplication>;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const missing = REQUIRED.filter((key) => !String(data[key] ?? "").trim());
  if (missing.length > 0) {
    return Response.json(
      { ok: false, error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  if (!/\S+@\S+\.\S+/.test(String(data.email))) {
    return Response.json(
      { ok: false, error: "Invalid email address" },
      { status: 400 }
    );
  }

  try {
    await saveMembershipApplication(data as MembershipApplication);
  } catch (err) {
    console.error("[membership] failed to process application:", err);
    return Response.json(
      {
        ok: false,
        error: "Could not submit your application. Please try again.",
        ...(process.env.NODE_ENV !== "production"
          ? { detail: err instanceof Error ? err.message : String(err) }
          : {}),
      },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
