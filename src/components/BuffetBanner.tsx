import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { buffet, buffetEn } from '../data/restaurant';
import { useLanguage } from '../context/LanguageContext';

/** Bandeau : buffet à volonté du premier dimanche du mois */
const BuffetBanner = ({ link = true }: { link?: boolean }) => {
  const { lang, L, to } = useLanguage();
  const b = lang === 'en' ? buffetEn : buffet;
  return (
    <section className="px-4 py-10" style={{ backgroundColor: '#401400' }}>
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
        <span className="bg-gold-light rounded-full w-16 h-16 flex-shrink-0 flex items-center justify-center">
          <CalendarDays size={30} className="text-brown-dark" />
        </span>
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2" style={{ fontWeight: 300 }}>
            {b.title}
          </h2>
          <p className="text-white/85 leading-relaxed" style={{ fontWeight: 400 }}>
            {b.when} · {b.hours} · <strong className="font-medium text-white">{b.price}</strong>
            <span className="block mt-1">{b.includes}</span>
          </p>
        </div>
        {link && (
          <Link
            to={to('buffet')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap"
            style={{ backgroundColor: '#EBCDAD', color: '#401400', fontWeight: 500 }}
          >
            {L('Tout savoir', 'Find out more')} <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </section>
  );
};

export default BuffetBanner;
