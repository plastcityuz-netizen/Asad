import type { Metadata, Viewport } from 'next';
import './globals.css';
import { OrderProvider } from '@/components/OrderProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileCta from '@/components/MobileCta';

const title = 'PENAPLAST ZAVODI | Sifatli EPS Penaplast';
const description =
  'PENAPLAST ZAVODI — sifatli oq, qora va maydalangan penaplast. 7–20 kg/m³ zichlik va 1–60 cm qalinlik variantlari. Buyurtma berish uchun Telegram yoki telefon orqali bog‘laning.';

export const metadata: Metadata = {
  metadataBase: new URL('https://penaplast.uz'),
  title,
  description,
  keywords: [
    'penaplast',
    'penaplast zavodi',
    'EPS',
    'pinaplast',
    'issiqlik izolyatsiyasi',
    'oq penaplast',
    'qora penaplast',
    'maydalangan penaplast',
    'penoplast narxi',
  ],
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: '/',
    siteName: 'PENAPLAST ZAVODI',
    title,
    description,
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630, alt: 'PENAPLAST ZAVODI' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/hero.jpg'] },
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>
        <a
          href="#mahsulotlar"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Asosiy kontentga o‘tish
        </a>
        <OrderProvider>
          <Navbar />
          <main id="top">{children}</main>
          <Footer />
          <MobileCta />
        </OrderProvider>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Manufacturer',
              name: 'PENAPLAST ZAVODI',
              description,
              telephone: '+998995132222',
              url: 'https://penaplast.uz',
              sameAs: ['https://t.me/penaplast_uz'],
              address: { '@type': 'PostalAddress', addressCountry: 'UZ' },
            }),
          }}
        />
      </body>
    </html>
  );
}
