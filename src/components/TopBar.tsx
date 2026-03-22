import { Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TopBar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="bg-brown-deep text-white py-2 text-sm font-light">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <a href="tel:+41766792845" className="flex items-center gap-2 hover:text-gold-muted transition-colors">
            <Phone size={14} />
            <span>+41 76 679 28 45</span>
          </a>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>Rue de Bernex 224, 1233 Bernex</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/90">{t('topbar.open')}</span>
          <a href="https://www.instagram.com/makda_restaurant/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-muted transition-colors">
            <Instagram size={16} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-muted transition-colors">
            <Facebook size={16} />
          </a>
          <div className="flex gap-2 ml-2">
            <button
              onClick={() => setLanguage('fr')}
              className={`hover:text-gold-muted transition-colors ${language === 'fr' ? 'font-medium' : ''}`}
            >
              FR
            </button>
            <span>|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`hover:text-gold-muted transition-colors ${language === 'en' ? 'font-medium' : ''}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
