import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import BookingCTA from '../components/BookingCTA';
import { useLanguage } from '../context/LanguageContext';

const History = () => {
  const { L, to } = useLanguage();
  return (
    <>
      <Seo
        path={to('history')}
        title={L('Notre histoire et la cérémonie du café – Makda Bernex', 'Our story and the coffee ceremony – Makda, Bernex')}
        description={L(
          "L'histoire de Makda et les traditions éthiopiennes et érythréennes : le partage autour du mesob, l'injera au teff et la cérémonie du café.",
          'The story of Makda and Ethiopian and Eritrean traditions: sharing around the mesob, teff injera and the coffee ceremony.'
        )}
      />

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/source/histoire-makda.webp"
            fetchPriority="high"
            alt={L('Panier traditionnel dans la salle du restaurant Makda', 'Traditional basket in the dining room at Makda')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-serif mb-4 text-white" style={{ fontWeight: 400 }}>{L('Histoire & Traditions', 'Story & Traditions')}</h1>
          <p className="text-xl md:text-2xl text-white/90" style={{ fontWeight: 400 }}>{L('Les racines de Makda, entre héritage millénaire et modernité.', 'The roots of Makda, where ancient heritage meets today.')}</p>
        </motion.div>
      </section>

      <section className="py-16 px-4 bg-cream">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16"
          >
            <p className="text-xl md:text-2xl text-brown-dark leading-relaxed italic" style={{ fontWeight: 400 }}>
              {L(
                "« Au cœur de Makda, chaque assiette raconte un héritage millénaire : la sagesse de la Reine de Saba, le parfum acidulé de l'injera au teff, la chaleur d'un café cérémoniel partagé. »",
                '“At the heart of Makda, every plate carries an ancient heritage: the wisdom of the Queen of Sheba, the tangy aroma of teff injera, the warmth of a shared ceremonial coffee.”'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4" style={{ backgroundColor: '#EBCDAD' }}>
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6" style={{ fontWeight: 300, color: '#401400' }}>
                {L("L'Esprit du Partage", 'The Spirit of Sharing')}
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ fontWeight: 400, color: '#401400' }}>
                {L(
                  "En Éthiopie et en Érythrée, manger est un acte communautaire. Le plat est servi dans un « mesob » (panier tressé), sur un grand plateau commun. On mange avec la main droite, en utilisant l'injera – une galette fermentée au levain – comme ustensile pour saisir les ragoûts épicés (wats).",
                  'In Ethiopia and Eritrea, eating is a communal act. The meal is served in a mesob (woven basket) on one large shared platter. You eat with your right hand, using injera – a fermented sourdough flatbread – to scoop up the spiced stews (wats).'
                )}
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{ fontWeight: 400, color: '#401400' }}>
                {L(
                  "Une autre tradition, le « gursha », consiste à nourrir un ami ou un proche de sa propre main en signe d'affection et de respect. Chez Makda, nous préservons cette convivialité sacrée.",
                  'Another tradition, gursha, means feeding a friend or relative with your own hand as a sign of affection and respect. At Makda, we keep this cherished conviviality alive.'
                )}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px]"
            >
              <img
                src="/source/partage-makda.webp"
                loading="lazy"
                alt={L('Clients partageant un repas dans la salle du restaurant Makda', 'Guests sharing a meal at Makda')}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 relative h-[500px]"
            >
              <img
                src="/source/ceremonie-cafe.webp"
                alt={L('Cérémonie du café éthiopienne avec la jebena', 'Ethiopian coffee ceremony with the jebena')}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6" style={{ fontWeight: 300, color: '#401400' }}>
                {L('La Cérémonie du Café (Buna)', 'The Coffee Ceremony (Buna)')}
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ fontWeight: 400, color: '#401400' }}>
                {L(
                  "Le café est originaire d'Éthiopie (région de Kaffa). La cérémonie du café est un rituel central de la vie sociale. Les grains verts sont lavés, torréfiés sur des braises chaudes devant les invités – emplissant la pièce d'un arôme envoûtant – puis moulus au mortier.",
                  'Coffee comes from Ethiopia (the Kaffa region). The coffee ceremony is a central ritual of social life. The green beans are washed, roasted over hot coals in front of the guests – filling the room with a captivating aroma – then ground with a mortar.'
                )}
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{ fontWeight: 400, color: '#401400' }}>
                {L(
                  "Le café est ensuite infusé dans une « jebena » (verseuse en argile) et servi dans de petites tasses sans anse. C'est un moment de temps suspendu, de conversation et de connexion que nous sommes fiers de partager avec vous.",
                  'The coffee is then brewed in a jebena (clay pot) and served in small handleless cups. It is a moment when time stands still, made for conversation and connection, and we are proud to share it with you.'
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <BookingCTA
        title={L('Venez vivre la tradition', 'Come and share the tradition')}
        text={L(
          'Partagez un plat sur injera et terminez par une cérémonie du café. Réservez en ligne ou par téléphone ; tout est aussi disponible à emporter.',
          'Share a platter on injera and finish with a coffee ceremony. Book online or by phone; everything is also available to take away.'
        )}
      />
    </>
  );
};

export default History;
