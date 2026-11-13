import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { subscribeNewsletter } from '../lib/newsletter';

/** Petit formulaire d'inscription à la newsletter (pied de page et page /newsletter). */
const NewsletterForm = ({ source, dark = false }: { source: string; dark?: boolean }) => {
  const { lang, L } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const fg = dark ? '#FFFFFF' : '#401400';
  const sub = dark ? 'rgba(255,255,255,0.85)' : '#5C3B33';
  const id = `nl-${source}`;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus('sending');
    try {
      const ok = await subscribeNewsletter(String(fd.get('email') ?? ''), lang, source, String(fd.get('website') ?? ''));
      setStatus(ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'ok') {
    return (
      <p className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: fg }} role="status">
        <CheckCircle2 size={20} className="shrink-0" style={{ color: dark ? '#9BD49B' : '#3E8E3E' }} aria-hidden="true" />
        {L('Merci ! Vous recevrez nos prochaines nouvelles.', 'Thank you! You will receive our next news.')}
      </p>
    );
  }

  const busy = status === 'sending';
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor={`${id}-email`} className="sr-only">{L('Votre e-mail', 'Your email')}</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={busy}
          placeholder={L('Votre e-mail', 'Your email')}
          className="flex-1 min-w-0 px-4 py-3 rounded-full bg-white border focus:outline-none focus:ring-2 focus:ring-[#5A2B20]/30"
          style={{ borderColor: '#E3CBB0', color: '#401400' }}
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white whitespace-nowrap disabled:opacity-60"
          style={{ backgroundColor: '#A83D2E', fontWeight: 700 }}
        >
          <Mail size={16} aria-hidden="true" />
          {busy ? L('Envoi…', 'Sending…') : L("S'inscrire", 'Subscribe')}
        </button>
      </div>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="flex items-start gap-2 text-xs leading-relaxed cursor-pointer" style={{ color: sub }}>
        <input type="checkbox" required className="mt-0.5" />
        <span>
          {L(
            "J'accepte de recevoir la newsletter de Makda (environ une fois par mois). Désinscription en un clic. ",
            'I agree to receive the Makda newsletter (about once a month). Unsubscribe in one click. '
          )}
          <Link to="/confidentialite" className="underline">{L('Confidentialité', 'Privacy')}</Link>
        </span>
      </label>
      {status === 'error' && (
        <p className="text-sm" style={{ color: dark ? '#FFD2C8' : '#A83D2E' }}>
          {L("L'inscription n'a pas fonctionné. Réessayez dans un instant.", 'Subscription failed. Please try again shortly.')}
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;
