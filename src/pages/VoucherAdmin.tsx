import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Lock, Download, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';

// Page d'encaissement des bons cadeaux (réservée au restaurant) : /bons-cadeaux/admin

interface Voucher {
  code: string;
  amount: number;
  balance: number;
  status: 'pending' | 'paid' | 'cancelled';
  buyerName: string;
  buyerEmail: string;
  recipientName: string;
  message: string;
  paidAt?: string;
  expiresAt?: string;
  redemptions: { at: string; amount: number; note?: string }[];
}

const brown = '#401400';
const red = '#A83D2E';
const field = 'w-full px-4 py-3 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-[#5A2B20]/30';
const border = { borderColor: '#E3CBB0' };
const chf = (n: number) => `CHF ${Number.isInteger(n) ? `${n}.–` : n.toFixed(2)}`;
const date = (d?: string) => (d ? new Date(d).toLocaleDateString('fr-CH', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '–');

const store = {
  get: () => {
    try {
      return sessionStorage.getItem('makda-pin') ?? '';
    } catch {
      return '';
    }
  },
  set: (v: string) => {
    try {
      if (v) sessionStorage.setItem('makda-pin', v);
      else sessionStorage.removeItem('makda-pin');
    } catch {
      /* rien */
    }
  },
};

const api = async (body: Record<string, unknown>) => {
  const res = await fetch('/api/voucher/admin', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { res, data: res.headers.get('content-type')?.includes('json') ? await res.json() : null };
};

const errors: Record<string, string> = {
  not_found: 'Aucun bon avec ce code.',
  not_paid: "Ce bon n'est pas payé : il ne peut pas être utilisé.",
  balance: 'Le montant dépasse le solde du bon.',
  amount: 'Montant invalide.',
};

const VoucherAdmin = () => {
  const [pin, setPin] = useState('');
  const [logged, setLogged] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [code, setCode] = useState('');
  const [v, setV] = useState<Voucher | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [list, setList] = useState<Voucher[] | null>(null);
  const [busy, setBusy] = useState(false);

  const login = async (p: string) => {
    const { res } = await api({ pin: p, action: 'login' });
    if (res.ok) {
      store.set(p);
      setPin(p);
      setLogged(true);
      setLoginError(false);
    } else {
      store.set('');
      setLoginError(p !== '');
    }
  };

  useEffect(() => {
    const p = store.get();
    if (p) login(p);
  }, []);

  const lookup = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setBusy(true);
    setMsg(null);
    const { res, data } = await api({ pin, action: 'get', code });
    setBusy(false);
    if (res.ok) setV(data.voucher);
    else {
      setV(null);
      setMsg({ ok: false, text: errors[data?.error] ?? 'Erreur, réessayez.' });
    }
  };

  const redeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!v) return;
    const n = Number(amount.replace(',', '.'));
    if (!window.confirm(`Déduire ${chf(n)} du bon ${v.code} ?`)) return;
    setBusy(true);
    const { res, data } = await api({ pin, action: 'redeem', code: v.code, amount: n, note });
    setBusy(false);
    if (data?.voucher) setV(data.voucher);
    if (res.ok) {
      setMsg({ ok: true, text: `${chf(n)} déduits. Nouveau solde : ${chf(data.voucher.balance)}.` });
      setAmount('');
      setNote('');
    } else setMsg({ ok: false, text: errors[data?.error] ?? 'Erreur, réessayez.' });
  };

  const cancel = async () => {
    if (!v) return;
    if (!window.confirm(`Annuler définitivement le bon ${v.code} (par exemple après un remboursement dans Stripe) ? Il ne pourra plus être utilisé.`)) return;
    setBusy(true);
    const { res, data } = await api({ pin, action: 'cancel', code: v.code });
    setBusy(false);
    if (data?.voucher) setV(data.voucher);
    setMsg(res.ok ? { ok: true, text: `Bon ${v.code} annulé.` } : { ok: false, text: errors[data?.error] ?? 'Erreur, réessayez.' });
    if (res.ok && list) loadList();
  };

  const loadList = async () => {
    const { res, data } = await api({ pin, action: 'list' });
    if (res.ok) setList(data.vouchers);
  };

  const exportNewsletter = async () => {
    const res = await fetch('/api/voucher/admin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ pin, action: 'newsletter' }),
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `newsletter-makda-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>Encaissement des bons – Makda</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="py-12 px-4 bg-cream min-h-[70vh]" style={{ color: brown }}>
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-serif" style={{ fontWeight: 400 }}>Bons cadeaux · encaissement</h1>
            {logged && (
              <button
                type="button"
                onClick={() => {
                  store.set('');
                  setLogged(false);
                  setPin('');
                  setV(null);
                  setList(null);
                }}
                className="inline-flex items-center gap-1 text-sm underline"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" /> Quitter
              </button>
            )}
          </div>

          {!logged ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                login(pin);
              }}
              className="bg-white rounded-2xl p-6 shadow-md max-w-sm"
            >
              <label htmlFor="pin" className="block mb-2 font-semibold">Code d'accès</label>
              <input id="pin" type="password" inputMode="numeric" autoComplete="current-password" value={pin} onChange={(e) => setPin(e.target.value)} className={field} style={border} />
              {loginError && <p className="mt-2 text-sm" style={{ color: red }}>Code incorrect.</p>}
              <button type="submit" className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white" style={{ backgroundColor: red, fontWeight: 700 }}>
                <Lock className="w-4 h-4" aria-hidden="true" /> Entrer
              </button>
            </form>
          ) : (
            <>
              <form onSubmit={lookup} className="bg-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row gap-3">
                <label htmlFor="code" className="sr-only">Code du bon</label>
                <input id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="MAKDA-XXXX-XXXX" className={`${field} font-mono uppercase`} style={border} autoComplete="off" />
                <button type="submit" disabled={busy || !code} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white disabled:opacity-60" style={{ backgroundColor: red, fontWeight: 700 }}>
                  <Search className="w-4 h-4" aria-hidden="true" /> Vérifier
                </button>
              </form>

              {msg && (
                <p className="mt-4 rounded-lg p-3 flex gap-2" style={{ backgroundColor: msg.ok ? '#E7F4E7' : '#FBEDE0', color: msg.ok ? '#2F6B2F' : red }} role="status">
                  {msg.ok ? <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" /> : <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />}
                  {msg.text}
                </p>
              )}

              {v && (
                <div className="mt-6 bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                    <p className="font-mono text-xl" style={{ fontWeight: 700 }}>{v.code}</p>
                    <span
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        fontWeight: 700,
                        backgroundColor: v.status === 'paid' ? (v.balance > 0 ? '#E7F4E7' : '#EEE') : '#FBEDE0',
                        color: v.status === 'paid' ? (v.balance > 0 ? '#2F6B2F' : '#555') : red,
                      }}
                    >
                      {v.status === 'paid' ? (v.balance > 0 ? 'Valable' : 'Entièrement utilisé') : v.status === 'pending' ? 'Non payé' : 'Annulé'}
                    </span>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-6">
                    <dt className="font-semibold">Solde</dt>
                    <dd className="text-lg" style={{ fontWeight: 700 }}>{chf(v.balance)} <span className="text-sm font-normal">sur {chf(v.amount)}</span></dd>
                    <dt className="font-semibold">Pour</dt>
                    <dd>{v.recipientName}</dd>
                    <dt className="font-semibold">Acheté par</dt>
                    <dd>{v.buyerName} · {v.buyerEmail}</dd>
                    <dt className="font-semibold">Payé le</dt>
                    <dd>{date(v.paidAt)}</dd>
                    <dt className="font-semibold">Valable jusqu'au</dt>
                    <dd style={v.expiresAt && new Date(v.expiresAt) < new Date() ? { color: red, fontWeight: 700 } : undefined}>{date(v.expiresAt)}</dd>
                  </dl>
                  {v.redemptions.length > 0 && (
                    <div className="mb-6">
                      <p className="font-semibold text-sm mb-2">Utilisations</p>
                      <ul className="text-sm space-y-1">
                        {v.redemptions.map((r) => (
                          <li key={r.at}>{date(r.at)} : {chf(r.amount)}{r.note ? ` (${r.note})` : ''}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {v.status === 'paid' && v.balance > 0 && (
                    <form onSubmit={redeem} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] items-end border-t pt-5" style={border}>
                      <div>
                        <label htmlFor="amt" className="block mb-1 text-sm font-semibold">Montant à déduire (CHF)</label>
                        <input id="amt" inputMode="decimal" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={String(v.balance)} className={field} style={border} />
                      </div>
                      <div>
                        <label htmlFor="note" className="block mb-1 text-sm font-semibold">Note (facultatif)</label>
                        <input id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Table 4" className={field} style={border} />
                      </div>
                      <button type="submit" disabled={busy} className="px-6 py-3 rounded-full text-white disabled:opacity-60" style={{ backgroundColor: brown, fontWeight: 700 }}>
                        Déduire
                      </button>
                    </form>
                  )}
                  {v.status === 'paid' && (
                    <p className="mt-5 text-right">
                      <button type="button" onClick={cancel} disabled={busy} className="text-sm underline disabled:opacity-60" style={{ color: red }}>
                        Annuler ce bon (remboursé)
                      </button>
                    </p>
                  )}
                </div>
              )}

              <div className="mt-10 flex flex-wrap gap-3">
                <button type="button" onClick={loadList} className="px-5 py-2.5 rounded-full border-2" style={{ borderColor: brown, fontWeight: 700 }}>
                  Voir tous les bons vendus
                </button>
                <button type="button" onClick={exportNewsletter} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2" style={{ borderColor: brown, fontWeight: 700 }}>
                  <Download className="w-4 h-4" aria-hidden="true" /> Exporter les inscrits newsletter (CSV)
                </button>
              </div>

              {list && (
                <div className="mt-6 bg-white rounded-2xl p-4 shadow-md overflow-x-auto">
                  {list.length === 0 ? (
                    <p className="p-2">Aucun bon vendu pour l'instant.</p>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left">
                          <th className="p-2">Code</th>
                          <th className="p-2">Payé le</th>
                          <th className="p-2">Pour</th>
                          <th className="p-2 text-right">Montant</th>
                          <th className="p-2 text-right">Solde</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((x) => (
                          <tr key={x.code} className="border-t cursor-pointer hover:bg-[#FFF8EF]" style={border} onClick={() => { setCode(x.code); setV(x); setMsg(null); window.scrollTo(0, 0); }}>
                            <td className="p-2 font-mono">{x.code}</td>
                            <td className="p-2">{date(x.paidAt)}</td>
                            <td className="p-2">{x.recipientName}</td>
                            <td className="p-2 text-right">{chf(x.amount)}</td>
                            <td className="p-2 text-right" style={{ fontWeight: 700 }}>{chf(x.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t" style={border}>
                          <td className="p-2 font-semibold" colSpan={3}>{list.length} bons</td>
                          <td className="p-2 text-right font-semibold">{chf(list.reduce((s, x) => s + x.amount, 0))}</td>
                          <td className="p-2 text-right font-semibold">{chf(Math.round(list.reduce((s, x) => s + x.balance, 0) * 100) / 100)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default VoucherAdmin;
