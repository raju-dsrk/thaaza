# Thaaza

**Live-cut. Always fresh.** — a demo Next.js storefront for a Hyderabad live-cut meat startup.

Neighbourhood butcher shops · Visit / Takeaway / Home delivery · Quality first (not frozen dead stock).

> Production domain: **mperseus.com** (brand name in the app remains Thaaza unless you rename it).

## Quick start

```bash
cd thaaza
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Static production build (Hostinger / any static host):

```bash
npm run build
# Output is in out/ — upload those files, not the out folder itself
```

## Deploy on Hostinger (File Manager)

This project uses Next.js `output: 'export'` so `npm run build` writes a fully static site to **`out/`**.

1. On your machine: `npm run build` (or use the release zip `thaaza-hostinger.zip`).
2. In Hostinger **hPanel → Files → File Manager**, open **`public_html`** for **mperseus.com**.
3. Upload the **contents** of `out/` into `public_html` (so `index.html` sits directly in `public_html`, not as `public_html/out/index.html`).
4. Optional: keep `public/.htaccess` (copied into `out/` on build) for HTTPS redirect and clean directory URLs.
5. Visit https://mperseus.com and hard-refresh if assets look cached.

Each App Router page is exported as a folder with `index.html` (`trailingSlash: true`), so `/shop/`, `/product/…/`, etc. work without a SPA fallback. Order confirmation uses `/order/?id=…` (query string) because dynamic `/order/[id]` paths cannot be pre-rendered for unknown ids.

## Stack

- Next.js App Router + TypeScript + Tailwind CSS v4
- Static export (`output: 'export'`) + unoptimized images
- Client cart via Zustand + `localStorage`
- Demo catalogue in `src/lib/data.ts`; live prices from `public/prices.json`
- PWA manifest + deep crimson theme-color
- Mock checkout (no payment backend) with GST-style bill
- Noto Sans Telugu for Telugu UI strings

## Key routes

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, categories, how it works, trust, featured, stores, investor blurb |
| `/shop`, `/shop/[category]` | Catalogue |
| `/product/[slug]` | Product detail + add to cart |
| `/stores`, `/stores/[id]` | Madhapur, Kukatpally, LB Nagar |
| `/cart`, `/checkout` | Cart + fulfilment (visit / takeaway / delivery) |
| `/order?id=` | Demo order confirmation (browser localStorage) |
| `/about` | Problem / solution / model for investors |
| `/trust` | Hygiene + freshness SOP + FSSAI placeholder |
| `/account` | Optional mock OTP (does not block browsing) |

## Rename the brand

1. Update `BRAND` in `src/lib/data.ts` (name, tagline, Telugu line, contacts, theme colour).
2. Replace the SVG mark in `src/components/Logo.tsx`.
3. Update `public/manifest.json` name / short_name / theme_color.
4. Search-replace remaining “Thaaza” strings in copy pages (`about`, `trust`, footer).

## Edit prices (no code rebuild)

**Single source of truth:** `public/prices.json` (served at `/prices.json`).

On Hostinger after deploy, edit **`public_html/prices.json`** in File Manager, save, then **hard-refresh** the site (Ctrl/Cmd+Shift+R). No Next.js rebuild or redeploy needed for price changes.

| Key | What it controls |
|-----|------------------|
| `goatPerKg` | All male goat cuts (₹/kg) |
| `sheepPerKg` | All male sheep / mutton cuts |
| `chickenPerKg` | Broiler chicken cuts |
| `countryChickenPerKg` | Country / natu kodi |
| `whiteEggsPack6` | White eggs 6-pack (₹/pack) |
| `whiteEggsTray30` | White eggs 30-tray |
| `brownEggsTray` | Brown eggs 30-tray |
| `fishPerKg` | Rohu & katla |
| `prawnsPerKg` | Prawns |

Example — change goat to ₹1,049/kg:

```json
{
  "currency": "INR",
  "goatPerKg": 1049,
  ...
}
```

The app loads `/prices.json` in the browser via `PricesProvider`. If the fetch fails, it falls back to the same defaults in `src/lib/prices.ts`. Prices are **client-rendered** so static HTML may briefly show defaults until JSON loads — that is expected on a hard refresh after an edit.

> JSON does not allow comments. Keep the key names exactly as above.

## Edit products & catalogue

SKU catalogue (names, cuts, units, images — **not** rupee amounts) lives in **`src/lib/data.ts`**:

- `categories` — shop grid
- `products` — name, cut, `priceKey` (maps to `prices.json`), unit (`kg` | `tray` | `piece`), min/step qty, images
- `stores` — three Hyderabad demo shops
- `DELIVERY_FEE`, `GST_RATE`, `FREE_DELIVERY_ABOVE` — bill math

Changing `priceKey` or adding a product still needs a rebuild. Changing only the numbers in `prices.json` does not.

Unsplash URLs are tasteful food photography (no gore). Swap for your CDN later.

## Cart & orders

- Cart: Zustand persist key `thaaza-cart-v2`
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
