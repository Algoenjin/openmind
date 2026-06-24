import type { Metadata } from "next";
import { products } from "../lib/data";
import { PageHero, ProductCard } from "../components/ui";

export const metadata: Metadata = {
  title: "Store",
  description: "OpenMind vinyl, apparel and accessories. Shipped worldwide.",
};

export default function StorePage() {
  return (
    <>
      <PageHero
        eyebrow="Vinyl & Merch"
        title="Store"
        intro="Limited vinyl pressings and official OpenMind apparel. Pressed in small runs, shipped worldwide."
      />
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {products.length} items
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Free shipping over €50
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
