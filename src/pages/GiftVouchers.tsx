import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gift, CreditCard, Printer, Loader2, CheckCircle2, ExternalLink, Copy, Clock, AlertCircle } from 'lucide-react';
import Seo from '../components/Seo';
import { useLanguage } from '../context/LanguageContext';
import { restaurant, SITE_URL } from '../data/restaurant';
import { subscribeNewsletter } from '../lib/newsletter';

const brown = '#401400';
const red = '#A83D2E';
const soft = '#5C3B33';
const border = { borderColor: '#E3CBB0' };
const field = 'w-full px-4 py-3 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-[#5A2B20]/30 disabled:opacity-50';
const label = 'block mb-1.5 text-sm font-semibold';
const presets = [50, 75, 100, 150];

const faq = [
  {
    q: ['Comment le bon est-il remis ?', 'How is the voucher delivered?'],
    a: [
      "Immédiatement après le paiement : le bon s'affiche à l'écran, prêt à imprimer, à enregistrer en PDF ou à envoyer par e-mail. Vous recevez aussi un reçu par e-mail avec le code et le lien du bon.",
      'Instantly after payment: the voucher appears on screen, ready to print, save as PDF or send by email. You also receive an email receipt with the voucher code and link.',
    ],
  },
  {
    q: ['Quels moyens de paiement ?', 'Which payment methods?'],
    a: [
      'Carte bancaire, TWINT, Apple Pay et Google Pay. Le paiement est traité de façon sécurisée par Stripe.',
      'Card, TWINT, Apple Pay and Google Pay. Payment is processed securely by Stripe.',
    ],
  },
  {
    q: ['Combien de temps est-il valable ?', 'How long is it valid?'],
    a: ['Deux ans à partir de la date d’achat.', 'Two years from the date of purchase.'],
  },
  {
    q: ['Où et comment l’utiliser ?', 'Where and how can it be used?'],
    a: [
      'Au restaurant Makda à Bernex, sur place, pour le buffet du dimanche ou à emporter. Il peut être utilisé en plusieurs fois : le solde restant est conservé.',
      'At Makda in Bernex, for dine-in, the Sunday buffet or takeaway. It can be used over several visits: any remaining balance is kept.',
    ],
  },
  {
    q: ['Et si le bon est perdu ?', 'What if the voucher is lost?'],
    a: [
      `Le lien du bon reste valable et figure dans le reçu reçu par e-mail. Sinon, appelez-nous au ${restaurant.phoneDisplay} avec le nom de l'acheteur.`,
      `The voucher link stays valid and is in your email receipt. Otherwise, call us on ${restaurant.phoneDisplay} with the buyer's name.`,
    ],
  },
];

