'use client';

import { useEffect, useMemo, useState } from 'react';
import Modal from './Modal';
import { DensityPicker, ThicknessPicker } from './VariantPicker';
import { Icon } from './Icons';
import {
  CONTACT,
  CRUSHED_PRICE_PER_KG,
  PRICE_BY_DENSITY,
  PRODUCTS,
  getProduct,
  type Density,
  type ProductId,
  type Thickness,
} from '@/lib/data';

type Selection = { productId: ProductId; density?: Density; thickness?: Thickness };

type Errors = Partial<Record<'quantity' | 'name' | 'phone', string>>;

const REQUIRED = 'Bu maydonni to‘ldiring.';

function normalizePhone(v: string) {
  return v.replace(/[^\d+]/g, '');
}

function isValidPhone(v: string) {
  const digits = v.replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 15;
}

function buildMessage(d: {
  product: string;
  density: string;
  thickness: string;
  quantity: string;
  unit: string;
  price: string;
  name: string;
  phone: string;
  note: string;
}) {
  return [
    '🧱 Yangi buyurtma',
    '',
    `Mahsulot: ${d.product}`,
    `Zichlik: ${d.density}`,
    `Qalinlik: ${d.thickness}`,
    `Miqdor: ${d.quantity} ${d.unit}`,
    `Narx: ${d.price}`,
    `Ism: ${d.name}`,
    `Telefon: ${d.phone}`,
    `Izoh: ${d.note || '—'}`,
    '',
    'Manba: penaplast.uz',
  ].join('\n');
}

