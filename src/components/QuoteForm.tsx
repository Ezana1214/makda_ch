import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { restaurant } from '../data/restaurant';
import { useLanguage } from '../context/LanguageContext';

export type EventType = 'mariage' | 'entreprise' | 'fete' | 'religieux' | 'privatisation' | 'autre';

const eventTypes: { id: EventType; fr: string; en: string }[] = [
  { id: 'mariage', fr: 'Mariage', en: 'Wedding' },
  { id: 'entreprise', fr: "Événement d'entreprise", en: 'Corporate event' },
  { id: 'fete', fr: 'Anniversaire / fête privée', en: 'Birthday / private party' },
  { id: 'religieux', fr: 'Baptême / fête religieuse', en: 'Christening / religious celebration' },
  { id: 'privatisation', fr: 'Privatisation du restaurant', en: 'Private hire of the restaurant' },
  { id: 'autre', fr: 'Autre', en: 'Other' },
];
const guestRanges = [
  { fr: 'Moins de 20', en: 'Fewer than 20' },
  { fr: '20 à 50', en: '20 to 50' },
  { fr: '50 à 100', en: '50 to 100' },
  { fr: '100 à 200', en: '100 to 200' },
  { fr: 'Plus de 200', en: 'More than 200' },
];
const formats = [
  { fr: 'Buffet à partager', en: 'Sharing buffet' },
  { fr: 'Cocktail / finger food', en: 'Cocktail / finger food' },
  { fr: 'Cérémonie du café', en: 'Coffee ceremony' },
  { fr: 'Je ne sais pas encore', en: 'Not sure yet' },
];

const field =
  'w-full px-4 py-3 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-[#5A2B20]/30 transition disabled:opacity-50';

/** Formulaire de demande de devis (envoyé par e-mail via FormSubmit). Les valeurs envoyées restent en français. */
const QuoteForm = ({ defaultType }: { defaultType?: EventType }) => {
  const { lang, L } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const typeLabel = eventTypes.find((t) => t.id === data.type)?.fr ?? 'événement';
    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/makda.restaurant@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          type: typeLabel,
          langue: lang === 'en' ? 'anglais' : 'français',
          _subject: `Demande de devis – ${typeLabel} – ${data.date || 'date à définir'}`,
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
        <h3 className="text-2xl font-serif mb-2" style={{ color: '#401400' }}>
          {L('Merci, votre demande est envoyée !', 'Thank you, your request has been sent!')}
        </h3>
        <p style={{ color: '#5C3B33' }}>
          {L('Nous revenons vers vous rapidement avec une proposition adaptée.', 'We will get back to you shortly with a tailored proposal.')}
        </p>
      </div>
    );
  }

  const busy = status === 'sending';
  const label = 'block mb-1.5 text-sm font-semibold';
  const border = { borderColor: '#E3CBB0' };
  const choose = L('Choisir…', 'Choose…');

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 md:p-10 shadow-sm grid gap-5 md:grid-cols-2" style={{ color: '#401400' }}>
      <div>
        <label htmlFor="q-type" className={label}>{L("Type d'événement *", 'Type of event *')}</label>
        <select id="q-type" name="type" required disabled={busy} className={field} style={border} defaultValue={defaultType ?? ''}>
          <option value="" disabled>{choose}</option>
          {eventTypes.map((t) => (
            <option key={t.id} value={t.id}>{L(t.fr, t.en)}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="q-date" className={label}>{L('Date (même approximative)', 'Date (even approximate)')}</label>
        <input id="q-date" name="date" type="date" disabled={busy} className={field} style={border} />
      </div>
      <div>
        <label htmlFor="q-guests" className={label}>{L("Nombre d'invités *", 'Number of guests *')}</label>
        <select id="q-guests" name="invites" required disabled={busy} className={field} style={border} defaultValue="">
          <option value="" disabled>{choose}</option>
          {guestRanges.map((g) => (
            <option key={g.fr} value={g.fr}>{L(g.fr, g.en)}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="q-place" className={label}>{L("Lieu de l'événement *", 'Event location *')}</label>
        <input id="q-place" name="lieu" required disabled={busy} placeholder={L('Ville ou salle', 'Town or venue')} className={field} style={border} />
      </div>
      <fieldset className="md:col-span-2">
        <legend className={label}>{L('Formule souhaitée', 'Preferred format')}</legend>
        <div className="flex flex-wrap gap-2">
          {formats.map((f) => (
            <label key={f.fr} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer text-sm" style={border}>
              <input type="checkbox" name={`formule_${f.fr}`} value="oui" disabled={busy} className="accent-[#5A2B20]" /> {L(f.fr, f.en)}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="q-name" className={label}>{L('Nom *', 'Name *')}</label>
        <input id="q-name" name="nom" required autoComplete="name" disabled={busy} className={field} style={border} />
      </div>
      <div>
        <label htmlFor="q-phone" className={label}>{L('Téléphone *', 'Phone *')}</label>
        <input id="q-phone" name="telephone" type="tel" required autoComplete="tel" disabled={busy} placeholder="+41 …" className={field} style={border} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="q-email" className={label}>{L('E-mail *', 'Email *')}</label>
        <input id="q-email" name="email" type="email" required autoComplete="email" disabled={busy} className={field} style={border} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="q-msg" className={label}>{L('Votre projet', 'Your event')}</label>
        <textarea
          id="q-msg"
          name="message"
          rows={4}
          disabled={busy}
          placeholder={L(
            'Ambiance, régimes particuliers (végétarien, vegan, sans gluten, halal), budget indicatif…',
            'Atmosphere, dietary needs (vegetarian, vegan, gluten-free, halal), approximate budget…'
          )}
          className={`${field} resize-none`}
          style={border}
        />
      </div>
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white whitespace-nowrap disabled:opacity-60"
          style={{ backgroundColor: '#5A2B20', fontWeight: 500 }}
        >
          <Send size={18} /> {busy ? L('Envoi en cours…', 'Sending…') : L('Recevoir une proposition', 'Get a proposal')}
        </button>
        <p className="text-sm" style={{ color: '#5C3B33' }}>
          {L(
            `Réponse rapide · Service dans toute la ${restaurant.cateringArea} · ou appelez le `,
            'Quick reply · We cover the whole of French-speaking Switzerland · or call '
          )}
          <a href={`tel:${restaurant.phone}`} className="underline">{restaurant.phoneDisplay}</a>
        </p>
      </div>
      {status === 'error' && (
        <p className="md:col-span-2 text-sm rounded-lg p-3" style={{ backgroundColor: '#FBEDE0', color: '#A83D2E' }}>
          {L(
            `L'envoi n'a pas fonctionné. Réessayez ou appelez-nous au ${restaurant.phoneDisplay}.`,
            `Sending failed. Please try again or call us on ${restaurant.phoneDisplay}.`
          )}
        </p>
      )}
    </form>
  );
};

export default QuoteForm;