const GiftVouchers = () => {
  const { lang, L, to } = useLanguage();
  const { search } = useLocation();
  const [amount, setAmount] = useState<number | 'other'>(75);
  const [other, setOther] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [cancelled, setCancelled] = useState(false);
  useEffect(() => setCancelled(new URLSearchParams(search).has('annule')), [search]);

  const value = amount === 'other' ? Math.round(Number(other)) : amount;
  const valid = Number.isFinite(value) && value >= 20 && value <= 1000;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valid) return;
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? '');
    setStatus('sending');
    try {
      if (fd.get('newsletter')) await subscribeNewsletter(get('buyerEmail'), lang, 'bon-cadeau').catch(() => false);
      const res = await fetch('/api/voucher/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          amount: value,
          buyerName: get('buyerName'),
          buyerEmail: get('buyerEmail'),
          recipientName: get('recipientName'),
          message: get('message'),
          website: get('website'),
          lang,
        }),
      });
      const data = (await res.json()) as { url?: string };
      if (res.ok && data.url) window.location.href = data.url;
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const busy = status === 'sending';
  return (
    <>
      <Seo
        path={to('giftVouchers')}
        title={L('Bon cadeau restaurant éthiopien à Genève – Makda Bernex', 'Ethiopian restaurant gift voucher in Geneva – Makda, Bernex')}
        description={L(
          'Offrez un bon cadeau Makda, restaurant éthiopien et érythréen à Bernex. Montant au choix, paiement par carte ou TWINT, bon reçu immédiatement à imprimer ou envoyer.',
          'Give a Makda gift voucher, Ethiopian and Eritrean restaurant in Bernex, Geneva. Any amount, pay by card or TWINT, voucher delivered instantly to print or send.'
        )}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((f) => ({
            '@type': 'Question',
            name: L(f.q[0], f.q[1]),
            acceptedAnswer: { '@type': 'Answer', text: L(f.a[0], f.a[1]) },
          })),
        }}
      />
      <section className="pt-16 pb-10 px-4 bg-cream">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-widest mb-3" style={{ color: red, fontWeight: 700 }}>{L('Bons cadeaux', 'Gift vouchers')}</p>
          <h1 className="text-4xl md:text-6xl font-serif mb-5" style={{ color: brown, fontWeight: 400 }}>
            {L('Offrez un repas éthiopien', 'Give an Ethiopian meal')}
          </h1>
          <p className="text-xl leading-relaxed" style={{ color: brown }}>
            {L(
              'Un moment à partager autour de l’injera, pour un anniversaire, Noël ou simplement pour faire plaisir. Le bon est prêt dès le paiement.',
              'A moment to share around the injera, for a birthday, Christmas or just because. The voucher is ready as soon as you pay.'
            )}
          </p>
        </div>
      </section>

      <section className="pb-12 px-4 bg-cream">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Gift, fr: ['1. Choisissez le montant', 'De CHF 20.– à 1000.–, avec un petit mot.'], en: ['1. Choose the amount', 'From CHF 20 to 1,000, with a personal note.'] },
            { icon: CreditCard, fr: ['2. Payez en ligne', 'Carte, TWINT, Apple Pay ou Google Pay.'], en: ['2. Pay online', 'Card, TWINT, Apple Pay or Google Pay.'] },
            { icon: Printer, fr: ['3. Recevez le bon', 'Tout de suite, à imprimer ou à envoyer.'], en: ['3. Get the voucher', 'Straight away, to print or send.'] },
          ].map(({ icon: Icon, fr, en }) => (
            <div key={fr[0]} className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <Icon className="w-8 h-8 mx-auto mb-3" style={{ color: red }} aria-hidden="true" />
              <h2 className="text-xl font-serif mb-1" style={{ color: brown, fontWeight: 400 }}>{L(fr[0], en[0])}</h2>
              <p style={{ color: soft }}>{L(fr[1], en[1])}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20 px-4 bg-cream" id="commander">
        <div className="container mx-auto max-w-3xl">
          {cancelled && (
            <p className="mb-6 rounded-lg p-4 flex gap-2" style={{ backgroundColor: '#FBEDE0', color: red }} role="status">
              <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
              {L("Le paiement a été annulé, rien n'a été débité. Vous pouvez réessayer ci-dessous.", 'Payment was cancelled and nothing was charged. You can try again below.')}
            </p>
          )}
          <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 md:p-10 shadow-md grid gap-6" style={{ color: brown }}>
            <fieldset>
              <legend className={label}>{L('Montant *', 'Amount *')}</legend>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {presets.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setAmount(p)}
                    aria-pressed={amount === p}
                    className="py-3 rounded-xl border-2 text-lg transition-colors"
                    style={amount === p ? { borderColor: red, backgroundColor: red, color: '#fff', fontWeight: 700 } : { ...border, fontWeight: 600 }}
                  >
                    CHF {p}.–
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setAmount('other')}
                  aria-pressed={amount === 'other'}
                  className="py-3 rounded-xl border-2 text-lg col-span-2 sm:col-span-1 transition-colors"
                  style={amount === 'other' ? { borderColor: red, backgroundColor: red, color: '#fff', fontWeight: 700 } : { ...border, fontWeight: 600 }}
                >
                  {L('Autre', 'Other')}
                </button>
              </div>
              {amount === 'other' && (
                <div className="mt-3">
                  <label htmlFor="g-other" className="sr-only">{L('Montant en CHF', 'Amount in CHF')}</label>
                  <input
                    id="g-other"
                    type="number"
                    inputMode="numeric"
                    min={20}
                    max={1000}
                    step={1}
                    required
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                    placeholder={L('Montant en CHF (20 à 1000)', 'Amount in CHF (20 to 1,000)')}
                    className={field}
                    style={border}
                  />
                </div>
              )}
            </fieldset>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="g-recipient" className={label}>{L('Pour qui ? *', 'Who is it for? *')}</label>
                <input id="g-recipient" name="recipientName" required maxLength={80} disabled={busy} placeholder={L('Prénom du bénéficiaire', "Recipient's name")} className={field} style={border} />
              </div>
              <div>
                <label htmlFor="g-buyer" className={label}>{L('De la part de *', 'From *')}</label>
                <input id="g-buyer" name="buyerName" required maxLength={80} autoComplete="name" disabled={busy} placeholder={L('Votre nom', 'Your name')} className={field} style={border} />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="g-msg" className={label}>{L('Petit mot (facultatif)', 'Personal note (optional)')}</label>
                <textarea id="g-msg" name="message" rows={3} maxLength={300} disabled={busy} className={`${field} resize-none`} style={border} placeholder={L('Joyeux anniversaire ! Bon appétit…', 'Happy birthday! Enjoy your meal…')} />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="g-email" className={label}>{L('Votre e-mail (pour le reçu) *', 'Your email (for the receipt) *')}</label>
                <input id="g-email" name="buyerEmail" type="email" required autoComplete="email" disabled={busy} className={field} style={border} />
              </div>
            </div>
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <label className="flex items-start gap-2 text-sm cursor-pointer" style={{ color: soft }}>
              <input type="checkbox" name="newsletter" className="mt-1" />
              <span>{L("J'accepte aussi de recevoir la newsletter de Makda (environ une fois par mois).", 'I also agree to receive the Makda newsletter (about once a month).')}</span>
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                disabled={busy || !valid}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white text-lg disabled:opacity-60"
                style={{ backgroundColor: red, fontWeight: 700 }}
              >
                {busy ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <CreditCard className="w-5 h-5" aria-hidden="true" />}
                {busy ? L('Redirection…', 'Redirecting…') : valid ? L(`Payer CHF ${value}.–`, `Pay CHF ${value}`) : L('Payer', 'Pay')}
              </button>
              <p className="text-sm" style={{ color: soft }}>
                {L('Paiement sécurisé par Stripe. Valable 2 ans.', 'Secure payment by Stripe. Valid for 2 years.')}
              </p>
            </div>
            {status === 'error' && (
              <p className="text-sm rounded-lg p-3" style={{ backgroundColor: '#FBEDE0', color: red }}>
                {L(
                  `Le paiement n'a pas pu être lancé. Réessayez ou appelez-nous au ${restaurant.phoneDisplay}.`,
                  `Payment could not be started. Please try again or call us on ${restaurant.phoneDisplay}.`
                )}
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: '#EBCDAD' }}>
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-8" style={{ color: brown, fontWeight: 300 }}>
            {L('Questions fréquentes', 'Frequently asked questions')}
          </h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details key={f.q[0]} className="bg-white rounded-xl p-5 shadow-sm group">
                <summary className="cursor-pointer text-lg" style={{ color: brown, fontWeight: 600 }}>{L(f.q[0], f.q[1])}</summary>
                <p className="mt-3 leading-relaxed" style={{ color: soft }}>{L(f.a[0], f.a[1])}</p>
              </details>
            ))}
          </div>
          <p className="mt-8" style={{ color: brown }}>
            {L('Envie de privatiser la salle pour l’occasion ? ', 'Want the whole room for the occasion? ')}
            <Link to={to('privateHire')} className="underline" style={{ fontWeight: 600 }}>{L('Voir la privatisation', 'See private hire')}</Link>
          </p>
        </div>
      </section>
    </>
  );
};

