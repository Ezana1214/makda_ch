import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { useLanguage } from '../context/LanguageContext';

const NotFound = () => {
  const { L, to } = useLanguage();
  return (
    <>
      <Seo path="/404" title={L('Page introuvable – Makda', 'Page not found – Makda')} description={L("Cette page n'existe pas ou a été déplacée.", 'This page does not exist or has moved.')} noindex />
      <section className="min-h-[70vh] flex items-center justify-center px-4 py-20" style={{ backgroundColor: '#EBCDAD' }}>
        <div className="text-center max-w-xl">
          <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#5A2B20' }}>{L('Erreur 404', 'Error 404')}</p>
          <h1 className="text-4xl md:text-5xl font-serif mb-6" style={{ color: '#401400', fontWeight: 300 }}>
            {L("Cette page n'existe pas", 'This page does not exist')}
          </h1>
          <p className="text-lg mb-10" style={{ color: '#401400', fontWeight: 400 }}>
            {L('Elle a peut-être été déplacée. Retrouvez notre carte ou réservez votre table.', 'It may have moved. See our menu or book your table.')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={to('home')} className="px-8 py-4 rounded-full text-white" style={{ backgroundColor: '#5A2B20' }}>
              {L('Accueil', 'Home')}
            </Link>
            <Link to={to('menu')} className="px-8 py-4 rounded-full border" style={{ borderColor: '#5A2B20', color: '#5A2B20' }}>
              {L('Voir le menu', 'See the menu')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
