import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GoogleReviewBadge from '../components/GoogleReviewBadge';

interface HomeProps {
  onReserveClick: () => void;
}

const Home = ({ onReserveClick }: HomeProps) => {
  return (
    <>
      <Helmet>
        <title>Makda Restaurant - Cuisine Éthiopienne Authentique à Genève</title>
        <meta name="description" content="Découvrez la cuisine éthiopienne authentique à Bernex, Genève. Un voyage culinaire au cœur de l'Afrique avec service traiteur pour tous vos événements." />
      </Helmet>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Cuisine éthiopienne authentique"
            className="w-full h-full object-cover bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, oklab(34.9897% .0594851 .0405992/.15), transparent)' }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
        >
          <p className="text-sm md:text-base mb-4 uppercase tracking-widest text-accent">
            Restaurant Éthiopien & Érythréen
          </p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight text-white" style={{ fontWeight: 100 }}>
            Un voyage culinaire<br />au cœur de l'Afrique
          </h1>
          <p className="text-lg md:text-xl mb-10 text-text max-w-3xl mx-auto" style={{ fontWeight: 100 }}>
            Une expérience authentique à Bernex, où chaque plat raconte une histoire millénaire de partage et de saveurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/menu"
              className="text-brown-dark px-8 py-4 rounded-full hover:opacity-90 transition-opacity text-base inline-flex items-center justify-center gap-2"
              style={{ backgroundColor: '#D3B695', fontWeight: 300 }}
            >
              Découvrir le Menu
            </Link>
            <button
              onClick={onReserveClick}
              className="border border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-brown-dark transition-colors text-base backdrop-blur-sm bg-white/10"
              style={{ fontWeight: 100 }}
            >
              Réserver une table
            </button>
          </div>
          <div className="flex items-center justify-center">
            <GoogleReviewBadge />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            />
          </div>
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
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Intérieur du restaurant"
                  className="w-full h-80 object-cover rounded-2xl shadow-xl"
                />
                <img
                  src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Ambiance chaleureuse"
                  className="w-full h-80 object-cover rounded-2xl shadow-xl mt-12"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6" style={{ color: '#5A2B20', fontWeight: 100 }}>
                Vivez l'ambiance authentique de Makda
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#7A5852', fontWeight: 100 }}>
                Plongez dans un cadre authentique et accueillant, où chaque détail a été pensé pour vous offrir une expérience unique. Que ce soit pour un dîner en famille ou entre amis, Makda est l'endroit idéal.
              </p>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#7A5852', fontWeight: 100 }}>
                Laissez-vous transporter par une atmosphère conviviale et des saveurs raffinées qui éveilleront vos sens. Profitez d'un moment de détente et de partage autour de la richesse culinaire de la Corne de l'Afrique.
              </p>
              <Link
                to="/histoire"
                className="inline-flex items-center gap-2 text-lg hover:gap-4 transition-all underline"
                style={{ color: '#5A2B20', fontWeight: 100 }}
              >
                Notre histoire et traditions
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 text-white" style={{ backgroundColor: '#401400' }}>
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: '#E5C7A4' }}>Traiteur & Événements</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-6" style={{ color: '#FFFFFF', fontWeight: 100 }}>
              Nos Services sur Mesure
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-16 font-thin" style={{ color: '#D9D1CC' }}>
              Au-delà de notre restaurant, nous apportons l'excellence de Makda à vos événements les plus précieux.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" style={{ backgroundColor: '#5A2B20' }}>
            {[
              {
                title: 'Mariages',
                description: 'Faites de votre jour spécial un véritable festin pour vos proches avec nos menus élégants.',
                image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800',
              },
              {
                title: 'Événements d\'entreprise',
                description: 'Séminaires, cocktails, ou dîners de gala, une touche d\'excellence pour vos pro.',
                image: 'https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=800',
              },
              {
                title: 'Fêtes privées',
                description: 'Anniversaires ou soirées entre amis, nous prenons soin de tout pour vous.',
                image: 'https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg?auto=compress&cs=tinysrgb&w=800',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-cream text-brown-dark rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif mb-3" style={{ fontWeight: 300 }}>{service.title}</h3>
                  <p className="text-brown-dark/80 leading-relaxed mb-4" style={{ fontWeight: 100 }}>{service.description}</p>
                  <Link
                    to="/catering"
                    className="inline-flex items-center gap-2 text-gold-muted hover:gap-4 transition-all text-sm"
                    style={{ fontWeight: 300 }}
                  >
                    EN SAVOIR PLUS
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/catering"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-brown-dark transition-colors text-base"
              style={{ fontWeight: 300 }}
            >
              Voir toutes nos offres traiteur
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
