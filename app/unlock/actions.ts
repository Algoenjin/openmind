"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GATE_COOKIE, gateToken } from "../lib/gate";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

export async function unlock(formData: FormData) {
  const attempt = formData.get("password");
  const from = formData.get("from");
  // Only same-site relative paths, so the gate can't be used as an open redirect.
  const destination =
    typeof from === "string" && from.startsWith("/") && !from.startsWith("//")
      ? from
      : "/";

  const password = process.env.SITE_PASSWORD;
  const token = await gateToken();
  if (!password || !token || attempt !== password) {
    const params = new URLSearchParams({ error: "1" });
    if (destination !== "/") params.set("from", destination);
    redirect(`/unlock?${params}`);
  }

  (await cookies()).set(GATE_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: THIRTY_DAYS,
    path: "/",
  });
  redirect(destination);
}
