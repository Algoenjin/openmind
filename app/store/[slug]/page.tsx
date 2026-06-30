import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "../../lib/data";

// only the slugs below are valid routes; anything else 404s
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description:
      product.description ?? `${product.name} — official OpenMind Pro apparel.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const soldOut = product.soldOut ?? false;
  const images = product.images ?? [];
  const contain = product.fit === "contain";
  const gradient = `linear-gradient(135deg, ${product.cover[0]} 0%, ${product.cover[1]} 75%)`;

  return (
    <>
      {/* breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-4 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <Link href="/store" className="transition-colors hover:text-accent">
              Store
            </Link>
            <span className="px-2 text-border">/</span>
            <span className="text-foreground">{product.name}</span>
          </p>
        </div>
      </div>

      <section className="mx-auto grid max-w-[1400px] gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-14">
        {/* gallery */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {images.length > 0 ? (
            images.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[3/4] w-full overflow-hidden border border-border"
                style={{ backgroundImage: gradient }}
              >
                <Image
                  src={src}
                  alt={`${product.name} — view ${i + 1}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  className={contain ? "object-contain p-10" : "object-cover object-top"}
                  priority={i === 0}
                />
              </div>
            ))
          ) : (
            <div
              className="aspect-[3/4] w-full border border-border"
              style={{ backgroundImage: gradient }}
            />
          )}
        </div>

        {/* info — sticky buy box */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {product.kind}
          </p>
          <h1 className="heading mt-2 text-4xl text-foreground sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-foreground">
            {product.price}
          </p>

          {product.description && (
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              {product.description}
            </p>
          )}

          {/* sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Size
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className={`flex h-11 min-w-[2.75rem] items-center justify-center border px-3 font-mono text-xs uppercase tracking-widest ${
                      soldOut
                        ? "border-border text-muted"
                        : "cursor-pointer border-border text-foreground transition-colors hover:border-accent hover:text-accent"
                    }`}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* add to cart */}
          <div className="mt-8 max-w-md">
            {soldOut ? (
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="w-full cursor-not-allowed border border-border bg-card px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted"
              >
                Out of Stock
              </button>
            ) : (
              <button
                type="button"
                className="w-full bg-accent px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                Add to Cart
              </button>
            )}
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {soldOut
                ? "Restocks announced first to the mailing list"
                : "Free shipping over €50"}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
