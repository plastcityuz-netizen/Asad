import Image from 'next/image';
import Reveal from './Reveal';
import { Icon } from './Icons';
import OrderButton from './OrderButton';
import { ADVANTAGES, CONTACT, STEPS, USE_CASES } from '@/lib/data';

function Head({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? 'mx-auto max-w-[680px] text-center' : 'max-w-[680px]'}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h-section mt-4">{title}</h2>
      {text && <p className="mt-4 text-[15px] leading-relaxed text-ink-mute sm:text-[16px]">{text}</p>}
    </Reveal>
  );
}

export function Production() {
  return (
    <section id="ishlab-chiqarish" className="scroll-mt-24 bg-paper-soft py-20 sm:py-28">
      <div className="shell">
        <Head
          eyebrow="JARAYON"
          title="ISHLAB CHIQARISH"
          text="Xomashyodan tayyor mahsulotgacha — zamonaviy ishlab chiqarish jarayoni."
        />
        <ol className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 xl:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={(i % 3) * 80}>
              <article className="card group h-full overflow-hidden transition-shadow duration-300 hover:shadow-lift">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                  <Image
                    src={s.image}
                    alt={`${s.n} — ${s.title}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 92vw, (max-width: 1280px) 45vw, 400px"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-white">
                    {s.n}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-[16px] font-semibold tracking-[0.02em]">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-mute">{s.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Advantages() {
  return (
    <section id="nega-penaplast" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="shell">
        <Head
          eyebrow="AFZALLIKLAR"
          title="NEGA PENAPLAST?"
          text="Penaplast — qurilish va izolyatsiyada ishonchli, tejamkor va uzoq muddatli yechim."
        />
        <ul className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 xl:grid-cols-3">
          {ADVANTAGES.map((a, i) => (
            <Reveal as="li" key={a.title} delay={(i % 3) * 80}>
              <div className="card h-full p-6 transition-shadow duration-300 hover:shadow-lift">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-white">
                  <Icon name={a.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[15.5px] font-semibold tracking-[0.02em]">{a.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-mute">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function UseCases() {
  return (
    <section id="qayerda" className="scroll-mt-24 bg-ink py-20 text-white sm:py-28">
      <div className="shell">
        <Reveal className="max-w-[680px]">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-white/70">
            QO‘LLANILISHI
          </span>
          <h2 className="h-section mt-4">QAYERDA ISHLATILADI?</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/60 sm:text-[16px]">
            Penaplast qurilish, izolyatsiya, sovutish va qadoqlash sohalarida keng qo‘llaniladi.
          </p>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {USE_CASES.map((u, i) => (
            <Reveal as="li" key={u.title} delay={(i % 4) * 70}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08] sm:p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-ink">
                  <Icon name={u.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[13.5px] font-semibold leading-snug tracking-[0.04em] sm:text-[14.5px]">
                  {u.title}
                </h3>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" delay={210}>
            <div className="flex h-full flex-col justify-between rounded-3xl bg-white p-5 text-ink sm:p-6">
              <p className="text-[13.5px] font-semibold leading-snug tracking-[0.04em]">
                O‘Z LOYIHANGIZ UCHUN O‘LCHAM KERAKMI?
              </p>
              <OrderButton className="btn-primary mt-5 w-full">BUYURTMA BERISH</OrderButton>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="biz-haqimizda" className="scroll-mt-24 bg-paper-soft py-20 sm:py-28">
      <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-paper-line bg-white shadow-card">
            <Image
              src="/images/about.jpg"
              alt="PENAPLAST ZAVODI ishlab chiqarish korxonasi"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 92vw, 560px"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div>
          <Head eyebrow="KOMPANIYA" title="PENAPLAST ZAVODI" />
          <Reveal delay={90}>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-mute sm:text-[16px]">
              PENAPLAST ZAVODI — qurilish, issiqlik izolyatsiyasi va sanoat uchun penaplast (EPS)
              mahsulotlari ishlab chiqaruvchi zamonaviy ishlab chiqarish korxonasi.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-mute sm:text-[16px]">
              Zavodda oq penaplast, qora penaplast va maydalangan penaplast ishlab chiqariladi.
              Zichlik 7–20 kg/m³, qalinlik esa 1–60 cm oralig‘ida buyurtma asosida tayyorlanadi.
              Har bir partiya zichlik va o‘lcham bo‘yicha tekshiriladi.
            </p>
            <ul className="mt-7 grid grid-cols-3 gap-3">
              {[
                { v: '3', l: 'MAHSULOT' },
                { v: '7–20', l: 'kg/m³' },
                { v: '1–60', l: 'cm' },
              ].map((s) => (
                <li key={s.l} className="card px-4 py-4">
                  <p className="text-[22px] font-semibold leading-none tracking-[-0.02em]">{s.v}</p>
                  <p className="mt-2 text-[10.5px] font-semibold tracking-[0.16em] text-ink-mute">
                    {s.l}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="aloqa" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="shell">
        <Head
          eyebrow="BOG‘LANISH"
          title="ALOQA"
          text="Buyurtma va savollar bo‘yicha biz bilan bog‘laning — menejer tez orada javob beradi."
          center
        />
        <div className="mx-auto mt-10 grid max-w-[900px] gap-4 sm:mt-14 sm:grid-cols-2">
          <Reveal>
            <a
              href={CONTACT.phoneHref}
              className="card group flex h-full items-center gap-4 p-6 transition-shadow duration-300 hover:shadow-lift"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-white">
                <Icon name="phone" className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold tracking-[0.16em] text-ink-mute">
                  TELEFON
                </span>
                <span className="mt-1 block truncate text-[18px] font-semibold">
                  {CONTACT.phone}
                </span>
                <span className="mt-1 block text-[12px] text-ink-mute">
                  Qo‘ng‘iroq qilish uchun bosing
                </span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={90}>
            <a
              href={CONTACT.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex h-full items-center gap-4 p-6 transition-shadow duration-300 hover:shadow-lift"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-white">
                <Icon name="telegram" className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold tracking-[0.16em] text-ink-mute">
                  TELEGRAM
                </span>
                <span className="mt-1 block truncate text-[18px] font-semibold">
                  {CONTACT.telegram}
                </span>
                <span className="mt-1 block text-[12px] text-ink-mute">Yangi oynada ochiladi</span>
              </span>
            </a>
          </Reveal>
        </div>
        <Reveal delay={140} className="mx-auto mt-4 max-w-[900px]">
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-ink px-6 py-10 text-center text-white sm:py-12">
            <h3 className="text-[clamp(1.25rem,3.4vw,1.9rem)] font-semibold tracking-[-0.01em]">
              Buyurtmani hoziroq rasmiylashtiring
            </h3>
            <p className="max-w-[460px] text-[14px] leading-relaxed text-white/60">
              Mahsulot, zichlik, qalinlik va miqdorni tanlang — buyurtma Telegram orqali menejerga
              yuboriladi.
            </p>
            <OrderButton className="btn mt-2 bg-white px-7 py-4 text-ink hover:bg-paper-soft">
              BUYURTMA BERISH
            </OrderButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
