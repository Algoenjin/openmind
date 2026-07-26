import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { JoinFlow } from "./join-flow";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Become part of the OpenMind community — choose your membership and apply to join.",
};

export default function JoinPage() {
  return (
    <>
      {/* breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-4 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <Link
              href="/community"
              className="transition-colors hover:text-accent"
            >
              Community
            </Link>
            <span className="px-2 text-border">/</span>
            <span className="text-foreground">Join</span>
          </p>
        </div>
      </div>
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <JoinFlow />
      </Suspense>
    </>
  );
}
