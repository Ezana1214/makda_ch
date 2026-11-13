import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import { Check, UtensilsCrossed, Wine, Coffee, Sparkles, ArrowRight } from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { cateringServiceJsonLd } from '../content/landings';

const Catering = () => {
  const { lang, L, to } = useLanguage();
  const benefits = [
    L('Menus personnalisés selon vos préférences', 'Menus tailored to your preferences'),
    L('Présentation traditionnelle spectaculaire', 'Spectacular traditional presentation'),
    L('Options végétariennes et sans gluten', 'Vegetarian and gluten-free options'),
    L('Service professionnel et chaleureux', 'Professional, friendly service'),
  ];

  const features = [
    {
      icon: UtensilsCrossed,
      title: L('Buffets Royaux', 'Royal Buffets'),
      description: L(
        'Grands plateaux à partager (Gebeta) avec injera fraîche et une variété de wats mijotés.',
        'Large sharing platters (gebeta) with fresh injera and a variety of slow-cooked wats.'
      ),
    },
    {
      icon: Wine,
      title: L('Cocktails & Finger Food', 'Cocktails & Finger Food'),
      description: L(
        'Une approche moderne avec des bouchées fines, faciles à déguster lors de vos événements debout.',
        'A modern approach with delicate bites, easy to enjoy at standing receptions.'
      ),
    },
    {
      icon: Coffee,
      title: L('Cérémonie du Café', 'Coffee Ceremony'),
      description: L(
        "L'authentique rituel du Buna avec torréfaction sur place pour émerveiller vos invités.",
        'The authentic buna ritual, with beans roasted on site to delight your guests.'
      ),
    },
    {
      icon: Sparkles,
      title: L('Décoration & Ambiance', 'Décor & Atmosphere'),
      description: L(
        "Service en tenue traditionnelle et mise en place d'une atmosphère immersive.",
        'Service in traditional dress and an immersive atmosphere.'
      ),
    },
  ];

  return (
    <>
      <Seo
        path={to('catering')}
        title={L('Traiteur éthiopien à Genève – mariages, entreprises | Makda', 'Ethiopian catering in Geneva – weddings, corporate | Makda')}
        description={L(
          'Traiteur éthiopien et érythréen à Genève : buffets à partager, finger food, cérémonie du café. Mariages, entreprises et fêtes privées dans toute la Suisse romande.',
          'Ethiopian and Eritrean catering in Geneva: sharing buffets, finger food and coffee ceremony for weddings, corporate events and private parties across French-speaking Switzerland.'
        )}
        jsonLd={cateringServiceJsonLd(lang)}
      />

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/source/traiteur-buffet.webp"
            srcSet="/source/traiteur-buffet-960.webp 960w, /source/traiteur-buffet.webp 1920w"
            sizes="100vw"
            alt={L('Buffet du service traiteur Makda', 'Makda catering buffet')}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-serif mb-4 text-white" style={{ fontWeight: 400 }}>{L('Traiteur éthiopien à Genève', 'Ethiopian catering in Geneva')}</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto" style={{ fontWeight: 400 }}>
            {L(
              'Apportez la magie de Makda à vos événements. Une expérience culinaire inoubliable pour vos invités.',
              'Bring the magic of Makda to your event. An unforgettable culinary experience for your guests.'
            )}
          </p>
        </motion.div>
      </section>

      <section className="pt-16 md:pt-24 pb-12 md:pb-16 px-4" style={{ backgroundColor: '#EBCDAD' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight" style={{ fontWeight: 300, color: '#401400' }}>
                {L("Pour vos moments d'exception", 'For your special occasions')}
              </h2>
              <p className="text-lg leading-relaxed mb-10" style={{ fontWeight: 400, color: '#401400' }}>
                {L(
                  "Que ce soit pour un mariage fastueux, un événement d'entreprise prestigieux ou une fête intime entre amis, notre service traiteur s'adapte à vos besoins. Nous proposons bien plus qu'un repas : une véritable immersion culturelle.",
                  'Whether it is a lavish wedding, a prestigious corporate event or an intimate party with friends, our catering adapts to your needs. We offer far more than a meal: a true cultural experience.'
                )}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="rounded-full flex-shrink-0 flex items-center justify-center w-9 h-9" style={{ backgroundColor: '#FFF3E6', border: '1.5px solid #8B6F47' }}>
                      <Check size={18} className="text-brown-dark" />
                    </span>
                    <span className="pt-1.5 leading-snug" style={{ fontWeight: 300, color: '#401400' }}>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              <a
                href="#devis"
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity text-base"
                style={{ backgroundColor: '#5A2B20', fontWeight: 500 }}
              >
                {L('Demander un devis', 'Request a quote')}
                <ArrowRight size={18} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4 md:gap-6"
            >
              <img
                src="/source/traiteur-plateau.webp"
                alt={L('Plats éthiopiens en chafing dish', 'Ethiopian dishes in chafing dishes')}
                loading="lazy"
                className="w-full h-64 md:h-[26rem] object-cover rounded-2xl shadow-2xl"
              />
              <img
                src="/source/traiteur-evenement.webp"
                alt={L('Service du buffet lors d\'un événement', 'Buffet service at an event')}
                loading="lazy"
                className="w-full h-64 md:h-[26rem] object-cover rounded-2xl shadow-2xl mt-10 md:mt-16"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pt-8 md:pt-12 pb-16 md:pb-24 px-4" style={{ backgroundColor: '#EBCDAD' }}>
        <div className="container mx-auto max-w-6xl rounded-3xl px-6 py-12 md:px-12 md:py-16" style={{ backgroundColor: '#401400' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white" style={{ fontWeight: 300 }}>
              {L("L'Expérience Traiteur Makda", 'The Makda Catering Experience')}
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-white/80" style={{ fontWeight: 400 }}>
              {L(
                'Des solutions sur mesure pour faire de chaque occasion un moment inoubliable.',
                'Tailor-made options to make every occasion unforgettable.'
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center rounded-2xl p-6 md:p-7 border border-white/10 bg-white/5"
                >
                  <span className="bg-gold-light rounded-full w-14 h-14 mx-auto mb-5 flex items-center justify-center">
                    <Icon size={26} className="text-brown-dark" />
                  </span>
                  <h3 className="text-xl font-serif mb-3 text-white" style={{ fontWeight: 300 }}>{feature.title}</h3>
                  <p className="leading-relaxed text-sm text-white/80" style={{ fontWeight: 400 }}>{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <a
              href="#devis"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full hover:opacity-90 transition-opacity text-base"
              style={{ backgroundColor: '#EBCDAD', color: '#401400', fontWeight: 500 }}
            >
              {L('Planifier mon événement', 'Plan my event')}
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 pt-16 md:pt-20" style={{ backgroundColor: '#FFF8EF' }} aria-labelledby="occasions">
        <div className="container mx-auto max-w-6xl">
          <h2 id="occasions" className="text-4xl md:text-5xl font-serif text-center mb-10" style={{ color: '#401400', fontWeight: 300 }}>
            {L('Par occasion', 'By occasion')}
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { id: 'weddings' as const, img: '/source/buffet-poulet-makda-800.webp', t: L('Mariages', 'Weddings'), d: L('Un festin à partager pour le plus beau jour.', 'A sharing feast for the big day.') },
              { id: 'corporate' as const, img: '/source/buffet-salle-makda-800.webp', t: L('Entreprises', 'Corporate'), d: L('Séminaires, apéritifs, repas d\'équipe.', 'Seminars, receptions, team meals.') },
              { id: 'parties' as const, img: '/source/convives-makda-800.webp', t: L('Fêtes privées', 'Private parties'), d: L('Anniversaires, baptêmes, fêtes de famille.', 'Birthdays, christenings, family gatherings.') },
            ].map((o) => (
              <Link key={o.id} to={to(o.id)} className="group rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={o.img} alt="" loading="lazy" width={800} height={450} className="w-full aspect-video object-cover" />
                <div className="p-5">
                  <h3 className="text-2xl font-serif mb-1 inline-flex items-center gap-2" style={{ color: '#401400' }}>
                    {o.t} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p style={{ color: '#5C3B33' }}>{o.d}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="devis" className="px-4 py-16 md:py-24 scroll-mt-28" style={{ backgroundColor: '#FFF8EF' }} aria-labelledby="devis-titre">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 id="devis-titre" className="text-4xl md:text-5xl font-serif mb-4" style={{ color: '#401400', fontWeight: 300 }}>
              {L('Demandez votre devis', 'Request your quote')}
            </h2>
            <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#5C3B33' }}>
              {L(
                'Quelques informations sur votre événement et nous vous préparons une proposition sur mesure. Nous nous déplaçons dans toute la Suisse romande.',
                'Tell us a little about your event and we will prepare a tailored proposal. We travel throughout French-speaking Switzerland.'
              )}
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
};

export default Catering;
