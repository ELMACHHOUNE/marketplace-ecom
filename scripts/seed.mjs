import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

function loadEnv(file) {
  const path = resolve(process.cwd(), file);
  if (!existsSync(path)) return;

  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnv(".env.local");
loadEnv(".env");

const uri = process.env.MONGODB_URI;

if (
  !uri ||
  uri.includes("USERNAME") ||
  uri.includes("PASSWORD") ||
  uri.includes("CLUSTER")
) {
  console.error(
    "\nMONGODB_URI is missing or still a placeholder.\n" +
      "Add your MongoDB Atlas connection string to .env.local, then run: npm run seed\n",
  );
  process.exit(1);
}

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, select: false },
    role: { type: String, enum: ["admin", "seller", "client"] },
    storeName: String,
    bio: String,
  },
  { timestamps: true },
);

const productSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    description: String,
    price: Number,
    category: String,
    image: String,
    stock: Number,
    featured: Boolean,
    sellerId: mongoose.Schema.Types.ObjectId,
    sellerName: String,
    storeName: String,
  },
  { timestamps: true },
);

const orderItemSchema = new mongoose.Schema(
  {
    productId: mongoose.Schema.Types.ObjectId,
    name: String,
    image: String,
    price: Number,
    qty: Number,
    sellerId: mongoose.Schema.Types.ObjectId,
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    buyerId: mongoose.Schema.Types.ObjectId,
    buyerName: String,
    buyerEmail: String,
    items: [orderItemSchema],
    total: Number,
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

const image = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1100&q=80`;

const accounts = [
  {
    key: "admin",
    name: "Nadia Benali",
    email: "admin@olea.market",
    password: "Admin1234!",
    role: "admin",
    bio: "Marketplace steward, occasional potter, permanent list-maker.",
  },
  {
    key: "client",
    name: "Ines Moreau",
    email: "client@olea.market",
    password: "Client1234!",
    role: "client",
  },
  {
    key: "terra",
    name: "Amara Diallo",
    email: "seller@olea.market",
    password: "Seller1234!",
    role: "seller",
    storeName: "Terra & Loom",
    bio: "Small-batch ceramics and woven textiles, made in Lisbon.",
  },
  {
    key: "casa",
    name: "Mateo Silva",
    email: "mateo@olea.market",
    password: "Seller1234!",
    role: "seller",
    storeName: "Casa do Barro",
    bio: "Wood-fired stoneware and quiet table pieces from the Portuguese coast.",
  },
  {
    key: "atlas",
    name: "Leila Haddad",
    email: "leila@olea.market",
    password: "Seller1234!",
    role: "seller",
    storeName: "Atlas Loom",
    bio: "Handwoven linen, wool and block-printed cloth from a two-woman atelier in Marrakech.",
  },
  {
    key: "olive",
    name: "Noor El Amrani",
    email: "noor@olea.market",
    password: "Seller1234!",
    role: "seller",
    storeName: "Olive & Fig",
    bio: "Pantry staples and botanical body care made in small batches in the Alentejo.",
  },
  {
    key: "lume",
    name: "Sofia Costa",
    email: "sofia@olea.market",
    password: "Seller1234!",
    role: "seller",
    storeName: "Lume Studio",
    bio: "Recycled metal jewellery and hand-blown glass for everyday rituals.",
  },
];

const products = [
  {
    sellerKey: "terra",
    name: "Ridge Stoneware Dinner Set",
    slug: "ridge-stoneware-dinner-set",
    description:
      "A four-piece place setting thrown by hand in stoneware, finished with a speckled matte glaze. Each plate carries the quiet marks of the wheel.",
    price: 128,
    category: "Ceramics",
    image: image("photo-1610701596007-11502861dcfa"),
    stock: 14,
    featured: true,
  },
  {
    sellerKey: "atlas",
    name: "Handwoven Linen Throw",
    slug: "handwoven-linen-throw",
    description:
      "Stonewashed European linen woven on a floor loom. Light enough for summer evenings, warm enough for the first cold mornings of autumn.",
    price: 96,
    category: "Textiles",
    image: image("photo-1600166898405-da9535204843"),
    stock: 9,
    featured: true,
  },
  {
    sellerKey: "olive",
    name: "First Harvest Olive Oil",
    slug: "first-harvest-olive-oil",
    description:
      "Cold-pressed from a single grove in the Alentejo. Peppery, green, and bottled within forty-eight hours of picking.",
    price: 24,
    category: "Pantry",
    image: image("photo-1474979266404-7eaacbcd87c5"),
    stock: 32,
    featured: true,
  },
  {
    sellerKey: "olive",
    name: "Wild Rosemary Honey",
    slug: "wild-rosemary-honey",
    description:
      "Raw, unfiltered honey from hives set among flowering rosemary. Floral on the nose with a long, resinous finish.",
    price: 18,
    category: "Pantry",
    image: image("photo-1587049352846-4a222e784d38"),
    stock: 41,
    featured: true,
  },
  {
    sellerKey: "olive",
    name: "Olive & Fig Botanical Soap",
    slug: "olive-fig-botanical-soap",
    description:
      "Saponified olive oil, fig leaf and a whisper of cedar. Cured for six weeks and cut by hand, so no two bars are alike.",
    price: 12,
    category: "Beauty",
    image: image("photo-1600857544200-b2f666a9a2ec"),
    stock: 58,
    featured: false,
  },
  {
    sellerKey: "lume",
    name: "Hammered Gold Signet",
    slug: "hammered-gold-signet",
    description:
      "A recycled 14k gold signet, hammered by hand for a surface that catches the light like still water.",
    price: 210,
    category: "Jewelry",
    image: image("photo-1515562141207-7a88fb7ce338"),
    stock: 5,
    featured: true,
  },
  {
    sellerKey: "casa",
    name: "Gathered Clay Vase",
    slug: "gathered-clay-vase",
    description:
      "A generous belly, a narrow neck, and an unglazed foot. Made for branches gathered on a walk, not florist bouquets.",
    price: 74,
    category: "Home",
    image: image("photo-1578749556568-bc2c40e68b61"),
    stock: 11,
    featured: false,
  },
  {
    sellerKey: "terra",
    name: "Olive Wood Serving Board",
    slug: "olive-wood-serving-board",
    description:
      "Cut from a single piece of fallen olive wood and finished with food-safe oil. The grain tells the tree's age.",
    price: 58,
    category: "Home",
    image: image("photo-1603006905003-be475563bc59"),
    stock: 17,
    featured: false,
  },
  {
    sellerKey: "casa",
    name: "Speckled Breakfast Bowl",
    slug: "speckled-breakfast-bowl",
    description:
      "A deep, generous bowl for porridge, fruit and late-night noodles. Thrown in dark stoneware with a flecked oatmeal glaze.",
    price: 34,
    category: "Ceramics",
    image: image("photo-1514228742587-6b1558fcca3d"),
    stock: 26,
    featured: true,
  },
  {
    sellerKey: "casa",
    name: "Ash Glaze Mug",
    slug: "ash-glaze-mug",
    description:
      "A straight-sided mug with a pulled handle and a pooled ash glaze. Holds a generous 350ml.",
    price: 28,
    category: "Ceramics",
    image: image("photo-1490312278390-ab64016e0aa9"),
    stock: 33,
    featured: false,
  },
  {
    sellerKey: "atlas",
    name: "Stonewashed Linen Napkins",
    slug: "stonewashed-linen-napkins",
    description:
      "A set of four heavy linen napkins, softened in the wash and finished with a simple hem. They get better with every dinner.",
    price: 42,
    category: "Textiles",
    image: image("photo-1584100936595-c0654b55a2e2"),
    stock: 21,
    featured: true,
  },
  {
    sellerKey: "atlas",
    name: "Block-Printed Table Runner",
    slug: "block-printed-table-runner",
    description:
      "Hand-carved blocks, natural indigo and a long length of cotton. Printed in small runs, so the pattern shifts slightly each time.",
    price: 64,
    category: "Textiles",
    image: image("photo-1528459801416-a9e53bbf4e17"),
    stock: 13,
    featured: false,
  },
  {
    sellerKey: "atlas",
    name: "Wool Cushion Cover",
    slug: "wool-cushion-cover",
    description:
      "A thick, textured cushion cover woven from undyed wool. Hidden zip, generous size, made to soften a plain chair.",
    price: 72,
    category: "Textiles",
    image: image("photo-1584100936595-c0654b55a2e2"),
    stock: 16,
    featured: false,
  },
  {
    sellerKey: "olive",
    name: "Preserved Lemons",
    slug: "preserved-lemons",
    description:
      "Beldi lemons packed with sea salt and bay in a tall glass jar. Six weeks of patience, then a year of tagines and salads.",
    price: 16,
    category: "Pantry",
    image: image("photo-1596040033229-a9821ebd058d"),
    stock: 36,
    featured: false,
  },
  {
    sellerKey: "olive",
    name: "Fig & Walnut Conserve",
    slug: "fig-walnut-conserve",
    description:
      "Slow-cooked figs, toasted walnuts, a little lemon peel. Spoon it over yoghurt, soft cheese or warm bread.",
    price: 14,
    category: "Pantry",
    image: image("photo-1481391319762-47dff72954d9"),
    stock: 44,
    featured: false,
  },
  {
    sellerKey: "lume",
    name: "Pearl Drop Earrings",
    slug: "pearl-drop-earrings",
    description:
      "Freshwater pearls on recycled sterling silver hooks. Light enough to forget you are wearing them.",
    price: 88,
    category: "Jewelry",
    image: image("photo-1535632066927-ab7c9ab60908"),
    stock: 18,
    featured: true,
  },
  {
    sellerKey: "lume",
    name: "Recycled Silver Cuff",
    slug: "recycled-silver-cuff",
    description:
      "A slender, open cuff in recycled silver, hammered to a soft ripple. Adjusts to most wrists.",
    price: 124,
    category: "Jewelry",
    image: image("photo-1617038220319-276d3cfab638"),
    stock: 7,
    featured: false,
  },
  {
    sellerKey: "lume",
    name: "Hand-Blown Water Glass",
    slug: "hand-blown-water-glass",
    description:
      "A generous everyday glass with a faint green tint and a slightly irregular rim. Made one at a time.",
    price: 36,
    category: "Home",
    image: image("photo-1523362628745-0c100150b504"),
    stock: 24,
    featured: true,
  },
  {
    sellerKey: "casa",
    name: "Ceramic Incense Holder",
    slug: "ceramic-incense-holder",
    description:
      "A small, low dish with a single slot for a stick. Glazed in a soft, chalky white that catches the ash.",
    price: 22,
    category: "Home",
    image: image("photo-1586023492125-27b2c045efd7"),
    stock: 29,
    featured: false,
  },
  {
    sellerKey: "atlas",
    name: "Woven Storage Basket",
    slug: "woven-storage-basket",
    description:
      "A sturdy basket woven from palm and wool, with handles long enough to carry a market shop or a pile of blankets.",
    price: 68,
    category: "Home",
    image: image("photo-1524758631624-e2822e304c36"),
    stock: 12,
    featured: false,
  },
  {
    sellerKey: "olive",
    name: "Rose & Clay Face Mask",
    slug: "rose-clay-face-mask",
    description:
      "A dry blend of pink clay, rose petal and oat, mixed with water for a gentle weekly reset. 60g glass jar.",
    price: 19,
    category: "Beauty",
    image: image("photo-1556228578-8c89e6adf883"),
    stock: 31,
    featured: true,
  },
  {
    sellerKey: "olive",
    name: "Cedar Hand Balm",
    slug: "cedar-hand-balm",
    description:
      "A rich balm of olive oil, shea and cedarwood for hands that spend the day making things. Absorbs without grease.",
    price: 16,
    category: "Beauty",
    image: image("photo-1608248543803-ba4f8c70ae0b"),
    stock: 40,
    featured: false,
  },
  {
    sellerKey: "olive",
    name: "Lavender Bath Salt",
    slug: "lavender-bath-salt",
    description:
      "Atlantic sea salt, dried lavender and a little sweet almond oil. A handful turns a plain bath into a small ceremony.",
    price: 13,
    category: "Beauty",
    image: image("photo-1598440947619-2c35fc9aa908"),
    stock: 48,
    featured: false,
  },
  {
    sellerKey: "olive",
    name: "Single-Origin Coffee",
    slug: "single-origin-coffee",
    description:
      "A washed Ethiopian coffee, roasted light for filter. Jasmine, apricot and a clean, tea-like finish. 250g whole bean.",
    price: 21,
    category: "Pantry",
    image: image("photo-1447175008436-054170c2e979"),
    stock: 27,
    featured: true,
  },
  {
    sellerKey: "lume",
    name: "Brass Candlestick",
    slug: "brass-candlestick",
    description:
      "A weighty, hand-turned candlestick in unlacquered brass. Let it patina, or polish it back to a warm shine.",
    price: 82,
    category: "Home",
    image: image("photo-1603006905003-be475563bc59"),
    stock: 8,
    featured: false,
  },
];

async function main() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 12000 });
  console.log("Connected.");

  const users = {};

  for (const account of accounts) {
    const hashed = await bcrypt.hash(account.password, 10);
    const user = await User.findOneAndUpdate(
      { email: account.email },
      {
        $set: {
          name: account.name,
          email: account.email,
          password: hashed,
          role: account.role,
          storeName: account.storeName,
          bio: account.bio,
        },
      },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
    );
    users[account.key] = user;
    console.log(
      `  -> ${account.role.padEnd(6)} ${account.email}${
        account.storeName ? ` (${account.storeName})` : ""
      }`,
    );
  }

  const productDocs = {};

  for (const item of products) {
    const seller = users[item.sellerKey];
    if (!seller) {
      throw new Error(`Missing seller account for key: ${item.sellerKey}`);
    }
    const product = { ...item };
    delete product.sellerKey;
    const doc = await Product.findOneAndUpdate(
      { slug: product.slug },
      {
        $set: {
          ...product,
          sellerId: seller._id,
          sellerName: seller.name,
          storeName: seller.storeName,
        },
      },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
    );
    productDocs[product.slug] = doc;
  }

  const client = users.client;
  const existingClientOrders = client
    ? await Order.countDocuments({ buyerId: client._id })
    : 0;

  if (client && existingClientOrders === 0) {
    const orderSeeds = [
      {
        status: "paid",
        lines: [
          ["ridge-stoneware-dinner-set", 1],
          ["first-harvest-olive-oil", 2],
          ["olive-fig-botanical-soap", 1],
        ],
      },
      {
        status: "shipped",
        lines: [
          ["handwoven-linen-throw", 1],
          ["wild-rosemary-honey", 1],
        ],
      },
      {
        status: "delivered",
        lines: [
          ["hammered-gold-signet", 1],
          ["olive-wood-serving-board", 1],
          ["rose-clay-face-mask", 1],
        ],
      },
    ];

    for (const seed of orderSeeds) {
      const items = seed.lines.map(([slug, qty]) => {
        const product = productDocs[slug];
        if (!product) throw new Error(`Missing product for order: ${slug}`);
        return {
          productId: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          qty,
          sellerId: product.sellerId,
        };
      });
      const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
      await Order.create({
        buyerId: client._id,
        buyerName: client.name,
        buyerEmail: client.email,
        items,
        total,
        status: seed.status,
      });
    }
    console.log(`  -> ${orderSeeds.length} demo orders for ${client.email}`);
  }

  const [productCount, userCount, orderCount] = await Promise.all([
    Product.countDocuments({}),
    User.countDocuments({}),
    Order.countDocuments({}),
  ]);

  console.log(
    `\nSeeded ${products.length} products, ${accounts.length} accounts and ${orderCount} orders.`,
  );
  console.log(
    `Database now holds ${productCount} products, ${userCount} users and ${orderCount} orders.`,
  );

  console.log("\nDemo accounts");
  console.log("  Admin   admin@olea.market   / Admin1234!");
  console.log("  Client  client@olea.market  / Client1234!");
  console.log("  Seller  seller@olea.market  / Seller1234!  (Terra & Loom)");
  console.log("  Seller  mateo@olea.market   / Seller1234!  (Casa do Barro)");
  console.log("  Seller  leila@olea.market   / Seller1234!  (Atlas Loom)");
  console.log("  Seller  noor@olea.market    / Seller1234!  (Olive & Fig)");
  console.log("  Seller  sofia@olea.market   / Seller1234!  (Lume Studio)");
  console.log("\nDone. Start the app with: npm run dev\n");

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error("\nSeed failed:", error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
