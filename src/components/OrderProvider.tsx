'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Density, ProductId, Thickness } from '@/lib/data';
import OrderModal from './OrderModal';
import ProductDetailModal from './ProductDetailModal';

type Selection = { productId: ProductId; density?: Density; thickness?: Thickness };

type Ctx = {
  openOrder: (sel?: Selection) => void;
  openDetail: (sel: Selection) => void;
};

const OrderCtx = createContext<Ctx | null>(null);

export function useOrder() {
  const ctx = useContext(OrderCtx);
  if (!ctx) throw new Error('useOrder must be used inside <OrderProvider>');
  return ctx;
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orderSel, setOrderSel] = useState<Selection | null>(null);
  const [detailSel, setDetailSel] = useState<Selection | null>(null);

  const openOrder = useCallback((sel?: Selection) => {
    setDetailSel(null);
    setOrderSel(sel ?? { productId: 'oq' });
  }, []);
  const openDetail = useCallback((sel: Selection) => setDetailSel(sel), []);

  const value = useMemo(() => ({ openOrder, openDetail }), [openOrder, openDetail]);

  return (
    <OrderCtx.Provider value={value}>
      {children}
      <ProductDetailModal
        selection={detailSel}
        onClose={() => setDetailSel(null)}
        onOrder={openOrder}
      />
      <OrderModal selection={orderSel} onClose={() => setOrderSel(null)} />
    </OrderCtx.Provider>
  );
}
