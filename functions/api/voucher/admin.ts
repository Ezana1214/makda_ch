// Espace d'encaissement : consulter un bon, déduire un montant, lister les bons, exporter la newsletter.
import {
  type Ctx, type Voucher, json, getVoucher, saveVoucher, refreshPayment, normCode, safeEqual, clean,
} from '../../../server/lib';

const listAll = async (ctx: Ctx, prefix: string) => {
  const names: string[] = [];
  let cursor: string | undefined;
  do {
    const r = await ctx.env.MAKDA_KV.list({ prefix, cursor });
    names.push(...r.keys.map((k) => k.name));
    cursor = r.list_complete ? undefined : r.cursor;
  } while (cursor);
  const values = await Promise.all(names.map((n) => ctx.env.MAKDA_KV.get(n)));
  return values.filter((x): x is string => !!x).map((x) => JSON.parse(x));
};

export const onRequestPost = async (ctx: Ctx) => {
  const { request, env } = ctx;
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'invalid' }, 400);
  }
  if (!env.ADMIN_PIN || !safeEqual(String(body.pin ?? ''), env.ADMIN_PIN)) {
    await new Promise((r) => setTimeout(r, 800));
    return json({ error: 'pin' }, 401);
  }

  const action = String(body.action ?? '');

  if (action === 'login') return json({ ok: true });

  if (action === 'list') {
    const all = (await listAll(ctx, 'voucher:')) as Voucher[];
    const paid = all.filter((v) => v.status === 'paid').sort((a, b) => (a.paidAt! < b.paidAt! ? 1 : -1));
    return json({ vouchers: paid });
  }

  if (action === 'newsletter') {
    const subs = (await listAll(ctx, 'newsletter:')) as { email: string; lang: string; source: string; createdAt: string }[];
    subs.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
    const csv = ['EMAIL;LANGUE;SOURCE;DATE_INSCRIPTION', ...subs.map((s) => [s.email, s.lang, s.source, s.createdAt.slice(0, 10)].join(';'))].join('\n');
    return new Response(`\ufeff${csv}\n`, {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': `attachment; filename="newsletter-makda-${new Date().toISOString().slice(0, 10)}.csv"`,
        'cache-control': 'no-store',
      },
    });
  }

  const code = normCode(String(body.code ?? ''));
  let v = code ? await getVoucher(env, code) : null;
  if (!v) return json({ error: 'not_found' }, 404);
  try {
    v = await refreshPayment(env, v);
  } catch (e) {
    console.error(e);
  }

  if (action === 'get') return json({ voucher: v });

  if (action === 'redeem') {
    const amount = Math.round(Number(body.amount) * 100) / 100;
    if (v.status !== 'paid') return json({ error: 'not_paid', voucher: v }, 409);
    if (!Number.isFinite(amount) || amount <= 0) return json({ error: 'amount', voucher: v }, 400);
    if (amount > v.balance + 1e-9) return json({ error: 'balance', voucher: v }, 409);
    v = {
      ...v,
      balance: Math.round((v.balance - amount) * 100) / 100,
      redemptions: [...v.redemptions, { at: new Date().toISOString(), amount, note: clean(body.note, 120) || undefined }],
    };
    await saveVoucher(env, v);
    return json({ voucher: v });
  }

  return json({ error: 'action' }, 400);
};
