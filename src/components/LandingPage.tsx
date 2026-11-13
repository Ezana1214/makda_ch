import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wheat, Leaf, AlertCircle, CalendarDays, Clock, Coins, Coffee, Users, Sun, Car, TramFront, MapPin,
  UtensilsCrossed, Heart, Briefcase, Sparkles, Truck, Cake, ArrowRight, Check, Navigation, type LucideIcon,
} from 'lucide-react';
import Seo from './Seo';
import BookingCTA from './BookingCTA';
import QuoteForm from './QuoteForm';
import { useLanguage } from '../context/LanguageContext';
import { landings, cateringServiceJsonLd, type IconName, type LandingId } from '../content/landings';
import { SITE_URL, restaurant } from '../data/restaurant';
import { routes } from '../i18n';

const icons: Record<IconName, LucideIcon> = {
  wheat: Wheat, leaf: Leaf, alert: AlertCircle, calendar: CalendarDays, clock: Clock, coins: Coins, coffee: Coffee,
  users: Users, sun: Sun, car: Car, tram: TramFront, map: MapPin, utensils: UtensilsCrossed, heart: Heart,
  briefcase: Briefcase, sparkles: Sparkles, truck: Truck, cake: Cake,
};

const relatedLabels: Record<string, [string, string]> = {
  menu: ['Notre carte', 'Our menu'],
  catering: ['Service traiteur', 'Catering'],
  weddings: ['Traiteur mariage', 'Wedding catering'],
  corporate: ['Traiteur entreprise', 'Corporate catering'],
  parties: ['Traiteur fête privée', 'Private party catering'],
  glutenFree: ['Sans gluten & vegan', 'Gluten-free & vegan'],
  buffet: ['Buffet du dimanche', 'Sunday buffet'],
  privateHire: ['Privatiser le restaurant', 'Private hire'],
  access: ['Accès & parking', 'Getting here'],
  contact: ['Contact & réservation', 'Contact & booking'],
  history: ['Notre histoire', 'Our story'],
};

const CATERING: LandingId[] = ['weddings', 'corporate', 'parties'];

