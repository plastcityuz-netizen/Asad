'use client';

import Image from 'next/image';
import { useState } from 'react';
import Reveal from './Reveal';
import { Icon } from './Icons';
import { DensityPicker, ThicknessPicker } from './VariantPicker';
import { useOrder } from './OrderProvider';
import {
  CRUSHED_PRICE_PER_KG,
  PRICE_BY_DENSITY,
  PRODUCTS,
  type Density,
  type Product,
  type Thickness,
} from '@/lib/data';

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { openOrder, openDetail } = useOrder();
  const [density, setDensity] = useState<Density>(product.defaultDensity ?? 15);
  const [thickness, setThickness] = useState<Thickness>(product.defaultThickness ?? 10);

  const price = product.hasVariants
    ? `$${PRICE_BY_DENSITY[density]}`
    : `$${CRUSHED_PRICE_PER_KG.toFixed(2)}`;
  const priceSuffix = product.hasVariants ? '/ m³' : '/ KG';

  const selection = {
    productId: product.id,
    density: product.hasVariants ? density : undefined,
    thickness: product.hasVariants ? thickness : undefined,
  };

  return (
    <Reveal as="article" delay={index * 90} className="h-full">
      <div className="card group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lift">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-soft">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 400px"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            priority={index === 0}
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10.5px] font-semibold tracking-[0.18em] text-ink backdrop-blur">
            EPS
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-[19px] font-semibold tracking-[-0.01em]">{product.name}</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-mute">{product.short}</p>

          <div className="mt-5 space-y-4">
            {product.hasVariants ? (
              <>
                <DensityPicker value={density} onChange={setDensity} name={product.id} />
                <ThicknessPicker value={thickness} onChange={setThickness} name={product.id} />
              </>
            ) : (
              <div>
                <p className="label">VARIANTLAR</p>
                <p className="rounded-xl border border-paper-line bg-paper-soft px-4 py-3 text-[13px] text-ink-mute">
                  Zichlik va qalinlik tanlash talab etilmaydi — kerakli miqdorni kiritish kifoya.
                </p>
              </div>
            )}
          </div>

          <div className="mt-auto pt-6">
            <div className="flex items-end justify-between gap-3 border-t border-paper-line pt-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.16em] text-ink-mute">NARX</p>
                <p className="mt-1 text-[30px] font-semibold leading-none tracking-[-0.02em]">
                  {price}
                  <span className="ml-1.5 text-[12px] font-medium text-ink-mute">{priceSuffix}</span>
                </p>
              </div>
              {product.hasVariants && (
                <p className="text-right text-[12px] leading-tight text-ink-mute">
                  {density} kg/m³
                  <br />
                  {thickness} cm
                </p>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className="btn-outline flex-1"
                onClick={() => openDetail(selection)}
              >
                BATAFSIL
              </button>
              <button
                type="button"
                className="btn-primary flex-1"
                onClick={() => openOrder(selection)}
              >
                BUYURTMA
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Products() {
  return (
    <section id="mahsulotlar" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="shell">
        <Reveal className="max-w-[640px]">
          <span className="eyebrow">MAHSULOTLAR</span>
          <h2 className="h-section mt-4">MAHSULOTLAR</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-mute sm:text-[16px]">
            Oq, qora va maydalangan penaplast. Zichlik va qalinlikni bir bosishda tanlang — narx
            darhol yangilanadi.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 xl:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="card flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <p className="text-[14px] leading-relaxed text-ink-mute">
              Narxlar zichlikka qarab belgilanadi: 7 kg/m³ — $32, 10 — $40, 12 — $50, 14 — $62, 15 —
              $67, 16 — $71, 18 — $79, 20 kg/m³ — $87. Maydalangan penaplast — $0.70 / kg.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
