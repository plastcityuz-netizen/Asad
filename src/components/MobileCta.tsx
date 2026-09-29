'use client';

import { useEffect, useState } from 'react';
import { CONTACT } from '@/lib/data';
import { Icon } from './Icons';
import { useOrder } from './OrderProvider';

export default function MobileCta() {
  const { openOrder } = useOrder();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 620);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[70] border-t border-paper-line bg-white/90 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl transition-transform duration-300 sm:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex gap-2">
        <a className="btn-outline flex-1" href={CONTACT.phoneHref} aria-label="Qo‘ng‘iroq qilish">
          <Icon name="phone" className="h-4 w-4" />
          QO‘NG‘IROQ
        </a>
        <button type="button" className="btn-primary flex-[1.3]" onClick={() => openOrder()}>
          BUYURTMA BERISH
        </button>
      </div>
    </div>
  );
}
