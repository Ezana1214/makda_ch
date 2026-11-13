import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock } from 'lucide-react';
import { hours, restaurant } from '../data/restaurant';
import { useLanguage } from '../context/LanguageContext';
import type { RouteId } from '../i18n';

const Footer = () => {
  const { lang, L, to } = useLanguage();
  const color = { color: '#5A2B20', fontWeight: 400 };
  const links: [RouteId, string, string][] = [
    ['glutenFree', 'Sans gluten & vegan', 'Gluten-free & vegan'],
    ['buffet', 'Buffet du dimanche', 'Sunday buffet'],
    ['privateHire', 'Privatiser le restaurant', 'Private hire'],
    ['access', 'Accès & parking', 'Getting here & parking'],
    ['weddings', 'Traiteur mariage', 'Wedding catering'],
    ['corporate', 'Traiteur entreprise', 'Corporate catering'],
    ['parties', 'Traiteur fête privée', 'Private party catering'],
  ];

  return (
    <footer className="bg-cream pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <img src="/makda-logo.webp" alt="Makda" width="208" height="96" className="h-24 w-auto mb-4" />
            <p className="leading-relaxed text-sm" style={color}>
              {L(
                "Restaurant éthiopien et érythréen à Bernex, Genève. Injera 100 % teff, plats à partager et cérémonie du café.",
                'Ethiopian and Eritrean restaurant in Bernex, Geneva. 100% teff injera, sharing dishes and coffee ceremony.'
              )}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-6" style={color}>Contact</h3>
            <div className="space-y-4 text-sm" style={color}>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>
                  {restaurant.street}, {restaurant.postalCode} {restaurant.city}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <a href={`tel:${restaurant.phone}`} className="hover:text-gold-muted transition-colors">
                  {restaurant.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-1 flex-shrink-0" />
                <div>
                  {(lang === 'en' ? hours.displayEn : hours.display).map((h) => (
                    <p key={h.day}>
                      {h.day}: {h.hours}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <nav aria-label={L('Liens utiles', 'Useful links')}>
            <h3 className="text-xl font-serif mb-6" style={color}>{L('Découvrir', 'Discover')}</h3>
            <ul className="space-y-2 text-sm" style={color}>
              {links.map(([id, fr, en]) => (
                <li key={id}>
                  <Link to={to(id)} className="hover:text-gold-muted transition-colors">
                    {L(fr, en)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xl font-serif mb-6" style={color}>{L('Nous trouver', 'Find us')}</h3>
            <div className="bg-brown-dark/10 rounded-lg overflow-hidden h-48">
              <iframe
                src={`https://www.google.com/maps?q=Makda%2C%20Rue%20de%20Bernex%20224%2C%201233%20Bernex&hl=${lang}&z=16&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={L("Plan d'accès au restaurant Makda à Bernex", 'Map to Makda restaurant in Bernex')}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-brown-dark/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={color}>
          <p>
            &copy; {new Date().getFullYear()} MAKDA Sàrl. {L('Tous droits réservés.', 'All rights reserved.')}
          </p>
          <div className="flex gap-6">
            <Link to="/confidentialite" className="hover:text-gold-muted transition-colors">
              {L('Confidentialité', 'Privacy (FR)')}
            </Link>
            <Link to="/mentions-legales" className="hover:text-gold-muted transition-colors">
              {L('Mentions légales', 'Legal notice (FR)')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
