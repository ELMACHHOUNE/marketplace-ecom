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

const User = mongoose.models.User || mongoose.model("User", userSchema);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

const image = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1100&q=80`;

const accounts = [
  {
    name: "Nadia Benali",
    email: "admin@olea.market",
    password: "Admin1234!",
    role: "admin",
  },
  {
    name: "Amara Diallo",
    email: "seller@olea.market",
    password: "Seller1234!",
    role: "seller",
    storeName: "Terra & Loom",
    bio: "Small-batch ceramics and woven textiles, made in Lisbon.",
  },
  {
    name: "Ines Moreau",
    email: "client@olea.market",
    password: "Client1234!",
    role: "client",
  },
];

const products = [
  {
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
];

async function main() {
  console.log("Connecting to MongoDB Atlas…");
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
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    users[account.role] = user;
    console.log(`  ✓ ${account.role.padEnd(6)} ${account.email}`);
  }

  const seller = users.seller;

  for (const product of products) {
    await Product.findOneAndUpdate(
      { slug: product.slug },
      {
        $set: {
          ...product,
          sellerId: seller._id,
          sellerName: seller.name,
          storeName: seller.storeName,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }

  const productCount = await Product.countDocuments({});
  console.log(`  ✓ ${products.length} products seeded (${productCount} total)`);

  console.log("\nDemo accounts");
  console.log("  Admin   admin@olea.market   / Admin1234!");
  console.log("  Seller  seller@olea.market  / Seller1234!");
  console.log("  Client  client@olea.market  / Client1234!");
  console.log("\nDone. Start the app with: npm run dev\n");

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error("\nSeed failed:", error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
