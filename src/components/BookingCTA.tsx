import { CalendarCheck, Phone, ShoppingBag } from 'lucide-react';
import { restaurant } from '../data/restaurant';
import { useLanguage } from '../context/LanguageContext';

interface BookingCTAProps {
  title?: string;
  text?: string;
  /** Fond sombre (true) ou clair (false) */
  dark?: boolean;
}

/** Bloc « Réserver / Appeler / À emporter » à placer en bas des pages. */
const BookingCTA = ({ title, text, dark = false }: BookingCTAProps) => {
  const { L } = useLanguage();
  const fg = dark ? '#FFFFFF' : '#401400';
  const sub = dark ? 'rgba(255,255,255,0.85)' : '#5C3B33';
  return (
    <section className="px-4 py-16 md:py-20" style={{ backgroundColor: dark ? '#401400' : '#FFF8EF' }}>
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-4" style={{ color: fg, fontWeight: 300 }}>
          {title ?? L('Envie de goûter ?', 'Ready for a taste?')}
        </h2>
        <p className="mb-8 leading-relaxed" style={{ color: sub, fontWeight: 400 }}>
          {text ??
            L(
              'Réservez votre table en ligne ou appelez-nous. Tous nos plats sont aussi disponibles à emporter.',
              'Book your table online or give us a call. All our dishes are also available to take away.'
            )}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={restaurant.theforkUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full transition-opacity hover:opacity-90"
            style={{ backgroundColor: dark ? '#EBCDAD' : '#5A2B20', color: dark ? '#401400' : '#FFFFFF', fontWeight: 500 }}
          >
            <CalendarCheck size={18} /> {L('Réserver une table', 'Book a table')}
          </a>
          <a
            href={`tel:${restaurant.phone}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border transition-colors"
            style={{ borderColor: dark ? '#EBCDAD' : '#5A2B20', color: dark ? '#EBCDAD' : '#5A2B20', fontWeight: 500 }}
          >
            <Phone size={18} /> {restaurant.phoneDisplay}
          </a>
        </div>
        <p className="mt-6 text-sm inline-flex items-center gap-2" style={{ color: sub }}>
          <ShoppingBag size={16} />{' '}
          {L(
            'À emporter : commandez par téléphone et passez récupérer vos plats.',
            'Takeaway: order by phone and collect your food.'
          )}
        </p>
      </div>
    </section>
  );
};

export default BookingCTA;
