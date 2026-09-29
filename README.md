# PENAPLAST ZAVODI — rasmiy sayt

Next.js 15 (App Router) + TypeScript + Tailwind CSS asosida qurilgan production-ready landing.

## Ishga tushirish

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Telegram buyurtma

Buyurtma `POST /api/order` orqali serverga yuboriladi. Token **hech qachon** frontendda saqlanmaydi:

```
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

Bu o‘zgaruvchilar bo‘lmasa, sayt avtomatik ravishda `https://t.me/penaplast_uz` deep-link fallback
ishlatadi va buyurtma matni foydalanuvchi uchun ko‘rinib turadi hamda clipboardga nusxalanadi —
ma’lumot yo‘qolmaydi.

## Narxlar

Zichlik bo‘yicha (1 m³): 7→$32, 10→$40, 12→$50, 14→$62, 15→$67, 16→$71, 18→$79, 20→$87.
Maydalangan penaplast: $0.70/kg. Manba: `src/lib/data.ts`.
