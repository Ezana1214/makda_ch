// Crée un bon cadeau « en attente » et une page de paiement Stripe Checkout.
import {
  type Ctx, type Voucher, type Lang, json, newCode, saveVoucher, stripe, SITE, clean, cleanMultiline, isEmail,
  MIN_AMOUNT, MAX_AMOUNT, VALIDITY_YEARS,
} from '../../../server/lib';

export const onRequestPost = async ({ request, env }: Ctx) => {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'invalid' }, 400);
  }
  if (clean(body.website, 100)) return json({ error: 'invalid' }, 400); // piège à robots

  const lang: Lang = body.lang === 'en' ? 'en' : 'fr';
  const amount = Math.round(Number(body.amount));
  const buyerName = clean(body.buyerName, 80);
  const buyerEmail = clean(body.buyerEmail, 200).toLowerCase();
  const recipientName = clean(body.recipientName, 80);
  const message = cleanMultiline(body.message, 300);

  if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) return json({ error: 'amount' }, 400);
  if (!buyerName || !recipientName) return json({ error: 'names' }, 400);
  if (!isEmail(buyerEmail)) return json({ error: 'email' }, 400);

  const code = newCode();
  const fr = lang === 'fr';
  const label = fr ? `Bon cadeau Makda CHF ${amount}.–` : `Makda gift voucher CHF ${amount}`;
  const thanks = fr ? '/bons-cadeaux/merci' : '/en/gift-vouchers/thank-you';
  const back = fr ? '/bons-cadeaux' : '/en/gift-vouchers';

  const p = new URLSearchParams();
  p.set('mode', 'payment');
  p.set('locale', lang);
  p.set('customer_email', buyerEmail);
  p.set('client_reference_id', code);
  p.set('line_items[0][quantity]', '1');
  p.set('line_items[0][price_data][currency]', 'chf');
  p.set('line_items[0][price_data][unit_amount]', String(amount * 100));
  p.set('line_items[0][price_data][product_data][name]', label);
  p.set(
    'line_items[0][price_data][product_data][description]',
    fr ? `Pour ${recipientName}. Valable ${VALIDITY_YEARS} ans au restaurant Makda, Bernex.` : `For ${recipientName}. Valid for ${VALIDITY_YEARS} years at Makda, Bernex.`
  );
  p.set('metadata[voucher_code]', code);
  p.set('payment_intent_data[metadata][voucher_code]', code);
  // Cette description figure sur le reçu envoyé par Stripe : l'acheteur y retrouve le code et le lien du bon.
  p.set('payment_intent_data[description]', `${label} – code ${code} – ${SITE}/bon/${code}`);
  p.set(
    'custom_text[submit][message]',
    fr
      ? 'Votre bon cadeau s’affiche dès le paiement validé, prêt à imprimer ou à envoyer.'
      : 'Your gift voucher appears as soon as payment is confirmed, ready to print or send.'
  );
  p.set('success_url', `${SITE}${thanks}?code=${code}`);
  p.set('cancel_url', `${SITE}${back}?annule=1`);
  p.set('expires_at', String(Math.floor(Date.now() / 1000) + 60 * 60)); // la page de paiement reste ouverte 1 h

  let session: Record<string, unknown>;
  try {
    session = await stripe(env, 'POST', 'checkout/sessions', p);
  } catch (e) {
    console.error(e);
    // détail technique (sans données sensibles) pour diagnostiquer un réglage Stripe
    return json({ error: 'stripe', detail: (e as { info?: unknown }).info ?? null }, 500);
  }

  const v: Voucher = {
    code,
    amount,
    balance: amount,
    status: 'pending',
    buyerName,
    buyerEmail,
    recipientName,
    message,
    lang,
    createdAt: new Date().toISOString(),
    sessionId: String(session.id),
    redemptions: [],
  };
  await saveVoucher(env, v);
  return json({ url: session.url });
};
