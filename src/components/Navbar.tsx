'use client';

import { useEffect, useState } from 'react';
import { Icon, Logo } from './Icons';
import { NAV_LINKS } from '@/lib/data';
import { useOrder } from './OrderProvider';

export default function Navbar() {
  const { openOrder } = useOrder();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-paper-line bg-white/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="shell flex h-[68px] items-center justify-between gap-4" aria-label="Asosiy">
        <a href="#top" className="shrink-0" aria-label="PENAPLAST ZAVODI — bosh sahifa">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                  active === l.href ? 'bg-paper-soft text-ink' : 'text-ink-mute hover:text-ink'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button type="button" className="btn-primary hidden sm:inline-flex" onClick={() => openOrder()}>
            BUYURTMA
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-paper-line bg-white text-ink lg:hidden"
            aria-label={open ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-paper-line bg-white lg:hidden"
      >
        <ul className="shell flex flex-col gap-1 py-4">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium text-ink transition hover:bg-paper-soft"
              >
                {l.label}
                <Icon name="arrow" className="h-4 w-4 text-ink-mute" />
              </a>
            </li>
          ))}
          <li className="mt-2">
            <button
              type="button"
              className="btn-primary w-full py-4"
              onClick={() => {
                setOpen(false);
                openOrder();
              }}
            >
              BUYURTMA BERISH
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
