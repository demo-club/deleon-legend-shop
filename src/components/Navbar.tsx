import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { CATEGORIES } from "@/lib/products";

export function Navbar() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <button
          className="p-2 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menú"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {CATEGORIES.slice(0, 3).map((c) => (
            <Link
              key={c.id}
              to="/"
              search={{ cat: c.id }}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {c.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          search={{ cat: undefined }}
          className="absolute left-1/2 -translate-x-1/2 font-display text-xl font-bold tracking-[0.35em] sm:text-2xl"
        >
          DELEON
        </Link>

        <button
          onClick={openCart}
          className="relative flex items-center gap-2 p-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
        >
          <ShoppingBag className="size-5" />
          <span className="hidden sm:inline">Carrito</span>
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
              {count}
            </span>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-border bg-background px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to="/"
                search={{ cat: undefined }}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-[0.2em]"
              >
                Todo
              </Link>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link
                  to="/"
                  search={{ cat: c.id }}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
