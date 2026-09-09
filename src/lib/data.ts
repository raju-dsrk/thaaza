import type { Category, Product, Store, Testimonial } from "./types";

export const BRAND = {
  name: "Thaaza",
  tagline: "Live-cut. Always fresh.",
  telugu: "తాజా మాంసం",
  city: "Hyderabad",
  phone: "+91 90000 00000",
  email: "hello@thaaza.in",
  themeColor: "#8B1E3F",
};

export const categories: Category[] = [
  {
    id: "goat",
    name: "Male Goat",
    nameTe: "మేక",
    slug: "goat",
    description: "Live-cut male goat — curry, biryani, boneless, keema & paya.",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80",
  },
  {
    id: "sheep",
    name: "Male Sheep",
    nameTe: "గొర్రె",
    slug: "sheep",
    description: "Fresh mutton from live male sheep, cut to your preference.",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
  },
  {
    id: "chicken",
    name: "Chicken Broiler",
    nameTe: "చికెన్",
    slug: "chicken",
    description: "White broiler (40–60 day) — curry cut, boneless & whole.",
    image:
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&q=80",
  },
  {
    id: "country-chicken",
    name: "Country Chicken",
    nameTe: "నాటు కోడి",
    slug: "country-chicken",
    description: "Brown / country chicken — richer flavour, slower cook.",
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
  },
  {
    id: "eggs",
    name: "Eggs",
    nameTe: "గుడ్లు",
    slug: "eggs",
    description: "Fresh white & brown egg trays from local farms.",
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&q=80",
  },
  {
    id: "fish",
    name: "Freshwater Fish",
    nameTe: "చేప",
    slug: "fish",
    description: "Rohu & katla — cleaned or cut the way you like.",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
  },
  {
    id: "prawns",
    name: "Prawns",
    nameTe: "రొయ్యలు",
    slug: "prawns",
    description: "Fresh prawns — cleaned or with shell.",
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&q=80",
  },
];

