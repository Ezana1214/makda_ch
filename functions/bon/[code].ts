// Page du bon cadeau, prête à imprimer ou à envoyer : https://makda.ch/bon/MAKDA-XXXX-XXXX
import { type Ctx, getVoucher, refreshPayment, normCode, escapeHtml } from '../../server/lib';

const chf = (n: number) => (Number.isInteger(n) ? `${n}.–` : n.toFixed(2));

const page = (lang: 'fr' | 'en', title: string, inner: string, refresh = false) => `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
${refresh ? '<meta http-equiv="refresh" content="4">' : ''}
<title>${escapeHtml(title)}</title>
<link rel="icon" href="/favicon.ico">
<style>
  @font-face{font-family:"Yeseva One";src:url(/fonts/yeseva-one.woff2) format("woff2");font-display:swap}
  @font-face{font-family:Manrope;src:url(/fonts/manrope-400.woff2) format("woff2");font-weight:400;font-display:swap}
  @font-face{font-family:Manrope;src:url(/fonts/manrope-700.woff2) format("woff2");font-weight:700;font-display:swap}
  *{box-sizing:border-box}
  body{margin:0;background:#EBCDAD;font-family:Manrope,"Helvetica Neue",Arial,sans-serif;color:#401400;padding:24px}
  .card{max-width:760px;margin:0 auto;background:#FFF8EF;border-radius:20px;box-shadow:0 20px 50px rgba(64,20,0,.18);overflow:hidden}
  .card::before{content:"";display:block;height:8px;background:#A83D2E}
  .top{padding:32px 36px 0;text-align:center}
  .top img{height:72px;display:block;margin:0 auto 10px}
  .top span{letter-spacing:.22em;text-transform:uppercase;font-size:12px;font-weight:700;color:#5C3B33}
  .body{padding:36px 36px;text-align:center;border:2px dashed #E3CBB0;margin:20px 24px 24px;border-radius:14px}
  .kicker{letter-spacing:.25em;text-transform:uppercase;font-size:13px;font-weight:700;color:#A83D2E;margin:0 0 10px}
  h1{font-family:"Yeseva One",Georgia,serif;font-weight:400;font-size:44px;margin:0 0 6px}
  .amount{font-family:"Yeseva One",Georgia,serif;font-size:64px;color:#A83D2E;margin:10px 0 6px}
  .balance{font-size:15px;margin:0 0 18px}
  .to{font-size:20px;margin:18px 0 4px}
  .msg{font-style:italic;font-size:18px;line-height:1.6;max-width:520px;margin:16px auto;white-space:pre-line}
  .from{font-size:16px;margin:0 0 22px}
  .code{display:inline-block;font-family:"Courier New",monospace;font-size:24px;font-weight:700;letter-spacing:.12em;background:#fff;border:1px solid #E3CBB0;border-radius:10px;padding:10px 18px;margin:8px 0;white-space:nowrap}
  .small{font-size:14px;line-height:1.6;color:#5C3B33}
  .foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;padding:0 36px 28px;font-size:14px;color:#5C3B33}
  .actions{max-width:760px;margin:20px auto 0;display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .btn{background:#A83D2E;color:#fff;border:0;border-radius:999px;padding:12px 22px;font-weight:700;font-size:15px;cursor:pointer;text-decoration:none;font-family:inherit}
  .btn.alt{background:#fff;color:#401400}
  .notice{max-width:560px;margin:60px auto;background:#FFF8EF;border-radius:16px;padding:32px;text-align:center;line-height:1.6}
  @media (max-width:560px){h1{font-size:32px}.amount{font-size:48px}.body{margin:14px;padding:28px 16px}.top{padding:24px 20px 0}.top img{height:60px}.code{font-size:18px;letter-spacing:.08em;padding:10px 12px}.foot{padding:0 20px 20px}}
  @media print{body{background:#fff;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}.card{box-shadow:none}.actions{display:none}@page{margin:12mm}}
</style>
</head>
<body>${inner}</body>
</html>`;

