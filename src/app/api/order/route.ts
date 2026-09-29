import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Buyurtmani Telegramga yuboradi.
 * Token va chat id faqat server tomonda (environment variables) saqlanadi.
 * Agar sozlanmagan bo‘lsa — frontend t.me/penaplast_uz deep-link fallback ishlatadi.
 */
export async function POST(req: Request) {
  let message = '';
  try {
    const body = (await req.json()) as { message?: unknown };
    message = typeof body.message === 'string' ? body.message.trim() : '';
  } catch {
    return NextResponse.json({ ok: false, reason: 'bad_request' }, { status: 400 });
  }

  if (!message || message.length > 4000) {
    return NextResponse.json({ ok: false, reason: 'invalid_message' }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ ok: true, delivered: false, fallback: 'https://t.me/penaplast_uz' });
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, disable_web_page_preview: true }),
      cache: 'no-store',
    });
    return NextResponse.json({ ok: true, delivered: res.ok });
  } catch {
    return NextResponse.json({ ok: true, delivered: false, fallback: 'https://t.me/penaplast_uz' });
  }
}
