import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { alternatePath } from '../i18n';
import { restaurant } from '../data/restaurant';

const TopBar = () => {
  const { lang, t, L } = useLanguage();
  const { pathname } = useLocation();

  return (
    <div className="bg-brown-deep text-white py-2 text-sm font-light">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <a href={`tel:${restaurant.phone}`} className="flex items-center gap-2 hover:text-gold-muted transition-colors">
            <Phone size={14} />
            <span>{restaurant.phoneDisplay}</span>
          </a>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>Rue de Bernex 224, 1233 Bernex</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/90">{t('topbar.open')}</span>
          <a href={restaurant.instagram} target="_blank" rel="noopener noreferrer" aria-label={L('Makda sur Instagram', 'Makda on Instagram')} className="hover:text-gold-muted transition-colors">
            <Instagram size={16} />
          </a>
          <a href={restaurant.facebook} target="_blank" rel="noopener noreferrer" aria-label={L('Makda sur Facebook', 'Makda on Facebook')} className="hover:text-gold-muted transition-colors">
            <Facebook size={16} />
          </a>
          <div className="flex gap-2 ml-2">
            <Link
              to={alternatePath(pathname, 'fr')}
              hrefLang="fr"
              lang="fr"
              aria-current={lang === 'fr' ? 'true' : undefined}
              className={`hover:text-gold-muted transition-colors ${lang === 'fr' ? 'font-medium' : ''}`}
            >
              FR
            </Link>
            <span aria-hidden="true">|</span>
            <Link
              to={alternatePath(pathname, 'en')}
              hrefLang="en"
              lang="en"
              aria-current={lang === 'en' ? 'true' : undefined}
              className={`hover:text-gold-muted transition-colors ${lang === 'en' ? 'font-medium' : ''}`}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
