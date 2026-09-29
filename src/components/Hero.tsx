import Image from 'next/image';
import OrderButton from './OrderButton';
import Reveal from './Reveal';
import { Icon } from './Icons';

const STATS = [
  { value: '3', label: 'MAHSULOT' },
  { value: '7–20', label: 'kg/m³ ZICHLIGI' },
  { value: '1–60', label: 'cm QALINLIK' },
  { value: 'EPS', label: 'MATERIAL' },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-[68px]">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero.jpg"
          alt="PENAPLAST zavodi ishlab chiqarish sexi"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/80 to-white" />
        <div className="grain absolute inset-0 opacity-60" />
      </div>

      <div className="shell grid gap-12 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pb-24 lg:pt-24">
        <div>
          <Reveal>
            <span className="eyebrow">PENAPLAST ZAVODI</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-[clamp(2.1rem,7.4vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              SIFATLI PENAPLAST.
              <br />
              <span className="text-ink-mute">ISHONCHLI QURILISH.</span>
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-5 max-w-[540px] text-[15.5px] leading-relaxed text-ink-mute sm:text-[17px]">
              Qurilish, issiqlik izolyatsiyasi va sanoat uchun sifatli EPS penaplast mahsulotlari.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <a href="#mahsulotlar" className="btn-outline px-6 py-4 sm:py-3.5">
                MAHSULOTLARNI KO‘RISH
              </a>
              <OrderButton className="btn-primary px-6 py-4 sm:py-3.5">
                BUYURTMA BERISH
                <Icon name="arrow" className="h-4 w-4" />
              </OrderButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-paper-line bg-paper-soft shadow-lift">
              <Image
                src="/images/products/oq.jpg"
                alt="Oq EPS penaplast plitalari"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 560px"
                className="object-cover"
              />
            </div>
            <div className="card absolute -bottom-5 left-4 right-4 flex items-center justify-between gap-3 px-4 py-3 backdrop-blur sm:left-8 sm:right-8">
              <span className="text-[11px] font-semibold tracking-[0.16em] text-ink-mute">
                7 kg/m³ dan
              </span>
              <span className="text-[20px] font-semibold leading-none">$32</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="shell pb-16 sm:pb-20">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 70}>
              <div className="card h-full px-5 py-5 transition-shadow duration-300 hover:shadow-lift">
                <p className="text-[28px] font-semibold leading-none tracking-[-0.02em] sm:text-[34px]">
                  {s.value}
                </p>
                <p className="mt-2 text-[11px] font-semibold tracking-[0.16em] text-ink-mute">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
