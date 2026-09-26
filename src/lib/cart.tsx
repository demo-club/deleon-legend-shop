import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "./products";

export interface CartItem {
  productId: string;
  size: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (productId: string, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  count: number;
  subtotal: number;
  detailed: { item: CartItem; product: Product }[];
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "deleon-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const detailed = items
      .map((item) => ({
        item,
        product: PRODUCTS.find((p) => p.id === item.productId)!,
      }))
      .filter((d) => d.product);

    return {
      items,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (productId, size) =>
        setItems((prev) => {
          const existing = prev.find(
            (i) => i.productId === productId && i.size === size,
          );
          if (existing) {
            return prev.map((i) =>
              i === existing ? { ...i, qty: i.qty + 1 } : i,
            );
          }
          return [...prev, { productId, size, qty: 1 }];
        }),
      removeItem: (productId, size) =>
        setItems((prev) =>
          prev.filter((i) => !(i.productId === productId && i.size === size)),
        ),
      updateQty: (productId, size, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter(
                (i) => !(i.productId === productId && i.size === size),
              )
            : prev.map((i) =>
                i.productId === productId && i.size === size
                  ? { ...i, qty }
                  : i,
              ),
        ),
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal: detailed.reduce((s, d) => s + d.product.price * d.item.qty, 0),
      detailed,
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