export const onRequestGet = async ({ params, env }: Ctx) => {
  const code = normCode(params.code);
  let v = code ? await getVoucher(env, code) : null;
  if (!v) {
    return new Response(
      page('fr', 'Bon introuvable – Makda', `<div class="notice"><h1>Bon introuvable</h1><p>Vérifiez le code ou contactez-nous au +41 76 679 28 45.</p><p><a class="btn" href="/">makda.ch</a></p></div>`),
      { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } }
    );
  }
  try {
    v = await refreshPayment(env, v);
  } catch (e) {
    console.error(e);
  }
  const fr = v.lang === 'fr';
  const T = (a: string, b: string) => (fr ? a : b);
  const headers = { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' };

  if (v.status !== 'paid') {
    const pending = v.status === 'pending';
    return new Response(
      page(
        v.lang,
        T('Bon cadeau – Makda', 'Gift voucher – Makda'),
        `<div class="notice"><h1>${pending ? T('Paiement en cours…', 'Payment in progress…') : T('Bon non valide', 'Voucher not valid')}</h1><p>${
          pending
            ? T('Nous attendons la confirmation de votre paiement. Cette page se met à jour toute seule.', 'We are waiting for your payment to be confirmed. This page refreshes automatically.')
            : T("Ce bon n'est plus valable (paiement non abouti, annulé ou remboursé). Contactez-nous au +41 76 679 28 45.", 'This voucher is no longer valid (payment not completed, cancelled or refunded). Contact us on +41 76 679 28 45.')
        }</p></div>`,
        pending
      ),
      { headers }
    );
  }

  const dateFmt = (d?: string) =>
    d ? new Date(d).toLocaleDateString(fr ? 'fr-CH' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Zurich' }) : '';
  const used = v.balance < v.amount;
  const inner = `
<div class="card">
  <div class="top"><img src="/makda-logo.webp" alt="Makda"><span>${T('Restaurant éthiopien & érythréen', 'Ethiopian & Eritrean restaurant')}</span></div>
  <div class="body">
    <p class="kicker">${T('Bon cadeau', 'Gift voucher')}</p>
    <h1>${T('Un repas chez Makda', 'A meal at Makda')}</h1>
    <div class="amount">CHF ${chf(v.amount)}</div>
    ${used ? `<p class="balance">${T('Solde restant', 'Remaining balance')} : <strong>CHF ${chf(v.balance)}</strong></p>` : ''}
    <p class="to">${T('Pour', 'For')} <strong>${escapeHtml(v.recipientName)}</strong></p>
    ${v.message ? `<p class="msg">« ${escapeHtml(v.message)} »</p>` : ''}
    <p class="from">${T('De la part de', 'From')} ${escapeHtml(v.buyerName)}</p>
    <div class="code">${v.code}</div>
    <p class="small">${T('Valable jusqu’au', 'Valid until')} ${dateFmt(v.expiresAt)}, ${T('sur place ou à emporter, en une ou plusieurs fois.', 'dine-in or takeaway, in one or several visits.')}<br>
    ${T('Présentez ce bon (imprimé ou sur votre téléphone) au moment de payer. Non échangeable contre de l’argent.', 'Show this voucher (printed or on your phone) when paying. Not exchangeable for cash.')}</p>
  </div>
  <div class="foot">
    <span>Makda · Rue de Bernex 224 · 1233 Bernex</span>
    <span>${T('Réservations', 'Bookings')} : +41 76 679 28 45 · makda.ch</span>
  </div>
</div>
<div class="actions">
  <button class="btn" onclick="window.print()">${T('Imprimer ou enregistrer en PDF', 'Print or save as PDF')}</button>
  <a class="btn alt" href="mailto:?subject=${encodeURIComponent(T('Un bon cadeau pour toi', 'A gift voucher for you'))}&body=${encodeURIComponent(
    T(`Un bon cadeau Makda de CHF ${chf(v.amount)} t'attend : `, `A CHF ${chf(v.amount)} Makda gift voucher is waiting for you: `) + `https://makda.ch/bon/${v.code}`
  )}">${T('Envoyer par e-mail', 'Send by email')}</a>
</div>`;
  return new Response(page(v.lang, T(`Bon cadeau CHF ${chf(v.amount)} – Makda`, `CHF ${chf(v.amount)} gift voucher – Makda`), inner), { headers });
};
