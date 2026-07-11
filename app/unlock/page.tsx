import type { Metadata } from "next";
import { unlock } from "./actions";

export const metadata: Metadata = {
  title: "Enter Password",
  robots: { index: false, follow: false },
};

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const { error, from } = await searchParams;

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-sm animate-rise">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Private
        </p>
        <h1 className="heading mt-3 text-5xl">Locked</h1>
        <p className="mt-4 text-sm text-muted">
          This site is password protected. Enter the password to continue.
        </p>
        <form action={unlock} className="mt-8 flex w-full items-center">
          {from ? <input type="hidden" name="from" value={from} /> : null}
          <input
            type="password"
            name="password"
            required
            autoFocus
            placeholder="Password"
            className="h-11 w-full border border-border bg-transparent px-4 font-mono text-xs tracking-[0.15em] text-foreground placeholder:uppercase placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            className="h-11 shrink-0 bg-accent px-5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-foreground transition-opacity hover:opacity-90"
          >
            Enter
          </button>
        </form>
        {error ? (
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Wrong password. Try again.
          </p>
        ) : null}
      </div>
    </section>
  );
}
