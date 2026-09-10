export type FulfilmentMode = "visit" | "takeaway" | "delivery";

export type CategoryId =
  | "goat"
  | "sheep"
  | "chicken"
  | "country-chicken"
  | "white-eggs"
  | "brown-eggs"
  | "fish"
  | "prawns";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: CategoryId;
  cut: string;
  description: string;
  /** Key into public/prices.json (resolved at runtime via PricesProvider). */
  priceKey: string;
  unit: "kg" | "eggs";
  minQty: number;
  step: number;
  image: string;
  featured?: boolean;
  tags?: string[];
}

export interface Store {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  image: string;
  specialties: string[];
}

export interface CartItem {
  productId: string;
  qty: number;
  note?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  area: string;
  text: string;
  rating: number;
}

export interface Order {
  id: string;
  items: Array<{
    productId: string;
    name: string;
    qty: number;
    unit: string;
    price: number;
    lineTotal: number;
  }>;
  fulfilment: FulfilmentMode;
  storeId?: string;
  address?: string;
  phone: string;
  customerName: string;
  subtotal: number;
  deliveryFee: number;
  gst: number;
  total: number;
  createdAt: string;
  status: "confirmed" | "preparing" | "ready" | "out_for_delivery" | "completed";
}
