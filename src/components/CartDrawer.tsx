import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export function CartDrawer() {
  const { isOpen, closeCart, detailed, updateQty, removeItem, subtotal } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-foreground/40"
        onClick={closeCart}
        aria-hidden
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.3em]">
            Tu Carrito
          </h2>
          <button onClick={closeCart} aria-label="Cerrar" className="p-1">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {detailed.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Tu carrito está vacío.
            </p>
          ) : (
            <ul className="flex flex-col gap-6">
              {detailed.map(({ item, product }) => (
                <li
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-20 shrink-0 object-cover"
                    loading="lazy"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.color} · Talla {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        aria-label="Eliminar"
                        className="p-1 text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-border">
                        <button
                          className="p-1.5"
                          onClick={() =>
                            updateQty(item.productId, item.size, item.qty - 1)
                          }
                          aria-label="Menos"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-8 text-center text-xs">
                          {item.qty}
                        </span>
                        <button
                          className="p-1.5"
                          onClick={() =>
                            updateQty(item.productId, item.size, item.qty + 1)
                          }
                          aria-label="Más"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-sm font-medium">
                        {formatPrice(product.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {detailed.length > 0 && (
          <div className="border-t border-border px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Subtotal
              </span>
              <span className="font-display text-lg font-bold">
                {formatPrice(subtotal)}
              </span>
            </div>
            <button className="w-full bg-primary py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-90">
              Finalizar Compra
            </button>
            <p className="mt-3 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
              Envío calculado al pagar · Hecho bajo demanda
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
