import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getMenu } from '../data/menu';
import { useLanguage } from '../context/LanguageContext';

const ids = ['kitfo', 'tibs', 'doro-wet', 'misir-wat'];

/** Sélection de plats de la carte, avec lien vers le menu complet. */
const FeaturedDishes = () => {
  const { lang, L, to } = useLanguage();
  const all = getMenu(lang).dishSections.flatMap((s) => s.dishes);
  const dishes = ids.map((id) => all.find((d) => d.id === id)).filter((d): d is NonNullable<typeof d> => Boolean(d));
  return (
    <section className="px-4 py-20" style={{ backgroundColor: '#FFF8EF' }} aria-labelledby="incontournables">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 id="incontournables" className="text-4xl md:text-5xl font-serif mb-4" style={{ color: '#401400', fontWeight: 300 }}>
            {L('Nos incontournables', 'Our must-try dishes')}
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: '#5C3B33' }}>
            {L(
              'Servis sur injera 100 % teff, sans gluten. Options végétariennes et véganes à la carte.',
              'Served on 100% teff injera, gluten-free. Vegetarian and vegan options on the menu.'
            )}
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {dishes.map((d) => (
            <Link key={d.id} to={to('menu')} className="group rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={d.image} alt={`${d.name} – Makda`} loading="lazy" width={400} height={300} className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform" />
              <div className="p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg md:text-xl uppercase tracking-wide" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, color: '#A83D2E' }}>
                    {d.name}
                  </h3>
                  <span className="text-sm font-semibold whitespace-nowrap" style={{ color: '#A83D2E' }}>{d.price} CHF</span>
                </div>
                <p className="text-sm" style={{ color: '#7A5852' }}>
                  {[d.detail, d.vegan ? L('végane', 'vegan') : null].filter(Boolean).join(' · ')}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to={to('menu')} className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white" style={{ backgroundColor: '#5A2B20', fontWeight: 500 }}>
            {L('Voir toute la carte', 'See the full menu')} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
