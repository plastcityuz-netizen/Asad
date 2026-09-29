'use client';

import { useOrder } from './OrderProvider';
import type { ProductId } from '@/lib/data';

export default function OrderButton({
  children,
  className = 'btn-primary',
  productId,
}: {
  children: React.ReactNode;
  className?: string;
  productId?: ProductId;
}) {
  const { openOrder } = useOrder();
  return (
    <button
      type="button"
      className={className}
      onClick={() => openOrder(productId ? { productId } : undefined)}
    >
      {children}
    </button>
  );
}
