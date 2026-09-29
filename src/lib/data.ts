export type ProductId = 'oq' | 'qora' | 'maydalangan';

export const DENSITIES = [7, 10, 12, 14, 15, 16, 18, 20] as const;
export const THICKNESSES = [1, 2, 3, 5, 10, 15, 20, 30, 40, 50, 60] as const;

export type Density = (typeof DENSITIES)[number];
export type Thickness = (typeof THICKNESSES)[number];

/** Zichlik bo‘yicha narx (USD, 1 m³ uchun) */
export const PRICE_BY_DENSITY: Record<Density, number> = {
  7: 32,
  10: 40,
  12: 50,
  14: 62,
  15: 67,
  16: 71,
  18: 79,
  20: 87,
};

export const CRUSHED_PRICE_PER_KG = 0.7;

export type Product = {
  id: ProductId;
  name: string;
  short: string;
  description: string;
  image: string;
  hasVariants: boolean;
  defaultDensity?: Density;
  defaultThickness?: Thickness;
  unit: string;
  features: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: 'oq',
    name: 'OQ PENAPLAST',
    short: 'Uy-joy qurilishi, binolar, issiqlik izolyatsiyasi va qadoqlash uchun.',
    description:
      'Oq penaplast (EPS) — uy-joy qurilishi, binolar, issiqlik izolyatsiyasi va qadoqlash uchun mo‘ljallangan yengil, mustahkam va nam o‘tkazmaydigan material. Zichlik 7 dan 20 kg/m³ gacha, qalinlik 1 dan 60 cm gacha buyurtma asosida tayyorlanadi.',
    image: '/images/products/oq.jpg',
    hasVariants: true,
    defaultDensity: 15,
    defaultThickness: 10,
    unit: 'm³',
    features: ['Yengil va mustahkam', 'Nam o‘tkazmaydi', 'Kesish oson', 'Buyurtma o‘lchamda'],
  },
  {
    id: 'qora',
    name: 'QORA PENAPLAST',
    short: 'Devor, tom, pol va issiqlik izolyatsiyasi uchun.',
    description:
      'Qora penaplast — devor, tom va pol izolyatsiyasi uchun ishlatiladigan EPS material. Zichlik 7–20 kg/m³, qalinlik 1–60 cm oralig‘ida tanlanadi.',
    image: '/images/products/qora.jpg',
    hasVariants: true,
    defaultDensity: 15,
    defaultThickness: 10,
    unit: 'm³',
    features: ['Devor va tom uchun', 'Barqaror shakl', 'Issiqlikni saqlaydi', 'Turli qalinlik'],
  },
  {
    id: 'maydalangan',
    name: 'MAYDALANGAN PENAPLAST',
    short: 'Qadoqlash, to‘ldirish va maxsus ishlarda foydalanish uchun maydalangan EPS material.',
    description:
      'Maydalangan penaplast — qadoqlash, to‘ldirish va maxsus ishlarda foydalaniladigan EPS donalari. Zichlik va qalinlik tanlash talab etilmaydi, narx kilogramm hisobida belgilanadi.',
    image: '/images/products/maydalangan.jpg',
    hasVariants: false,
    unit: 'kg',
    features: ['Qadoqlash uchun', 'To‘ldirish materiali', 'Yengil', 'Kilogramm hisobida'],
  },
];

export function getProduct(id: ProductId): Product {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) throw new Error(`Noma'lum mahsulot: ${id}`);
  return p;
}

export function formatPrice(product: Product, density?: Density): string {
  if (!product.hasVariants) return `$${CRUSHED_PRICE_PER_KG.toFixed(2)} / KG`;
  const d = density ?? product.defaultDensity ?? 15;
  return `$${PRICE_BY_DENSITY[d]}`;
}

export const STEPS = [
  {
    n: '01',
    title: 'XOMASHYO',
    text: 'EPS xomashyosi qabul qilinadi va ishlab chiqarishga tayyorlanadi.',
    image: '/images/steps/01.jpg',
  },
  {
    n: '02',
    title: 'KO‘PIRTIRISH',
    text: 'Granulalar bug‘ yordamida ko‘pirtirilib, kerakli zichlikka keltiriladi.',
    image: '/images/steps/02.jpg',
  },
  {
    n: '03',
    title: 'QOLIPLASH',
    text: 'Ko‘pirtirilgan granulalar qolipda birlashtirilib blok hosil qilinadi.',
    image: '/images/steps/03.jpg',
  },
  {
    n: '04',
    title: 'KESISH',
    text: 'Blok kerakli qalinlikdagi plitalarga kesiladi.',
    image: '/images/steps/04.jpg',
  },
  {
    n: '05',
    title: 'SIFAT NAZORATI',
    text: 'Zichlik va o‘lchamlar tekshiriladi.',
    image: '/images/steps/05.jpg',
  },
  {
    n: '06',
    title: 'TAYYOR MAHSULOT',
    text: 'Mahsulot buyurtma bo‘yicha jo‘natishga tayyorlanadi.',
    image: '/images/steps/06.jpg',
  },
] as const;

export const ADVANTAGES = [
  { title: 'SIFATLI MAHSULOT', text: 'Ishlab chiqarishning har bosqichida nazorat.', icon: 'shield' },
  { title: 'ANIQ ZICHLIGI', text: '7–20 kg/m³ oralig‘ida variantlar.', icon: 'gauge' },
  { title: 'TURLI QALINLIK', text: '1–60 cm oralig‘ida tanlash imkoniyati.', icon: 'layers' },
  {
    title: 'ISSIQLIK IZOLYATSIYASI',
    text: 'Binolarda issiqlik yo‘qotilishini kamaytirishga yordam beradi.',
    icon: 'thermo',
  },
  {
    title: 'ZAMONAVIY ISHLAB CHIQARISH',
    text: 'Xomashyodan tayyor mahsulotgacha nazorat qilinadigan jarayon.',
    icon: 'factory',
  },
  {
    title: 'TEZKOR BUYURTMA',
    text: 'Buyurtmani sayt yoki Telegram orqali yuborish imkoniyati.',
    icon: 'bolt',
  },
] as const;

export const USE_CASES = [
  { title: 'UY-JOY QURILISHI', icon: 'home' },
  { title: 'BINOLAR', icon: 'building' },
  { title: 'DEVOR IZOLYATSIYASI', icon: 'wall' },
  { title: 'TOM IZOLYATSIYASI', icon: 'roof' },
  { title: 'POL IZOLYATSIYASI', icon: 'floor' },
  { title: 'SOVUTISH TIZIMLARI', icon: 'snow' },
  { title: 'QADOQLASH', icon: 'box' },
] as const;

export const CONTACT = {
  phone: '+998 99 513 22 22',
  phoneHref: 'tel:+998995132222',
  telegram: '@penaplast_uz',
  telegramHref: 'https://t.me/penaplast_uz',
};

export const NAV_LINKS = [
  { href: '#mahsulotlar', label: 'Mahsulotlar' },
  { href: '#ishlab-chiqarish', label: 'Ishlab chiqarish' },
  { href: '#nega-penaplast', label: 'Nega Penaplast' },
  { href: '#qayerda', label: 'Qayerda ishlatiladi' },
  { href: '#biz-haqimizda', label: 'Biz haqimizda' },
  { href: '#aloqa', label: 'Aloqa' },
];
