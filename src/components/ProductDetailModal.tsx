'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import { Icon } from './Icons';
import { DensityPicker, ThicknessPicker } from './VariantPicker';
import {
  CRUSHED_PRICE_PER_KG,
  PRICE_BY_DENSITY,
  getProduct,
  type Density,
  type ProductId,
  type Thickness,
} from '@/lib/data';

type Selection = { productId: ProductId; density?: Density; thickness?: Thickness };

export default function ProductDetailModal({
  selection,
  onClose,
  onOrder,
}: {
  selection: Selection | null;
  onClose: () => void;
  onOrder: (sel: Selection) => void;
}) {
  const [density, setDensity] = useState<Density>(15);
  const [thickness, setThickness] = useState<Thickness>(10);

  useEffect(() => {
    if (!selection) return;
    setDensity(selection.density ?? 15);
    setThickness(selection.thickness ?? 10);
  }, [selection]);

  if (!selection) return <Modal open={false} onClose={onClose} title="MAHSULOT">{null}</Modal>;

  const product = getProduct(selection.productId);
  const price = product.hasVariants
    ? `$${PRICE_BY_DENSITY[density]}`
    : `$${CRUSHED_PRICE_PER_KG.toFixed(2)} / KG`;

  return (
    <Modal open onClose={onClose} title="MAHSULOT HAQIDA">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-paper-soft">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 92vw, 680px"
          className="object-cover"
        />
      </div>
      <h3 className="mt-5 text-[24px] font-semibold tracking-[-0.01em]">{product.name}</h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-mute">{product.description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {product.features.map((f) => (
          <li
            key={f}
            className="inline-flex items-center gap-1.5 rounded-full border border-paper-line bg-paper-soft px-3 py-1.5 text-[12px] font-medium text-ink-mute"
          >
            <Icon name="check" className="h-3.5 w-3.5" />
            {f}
          </li>
        ))}
      </ul>

      {product.hasVariants && (
        <div className="mt-6 space-y-5">
          <DensityPicker value={density} onChange={setDensity} name="detail" />
          <ThicknessPicker value={thickness} onChange={setThickness} name="detail" />
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-paper-line bg-paper-soft px-4 py-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-ink-mute">JORIY NARX</p>
          <p className="mt-1 text-[28px] font-semibold leading-none">{price}</p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() =>
            onOrder({
              productId: product.id,
              density: product.hasVariants ? density : undefined,
              thickness: product.hasVariants ? thickness : undefined,
            })
          }
        >
          BUYURTMA BERISH
          <Icon name="arrow" className="h-4 w-4" />
        </button>
      </div>
    </Modal>
  );
}