export default function OrderModal({
  selection,
  onClose,
}: {
  selection: Selection | null;
  onClose: () => void;
}) {
  const open = selection !== null;
  const [productId, setProductId] = useState<ProductId>('oq');
  const [density, setDensity] = useState<Density>(15);
  const [thickness, setThickness] = useState<Thickness>(10);
  const [quantity, setQuantity] = useState('1');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [sentText, setSentText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!selection) return;
    setProductId(selection.productId);
    setDensity(selection.density ?? 15);
    setThickness(selection.thickness ?? 10);
    setQuantity('1');
    setErrors({});
    setStatus('idle');
    setCopied(false);
  }, [selection]);

  const product = getProduct(productId);
  const unit = product.unit;
  const qtyNum = Number(quantity.replace(',', '.'));
  const unitPrice = product.hasVariants ? PRICE_BY_DENSITY[density] : CRUSHED_PRICE_PER_KG;
  const priceLabel = product.hasVariants
    ? `$${unitPrice} / m³`
    : `$${CRUSHED_PRICE_PER_KG.toFixed(2)} / kg`;
  const total = useMemo(
    () => (Number.isFinite(qtyNum) && qtyNum > 0 ? unitPrice * qtyNum : 0),
    [qtyNum, unitPrice],
  );

  function validate(): boolean {
    const e: Errors = {};
    if (!quantity.trim()) e.quantity = REQUIRED;
    else if (!Number.isFinite(qtyNum) || qtyNum <= 0)
      e.quantity = 'Miqdor 0 dan katta bo‘lishi kerak.';
    if (!name.trim()) e.name = REQUIRED;
    else if (name.trim().length < 2) e.name = 'Ismingizni to‘liq kiriting.';
    const p = phone.trim();
    if (!p || p === '+998') e.phone = REQUIRED;
    else if (!isValidPhone(p)) e.phone = 'Telefon raqamingizni to‘g‘ri kiriting.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (status === 'sending') return;
    if (!validate()) {
      const first = document.querySelector<HTMLElement>('[data-invalid="true"]');
      first?.focus();
      return;
    }
    const message = buildMessage({
      product: product.name,
      density: product.hasVariants ? `${density} kg/m³` : '—',
      thickness: product.hasVariants ? `${thickness} cm` : '—',
      quantity: String(qtyNum),
      unit,
      price: `${priceLabel} • Jami ≈ $${total.toFixed(2)}`,
      name: name.trim(),
      phone: phone.trim(),
      note: note.trim(),
    });
    setSentText(message);
    setStatus('sending');
    try {
      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
    } catch {
      /* fallback: Telegram deep-link + nusxalash */
    }
    try {
      await navigator.clipboard?.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    setStatus('done');
  }

  return (
    <Modal open={open} onClose={onClose} title="BUYURTMA BERISH">
      {status === 'done' ? (
        <div className="animate-[popIn_.35s_ease-out]">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ink text-white">
            <Icon name="check" className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-center text-[22px] font-semibold tracking-[-0.01em]">
            Buyurtmangiz qabul qilindi.
          </h3>
          <p className="mx-auto mt-2 max-w-[440px] text-center text-[14px] leading-relaxed text-ink-mute">
            Menejerimiz tez orada siz bilan bog‘lanadi. Tasdiqlashni tezlashtirish uchun buyurtmani
            Telegram orqali ham yuborishingiz mumkin
            {copied ? ' — matn nusxalab olindi.' : '.'}
          </p>
          <pre className="mt-5 max-h-52 overflow-auto whitespace-pre-wrap rounded-2xl border border-paper-line bg-paper-soft p-4 text-[13px] leading-relaxed text-ink">
            {sentText}
          </pre>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <a
              className="btn-primary flex-1"
              href={CONTACT.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="telegram" className="h-4 w-4" />
              TELEGRAMDA YUBORISH
            </a>
            <a className="btn-outline flex-1" href={CONTACT.phoneHref}>
              <Icon name="phone" className="h-4 w-4" />
              {CONTACT.phone}
            </a>
          </div>
          <button type="button" className="btn-ghost mt-2 w-full" onClick={onClose}>
            YOPISH
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-6">
          <fieldset>
            <legend className="label">MAHSULOT</legend>
            <div className="grid gap-1.5 sm:grid-cols-3" role="radiogroup" aria-label="Mahsulot">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={productId === p.id}
                  onClick={() => setProductId(p.id)}
                  className={`chip min-h-[46px] ${productId === p.id ? 'chip-active' : ''}`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </fieldset>

          {product.hasVariants ? (
            <>
              <DensityPicker value={density} onChange={setDensity} name="order" />
              <ThicknessPicker value={thickness} onChange={setThickness} name="order" />
            </>
          ) : (
            <p className="rounded-2xl border border-paper-line bg-paper-soft px-4 py-3 text-[13px] text-ink-mute">
              Maydalangan penaplast uchun zichlik va qalinlik tanlash talab etilmaydi. Narx:{' '}
              <strong className="text-ink">${CRUSHED_PRICE_PER_KG.toFixed(2)} / KG</strong>
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-paper-line bg-paper-soft px-4 py-3">
            <span className="text-[11px] font-semibold tracking-[0.16em] text-ink-mute">NARX</span>
            <span className="text-right">
              <span className="block text-[20px] font-semibold leading-none">{priceLabel}</span>
              {total > 0 && (
                <span className="mt-1 block text-[12px] text-ink-mute">
                  Jami ≈ ${total.toFixed(2)}
                </span>
              )}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="qty">
                MIQDOR ({unit})
              </label>
              <input
                id="qty"
                className="field"
                inputMode="decimal"
                type="number"
                min="0.1"
                step="0.1"
                value={quantity}
                data-invalid={errors.quantity ? 'true' : 'false'}
                aria-invalid={!!errors.quantity}
                aria-describedby={errors.quantity ? 'qty-err' : undefined}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {errors.quantity && (
                <p id="qty-err" className="mt-1.5 text-[12px] font-medium text-red-600">
                  {errors.quantity}
                </p>
              )}
            </div>
            <div>
              <label className="label" htmlFor="name">
                ISM
              </label>
              <input
                id="name"
                className="field"
                autoComplete="name"
                value={name}
                data-invalid={errors.name ? 'true' : 'false'}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-err' : undefined}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingiz"
              />
              {errors.name && (
                <p id="name-err" className="mt-1.5 text-[12px] font-medium text-red-600">
                  {errors.name}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="label" htmlFor="phone">
              TELEFON
            </label>
            <input
              id="phone"
              className="field"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              data-invalid={errors.phone ? 'true' : 'false'}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-err' : undefined}
              onChange={(e) => setPhone(normalizePhone(e.target.value))}
              placeholder="+998 90 123 45 67"
            />
            {errors.phone && (
              <p id="phone-err" className="mt-1.5 text-[12px] font-medium text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="label" htmlFor="note">
              QO‘SHIMCHA IZOH
            </label>
            <textarea
              id="note"
              className="field min-h-[96px] resize-y"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Yetkazib berish manzili, o‘lchamlar va boshqa talablar"
            />
          </div>

          <button type="submit" className="btn-primary w-full" disabled={status === 'sending'}>
            <Icon name="telegram" className="h-4 w-4" />
            {status === 'sending' ? 'YUBORILMOQDA…' : 'TELEGRAM ORQALI BUYURTMA BERISH'}
          </button>
          <p className="text-center text-[12px] text-ink-mute">
            Yoki to‘g‘ridan-to‘g‘ri qo‘ng‘iroq qiling:{' '}
            <a className="font-semibold text-ink underline" href={CONTACT.phoneHref}>
              {CONTACT.phone}
            </a>
          </p>
        </form>
      )}
    </Modal>
  );
}
