// Outils communs aux fonctions serveur (Cloudflare Pages Functions).
// Réglages à faire dans Cloudflare → Pages → makda-ch → Settings :
//   - liaison KV « MAKDA_KV » (bons cadeaux et inscriptions newsletter)
//   - secret STRIPE_SECRET_KEY (clé secrète Stripe, sk_live_…)
//   - secret ADMIN_PIN (code d'accès de la page d'encaissement des bons)
//   - facultatif : BREVO_API_KEY et BREVO_LIST_ID pour envoyer les inscrits directement dans Brevo

export interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  list(opts?: { prefix?: string; cursor?: string; limit?: number }): Promise<{
    keys: { name: string }[];
    list_complete: boolean;
    cursor?: string;
  }>;
}

export interface Env {
  MAKDA_KV: KV;
  STRIPE_SECRET_KEY?: string;
  STRIPE_API_BASE?: string; // uniquement pour les tests
  ADMIN_PIN?: string;
  BREVO_API_KEY?: string;
  BREVO_LIST_ID?: string;
}

export interface Ctx {
  request: Request;
  env: Env;
  params: Record<string, string>;
}

export type Lang = 'fr' | 'en';

export interface Redemption {
  at: string;
  amount: number;
  note?: string;
}

export interface Voucher {
  code: string;
  amount: number; // CHF
  balance: number; // CHF
  status: 'pending' | 'paid' | 'cancelled';
  buyerName: string;
  buyerEmail: string;
  recipientName: string;
  message: string;
  lang: Lang;
  createdAt: string;
  paidAt?: string;
  expiresAt?: string;
  sessionId?: string;
  redemptions: Redemption[];
}

export const VALIDITY_YEARS = 2;
export const MIN_AMOUNT = 20;
export const MAX_AMOUNT = 1000;

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export const SITE = 'https://makda.ch';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sans 0/O ni 1/I
export const newCode = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  const chars = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
  return `MAKDA-${chars.slice(0, 4)}-${chars.slice(4)}`;
};

export const normCode = (c: string | null | undefined) =>
  (c ?? '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .replace(/^MAKDA/, '')
    .replace(/^(.{4})(.{4})$/, 'MAKDA-$1-$2');

export const getVoucher = async (env: Env, code: string): Promise<Voucher | null> => {
  const raw = await env.MAKDA_KV.get(`voucher:${code}`);
  return raw ? (JSON.parse(raw) as Voucher) : null;
};

export const saveVoucher = (env: Env, v: Voucher) => env.MAKDA_KV.put(`voucher:${v.code}`, JSON.stringify(v));

export const stripe = async (env: Env, method: 'GET' | 'POST', path: string, body?: URLSearchParams) => {
  if (!env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY manquant');
  const res = await fetch(`${env.STRIPE_API_BASE ?? 'https://api.stripe.com'}/v1/${path}`, {
    method,
    headers: {
      authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: body?.toString(),
  });
  const data = (await res.json()) as Record<string, unknown>;
  if (!res.ok) throw new Error(`Stripe ${res.status}: ${JSON.stringify((data as { error?: unknown }).error ?? data)}`);
  return data;
};

/** Si le bon est encore « en attente », vérifie auprès de Stripe s'il a été payé et le met à jour. */
export const refreshPayment = async (env: Env, v: Voucher): Promise<Voucher> => {
  if (v.status !== 'pending' || !v.sessionId) return v;
  const s = await stripe(env, 'GET', `checkout/sessions/${v.sessionId}`);
  if (s.payment_status === 'paid' || s.payment_status === 'no_payment_required') {
    const now = new Date();
    const exp = new Date(now);
    exp.setFullYear(exp.getFullYear() + VALIDITY_YEARS);
    v = { ...v, status: 'paid', paidAt: now.toISOString(), expiresAt: exp.toISOString() };
    await saveVoucher(env, v);
  } else if (s.status === 'expired') {
    v = { ...v, status: 'cancelled' };
    await saveVoucher(env, v);
  }
  return v;
};

/** Données d'un bon qu'on peut montrer publiquement (sans les coordonnées de l'acheteur). */
export const publicVoucher = (v: Voucher) => ({
  code: v.code,
  amount: v.amount,
  balance: v.balance,
  status: v.status,
  recipientName: v.recipientName,
  buyerName: v.buyerName,
  message: v.message,
  expiresAt: v.expiresAt,
  lang: v.lang,
});

// eslint-disable-next-line no-control-regex
const CTRL = /[\u0000-\u001f\u007f]/g;
// eslint-disable-next-line no-control-regex
const CTRL_KEEP_NL = /[\u0000-\u0009\u000b-\u001f\u007f]/g;

export const clean = (s: unknown, max: number) =>
  String(s ?? '')
    .replace(CTRL, ' ')
    .trim()
    .slice(0, max);

export const cleanMultiline = (s: unknown, max: number) =>
  String(s ?? '')
    .replace(/\r/g, '')
    .replace(CTRL_KEEP_NL, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max);

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= 200;

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Comparaison en temps constant (pour le code d'accès). */
export const safeEqual = (a: string, b: string) => {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
};
