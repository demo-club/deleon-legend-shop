import teeNavy from "@/assets/tee-navy.jpg";
import teeBlack from "@/assets/tee-black.jpg";
import hoodieGray from "@/assets/hoodie-gray.jpg";
import hoodieBlack from "@/assets/hoodie-black.jpg";
import sweatshirtSand from "@/assets/sweatshirt-sand.jpg";
import tankWhite from "@/assets/tank-white.jpg";
import longsleeveOlive from "@/assets/longsleeve-olive.jpg";

export type Category =
  | "tshirts"
  | "tanks"
  | "longsleeves"
  | "hoodies"
  | "sweatshirts";

export type Audience = "new" | "all" | "men" | "women" | "unisex" | "kids";

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "tshirts", label: "Camisetas" },
  { id: "tanks", label: "Tank Tops" },
  { id: "longsleeves", label: "Manga Larga" },
  { id: "hoodies", label: "Hoodies" },
  { id: "sweatshirts", label: "Sudaderas" },
];


export const AUDIENCES: { id: Audience; label: string }[] = [
  { id: "new", label: "New In" },
  { id: "all", label: "All" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "unisex", label: "Unisex" },
  { id: "kids", label: "Kids & Baby" },
];

export interface Product {
  id: string;
  name: string;
  color: string;
  price: number;
  category: Category;
  image: string;
  bestseller?: boolean;
  isNew?: boolean;
  audiences: Audience[];
  description: string;
}


export const PRODUCTS: Product[] = [
  {
    id: "heavy-tee-navy",
    audiences: ["unisex","men"],
    isNew: true,
    name: "Heavy Box Tee",
    color: "Azul Marino",
    price: 48,
    category: "tshirts",
    image: teeNavy,
    bestseller: true,
    description:
      "Camiseta oversize de algodón pesado 240gsm. Corte boxy, cuello reforzado y caída estructurada. Impresa bajo demanda.",
  },
  {
    id: "void-tee-black",
    audiences: ["unisex","men","women"],
    isNew: true,
    name: "Void Oversized Tee",
    color: "Negro Carbón",
    price: 42,
    category: "tshirts",
    image: teeBlack,
    bestseller: true,
    description:
      "La esencial absoluta. Algodón peinado de alto gramaje con acabado suave y silueta oversize.",
  },
  {
    id: "structure-hoodie-gray",
    audiences: ["unisex","men"],
    name: "Structure Hoodie",
    color: "Gris Lavado",
    price: 95,
    category: "hoodies",
    image: hoodieGray,
    bestseller: true,
    description:
      "Hoodie heavyweight con lavado enzimático, capucha de doble capa y bolsillo canguro reforzado.",
  },
  {
    id: "legend-hoodie-black",
    audiences: ["unisex","men","women"],
    isNew: true,
    name: "Legend Hoodie",
    color: "Negro",
    price: 98,
    category: "hoodies",
    image: hoodieBlack,
    description:
      "Nuestro hoodie insignia. Felpa perchada 400gsm, hombros caídos y ribete apretado. Hecho para durar.",
  },
  {
    id: "classic-crew-sand",
    audiences: ["unisex","women"],
    name: "Classic Crewneck",
    color: "Arena",
    price: 82,
    category: "sweatshirts",
    image: sweatshirtSand,
    bestseller: true,
    description:
      "Sudadera de cuello redondo en tono arena. Corte relajado, puños acanalados y interior afelpado.",
  },
  {
    id: "linear-tank-white",
    audiences: ["women","unisex"],
    name: "Linear Tank",
    color: "Blanco Ártico",
    price: 36,
    category: "tanks",
    image: tankWhite,
    description:
      "Tank acanalado de algodón premium. Ajuste limpio, perfecto solo o en capas.",
  },
  {
    id: "tech-ls-olive",
    audiences: ["men","unisex"],
    isNew: true,
    name: "Technical LS Tee",
    color: "Oliva",
    price: 56,
    category: "longsleeves",
    image: longsleeveOlive,
    description:
      "Manga larga de peso medio con puños ajustados. Tono oliva lavado, versátil todo el año.",
  },
  {
    id: "mini-legend-tee-white",
    name: "Mini Legend Tee",
    color: "Blanco",
    price: 28,
    category: "tshirts",
    image: tankWhite,
    audiences: ["kids"],
    isNew: true,
    description:
      "Camiseta infantil de algodón suave 180gsm. Corte cómodo para niños y bebés, impresa bajo demanda.",
  },
  {
    id: "mini-legend-hoodie-black",
    name: "Mini Legend Hoodie",
    color: "Negro",
    price: 48,
    category: "hoodies",
    image: hoodieBlack,
    audiences: ["kids"],
    description:
      "Hoodie infantil de felpa suave con capucha forrada y bolsillo frontal. Tallas para niños.",
  },
];


export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export function formatPrice(n: number) {
  return `$${n.toFixed(2)} USD`;
}