/** Gabarit commun des pages thématiques. */
const LandingPage = ({ id, children }: { id: LandingId; children?: ReactNode }) => {
  const { lang, L, to } = useLanguage();
  const c = landings[id][lang];
  const path = routes[id][lang];
  const isCatering = CATERING.includes(id);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Makda', item: `${SITE_URL}${routes.home[lang]}` },
      ...(isCatering
        ? [{ '@type': 'ListItem', position: 2, name: L('Traiteur', 'Catering'), item: `${SITE_URL}${routes.catering[lang]}` }]
        : []),
      { '@type': 'ListItem', position: isCatering ? 3 : 2, name: c.hero.h1, item: `${SITE_URL}${path}` },
    ],
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const jsonLd: object[] = [breadcrumb, faq];
  if (isCatering) jsonLd.push(cateringServiceJsonLd(lang, c.hero.h1, path));

  return (
    <>
      <Seo path={path} title={c.title} description={c.description} jsonLd={jsonLd} />

      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <img
            src={c.hero.image}
            srcSet={c.hero.srcSet}
            sizes={c.hero.srcSet ? '100vw' : undefined}
            fetchPriority="high"
            alt={c.hero.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl"
        >
          <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#EBCDAD' }}>{c.hero.kicker}</p>
          <h1 className="text-4xl md:text-6xl font-serif mb-5 text-white" style={{ fontWeight: 400 }}>{c.hero.h1}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto" style={{ fontWeight: 400 }}>{c.hero.lead}</p>
        </motion.div>
      </section>

      <nav aria-label={L("Fil d'Ariane", 'Breadcrumb')} className="px-4 pt-6" style={{ backgroundColor: '#FFF8EF' }}>
        <ol className="container mx-auto max-w-6xl flex flex-wrap gap-2 text-sm" style={{ color: '#7A5852' }}>
          <li><Link to={to('home')} className="underline">{L('Accueil', 'Home')}</Link> /</li>
          {isCatering && (
            <li><Link to={to('catering')} className="underline">{L('Traiteur', 'Catering')}</Link> /</li>
          )}
          <li aria-current="page">{c.hero.h1}</li>
        </ol>
      </nav>

      <section className="px-4 py-12 md:py-16" style={{ backgroundColor: '#FFF8EF' }}>
        <div className="container mx-auto max-w-6xl grid gap-5 md:grid-cols-3">
          {c.highlights.map((h) => {
            const Icon = icons[h.icon];
            return (
              <div key={h.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="bg-gold-light rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-brown-dark" />
                </span>
                <h2 className="text-2xl font-serif mb-2" style={{ color: '#401400' }}>{h.title}</h2>
                <p style={{ color: '#5C3B33' }}>{h.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {c.sections.map((s, i) => (
        <section key={s.h2} className="px-4 py-14 md:py-20" style={{ backgroundColor: i % 2 === 0 ? '#EBCDAD' : '#FFF8EF' }}>
          <div className={`container mx-auto ${s.image ? 'max-w-6xl grid gap-10 lg:grid-cols-2 items-center' : 'max-w-3xl'}`}>
            <div className={s.image && i % 4 === 2 ? 'lg:order-2' : ''}>
              <h2 className="text-3xl md:text-4xl font-serif mb-6" style={{ color: '#401400', fontWeight: 300 }}>{s.h2}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p.slice(0, 30)} className="text-lg leading-relaxed mb-5" style={{ color: '#401400', fontWeight: 400 }}>{p}</p>
              ))}
              {s.bullets && (
                <ul className="space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-lg" style={{ color: '#401400' }}>
                      <Check size={20} className="mt-1 flex-shrink-0" style={{ color: '#5A2B20' }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {id === 'access' && i === 1 && (
                <div className="flex flex-wrap gap-3 mt-2">
                  <a href={restaurant.directionsUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white" style={{ backgroundColor: '#5A2B20', fontWeight: 500 }}>
                    <Navigation size={18} /> {L('Itinéraire', 'Directions')}
                  </a>
                  <a href="https://www.tpg.ch/" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border" style={{ borderColor: '#5A2B20', color: '#5A2B20', fontWeight: 500 }}>
                    {L('Horaires TPG', 'TPG timetable')}
                  </a>
                </div>
              )}
            </div>
            {s.image && (
              <img src={s.image.src} alt={s.image.alt} loading="lazy" className={`w-full h-80 md:h-[26rem] object-cover rounded-2xl shadow-xl ${i % 4 === 2 ? 'lg:order-1' : ''}`} />
            )}
          </div>
        </section>
      ))}

      {children}

      <section className="px-4 py-16 md:py-20" style={{ backgroundColor: '#FFF8EF' }} aria-labelledby="faq">
        <div className="container mx-auto max-w-3xl">
          <h2 id="faq" className="text-3xl md:text-4xl font-serif text-center mb-10" style={{ color: '#401400', fontWeight: 300 }}>
            {L('Questions fréquentes', 'Frequently asked questions')}
          </h2>
          <div className="space-y-3">
            {c.faq.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white p-5 shadow-sm">
                <summary className="cursor-pointer list-none flex justify-between items-center gap-4 text-lg font-semibold" style={{ color: '#401400' }}>
                  {f.q}
                  <span className="transition-transform group-open:rotate-45 text-2xl leading-none" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 leading-relaxed" style={{ color: '#5C3B33' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {c.cta.kind === 'booking' ? (
        <BookingCTA dark title={c.cta.title} text={c.cta.text} />
      ) : (
        <section id="devis" className="px-4 py-16 md:py-24 scroll-mt-28" style={{ backgroundColor: '#EBCDAD' }} aria-labelledby="devis-titre">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <h2 id="devis-titre" className="text-4xl md:text-5xl font-serif mb-4" style={{ color: '#401400', fontWeight: 300 }}>{c.cta.title}</h2>
              <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#401400' }}>{c.cta.text}</p>
            </div>
            <QuoteForm defaultType={c.cta.type} />
          </div>
        </section>
      )}

      <section className="px-4 py-12" style={{ backgroundColor: '#FFF8EF' }}>
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-2xl font-serif mb-6" style={{ color: '#401400' }}>{L('À découvrir aussi', 'You might also like')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {c.related.map((r) => (
              <Link key={r} to={to(r)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border" style={{ borderColor: '#E3CBB0', color: '#5A2B20', fontWeight: 500 }}>
                {L(...(relatedLabels[r] ?? [r, r]))} <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
