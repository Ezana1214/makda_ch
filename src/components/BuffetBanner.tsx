import { CalendarDays } from 'lucide-react';
import { buffet } from '../data/restaurant';

/** Bandeau : buffet à volonté du premier dimanche du mois */
const BuffetBanner = () => (
  <section className="px-4 py-10" style={{ backgroundColor: '#401400' }}>
    <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
      <span className="bg-gold-light rounded-full w-16 h-16 flex-shrink-0 flex items-center justify-center">
        <CalendarDays size={30} className="text-brown-dark" />
      </span>
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-serif text-white mb-2" style={{ fontWeight: 300 }}>
          {buffet.title}
        </h2>
        <p className="text-white/85 leading-relaxed" style={{ fontWeight: 300 }}>
          {buffet.when} · {buffet.hours} · <strong className="font-medium text-white">{buffet.price}</strong>
          <span className="block mt-1">{buffet.includes}</span>
        </p>
      </div>
    </div>
  </section>
);

export default BuffetBanner;
