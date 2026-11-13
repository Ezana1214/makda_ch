import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock } from 'lucide-react';
import { hours } from '../data/restaurant';

const Footer = () => {
  return (
    <footer className="bg-cream pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex flex-col items-start mb-4">
              <img
                src="/makda-logo.webp"
                alt="Makda Restaurant Logo"
                className="h-24 w-auto"
              />
            </div>
            <p className="leading-relaxed text-sm" style={{ color: '#5A2B20', fontWeight: 400 }}>
              Un voyage culinaire authentique au cœur de Bernex. Découvrez les saveurs de l'Éthiopie et de l'Érythrée.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-6" style={{ color: '#5A2B20', fontWeight: 300 }}>Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm" style={{ color: '#5A2B20', fontWeight: 400 }}>
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Rue de Bernex 224, 1233 Bernex</span>
              </div>
              <div className="flex items-start gap-3 text-sm" style={{ color: '#5A2B20', fontWeight: 400 }}>
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <a href="tel:+41766792845" className="hover:text-gold-muted transition-colors">
                  +41 76 679 28 45
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm" style={{ color: '#5A2B20', fontWeight: 400 }}>
                <Clock size={18} className="mt-1 flex-shrink-0" />
                <div>
                  {hours.display.map((h) => (
                    <p key={h.day}>{h.day} : {h.hours}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-6" style={{ color: '#5A2B20', fontWeight: 300 }}>Nous trouver</h3>
            <div className="bg-brown-dark/10 rounded-lg overflow-hidden h-48">
              <iframe
                src="https://www.google.com/maps?q=Makda%2C%20Rue%20de%20Bernex%20224%2C%201233%20Bernex&hl=fr&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Plan d'accès au restaurant Makda à Bernex"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-brown-dark/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ color: '#5A2B20', fontWeight: 400 }}>
          <p>&copy; {new Date().getFullYear()} MAKDA Sàrl. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link to="/confidentialite" className="hover:text-gold-muted transition-colors">
              Confidentialité
            </Link>
            <Link to="/mentions-legales" className="hover:text-gold-muted transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