export const products: Product[] = [
  // Goat
  {
    id: "goat-curry",
    slug: "goat-curry-cut",
    name: "Male Goat — Curry Cut",
    categoryId: "goat",
    cut: "Curry cut",
    description:
      "Bone-in curry pieces from live male goat. Ideal for Hyderabadi dum & home-style curries. Cut fresh after you order.",
    pricePerKg: 720,
    unit: "kg",
    minQty: 0.5,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80",
    featured: true,
    tags: ["Live-cut", "Bone-in"],
  },
  {
    id: "goat-biryani",
    slug: "goat-biryani-cut",
    name: "Male Goat — Biryani Cut",
    categoryId: "goat",
    cut: "Biryani cut",
    description:
      "Larger bone-in chunks sized for dum biryani. Fat trimmed to your preference at the shop.",
    pricePerKg: 740,
    unit: "kg",
    minQty: 0.5,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80",
    featured: true,
    tags: ["Live-cut", "Biryani"],
  },
  {
    id: "goat-boneless",
    slug: "goat-boneless",
    name: "Male Goat — Boneless",
    categoryId: "goat",
    cut: "Boneless",
    description:
      "Clean boneless goat meat for fry, gravy or kebab. Cut from the same live animal you select.",
    pricePerKg: 920,
    unit: "kg",
    minQty: 0.25,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80",
    tags: ["Boneless"],
  },
  {
    id: "goat-keema",
    slug: "goat-keema",
    name: "Male Goat — Keema",
    categoryId: "goat",
    cut: "Keema",
    description:
      "Freshly minced goat keema. No frozen mince — ground after cutting at the shop.",
    pricePerKg: 780,
    unit: "kg",
    minQty: 0.25,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&q=80",
    tags: ["Minced"],
  },
  {
    id: "goat-paya",
    slug: "goat-paya",
    name: "Male Goat — Paya",
    categoryId: "goat",
    cut: "Paya",
    description:
      "Goat trotters cleaned and ready for slow-cooked paya. Available while stock lasts each morning.",
    pricePerKg: 280,
    unit: "kg",
    minQty: 0.5,
    step: 0.5,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    tags: ["Specialty"],
  },
  // Sheep
  {
    id: "sheep-curry",
    slug: "sheep-curry-cut",
    name: "Male Sheep — Curry Cut",
    categoryId: "sheep",
    cut: "Curry cut",
    description:
      "Live-cut male sheep (mutton) curry pieces. Milder flavour than goat, perfect for everyday curries.",
    pricePerKg: 780,
    unit: "kg",
    minQty: 0.5,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
    featured: true,
    tags: ["Live-cut"],
  },
  {
    id: "sheep-biryani",
    slug: "sheep-biryani-cut",
    name: "Male Sheep — Biryani Cut",
    categoryId: "sheep",
    cut: "Biryani cut",
    description:
      "Mutton biryani cut with the right bone-to-meat ratio for dum pots.",
    pricePerKg: 800,
    unit: "kg",
    minQty: 0.5,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=800&q=80",
    tags: ["Biryani"],
  },
  {
    id: "sheep-boneless",
    slug: "sheep-boneless",
    name: "Male Sheep — Boneless",
    categoryId: "sheep",
    cut: "Boneless",
    description: "Boneless mutton for fry, stew or seekh. Cut to order.",
    pricePerKg: 980,
    unit: "kg",
    minQty: 0.25,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80",
  },
  {
    id: "sheep-keema",
    slug: "sheep-keema",
    name: "Male Sheep — Keema",
    categoryId: "sheep",
    cut: "Keema",
    description: "Fresh sheep keema, minced at the counter after live cut.",
    pricePerKg: 840,
    unit: "kg",
    minQty: 0.25,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&q=80",
  },
  {
    id: "sheep-paya",
    slug: "sheep-paya",
    name: "Male Sheep — Paya",
    categoryId: "sheep",
    cut: "Paya",
    description: "Sheep paya cleaned and packed for weekend nihari or soup.",
    pricePerKg: 300,
    unit: "kg",
    minQty: 0.5,
    step: 0.5,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  },
  // Chicken broiler
  {
    id: "chicken-curry",
    slug: "chicken-curry-cut",
    name: "Broiler Chicken — Curry Cut",
    categoryId: "chicken",
    cut: "Curry cut",
    description:
      "White broiler (40–60 day birds). Curry cut with skin as preferred. Never frozen stock.",
    pricePerKg: 220,
    unit: "kg",
    minQty: 0.5,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&q=80",
    featured: true,
    tags: ["Daily fresh"],
  },
  {
    id: "chicken-boneless",
    slug: "chicken-boneless",
    name: "Broiler Chicken — Boneless",
    categoryId: "chicken",
    cut: "Boneless",
    description:
      "Boneless chicken breast & thigh for grill, curry or meal prep.",
    pricePerKg: 340,
    unit: "kg",
    minQty: 0.25,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80",
  },
  {
    id: "chicken-whole",
    slug: "chicken-whole",
    name: "Broiler Chicken — Whole",
    categoryId: "chicken",
    cut: "Whole",
    description:
      "Whole cleaned broiler. Tell us if you want skin-on or skinless dressing.",
    pricePerKg: 200,
    unit: "kg",
    minQty: 1,
    step: 0.5,
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
  },
  // Country chicken
  {
    id: "country-curry",
    slug: "country-chicken-curry-cut",
    name: "Country Chicken — Curry Cut",
    categoryId: "country-chicken",
    cut: "Curry cut",
    description:
      "Brown / country chicken (natu kodi). Firmer meat, deeper flavour — best slow-cooked.",
    pricePerKg: 420,
    unit: "kg",
    minQty: 0.5,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
    featured: true,
    tags: ["Natu kodi"],
  },
  {
    id: "country-whole",
    slug: "country-chicken-whole",
    name: "Country Chicken — Whole",
    categoryId: "country-chicken",
    cut: "Whole",
    description: "Whole country bird, cleaned and ready for pot or roast.",
    pricePerKg: 400,
    unit: "kg",
    minQty: 1,
    step: 0.5,
    image:
      "https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=800&q=80",
  },
  // Eggs
  {
    id: "eggs-white",
    slug: "eggs-white-tray",
    name: "White Eggs — Tray (30)",
    categoryId: "eggs",
    cut: "White tray",
    description: "Farm-fresh white eggs, packed in a 30-egg tray.",
    pricePerKg: 180,
    unit: "tray",
    minQty: 1,
    step: 1,
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&q=80",
    featured: true,
  },
  {
    id: "eggs-brown",
    slug: "eggs-brown-tray",
    name: "Brown Eggs — Tray (30)",
    categoryId: "eggs",
    cut: "Brown tray",
    description: "Brown eggs from free-range style farms. Richer yolk colour.",
    pricePerKg: 220,
    unit: "tray",
    minQty: 1,
    step: 1,
    image:
      "https://images.unsplash.com/photo-1498654200943-275ca5356420?w=800&q=80",
  },
  // Fish
  {
    id: "fish-rohu-clean",
    slug: "rohu-cleaned",
    name: "Rohu — Cleaned",
    categoryId: "fish",
    cut: "Cleaned",
    description:
      "Freshwater rohu, gutted and cleaned. Ask for steak or curry pieces.",
    pricePerKg: 280,
    unit: "kg",
    minQty: 0.5,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
    featured: true,
    tags: ["Freshwater"],
  },
  {
    id: "fish-rohu-cut",
    slug: "rohu-cut",
    name: "Rohu — Cut Pieces",
    categoryId: "fish",
    cut: "Cut",
    description: "Rohu cut into curry-ready pieces. Bones left in for flavour.",
    pricePerKg: 300,
    unit: "kg",
    minQty: 0.5,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=800&q=80",
  },
  {
    id: "fish-katla-clean",
    slug: "katla-cleaned",
    name: "Katla — Cleaned",
    categoryId: "fish",
    cut: "Cleaned",
    description: "Katla cleaned and ready. Popular for Andhra-style fish curry.",
    pricePerKg: 320,
    unit: "kg",
    minQty: 0.5,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
  },
  {
    id: "fish-katla-cut",
    slug: "katla-cut",
    name: "Katla — Cut Pieces",
    categoryId: "fish",
    cut: "Cut",
    description: "Katla cut to size for fry or gravy.",
    pricePerKg: 340,
    unit: "kg",
    minQty: 0.5,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800&q=80",
  },
  // Prawns
  {
    id: "prawns-cleaned",
    slug: "prawns-cleaned",
    name: "Prawns — Cleaned",
    categoryId: "prawns",
    cut: "Cleaned",
    description:
      "Deveined cleaned prawns. Ready for fry, gravy or biryani layering.",
    pricePerKg: 680,
    unit: "kg",
    minQty: 0.25,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&q=80",
    featured: true,
    tags: ["Cleaned"],
  },
  {
    id: "prawns-shell",
    slug: "prawns-with-shell",
    name: "Prawns — With Shell",
    categoryId: "prawns",
    cut: "With shell",
    description: "Whole prawns with shell. Better for spicy fry and gravy stock.",
    pricePerKg: 560,
    unit: "kg",
    minQty: 0.25,
    step: 0.25,
    image:
      "https://images.unsplash.com/photo-1625944230946-1e15e7340af1?w=800&q=80",
  },
];

