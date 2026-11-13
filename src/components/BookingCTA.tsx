import { CalendarCheck, Phone, ShoppingBag } from 'lucide-react';
import { restaurant } from '../data/restaurant';

interface BookingCTAProps {
  title?: string;
  text?: string;
  /** Fond sombre (true) ou clair (false) */
  dark?: boolean;
}

/** Bloc « Réserver / Appeler / À emporter » à placer en bas des pages. */
const BookingCTA = ({
  title = 'Envie de goûter ?',
  text = 'Réservez votre table en ligne ou appelez-nous. Tous nos plats sont aussi disponibles à emporter.',
  dark = false,
}: BookingCTAProps) => {
  const fg = dark ? '#FFFFFF' : '#401400';
  const sub = dark ? 'rgba(255,255,255,0.85)' : '#5C3B33';
  return (
    <section className="px-4 py-16 md:py-20" style={{ backgroundColor: dark ? '#401400' : '#FFF8EF' }}>
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-4" style={{ color: fg, fontWeight: 300 }}>
          {title}
        </h2>
        <p className="mb-8 leading-relaxed" style={{ color: sub, fontWeight: 400 }}>
          {text}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={restaurant.theforkUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full transition-opacity hover:opacity-90"
            style={{ backgroundColor: dark ? '#EBCDAD' : '#5A2B20', color: dark ? '#401400' : '#FFFFFF', fontWeight: 500 }}
          >
            <CalendarCheck size={18} /> Réserver une table
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
          <ShoppingBag size={16} /> À emporter : commandez par téléphone et passez récupérer vos plats.
        </p>
      </div>
    </section>
  );
};

export default BookingCTA;
