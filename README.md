# Olea — an independent marketplace for considered goods

Olea is a full-stack marketplace for small studios selling ceramics, textiles, pantry staples, jewellery, homeware and botanical beauty. It includes a public storefront, account registration and login, a persistent cart, checkout, seller product management and an admin dashboard for people, products and orders.

The project is a working demo: authentication, catalogue data and order management are real, while payment is simulated (checkout marks an order as paid and decrements stock).

## Highlights

- Editorial storefront with a full-screen animated hero (`PrismaHero`) and a draggable product rail (`ClothingRailGallery`)
- Product catalogue with search, category filters and product detail pages
- Persistent cart stored in an httpOnly cookie
- Checkout that creates a paid order and decrements product stock
- JWT session authentication with `admin`, `seller` and `client` roles
- Role-aware dashboard for stats, products, orders and people
- Seller product CRUD with image URLs, price, stock, category and featured flags
- Admin tools for changing roles and removing users
- Seeded demo marketplace: 1 admin, 5 studios, 1 client, 25 products and 3 orders
- Responsive design built on a warm Olea palette, Fraunces display type and Manrope body type

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.4 App Router, React 19, TypeScript |
| Styling | Tailwind CSS 4.3 via `@tailwindcss/turbopack` |
| Database | MongoDB Atlas with Mongoose 9 |
| Auth | `jose` JWT, HS256, httpOnly cookie |
| Password hashing | `bcryptjs` |
| Animation | `framer-motion`; CSS keyframes for the rail/dialog |
| Icons | `lucide-react` |
| Component utilities | `clsx`, `tailwind-merge`, `cn()` |
| UI scaffolding | shadcn-style `components/ui` with a custom Olea theme |

## Requirements

- Node.js 20 or newer
- npm
- A MongoDB Atlas cluster (or another MongoDB connection string)

## Getting started

```bash
npm install
```

Create `.env.local` from `.env.example` and fill in the two required values:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/olea?retryWrites=true&w=majority
SESSION_SECRET=replace-with-a-long-random-string
```

Generate a session secret with:

```bash
openssl rand -base64 32
```

Seed the demo marketplace:

```bash
npm run seed
```

Start the development server:

```bash
npm run dev
```

Open <http://localhost:3000>.

For a production check:

```bash
npm run build
npm run start
```

## Demo accounts

All passwords are demo-only. Change them before deploying a public instance.

| Role | Name | Email | Password | Store |
| --- | --- | --- | --- | --- |
| Admin | Nadia Benali | `admin@olea.market` | `Admin1234!` | — |
| Client | Ines Moreau | `client@olea.market` | `Client1234!` | — |
| Seller | Amara Diallo | `seller@olea.market` | `Seller1234!` | Terra & Loom |
| Seller | Mateo Silva | `mateo@olea.market` | `Seller1234!` | Casa do Barro |
| Seller | Leila Haddad | `leila@olea.market` | `Seller1234!` | Atlas Loom |
| Seller | Noor El Amrani | `noor@olea.market` | `Seller1234!` | Olive & Fig |
| Seller | Sofia Costa | `sofia@olea.market` | `Seller1234!` | Lume Studio |

## Seeded data

`npm run seed` connects to `MONGODB_URI` and upserts by email/slug, so it is safe to run more than once.

- 1 admin account
- 5 seller accounts, each with a store name and bio
- 1 client account
- 25 products across Ceramics, Textiles, Pantry, Jewellery, Home and Beauty
- 3 demo orders for the client with `paid`, `shipped` and `delivered` statuses

Demo orders are only created when the client has no existing orders. Existing products, users and orders are not deleted.

### Seeded studios

| Studio | Maker | Focus |
| --- | --- | --- |
| Terra & Loom | Amara Diallo | Ceramics, wood and woven tableware |
| Casa do Barro | Mateo Silva | Wood-fired stoneware and homeware |
| Atlas Loom | Leila Haddad | Handwoven linen, wool and block print |
| Olive & Fig | Noor El Amrani | Pantry staples and botanical body care |
| Lume Studio | Sofia Costa | Recycled jewellery and hand-blown glass |

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start Next.js in development |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run seed` | Upsert demo accounts, products and orders |

Type-check without emitting files:

```bash
npx tsc --noEmit
```

## Routes

### Public

| Route | Description |
| --- | --- |
| `/` | Home page, hero, category strip, weekly product rail, about and values |
| `/products` | Searchable and filterable product catalogue with the rail |
| `/products/[slug]` | Product detail page, add-to-cart form and related pieces |
| `/about` | Studio story and marketplace values |
| `/cart` | Cart lines, quantity controls, totals and checkout |
| `/login` | Sign in |
| `/register` | Create a client or seller account |

