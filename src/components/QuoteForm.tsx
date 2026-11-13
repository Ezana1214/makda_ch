import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { restaurant } from '../data/restaurant';

const eventTypes = ['Mariage', "Événement d'entreprise", 'Anniversaire / fête privée', 'Baptême / fête religieuse', 'Autre'];
const guestRanges = ['Moins de 20', '20 à 50', '50 à 100', '100 à 200', 'Plus de 200'];
const formats = ['Buffet à partager', 'Cocktail / finger food', 'Cérémonie du café', 'Je ne sais pas encore'];

const field =
  'w-full px-4 py-3 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-[#5A2B20]/30 transition disabled:opacity-50';

/** Formulaire de demande de devis traiteur (envoyé par e-mail via FormSubmit). */
const QuoteForm = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/makda.restaurant@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: `Demande de devis traiteur – ${data.type || 'événement'} – ${data.date || 'date à définir'}`,
          _template: 'table',
        }),
      });
      if (res.ok) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'ok') {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: '#3E8E3E' }} />
        <h3 className="text-2xl font-serif mb-2" style={{ color: '#401400' }}>Merci, votre demande est envoyée !</h3>
        <p style={{ color: '#5C3B33' }}>Nous revenons vers vous rapidement avec une proposition adaptée.</p>
      </div>
    );
  }

  const busy = status === 'sending';
  const label = 'block mb-1.5 text-sm font-semibold';

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 md:p-10 shadow-sm grid gap-5 md:grid-cols-2" style={{ color: '#401400' }}>
      <div>
        <label htmlFor="q-type" className={label}>Type d'événement *</label>
        <select id="q-type" name="type" required disabled={busy} className={field} style={{ borderColor: '#E3CBB0' }} defaultValue="">
          <option value="" disabled>Choisir…</option>
          {eventTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="q-date" className={label}>Date (même approximative)</label>
        <input id="q-date" name="date" type="date" disabled={busy} className={field} style={{ borderColor: '#E3CBB0' }} />
      </div>
      <div>
        <label htmlFor="q-guests" className={label}>Nombre d'invités *</label>
        <select id="q-guests" name="invites" required disabled={busy} className={field} style={{ borderColor: '#E3CBB0' }} defaultValue="">
          <option value="" disabled>Choisir…</option>
          {guestRanges.map((g) => <option key={g}>{g}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="q-place" className={label}>Lieu de l'événement *</label>
        <input id="q-place" name="lieu" required disabled={busy} placeholder="Ville ou salle" className={field} style={{ borderColor: '#E3CBB0' }} />
      </div>
      <div className="md:col-span-2">
        <span className={label}>Formule souhaitée</span>
        <div className="flex flex-wrap gap-2">
          {formats.map((f) => (
            <label key={f} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer text-sm" style={{ borderColor: '#E3CBB0' }}>
              <input type="checkbox" name={`formule_${f}`} value="oui" disabled={busy} className="accent-[#5A2B20]" /> {f}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="q-name" className={label}>Nom *</label>
        <input id="q-name" name="nom" required autoComplete="name" disabled={busy} className={field} style={{ borderColor: '#E3CBB0' }} />
      </div>
      <div>
        <label htmlFor="q-phone" className={label}>Téléphone *</label>
        <input id="q-phone" name="telephone" type="tel" required autoComplete="tel" disabled={busy} placeholder="+41 …" className={field} style={{ borderColor: '#E3CBB0' }} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="q-email" className={label}>E-mail *</label>
        <input id="q-email" name="email" type="email" required autoComplete="email" disabled={busy} className={field} style={{ borderColor: '#E3CBB0' }} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="q-msg" className={label}>Votre projet</label>
        <textarea id="q-msg" name="message" rows={4} disabled={busy} placeholder="Ambiance, régimes particuliers (végétarien, vegan, sans gluten, halal), budget indicatif…" className={`${field} resize-none`} style={{ borderColor: '#E3CBB0' }} />
      </div>
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white whitespace-nowrap disabled:opacity-60"
          style={{ backgroundColor: '#5A2B20', fontWeight: 500 }}
        >
          <Send size={18} /> {busy ? 'Envoi en cours…' : 'Recevoir une proposition'}
        </button>
        <p className="text-sm" style={{ color: '#5C3B33' }}>
          Réponse rapide · Service dans toute la {restaurant.cateringArea} · ou appelez le{' '}
          <a href={`tel:${restaurant.phone}`} className="underline">{restaurant.phoneDisplay}</a>
        </p>
      </div>
      {status === 'error' && (
        <p className="md:col-span-2 text-sm rounded-lg p-3" style={{ backgroundColor: '#FBEDE0', color: '#A83D2E' }}>
          L'envoi n'a pas fonctionné. Réessayez ou appelez-nous au {restaurant.phoneDisplay}.
        </p>
      )}
    </form>
  );
};

export default QuoteForm;
