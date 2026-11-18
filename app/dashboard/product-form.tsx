"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { AlertCircle, ImageIcon, Loader2, Save } from "lucide-react";
import type { ProductFormState } from "@/app/actions/products";
import { CATEGORIES } from "@/lib/constants";

export type ProductFormValues = {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  image?: string;
  featured?: boolean;
};

type ProductFormAction = (
  state: ProductFormState,
  formData: FormData,
) => Promise<ProductFormState>;

export function ProductForm({
  action,
  initial,
  submitLabel = "Publish piece",
}: {
  action: ProductFormAction;
  initial?: ProductFormValues;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState<
    ProductFormState,
    FormData
  >(action, undefined);
  const [image, setImage] = useState(initial?.image ?? "");
  const [previewBroken, setPreviewBroken] = useState(false);

  const errors = state?.fieldErrors ?? {};
  const showPreview = image.startsWith("http") && !previewBroken;

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
      <div className="space-y-5">
        {state?.error && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            {state.error}
          </div>
        )}

        <section className="rounded-2xl border border-line bg-paper p-5 sm:p-6">
          <h2 className="font-display text-xl text-ink">The piece</h2>

          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink/70"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                defaultValue={initial?.name}
                placeholder="Ridge Stoneware Dinner Set"
                className="field"
              />
              {errors.name && (
                <p className="mt-1 text-[0.68rem] text-red-700">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink/70"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                defaultValue={initial?.description}
                placeholder="How it is made, what it is made from, and why it belongs in someone's home."
                className="field resize-y"
              />
              {errors.description && (
                <p className="mt-1 text-[0.68rem] text-red-700">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="category"
                  className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink/70"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={initial?.category ?? ""}
                  className="field"
                >
                  <option value="" disabled>
                    Choose a shelf
                  </option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-[0.68rem] text-red-700">
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink/70"
                >
                  Image URL
                </label>
                <input
                  id="image"
                  name="image"
                  required
                  defaultValue={initial?.image}
                  onChange={(event) => {
                    setImage(event.target.value.trim());
                    setPreviewBroken(false);
                  }}
                  placeholder="https://images.unsplash.com/…"
                  className="field"
                />
                {errors.image && (
                  <p className="mt-1 text-[0.68rem] text-red-700">
                    {errors.image}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-paper p-5 sm:p-6">
          <h2 className="font-display text-xl text-ink">Pricing & stock</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="price"
                className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink/70"
              >
                Price (USD)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                defaultValue={initial?.price}
                placeholder="128.00"
                className="field"
              />
              {errors.price && (
                <p className="mt-1 text-[0.68rem] text-red-700">{errors.price}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="stock"
                className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink/70"
              >
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                required
                defaultValue={initial?.stock ?? 1}
                className="field"
              />
              {errors.stock && (
                <p className="mt-1 text-[0.68rem] text-red-700">{errors.stock}</p>
              )}
            </div>
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-cream/50 p-4">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={initial?.featured}
              className="mt-0.5 size-4 accent-[#4F5B2A]"
            />
            <span>
              <span className="block text-sm font-semibold text-ink">
                Feature on the home page
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                Featured pieces appear in the weekly edit. Use it for new or
                signature work.
              </span>
            </span>
          </label>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={pending}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Saving
              </>
            ) : (
              <>
                <Save className="size-4" /> {submitLabel}
              </>
            )}
          </button>
          <Link href="/dashboard/products" className="btn-outline">
            Cancel
          </Link>
        </div>
      </div>

      <aside>
        <div className="sticky top-28 space-y-4">
          <div className="rounded-2xl border border-line bg-paper p-4">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-muted">
              Cover image
            </p>
            <div className="relative mt-3 aspect-[4/5] overflow-hidden rounded-xl bg-sand/40">
              {showPreview ? (
                <Image
                  src={image}
                  alt="Product preview"
                  fill
                  sizes="18rem"
                  className="object-cover"
                  onError={() => setPreviewBroken(true)}
                />
              ) : (
                <div className="grid h-full place-items-center p-6 text-center">
                  <div>
                    <ImageIcon className="mx-auto size-6 text-muted/60" />
                    <p className="mt-2 text-[0.68rem] leading-relaxed text-muted">
                      Paste an image URL to preview the cover.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gold/30 bg-gold/[0.07] p-4">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#6b5217]">
              Listing checklist
            </p>
            <ul className="mt-2.5 space-y-2 text-[0.7rem] leading-relaxed text-[#6b5217]/90">
              <li>· Use natural, daylight photography.</li>
              <li>· Disclose materials and dimensions.</li>
              <li>· Keep stock honest — small batch means small batch.</li>
            </ul>
          </div>
        </div>
      </aside>
    </form>
  );
}