### Authenticated

| Route | Access | Description |
| --- | --- | --- |
| `/dashboard` | Any signed-in user | Role-aware overview and recent orders |
| `/dashboard/orders` | Any signed-in user | Client orders, seller order lines or all orders |
| `/dashboard/products` | Seller, admin | Product list and management |
| `/dashboard/products/new` | Seller, admin | Create a product |
| `/dashboard/products/[id]/edit` | Seller, admin | Edit a product |
| `/dashboard/users` | Admin | Manage users and roles |

Unauthenticated dashboard requests redirect to `/login?next=/dashboard`.

## Roles and permissions

| Capability | Client | Seller | Admin |
| --- | --- | --- | --- |
| Browse catalogue and product pages | Yes | Yes | Yes |
| Add to cart and checkout | Yes | Yes | Yes |
| View own orders | Yes | Yes | Yes |
| See all marketplace orders | No | No | Yes |
| Create and manage products | No | Own products | All products |
| Manage users and roles | No | No | Yes |
| Delete users | No | No | Yes |

Role checks live in server actions and page loaders, not only in the UI.

## Data model

### User

```ts
{
  name: string;
  email: string;
  password: string;
  role: "admin" | "seller" | "client";
  storeName?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

Passwords are hashed with bcrypt and excluded from queries by default (`select: false`).

### Product

```ts
{
  name: string;
  slug: string;
  description: string;
  price: number;
  category: "Ceramics" | "Textiles" | "Pantry" | "Jewelry" | "Home" | "Beauty";
  image: string;
  stock: number;
  featured: boolean;
  sellerId: ObjectId;
  sellerName: string;
  storeName?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Order

```ts
{
  buyerId: ObjectId;
  buyerName: string;
  buyerEmail: string;
  items: {
    productId: ObjectId;
    name: string;
    image: string;
    price: number;
    qty: number;
    sellerId: ObjectId;
  }[];
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}
```

## Project structure

```text
app/
  actions/            Server actions for auth, cart, orders, products, users
  about/              About page
  cart/               Cart and checkout
  dashboard/          Role-aware dashboard, products, orders, users
  login/              Sign-in page
  products/           Catalogue and product detail pages
  register/           Client and seller registration
  globals.css         Tailwind theme, Olea tokens, base styles
  layout.tsx          Root layout, fonts, navbar and footer
  page.tsx            Home page
components/
  ui/                 Supplied UI components, including the product rail
  ...                 Navbar, footer, product card, forms and dashboard UI
lib/
  actions helpers     Auth, cart, products and order queries
  constants.ts        Site copy, categories, roles, cookies, thresholds
  db.ts               Cached Mongoose connection and DB detection
  demo-products.ts    Offline catalogue fallback
  models/             User, Product and Order schemas
  rail.ts             ProductDTO -> RailGarment adapter
  types.ts            Shared DTOs and role types
  utils.ts            Price/date formatting, slugs, initials, cn()
scripts/
  seed.mjs            Demo accounts, catalogue and orders
public/
  hero-bg.jpg         Local hero image
```

## Authentication and sessions

- Passwords are hashed with `bcryptjs` before storage.
- A successful login creates a signed JWT (HS256) with `userId`, `role`, `name` and `email`.
- The token is stored in the `olea_session` httpOnly cookie for 7 days.
- `getCurrentUser()` verifies the JWT and reloads the user from MongoDB when configured.
- `requireUser()` and `requireRole()` protect dashboard pages and mutations.
- Logging out deletes the session cookie.

If MongoDB is not configured, catalogue pages fall back to demo products, but account and write operations require a database.

## Cart and checkout flow

1. A client adds a product from its detail page.
2. The cart is stored as a small JSON payload in the `olea_cart` cookie.
3. `/cart` resolves product IDs against the database and shows live prices and stock.
4. Checkout requires a signed-in session.
5. The server validates stock, creates an order with status `paid`, decrements stock, clears the cart and redirects to the orders dashboard.
6. Sellers see only their own lines in an order; admins see everything.

No payment provider is connected. Do not treat the demo checkout as a real transaction.

## Product rail and hero

- `components/ui/prisma-hero.tsx` is the homepage hero. It uses `public/hero-bg.jpg` and framer-motion word reveals.
- `components/ui/product-rail-gallery.tsx` is the supplied draggable product rail. It supports a desktop rail, a mobile carousel, a detail dialog and optional front/back/side images.
- `lib/rail.ts` maps `ProductDTO` records to `RailGarment` items: name, description, image, formatted price, category, studio and stock.
- The homepage rail mixes featured products with the latest listings, up to 10 pieces, and autoplays slowly.
- `/products` uses the same rail for the full filtered catalogue. Product detail dialogs include a “View piece” link to `/products/[slug]`.
- The rail uses `hanger="none"` for product photography and no background-removal masks, because catalogue images are ordinary product photos rather than transparent garment cut-outs.

`components/hero.tsx` is the previous hero and is kept as a fallback; it is no longer imported by the home page.

## Design system

Olea tokens are defined in `app/globals.css` under `@theme inline`:

| Token | Value | Use |
| --- | --- | --- |
| `cream` | `#f5efe3` | Page background |
| `paper` | `#fbf8f1` | Cards and panels |
| `olive` | `#4f5b2a` | Primary brand colour |
| `olive-dark` | `#3a451f` | Deep accents |
| `gold` | `#b8892d` | Highlights and focus |
| `sand` | `#d8c9a8` | Soft surfaces |
| `ink` | `#22261a` | Main text |
| `muted` | `#70715f` | Secondary text |
| `line` | `#e3d9c7` | Borders |

Shadcn-compatible tokens (`background`, `foreground`, `card`, `primary`, `border`, `ring`, `muted-foreground`, and so on) are mapped to the Olea palette so supplied components inherit the brand. `components.json` uses `cssVariables: false` because the tokens are declared directly in Tailwind's `@theme`.

Typography:

- Display: Fraunces
- Body: Manrope

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Yes for accounts and writes | MongoDB Atlas connection string |
| `SESSION_SECRET` | Recommended | Secret used to sign session JWTs |

Without a valid `MONGODB_URI`, the catalogue falls back to `lib/demo-products.ts`, but seeding, login persistence, product management and checkout will not work.

## Deployment

The app is designed for Vercel or any Node.js host that supports Next.js 16.

1. Create a MongoDB Atlas cluster and database user.
2. Add `MONGODB_URI` and `SESSION_SECRET` to the hosting provider's environment variables.
3. Run `npm run build` locally to verify.
4. Deploy the repository.
5. Run `npm run seed` once with the production `MONGODB_URI` to create demo data, or create real accounts through the UI.
6. Change or remove the demo accounts before making the site public.

Notes:

- Atlas network access must allow your host. For Vercel, allow the relevant egress ranges or `0.0.0.0/0` for a demo.
- `next.config.ts` allows remote images from any HTTPS host (`hostname: "**"`) so seeded Unsplash images load. Tighten this allow-list for production.
- The app uses server actions, so no separate API server is required.

## Troubleshooting

### “MONGODB_URI is missing or still a placeholder”

Create `.env.local` and replace the example value. Restart `npm run dev` after changing environment variables.

### The seed command cannot connect

- Confirm the cluster host, username and password.
- URL-encode special characters in the password.
- Check Atlas Network Access.
- Make sure the database name is present in the URI, for example `/olea`.

### Login succeeds but the dashboard redirects to login

- Confirm `SESSION_SECRET` is set and stable across restarts.
- Clear the `olea_session` cookie and sign in again.
- Confirm the user still exists in MongoDB.

### Images do not load

- Seeded images come from Unsplash; check the network tab for blocked or expired URLs.
- For uploaded images, use an HTTPS URL or add the host to `images.remotePatterns`.
- The product rail uses plain `<img>` elements, while product cards use `next/image`.

### The product rail looks empty

- Confirm the page has products (`/products` or a seeded database).
- If a filter returns no matches, the rail is not rendered and the empty state is shown.
- The rail needs a nonzero container width; it measures itself after mount.

### Orders are missing from the seller dashboard

Sellers only see lines whose `sellerId` matches their user ID. Orders created before the seed may belong to another seller.

## Security notes and limitations

- This is a demo, not a production commerce system.
- Payment is simulated; there is no Stripe, tax, shipping or refund integration.
- Demo passwords are public and must be changed before public deployment.
- JWT sessions are httpOnly and same-site, but there is no refresh-token rotation or server-side session revocation list.
- The wildcard image host in `next.config.ts` should be narrowed.
- Product images are remote URLs; there is no upload pipeline or image validation.
- There is no rate limiting on login, registration or checkout.
- The cart cookie is client-readable only by the server through actions; treat cart data as untrusted and always revalidate prices and stock at checkout.
- Seed data is upserted, not deleted. Review it before running against a database that contains real data.

## License

This repository is a portfolio/demo project. Add a license before distributing it publicly.
