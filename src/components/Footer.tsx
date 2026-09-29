import { CONTACT, NAV_LINKS } from '@/lib/data';
import { Icon, Logo } from './Icons';

export default function Footer() {
  return (
    <footer className="border-t border-paper-line bg-paper-soft pb-24 pt-14 sm:pb-14">
      <div className="shell grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-[360px] text-[13.5px] leading-relaxed text-ink-mute">
            PENAPLAST ZAVODI — qurilish, issiqlik izolyatsiyasi va sanoat uchun sifatli EPS
            penaplast mahsulotlari.
          </p>
        </div>

        <nav aria-label="Footer navigatsiya">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-ink-mute">SAHIFALAR</p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[14px] text-ink-mute transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-ink-mute">ALOQA</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 text-[14px] text-ink-mute transition-colors hover:text-ink"
              >
                <Icon name="phone" className="h-4 w-4" />
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[14px] text-ink-mute transition-colors hover:text-ink"
              >
                <Icon name="telegram" className="h-4 w-4" />
                {CONTACT.telegram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell mt-12 flex flex-col items-start justify-between gap-3 border-t border-paper-line pt-6 sm:flex-row sm:items-center">
        <p className="text-[12.5px] text-ink-mute">© 2026 PENAPLAST ZAVODI</p>
        <a href="#top" className="text-[12.5px] text-ink-mute transition-colors hover:text-ink">
          Yuqoriga ↑
        </a>
      </div>
    </footer>
  );
}
