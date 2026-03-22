import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const History = () => {
  return (
    <>
      <Helmet>
        <title>Notre Histoire - Makda Restaurant</title>
        <meta name="description" content="Découvrez l'histoire et les traditions de la cuisine éthiopienne : le Mesob, la cérémonie du café Buna, et l'esprit du partage." />
      </Helmet>

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/vlcsnap-2025-11-16-22h44m56s190.png"
            alt="Histoire Makda"
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
          <h1 className="text-5xl md:text-6xl font-serif mb-4 text-white" style={{ fontWeight: 100 }}>Histoire & Traditions</h1>
          <p className="text-xl md:text-2xl text-white/90" style={{ fontWeight: 100 }}>Les racines de Makda, entre héritage millénaire et modernité.</p>
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
            <p className="text-xl md:text-2xl text-brown-dark leading-relaxed italic" style={{ fontWeight: 100 }}>
              "Au cœur de Makda, chaque assiette raconte un héritage millénaire : la sagesse de la Reine de Saba, le parfum acidulé de l'injera au teff, la chaleur d'un café cérémoniel partagé."
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4" style={{ backgroundColor: '#FFDBB5' }}>
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6" style={{ fontWeight: 300, color: '#401400' }}>
                L'Esprit du Partage
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ fontWeight: 100, color: '#401400' }}>
                En Éthiopie et en Érythrée, manger est un acte communautaire. Le plat est servi dans un « mesob » (panier tressé), sur un grand plateau commun. On mange avec la main droite, en utilisant l'injera – une galette fermentée au levain – comme ustensile pour saisir les ragoûts épicés (wats).
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{ fontWeight: 100, color: '#401400' }}>
                Cette tradition, appelée « gursha », consiste parfois à nourrir un ami ou un membre de sa propre main en signe d'affection et de respect. Chez Makda, nous préservons cette convivialité sacrée.
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
                src="https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Mesob traditionnel"
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
                src="/design_sans_titre_(5).png"
                alt="Cérémonie du café"
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
                La Cérémonie du Café (Buna)
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ fontWeight: 100, color: '#401400' }}>
                Le café est originaire d'Éthiopie (région de Kaffa). La cérémonie du café est un rituel central de la vie sociale. Les grains verts sont lavés, torréfiés sur des braises chaudes devant les invités – emplissant la pièce d'un arôme envoûtant – puis moulus au mortier.
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{ fontWeight: 100, color: '#401400' }}>
                Le café est ensuite infusé dans une « jebena » (verseuse en argile) et servi dans de petites tasses sans anse. C'est un moment de temps suspendu, de conversation et de connexion que nous sommes fiers de partager avec vous.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default History;
