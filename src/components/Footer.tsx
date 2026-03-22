import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cream pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex flex-col items-start mb-4">
              <img
                src="/makda-logo copy.png"
                alt="Makda Restaurant Logo"
                className="h-24 w-auto"
              />
            </div>
            <p className="leading-relaxed text-sm" style={{ color: '#5A2B20', fontWeight: 100 }}>
              Un voyage culinaire authentique au cœur de Bernex. Découvrez les saveurs de l'Éthiopie et de l'Érythrée.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-6" style={{ color: '#5A2B20', fontWeight: 300 }}>Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm" style={{ color: '#5A2B20', fontWeight: 100 }}>
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Rue de Bernex 224, 1233 Bernex</span>
              </div>
              <div className="flex items-start gap-3 text-sm" style={{ color: '#5A2B20', fontWeight: 100 }}>
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <a href="tel:+41766792845" className="hover:text-gold-muted transition-colors">
                  +41 76 679 28 45
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm" style={{ color: '#5A2B20', fontWeight: 100 }}>
                <Clock size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <p>Lundi: Fermé</p>
                  <p>Mar - Sam: 11:30 - 14:30 18:30 - 23:00</p>
                  <p>Dimanche: 12:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-6" style={{ color: '#5A2B20', fontWeight: 300 }}>Nous trouver</h3>
            <div className="bg-brown-dark/10 rounded-lg overflow-hidden h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2763.164627468604!2d6.0696773!3d46.1673900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c7b2e3c000001%3A0x6280628062806280!2sRue%20de%20Bernex%20224%2C%201233%20Bernex%2C%20Switzerland!5e0!3m2!1sfr!2sch!4v1766939229453"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Makda Restaurant Location Footer"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-brown-dark/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ color: '#5A2B20', fontWeight: 100 }}>
          <p>&copy; 2025 Makda Restaurant. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-muted transition-colors">
              Confidentialité
            </a>
            <a href="#" className="hover:text-gold-muted transition-colors">
              Mentions Légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
