import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { PRODUCTS, SIZES, formatPrice } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} — DELEON` },
      {
        name: "description",
        content: loaderData?.product.description ?? "",
      },
      { property: "og:title", content: `${loaderData?.product.name} — DELEON` },
      {
        property: "og:description",
        content: loaderData?.product.description ?? "",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addItem, openCart } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);

  const handleAdd = () => {
    if (!size) return;
    addItem(product.id, size);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 600);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          {product.bestseller && (
            <span className="absolute left-4 top-4 z-10 bg-background px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] ring-1 ring-border">
              Bestseller
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={1008}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{product.color}</p>
          <p className="mt-4 font-display text-2xl font-bold">
            {formatPrice(product.price)}
          </p>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                Talla
              </span>
              {!size && (
                <span className="text-[11px] text-muted-foreground">
                  Selecciona una talla
                </span>
              )}
            </div>
            <div className="grid grid-cols-6 gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`border py-3 text-xs font-medium transition-colors ${
                    size === s
                      ? "border-foreground bg-primary text-primary-foreground"
                      : "border-border bg-card hover:border-foreground/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={!size}
            className="mt-8 flex w-full items-center justify-center gap-2 bg-primary py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {added ? (
              <>
                <Check className="size-4" /> Añadido
              </>
            ) : (
              "Añadir al carrito"
            )}
          </button>

          <ul className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground">
            <li>· Hecho bajo demanda — se produce al pedir</li>
            <li>· Algodón premium de alto gramaje</li>
            <li>· Envío mundial con seguimiento</li>
            <li>· Devoluciones dentro de 30 días</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 font-display text-xl font-bold tracking-tight sm:text-2xl">
            También te puede gustar
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
