import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const Menu = () => {
  const [activeTab, setActiveTab] = useState('entrees');

  const tabs = [
    { id: 'entrees', label: 'Entrées' },
    { id: 'carnes', label: 'Plats Carnés*' },
    { id: 'vegetariens', label: 'Plats Végétariens' },
    { id: 'desserts', label: 'Desserts & Café' },
    { id: 'vins', label: 'Vins' },
    { id: 'boissons', label: 'Boissons' },
  ];

  const menuItems = {
    entrees: [
      {
        name: 'SAMBUSA VÉGÉTARIEN (3 PIÈCES)',
        description: 'TRIANGLE DE PÂTE FINEMENT CROUSTILLANTE, FARCIE DE LÉGUMES ÉPICÉS, RELEVÉE D\'UNE POINTE DE CUMIN ET DE CORIANDRE, ACCOMPAGNÉ DE NOTRE AWAZÉ — UNE SAUCE TRADITIONNELLE À BASE DE PIMENT, D\'AIL ET D\'ÉPICES FERMENTÉES',
        price: '6 CHF',
        image: '/source/sambusa.jpeg',
      },
    ],
    carnes: [
      {
        name: 'KITFO (BŒUF)',
        description: 'VERSION ÉTHIOPIENNE DU STEAK TARTARE : VIANDE DE BŒUF HACHÉE MÉLANGÉE À DU KIBBEH (BEURRE ÉPICÉ), DU MITMITA (PIMENTS EN POUDRE)',
        price: '28 CHF',
        image: 'https://images.pexels.com/photos/8477849/pexels-photo-8477849.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'ZIGNI (BŒUF)',
        description: 'RAGOÛT À BASE DE VIANDE ET ASSAISONNÉS AU PIMENTS, OIGNONS ET AILS',
        price: '22 CHF',
        image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'TIBS (BŒUF OU AGNEAU)',
        description: 'TENDRES CUBES DE VIANDES MARINÉS DANS NOTRE SAUCE SIGNATURE PUIS SAUTÉS À LA POÊLE (AVEC OIGNON ROUGE, PIMENTS, AIL FRAIS ET TOMATES)',
        price: '26 CHF',
        image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'DORO WET (POULET)',
        description: 'CUISSE DE POULET (MIJOTÉE AVEC OIGNON, AIL, BERBERÉ) FINIE AVEC DU KIBBEH (BEURRE ÉPICÉ) AVEC UN ŒUF DUR ET DE L\'AYIB (FROMAGE FRAIS)',
        price: '24 CHF',
        image: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'DORO ALECHA (POULET)',
        description: 'CUISSES DE POULET (MIJOTÉE AVEC OIGNON, AIL) ET UNE SAUCE DOUCE AU CURCUMA',
        price: '24 CHF',
        image: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    ],
    vegetariens: [
      {
        name: 'MISIR WAT',
        description: 'LENTILLES ROUGES DANS LA SAUCE BERBERÉ (AVEC AIL FRAIS ET OIGNON)',
        price: '20 CHF',
        image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'SHIRO',
        description: 'POIS CASSÉS MOULUS RÔTIS AVEC DE L\'OIGNON, DE L\'AIL FRAIS, DES TOMATES',
        price: '20 CHF',
        image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    ],
    desserts: [
      {
        name: 'CRÈME GLACÉES',
        description: 'DES GLACES ARTISANALES, FABRIQUÉES À BERNEX AVEC DES INGRÉDIENTS NATURELS ET UN SAVOIR-FAIRE LOCAL IRRÉPROCHABLE. SIMPLES, PURES ET INCROYABLEMENT SAVOUREUSES (CARAMEL BEURRE SALÉ, FIOR DI LATTE, CHOCOLAT)',
        price: '6 CHF',
        image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    ],
    vins: [
      {
        name: 'DIOLINOIR',
        description: 'ROBE SOMBRE, ARÔMES ÉPICÉS ET FRUITÉS, TOUCHE SAUVAGE (VINS GUYOT)',
        price: '6.5 CHF / 42 CHF',
        image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'TROIS HELVÈTES',
        description: 'TRÈS FRUITÉ ET ÉPICÉ, AVEC DE BEAUX TANINS SOYEUX, BELLE STRUCTURE (VINS GUYOT)',
        price: '6 CHF / 36 CHF',
        image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'PINOT NOIR',
        description: 'NOTES DE VIOLETTE, FRUITS ROUGES ET SOUS-BOIS (DOMAINE DE BEAUVENT)',
        price: '6 CHF / 38 CHF',
        image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'GAMAY',
        description: 'FRUITÉ, LÉGER, BIEN ÉQUILIBRÉ AVEC UNE TOUCHE VÉGÉTALE (DOMAINE DE BEAUVENT)',
        price: '5.5 CHF',
        image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'CHASSELAS',
        description: 'SEC, FLORAL ET FRAIS, TOUCHE DE LEVURE EN FINALE (DOMAINE DE BEAUVENT)',
        price: '5 CHF / 32 CHF',
        image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'ROSÉ DE GAMAY',
        description: 'FRAIS, FRUITÉ ET ROND, AVEC UNE BELLE PERSISTANCE (DOMAINE DE BEAUVENT)',
        price: '5 CHF',
        image: 'https://images.pexels.com/photos/2294349/pexels-photo-2294349.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    ],
    boissons: [
      {
        name: 'TEJ',
        description: 'HYDROMEL TRADITIONNEL AU MIEL FERMENTÉ, DOUX ET SUBTILEMENT FLORAL',
        price: '5 CHF',
        image: 'https://images.pexels.com/photos/2702674/pexels-photo-2702674.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'TELLA',
        description: 'BIÈRE TRADITIONNELLE ARTISANALE, LÉGÈRE ET DOUCE, BRASSÉE AVEC DES CÉRÉALES ET DES ÉPICES. UNE BOISSON CONVIVIALE AU GOÛT SUBTIL ET AUTHENTIQUE',
        price: '5 CHF',
        image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'BIÈRE PÈRE JAKOB',
        description: 'BIÈRE ARTISANALE DE LA BRASSERIE PÈRE JAKOB À SORAL, BLONDE LÉGÈRE AUX ARÔMES DE CÉRÉALES TOASTÉES ET D\'AGRUMES, AU CORPS ÉQUILIBRÉ',
        price: '6 CHF',
        image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Notre Menu - Makda Restaurant</title>
        <meta name="description" content="Découvrez notre menu de cuisine éthiopienne authentique : entrées, plats carnés, végétariens, desserts et boissons traditionnelles." />
      </Helmet>

      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Menu Makda"
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
          <h1 className="text-5xl md:text-6xl font-serif mb-4 text-white" style={{ fontWeight: 100 }}>Notre Menu</h1>
          <p className="text-xl" style={{ fontWeight: 100, color: '#ECEDEA' }}>Une exploration des saveurs authentiques, des épices envoûtantes et des<br />traditions culinaires de l'Éthiopie.</p>
        </motion.div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: '#FBD8B1' }}>
        <div className="container mx-auto max-w-7xl">
          <div className="inline-flex items-center justify-center rounded-full p-1.5 mb-12 mx-auto block" style={{ backgroundColor: '#FDFBF7' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#5A2B20] text-white shadow-md'
                    : 'bg-transparent text-[#5A2B20] hover:bg-black/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 max-w-5xl mx-auto"
          >
            {menuItems[activeTab as keyof typeof menuItems].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row items-stretch bg-brown-dark">
                  <div className="w-full sm:w-80 h-80 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6 relative flex flex-col justify-center" style={{ backgroundColor: '#FFFFFF' }}>
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm" style={{ backgroundColor: '#FBF5F5', color: '#A83D2E', fontWeight: 600 }}>
                      {item.price}
                    </div>
                    <h3 className="text-2xl mb-3 pr-24 font-bold uppercase tracking-wide" style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#d4513e' }}>
                      {item.name}
                    </h3>
                    <p className="leading-relaxed text-sm uppercase" style={{ fontWeight: 100, color: '#7A5852' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 flex items-center justify-center" style={{ backgroundColor: '#FFDCB5' }}>
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-4 p-8" style={{ backgroundColor: '#401400', borderRadius: '12px', maxWidth: '70%', margin: '0 auto' }}
          >
            <AlertCircle size={32} className="flex-shrink-0 mt-1" style={{ color: '#D9D1CC' }} />
            <div>
              <h3 className="text-2xl font-serif mb-4" style={{ fontWeight: 300, color: '#D9D1CC' }}>Allergies & Régimes</h3>
              <p className="leading-relaxed" style={{ fontWeight: 100, color: '#D9D1CC' }}>
                Notre cuisine est naturellement riche en options végétariennes et sans gluten. N'hésitez pas à informer notre personnel de vos allergies ou intolérances.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Menu;
