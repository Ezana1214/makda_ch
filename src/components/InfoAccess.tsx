import { Link } from 'react-router-dom';
import { Clock, MapPin, Car, ShoppingBag, Star, Navigation, ArrowRight } from 'lucide-react';
import { restaurant, hours } from '../data/restaurant';
import { useLanguage } from '../context/LanguageContext';

/** Bloc accueil : horaires, adresse, accès, avis. */
const InfoAccess = () => {
  const { lang, L, to } = useLanguage();
  const rating = lang === 'en' ? restaurant.googleRating.replace(',', '.') : restaurant.googleRating;
  const fork = lang === 'en' ? restaurant.theforkRating.replace(',', '.') : restaurant.theforkRating;
  return (
    <section className="px-4 py-20" style={{ backgroundColor: '#FFF8EF' }} aria-labelledby="infos-pratiques">
      <div className="container mx-auto max-w-6xl">
        <h2 id="infos-pratiques" className="text-4xl md:text-5xl font-serif text-center mb-12" style={{ color: '#401400', fontWeight: 300 }}>
          {L('Infos pratiques', 'Practical information')}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gold-light rounded-full w-11 h-11 flex items-center justify-center">
                <Clock size={20} className="text-brown-dark" />
              </span>
              <h3 className="text-2xl font-serif" style={{ color: '#401400' }}>{L('Horaires', 'Opening hours')}</h3>
            </div>
            <dl className="space-y-2" style={{ color: '#5C3B33' }}>
              {(lang === 'en' ? hours.displayEn : hours.display).map((h) => (
                <div key={h.day}>
                  <dt className="font-semibold">{h.day}</dt>
                  <dd>{h.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gold-light rounded-full w-11 h-11 flex items-center justify-center">
                <MapPin size={20} className="text-brown-dark" />
              </span>
              <h3 className="text-2xl font-serif" style={{ color: '#401400' }}>{L('Accès', 'Getting here')}</h3>
            </div>
            <address className="not-italic mb-4" style={{ color: '#5C3B33' }}>
              {restaurant.street}
              <br />
              {restaurant.postalCode} {restaurant.city} ({L('Genève', 'Geneva')})
            </address>
            <ul className="space-y-2 text-sm" style={{ color: '#5C3B33' }}>
              <li className="flex items-center gap-2"><Car size={16} /> {L('Parking gratuit', 'Free parking')}</li>
              <li className="flex items-center gap-2"><ShoppingBag size={16} /> {L('À emporter, commande par téléphone', 'Takeaway, order by phone')}</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              <a href={restaurant.directionsUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 underline" style={{ color: '#5A2B20', fontWeight: 600 }}>
                <Navigation size={16} /> {L('Itinéraire', 'Directions')}
              </a>
              <Link to={to('access')} className="inline-flex items-center gap-2 underline" style={{ color: '#5A2B20', fontWeight: 600 }}>
                {L('Accès & parking', 'Transport & parking')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl p-7 shadow-sm text-white" style={{ backgroundColor: '#401400' }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gold-light rounded-full w-11 h-11 flex items-center justify-center">
                <Star size={20} className="text-brown-dark" />
              </span>
              <h3 className="text-2xl font-serif text-white">{L('Ils nous recommandent', 'What guests say')}</h3>
            </div>
            <p className="text-5xl font-serif mb-1">
              {rating}
              <span className="text-2xl text-white/70"> / 5</span>
            </p>
            <p className="text-white/85 mb-1">{L(`sur ${restaurant.googleReviewCount} avis Google`, `from ${restaurant.googleReviewCount} Google reviews`)}</p>
            <p className="text-white/85 mb-5">{L(`${fork} / 10 sur TheFork`, `${fork} / 10 on TheFork`)}</p>
            <a href={restaurant.reviewsUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 underline" style={{ color: '#EBCDAD', fontWeight: 600 }}>
              {L('Lire les avis sur Google', 'Read the reviews on Google')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoAccess;
