import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import {
  AUDIENCES,
  CATEGORIES,
  PRODUCTS,
  type Audience,
  type Category,
} from "@/lib/products";
import heroImg from "@/assets/hero.jpg";

const searchSchema = (search: Record<string, unknown>) => ({
  cat: (search["cat"] as Category | undefined) ?? undefined,
  aud: (search["aud"] as Audience | undefined) ?? undefined,
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  component: Index,

  head: () => ({
    meta: [
      { title: "DELEON — Esenciales Premium Bajo Demanda" },
      {
        name: "description",
        content:
          "DELEON Legend Club: streetwear minimalista premium. Camisetas, hoodies y sudaderas heavyweight hechos bajo demanda. deleonlegend.club",
      },
      { property: "og:title", content: "DELEON — Esenciales Premium" },
      {
        property: "og:description",
        content:
          "Streetwear minimalista premium hecho bajo demanda. Camisetas, hoodies y sudaderas heavyweight.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function CategoryIcon({ id }: { id: Category }) {
  const common = {
    className: "size-10 text-foreground/70",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    viewBox: "0 0 48 48",
  } as const;
  switch (id) {
    case "tshirts":
      return (
        <svg {...common}>
          <path d="M16 10l-8 6 4 6 4-2v18h16V20l4 2 4-6-8-6c-2 3-5 4-8 4s-6-1-8-4z" />
        </svg>
      );
    case "tanks":
      return (
        <svg {...common}>
          <path d="M17 8c0 6-2 8-4 10v22h22V18c-2-2-4-4-4-10-2 3-4 4-7 4s-5-1-7-4z" />
        </svg>
      );
    case "longsleeves":
      return (
        <svg {...common}>
          <path d="M16 10L8 14l2 22 6-2v6h16v-6l6 2 2-22-8-4c-2 3-5 4-8 4s-6-1-8-4z" />
        </svg>
      );
    case "hoodies":
      return (
        <svg {...common}>
          <path d="M18 8c-3 0-6 3-6 7l-6 4 3 7 4-2v14h22V24l4 2 3-7-6-4c0-4-3-7-6-7-1 3-3 5-6 5s-5-2-6-5z" />
          <path d="M18 30h12v8H18z" />
        </svg>
      );
    case "sweatshirts":
      return (
        <svg {...common}>
          <path d="M16 10L8 14l2 22 6-2v6h16v-6l6 2 2-22-8-4c-2 3-5 4-8 4s-6-1-8-4z" />
          <path d="M18 10c0 3 3 5 6 5s6-2 6-5" />
        </svg>
      );
  }
}

function Index() {
  const { cat, aud } = Route.useSearch();
  const activeAud: Audience = aud ?? "new";
  const navigate = Route.useNavigate();
  const [sort, setSort] = useState<"recommended" | "low" | "high">(
    "recommended",
  );

  const products = useMemo(() => {
    let list = PRODUCTS;
    if (activeAud === "new") list = list.filter((p) => p.isNew);
    else if (activeAud !== "all")
      list = list.filter((p) => p.audiences.includes(activeAud));
    if (cat) list = list.filter((p) => p.category === cat);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, activeAud, sort]);


  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden sm:min-h-[85vh]">
        <img
          src={heroImg}
          alt="DELEON colección"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-primary-foreground/80 animate-fade-up">
            Drop 01 · Hecho bajo demanda
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.9] tracking-tight text-primary-foreground animate-fade-up sm:text-7xl md:text-8xl">
            LEGEND
            <br />
            IN THE
            <br />
            MAKING
          </h1>
          <a
            href="#catalogo"
            className="mt-8 inline-block bg-background px-8 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-foreground transition-opacity hover:opacity-90 animate-fade-up"
          >
            Explorar la colección
          </a>
        </div>
      </section>

      {/* Audience tabs */}
      <section id="catalogo" className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
          <p className="text-eyebrow mb-5 text-center text-muted-foreground">
            Colección
          </p>
          <div className="flex gap-7 overflow-x-auto no-scrollbar sm:justify-center">
            {AUDIENCES.map((a) => (
              <button
                key={a.id}
                onClick={() =>
                  navigate({ search: { cat, aud: a.id }, replace: true })
                }
                className={`relative shrink-0 pb-3 font-display text-sm font-bold uppercase tracking-[0.14em] transition-colors sm:text-base ${
                  activeAud === a.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {a.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-foreground transition-transform duration-300 ${
                    activeAud === a.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar sm:justify-center">
            <button
              onClick={() =>
                navigate({ search: { cat: undefined, aud }, replace: true })
              }
              className={`flex shrink-0 flex-col items-center justify-center gap-3 border px-6 py-5 transition-colors ${
                !cat
                  ? "border-foreground bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-foreground/40"
              }`}
            >
              <span className="text-eyebrow">Todo</span>
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() =>
                  navigate({ search: { cat: c.id, aud }, replace: true })
                }
                className={`flex shrink-0 flex-col items-center gap-3 border px-6 py-5 transition-colors ${
                  cat === c.id
                    ? "border-foreground bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-foreground/40"
                }`}
              >
                <CategoryIcon id={c.id} />
                <span className="text-eyebrow">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 pt-8 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] sm:text-4xl">
          {AUDIENCES.find((a) => a.id === activeAud)?.label}
          {cat ? ` · ${CATEGORIES.find((c) => c.id === cat)?.label}` : ""}
        </h2>
        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="border border-border bg-card px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] outline-none"
          >
            <option value="recommended">Recomendados</option>
            <option value="low">Precio: menor a mayor</option>
            <option value="high">Precio: mayor a menor</option>
          </select>
          <span className="font-numeric text-[11px] text-muted-foreground">
            {products.length} artículos
          </span>
        </div>
      </div>


      {/* Grid */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {products.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Pronto habrá nuevas prendas en esta selección.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>


      {/* Statement */}
      <section className="bg-secondary px-4 py-20 text-center sm:py-28">
        <p className="mx-auto max-w-2xl font-display text-2xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
          "No perseguimos tendencias. Construimos la arquitectura de un
          guardarropa."
        </p>
        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
          Deleon Legend Club
        </p>
      </section>
    </div>
  );
}