export const stores: Store[] = [
  {
    id: "madhapur",
    name: "Thaaza Madhapur",
    area: "Madhapur",
    address: "Near Ayyappa Society, Madhapur, Hyderabad 500081",
    phone: "+91 90000 11111",
    hours: "6:30 AM – 9:30 PM",
    lat: 17.4484,
    lng: 78.3908,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    specialties: ["Goat & sheep live-cut", "Biryani cuts", "Same-day delivery"],
  },
  {
    id: "kukatpally",
    name: "Thaaza Kukatpally",
    area: "Kukatpally",
    address: "KPHB Main Road, Kukatpally, Hyderabad 500072",
    phone: "+91 90000 22222",
    hours: "6:30 AM – 9:30 PM",
    lat: 17.4948,
    lng: 78.3996,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    specialties: ["Country chicken", "Fish & prawns", "Morning stock"],
  },
  {
    id: "lb-nagar",
    name: "Thaaza LB Nagar",
    area: "LB Nagar",
    address: "Near Ring Road, LB Nagar, Hyderabad 500074",
    phone: "+91 90000 33333",
    hours: "6:30 AM – 9:00 PM",
    lat: 17.3457,
    lng: 78.5522,
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
    specialties: ["Family packs", "Egg trays", "Takeaway rush hours"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sravanthi R.",
    area: "Madhapur",
    text: "Finally a shop where I can see the animal before they cut. Biryani cut for Sunday dum is consistent — no surprises like frozen packets.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Mohammed Irfan",
    area: "Tolichowki",
    text: "Ordered goat keema for evening. They minced after cutting, packed properly, and delivery reached before Maghrib. Proper Hyderabad style.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Lakshmi Devi",
    area: "Kukatpally",
    text: "Natu kodi curry cut was fresh — not the soft freezer chicken. My mother-in-law noticed the difference immediately.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Pradeep Kumar",
    area: "LB Nagar",
    text: "Visit shop mode is useful. I pick the bird, they cut while I wait. Bill has GST breakup — clear and professional.",
    rating: 4,
  },
];

export const DELIVERY_FEE = 49;
export const GST_RATE = 0.05; // 5% demo GST on meat/fish for bill display
export const FREE_DELIVERY_ABOVE = 999;

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug || c.id === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug || p.id === slug);
}

export function getStore(id: string) {
  return stores.find((s) => s.id === id);
}

export function getProductsByCategory(categoryId: string) {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
