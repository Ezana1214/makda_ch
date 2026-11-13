import { Clock, MapPin, Car, ShoppingBag, Star, Navigation } from 'lucide-react';
import { restaurant, hours } from '../data/restaurant';

/** Bloc accueil : horaires, adresse, accès, avis. */
const InfoAccess = () => (
  <section className="px-4 py-20" style={{ backgroundColor: '#FFF8EF' }} aria-labelledby="infos-pratiques">
    <div className="container mx-auto max-w-6xl">
      <h2 id="infos-pratiques" className="text-4xl md:text-5xl font-serif text-center mb-12" style={{ color: '#401400', fontWeight: 300 }}>
        Infos pratiques
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gold-light rounded-full w-11 h-11 flex items-center justify-center">
              <Clock size={20} className="text-brown-dark" />
            </span>
            <h3 className="text-2xl font-serif" style={{ color: '#401400' }}>Horaires</h3>
          </div>
          <dl className="space-y-2" style={{ color: '#5C3B33' }}>
            {hours.display.map((h) => (
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
            <h3 className="text-2xl font-serif" style={{ color: '#401400' }}>Accès</h3>
          </div>
          <address className="not-italic mb-4" style={{ color: '#5C3B33' }}>
            {restaurant.street}
            <br />
            {restaurant.postalCode} {restaurant.city} (Genève)
          </address>
          <ul className="space-y-2 text-sm" style={{ color: '#5C3B33' }}>
            <li className="flex items-center gap-2"><Car size={16} /> Parking gratuit</li>
            <li className="flex items-center gap-2"><ShoppingBag size={16} /> À emporter, commande par téléphone</li>
          </ul>
          <a
            href={restaurant.directionsUrl}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex items-center gap-2 underline"
            style={{ color: '#5A2B20', fontWeight: 600 }}
          >
            <Navigation size={16} /> Itinéraire
          </a>
        </div>

        <div className="rounded-2xl p-7 shadow-sm text-white" style={{ backgroundColor: '#401400' }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gold-light rounded-full w-11 h-11 flex items-center justify-center">
              <Star size={20} className="text-brown-dark" />
            </span>
            <h3 className="text-2xl font-serif text-white">Ils nous recommandent</h3>
          </div>
          <p className="text-5xl font-serif mb-1">{restaurant.googleRating}<span className="text-2xl text-white/70"> / 5</span></p>
          <p className="text-white/85 mb-1">sur {restaurant.googleReviewCount} avis Google</p>
          <p className="text-white/85 mb-5">{restaurant.theforkRating} / 10 sur TheFork</p>
          <a
            href={restaurant.reviewsUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 underline"
            style={{ color: '#EBCDAD', fontWeight: 600 }}
          >
            Lire les avis sur Google
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default InfoAccess;
