import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const NotFound = () => (
  <>
    <Seo
      path="/404"
      title="Page introuvable – Makda"
      description="Cette page n'existe pas ou a été déplacée."
      noindex
    />
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-20" style={{ backgroundColor: '#EBCDAD' }}>
      <div className="text-center max-w-xl">
        <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#5A2B20' }}>Erreur 404</p>
        <h1 className="text-4xl md:text-5xl font-serif mb-6" style={{ color: '#401400', fontWeight: 300 }}>
          Cette page n'existe pas
        </h1>
        <p className="text-lg mb-10" style={{ color: '#401400', fontWeight: 300 }}>
          Elle a peut-être été déplacée. Retrouvez notre carte ou réservez votre table.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/" className="px-8 py-4 rounded-full text-white" style={{ backgroundColor: '#5A2B20' }}>
            Accueil
          </Link>
          <Link to="/menu" className="px-8 py-4 rounded-full border" style={{ borderColor: '#5A2B20', color: '#5A2B20' }}>
            Voir le menu
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default NotFound;
