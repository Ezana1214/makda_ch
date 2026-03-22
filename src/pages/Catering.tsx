import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Catering = () => {
  const benefits = [
    'Menus personnalisés selon vos préférences',
    'Présentation traditionnelle spectaculaire',
    'Options végétariennes et sans gluten',
    'Service professionnel et chaleureux',
  ];

  const features = [
    {
      icon: '🍽️',
      title: 'Buffets Royaux',
      description: 'Grands plateaux à partager (Gebeta) avec plats fraîche et une variété de wats mijotés.',
    },
    {
      icon: '🥂',
      title: 'Cocktails & Finger Food',
      description: 'Une approche moderne avec des bouchées fines et mets portées pour vos événements debout.',
    },
    {
      icon: '☕',
      title: 'Cérémonie du Café',
      description: 'L\'authentique rituel du Buna avec torréfaction sur place pour émerveiller vos invités.',
    },
    {
      icon: '✨',
      title: 'Décoration & Ambiance',
      description: 'Service en tenue traditionnelle et mise en place d\'une atmosphère immersive.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Service Traiteur - Makda Restaurant</title>
        <meta name="description" content="Service traiteur éthiopien pour mariages, événements d'entreprise et fêtes privées. Buffets royaux, cérémonie du café et plus encore." />
      </Helmet>

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/design_sans_titre_(7).png"
            alt="Service traiteur"
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
          <h1 className="text-5xl md:text-6xl font-serif mb-4 text-white" style={{ fontWeight: 100 }}>Service Traiteur</h1>
          <p className="text-xl md:text-2xl text-white/90" style={{ fontWeight: 100 }}>
            Apportez la magie de Makda à vos événements. Une expérience culinaire<br />inoubliable pour vos invités.
          </p>
        </motion.div>
      </section>

      <section className="py-24 px-4" style={{ backgroundColor: '#FFDBB5' }}>
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-8" style={{ fontWeight: 300, color: '#401400' }}>
                Pour vos moments d'exception
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ fontWeight: 100, color: '#401400' }}>
                Que ce soit pour un mariage fastueux, un événement d'entreprise prestigieux ou une fête intime entre amis, notre service traiteur s'adapte à vos besoins. Nous proposons bien plus qu'un repas : une véritable immersion culturelle.
              </p>
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#FFDCB5', border: '2px solid #8B6F47', width: '44px', height: '44px' }}>
                      <Check size={20} className="text-brown-dark" />
                    </div>
                    <span style={{ fontWeight: 100, color: '#401400' }}>{benefit}</span>
                  </motion.div>
                ))}
              </div>
              <button className="text-white px-8 py-4 rounded-full transition-colors text-base" style={{ backgroundColor: '#5A2B20', fontWeight: 300 }}>
                Demander un devis
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4 items-center"
            >
              <img
                src="/design_sans_titre_(10).png"
                alt="Buffet éthiopien"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
              <img
                src="/design_sans_titre_(9).png"
                alt="Événement"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4" style={{ backgroundColor: '#FFDBB5' }}>
        <div className="container mx-auto max-w-7xl" style={{ backgroundColor: '#401400', borderRadius: '24px', padding: '40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white" style={{ fontWeight: 300 }}>
              L'Expérience Traiteur Makda
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-white/80" style={{ fontWeight: 100 }}>
              Des solutions sur mesure pour faire de chaque occasion un moment inoubliable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-serif mb-4 text-white" style={{ fontWeight: 300 }}>{feature.title}</h3>
                <p className="leading-relaxed text-sm text-white/80" style={{ fontWeight: 100 }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-8 py-4 rounded-full transition-colors text-base" style={{ backgroundColor: '#FBD8B1', color: '#401400', fontWeight: 300 }}>
              Planifier mon événement
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Catering;
