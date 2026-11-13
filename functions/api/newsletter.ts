// Inscription à la newsletter (avec consentement explicite).
import { type Ctx, json, clean, isEmail } from '../../server/lib';

export const onRequestPost = async ({ request, env }: Ctx) => {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'invalid' }, 400);
  }
  if (clean(body.website, 100)) return json({ ok: true }); // piège à robots
  const email = clean(body.email, 200).toLowerCase();
  if (!isEmail(email)) return json({ error: 'email' }, 400);
  if (body.consent !== true) return json({ error: 'consent' }, 400);
  const lang = body.lang === 'en' ? 'en' : 'fr';
  const source = clean(body.source, 40) || 'site';

  const key = `newsletter:${email}`;
  if (!(await env.MAKDA_KV.get(key))) {
    await env.MAKDA_KV.put(key, JSON.stringify({ email, lang, source, createdAt: new Date().toISOString() }));
  }

  if (env.BREVO_API_KEY && env.BREVO_LIST_ID) {
    try {
      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'api-key': env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ email, listIds: [Number(env.BREVO_LIST_ID)], updateEnabled: true }),
      });
      if (!res.ok) console.error('Brevo', res.status, await res.text()); // visible dans les journaux Cloudflare
    } catch (e) {
      console.error(e);
    }
  }
  return json({ ok: true });
};
