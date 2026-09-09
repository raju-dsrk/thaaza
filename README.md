# Thaaza

**Live-cut. Always fresh.** — a demo Next.js storefront for a Hyderabad live-cut meat startup.

Neighbourhood butcher shops · Visit / Takeaway / Home delivery · Quality first (not frozen dead stock).

## Quick start

```bash
cd thaaza
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

## Stack

- Next.js App Router + TypeScript + Tailwind CSS v4
- Client cart via Zustand + `localStorage`
- Demo catalogue in `src/lib/data.ts`
- PWA manifest + deep crimson theme-color
- Mock checkout (no payment backend) with GST-style bill

## Key routes

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, categories, how it works, trust, featured, stores, investor blurb |
| `/shop`, `/shop/[category]` | Catalogue |
| `/product/[slug]` | Product detail + add to cart |
| `/stores`, `/stores/[id]` | Madhapur, Kukatpally, LB Nagar |
| `/cart`, `/checkout` | Cart + fulfilment (visit / takeaway / delivery) |
| `/order/[id]` | Demo order confirmation (browser localStorage) |
| `/about` | Problem / solution / model for investors |
| `/trust` | Hygiene + freshness SOP + FSSAI placeholder |
| `/account` | Optional mock OTP (does not block browsing) |

## Rename the brand

1. Update `BRAND` in `src/lib/data.ts` (name, tagline, Telugu line, contacts, theme colour).
2. Replace the SVG wordmark in `src/components/Logo.tsx`.
3. Update `public/manifest.json` name / short_name / theme_color.
4. Search-replace remaining “Thaaza” strings in copy pages (`about`, `trust`, footer).

## Edit prices & products

All demo SKUs live in **`src/lib/data.ts`**:

- `categories` — shop grid
- `products` — name, cut, `pricePerKg`, unit (`kg` | `tray` | `piece`), min/step qty, images
- `stores` — three Hyderabad demo shops
- `DELIVERY_FEE`, `GST_RATE`, `FREE_DELIVERY_ABOVE` — bill math

Unsplash URLs are tasteful food photography (no gore). Swap for your CDN later.

## Cart & orders

- Cart: Zustand persist key `thaaza-cart-v1`
- Auth mock: `thaaza-auth-v1`
- Placed orders: `thaaza-order-<id>` + index `thaaza-orders` in `localStorage`

Clear site data in the browser to reset demos.

## PWA

- Manifest: `public/manifest.json`
- Icons: `public/icons/icon-192.png`, `icon-512.png`
- Theme colour: `#8B1E3F` (deep crimson / burgundy)

## Notes

- India-English marketing copy throughout; no lorem.
- Checkout is intentionally mock — wire Razorpay/Cashfree later.
- Do not treat demo FSSAI numbers as real licences.

See also: [COMPETITORS.md](./COMPETITORS.md).
