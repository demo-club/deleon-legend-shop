import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block animate-fade-up"
    >
      <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-secondary">
        {product.bestseller && (
          <span className="absolute left-3 top-3 z-10 bg-background px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] ring-1 ring-border">
            Bestseller
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={1008}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium">{product.name}</h3>
          <p className="text-xs text-muted-foreground">{product.color}</p>
        </div>
        <span className="shrink-0 text-sm font-medium">
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}
