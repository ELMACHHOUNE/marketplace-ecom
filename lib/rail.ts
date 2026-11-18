import type { RailGarment } from "@/components/ui/product-rail-gallery";
import type { ProductDTO } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function toRailGarments(products: ProductDTO[]): RailGarment[] {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    image: product.image,
    tag: formatPrice(product.price),
    details: [
      product.category,
      product.storeName ?? product.sellerName,
      product.stock > 0 ? `${product.stock} in stock` : "Sold out",
    ],
    href: `/products/${product.slug}`,
  }));
}
