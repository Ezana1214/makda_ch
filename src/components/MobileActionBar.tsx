import { Phone, CalendarCheck, Navigation } from 'lucide-react';
import { restaurant } from '../data/restaurant';
import { useLanguage } from '../context/LanguageContext';

/** Barre d'actions fixe en bas de l'écran, visible uniquement sur mobile et tablette. */
const MobileActionBar = () => {
  const { L } = useLanguage();
  const item = 'flex flex-col items-center justify-center gap-1 py-2.5 text-xs';
  return (
    <nav
      aria-label={L('Actions rapides', 'Quick actions')}
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-3 border-t shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
      style={{ backgroundColor: '#FFF8EF', borderColor: '#EBCDAD', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a href={`tel:${restaurant.phone}`} className={item} style={{ color: '#5A2B20', fontWeight: 600 }}>
        <Phone size={20} />
        {L('Appeler', 'Call')}
      </a>
      <a href={restaurant.theforkUrl} target="_blank" rel="noopener" className={`${item} text-white`} style={{ backgroundColor: '#5A2B20', fontWeight: 600 }}>
        <CalendarCheck size={20} />
        {L('Réserver', 'Book')}
      </a>
      <a href={restaurant.directionsUrl} target="_blank" rel="noopener" className={item} style={{ color: '#5A2B20', fontWeight: 600 }}>
        <Navigation size={20} />
        {L('Itinéraire', 'Directions')}
      </a>
    </nav>
  );
};

export default MobileActionBar;
