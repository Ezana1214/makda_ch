import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import BookingCTA from '../components/BookingCTA';
import { useLanguage } from '../context/LanguageContext';

const chapters = [
  {
    fr: {
      kicker: 'Les racines',
      title: 'Née au Tigray',
      text: [
        "La cuisinière de Makda vient du Tigray, dans le nord de l'Éthiopie. C'est là qu'elle a appris les gestes et les saveurs qu'on retrouve aujourd'hui dans nos assiettes.",
        "À la fin des années 1990, la guerre la pousse à quitter son pays. Elle trouve refuge en Suisse, où elle construit une nouvelle vie.",
      ],
    },
    en: {
      kicker: 'Roots',
      title: 'Born in Tigray',
      text: [
        "Makda's cook comes from Tigray, in northern Ethiopia. That is where she learned the techniques and flavours you find on our plates today.",
        'In the late 1990s, war forced her to leave her country. She found refuge in Switzerland, where she built a new life.',
      ],
    },
  },
  {
    fr: {
      kicker: 'Des années en cuisine',
      title: 'Le métier, recette après recette',
      text: [
        'En Suisse, elle travaille dans plusieurs restaurants éthiopiens tout en élevant ses enfants. Service après service, elle affine ses sauces et ses mélanges d’épices.',
        "Elle perfectionne surtout son injera au teff, qui n'a pas le goût acidulé prononcé qu'on lui connaît souvent : une galette souple, douce et légère, qui laisse toute la place aux plats.",
      ],
    },
    en: {
      kicker: 'Years in the kitchen',
      title: 'A craft, recipe by recipe',
      text: [
        'In Switzerland she worked in several Ethiopian restaurants while raising her children. Service after service, she refined her sauces and spice blends.',
        'Above all, she perfected her teff injera, which does not have the strong sour taste it is often known for: a soft, mild, light flatbread that lets the dishes shine.',
      ],
    },
  },
  {
    fr: {
      kicker: 'Le nom',
      title: 'Makda, la reine de Saba',
      text: [
        "Dans la tradition éthiopienne, Makda est le nom de la reine de Saba. Elle est une figure qui inspire les femmes en Éthiopie, et notre cheffe en particulier, pour la force avec laquelle elle a régné sur le royaume de Saba.",
        'Donner son nom au restaurant, c’était une façon de rendre hommage à cette femme, et à toutes celles qui tiennent leur maison et leur table avec la même détermination.',
      ],
    },
    en: {
      kicker: 'The name',
      title: 'Makda, the Queen of Sheba',
      text: [
        'In Ethiopian tradition, Makda is the name of the Queen of Sheba. She is a figure who inspires women in Ethiopia, and our chef in particular, for the strength with which she ruled the kingdom of Sheba.',
        'Naming the restaurant after her is a tribute to that woman, and to every woman who runs her home and her table with the same determination.',
      ],
    },
  },
  {
    fr: {
      kicker: 'Aujourd’hui',
      title: 'Sa table à Bernex',
      text: [
        'Elle ouvre enfin son propre restaurant à Bernex. Elle y cuisine chaque jour ses plats, son injera et ses sauces, avec la même exigence qu’à ses débuts.',
      ],
    },
    en: {
      kicker: 'Today',
      title: 'Her own table in Bernex',
      text: [
        'She finally opened her own restaurant in Bernex. She cooks her dishes, her injera and her sauces there every day, with the same care as when she started.',
      ],
    },
  },
];

const History = () => {
  const { L, to } = useLanguage();
  return (
    <>
      <Seo
        path={to('history')}
        title={L('Notre histoire : du Tigray à Bernex – Makda', 'Our story: from Tigray to Bernex – Makda')}
        description={L(
          "L'histoire de Makda : une cuisinière originaire du Tigray, des années dans les cuisines éthiopiennes de Suisse, une injera au teff perfectionnée et un restaurant nommé d'après la reine de Saba.",
          'The story of Makda: a cook from Tigray, years in Ethiopian kitchens across Switzerland, a perfected teff injera and a restaurant named after the Queen of Sheba.'
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
          <h1 className="text-5xl md:text-6xl font-serif mb-4 text-white" style={{ fontWeight: 400 }}>{L('Notre histoire', 'Our story')}</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto" style={{ fontWeight: 400 }}>
            {L('Du Tigray à Bernex : le parcours d’une cuisinière et de sa table.', 'From Tigray to Bernex: the journey of a cook and her table.')}
          </p>
        </motion.div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-cream">
        <div className="container mx-auto max-w-3xl">
          {chapters.map((c, i) => (
            <motion.div
              key={c.fr.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative pl-10 md:pl-14 pb-14 last:pb-0"
            >
              <span className="absolute left-0 top-1 w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center text-sm md:text-base text-white" style={{ backgroundColor: '#A83D2E', fontWeight: 700 }}>
                {i + 1}
              </span>
              {i < chapters.length - 1 && (
                <span className="absolute left-[13px] md:left-[17px] top-10 bottom-2 w-px" style={{ backgroundColor: '#E3CBB0' }} aria-hidden="true" />
              )}
              <p className="text-sm uppercase tracking-widest mb-2" style={{ color: '#A83D2E', fontWeight: 700 }}>{L(c.fr.kicker, c.en.kicker)}</p>
              <h2 className="text-3xl md:text-4xl font-serif mb-4" style={{ color: '#401400', fontWeight: 300 }}>{L(c.fr.title, c.en.title)}</h2>
              {L(c.fr.text, c.en.text).map((t) => (
                <p key={t.slice(0, 24)} className="text-lg leading-relaxed mb-4" style={{ color: '#401400', fontWeight: 400 }}>{t}</p>
              ))}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 rounded-2xl p-8 md:p-12 text-center"
            style={{ backgroundColor: '#401400' }}
          >
            <p className="text-2xl md:text-3xl font-serif text-white leading-snug" style={{ fontWeight: 300 }}>
              {L(
                'Son souhait est simple : que chacun reparte avec un peu de chaleur, après un bon moment partagé en famille, entre amis ou entre collègues.',
                'Her wish is simple: that everyone leaves with a little warmth, after a good time shared with family, friends or colleagues.'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pt-16 px-4" style={{ backgroundColor: '#EBCDAD' }}>
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-4xl md:text-5xl font-serif" style={{ fontWeight: 300, color: '#401400' }}>
            {L('Nos traditions', 'Our traditions')}
          </h2>
        </div>
      </section>

      <section className="py-12 md:pb-20 px-4" style={{ backgroundColor: '#EBCDAD' }}>
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
