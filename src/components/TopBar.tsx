import { Phone, MapPin, Facebook, Instagram } from 'lucide-react';

const TopBar = () => {
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
          <span className="text-white/90">Ouvert Mar-Dim</span>
          <a href="https://www.instagram.com/makda_restaurant/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-muted transition-colors">
            <Instagram size={16} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-muted transition-colors">
            <Facebook size={16} />
          </a>
          <div className="flex gap-2 ml-2">
            <button className="hover:text-gold-muted transition-colors font-medium">FR</button>
            <span>|</span>
            <button className="hover:text-gold-muted transition-colors">EN</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
