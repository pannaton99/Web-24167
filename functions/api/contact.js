// Cloudflare Pages Function: รับข้อความจากฟอร์มติดต่อ แล้วบันทึกลง D1 (binding ชื่อ DB)
export async function onRequestPost({ request, env }) {
  const json = (obj, status = 200) =>
    new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
  try {
    const d = await request.json();
    const name = String(d.name || '').trim().slice(0, 100);
    const subject = String(d.subject || '').trim().slice(0, 150);
    const message = String(d.message || '').trim().slice(0, 2000);
    if (!name || !message) return json({ ok: false, error: 'กรอกชื่อและข้อความ' }, 400);
    await env.DB.prepare('INSERT INTO messages (name, subject, message) VALUES (?, ?, ?)')
      .bind(name, subject, message).run();
    return json({ ok: true });
  } catch (e) {
    return json({ ok: false }, 500);
  }
}
