'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icons';

export default function Modal({
  open,
  onClose,
  title,
  children,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;

    const prevFocus = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => {
      const el = panelRef.current?.querySelector<HTMLElement>(
        '[data-autofocus], button, [href], input, select, textarea',
      );
      el?.focus();
    }, 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((n) => n.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-[3px] animate-[fadeIn_.2s_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={labelledBy ? undefined : title}
        aria-labelledby={labelledBy}
        className="relative z-10 flex max-h-[92dvh] w-full max-w-[720px] flex-col overflow-hidden rounded-t-3xl border border-paper-line bg-white shadow-lift sm:max-h-[88dvh] sm:rounded-3xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-paper-line bg-white/90 px-5 py-4 backdrop-blur sm:px-7">
          <p className="text-[12px] font-semibold tracking-[0.18em] text-ink-mute">{title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-paper-line text-ink transition hover:bg-paper-soft"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
        <div className="no-scrollbar overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