interface PublicVoucher {
  code: string;
  amount: number;
  balance: number;
  status: 'pending' | 'paid' | 'cancelled';
  recipientName: string;
  buyerName: string;
  expiresAt?: string;
}

export const GiftThanks = () => {
  const { L, to } = useLanguage();
  const { search } = useLocation();
  const [code, setCode] = useState<string | null>(null);
  const [v, setV] = useState<PublicVoucher | null>(null);
  const [state, setState] = useState<'loading' | 'paid' | 'pending' | 'error'>('loading');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const c = new URLSearchParams(search).get('code');
    setCode(c);
    if (!c) setState('error');
  }, [search]);

  useEffect(() => {
    if (!code) return;
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    let stop = false;
    const check = async () => {
      try {
        const res = await fetch(`/api/voucher/status?code=${encodeURIComponent(code)}`);
        if (!res.ok) throw new Error();
        const data = (await res.json()) as PublicVoucher;
        if (stop) return;
        setV(data);
        if (data.status === 'paid') return setState('paid');
        if (data.status === 'cancelled') return setState('error');
        setState('pending');
      } catch {
        if (!stop && tries > 3) return setState('error');
      }
      tries += 1;
      if (!stop && tries < 30) timer = setTimeout(check, 2000);
    };
    check();
    return () => {
      stop = true;
      clearTimeout(timer);
    };
  }, [code]);

  const link = code ? `${SITE_URL}/bon/${code}` : '';
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      /* rien */
    }
  };

  return (
    <>
      <Seo path={to('giftThanks')} title={L('Merci pour votre bon cadeau – Makda', 'Thank you for your gift voucher – Makda')} description={L('Votre bon cadeau Makda.', 'Your Makda gift voucher.')} noindex />
      <section className="py-16 md:py-24 px-4 bg-cream min-h-[60vh]">
        <div className="container mx-auto max-w-2xl text-center" style={{ color: brown }}>
          {state === 'paid' && v ? (
            <>
              <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: '#3E8E3E' }} aria-hidden="true" />
              <h1 className="text-4xl md:text-5xl font-serif mb-4" style={{ fontWeight: 400 }}>{L('Merci, votre bon est prêt !', 'Thank you, your voucher is ready!')}</h1>
              <p className="text-lg mb-8" style={{ color: soft }}>
                {L(`Bon de CHF ${v.amount}.– pour ${v.recipientName}. Vous recevez aussi un reçu par e-mail avec le lien.`, `CHF ${v.amount} voucher for ${v.recipientName}. You will also receive an email receipt with the link.`)}
              </p>
              <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
                <p className="text-sm uppercase tracking-widest mb-2" style={{ color: red, fontWeight: 700 }}>{L('Code du bon', 'Voucher code')}</p>
                <p className="text-2xl md:text-3xl font-mono mb-5" style={{ fontWeight: 700, letterSpacing: '0.1em' }}>{v.code}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={`/bon/${v.code}`} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white" style={{ backgroundColor: red, fontWeight: 700 }}>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    {L('Ouvrir le bon (imprimer ou PDF)', 'Open the voucher (print or PDF)')}
                  </a>
                  <button type="button" onClick={copy} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2" style={{ borderColor: red, color: red, fontWeight: 700 }}>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    {copied ? L('Lien copié', 'Link copied') : L('Copier le lien à envoyer', 'Copy the link to send')}
                  </button>
                </div>
              </div>
              <p className="text-sm" style={{ color: soft }}>{L('Valable 2 ans, sur place ou à emporter, en une ou plusieurs fois.', 'Valid for 2 years, dine-in or takeaway, in one or several visits.')}</p>
            </>
          ) : state === 'error' ? (
            <>
              <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: red }} aria-hidden="true" />
              <h1 className="text-3xl md:text-4xl font-serif mb-4" style={{ fontWeight: 400 }}>{L('Nous n’arrivons pas à confirmer le paiement', 'We cannot confirm the payment yet')}</h1>
              <p className="text-lg" style={{ color: soft }}>
                {L(`Si vous avez été débité, votre reçu Stripe contient le lien du bon. Sinon, appelez-nous au ${restaurant.phoneDisplay}.`, `If you were charged, your Stripe receipt contains the voucher link. Otherwise, call us on ${restaurant.phoneDisplay}.`)}
              </p>
            </>
          ) : (
            <>
              <Clock className="w-12 h-12 mx-auto mb-4 animate-pulse" style={{ color: red }} aria-hidden="true" />
              <h1 className="text-3xl md:text-4xl font-serif mb-4" style={{ fontWeight: 400 }}>{L('Confirmation du paiement…', 'Confirming payment…')}</h1>
              <p className="text-lg" style={{ color: soft }}>{L('Votre bon s’affiche dans quelques secondes.', 'Your voucher will appear in a few seconds.')}</p>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default GiftVouchers;
