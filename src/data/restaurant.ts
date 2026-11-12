// Source unique des informations du restaurant.
// Modifier ici met à jour le site, le pied de page, la page Contact et les données pour Google.

export const SITE_URL = 'https://makda.ch';

export const restaurant = {
  name: 'Makda',
  legalName: 'MAKDA Sàrl',
  // Numéro IDE/UID au registre du commerce (format CHE-123.456.789) — à compléter
  uid: '',
  street: 'Rue de Bernex 224',
  postalCode: '1233',
  city: 'Bernex',
  canton: 'GE',
  country: 'CH',
  geo: { lat: 46.1772727, lng: 6.0773402 },
  phone: '+41766792845',
  phoneDisplay: '+41 76 679 28 45',
  email: 'contact@makda.ch',
  instagram: 'https://www.instagram.com/makda_restaurant/',
  facebook: 'https://www.facebook.com/profile.php?id=61561990207554',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Makda+Rue+de+Bernex+224+1233+Bernex',
  theforkUrl: 'https://widget.thefork.com/c210f176-61da-4d21-acdb-fc90eeae5a6c',
};

// Horaires d'ouverture
export const hours = {
  // Pour l'affichage
  display: [
    { day: 'Lundi', hours: 'Fermé' },
    { day: 'Mardi – Samedi', hours: '11h30 – 14h00 · 18h00 – 22h30' },
    { day: 'Dimanche', hours: '12h00 – 16h30' },
  ],
  displayEn: [
    { day: 'Monday', hours: 'Closed' },
    { day: 'Tuesday – Saturday', hours: '11:30am – 2pm · 6pm – 10:30pm' },
    { day: 'Sunday', hours: '12pm – 4:30pm' },
  ],
  // Pour Google (schema.org)
  schema: [
    { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '11:30', closes: '14:00' },
    { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '18:00', closes: '22:30' },
    { days: ['Sunday'], opens: '12:00', closes: '16:30' },
  ],
};

export const restaurantJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${SITE_URL}/#restaurant`,
  name: 'Makda',
  alternateName: 'Makda – Restaurant éthiopien et érythréen',
  description:
    "Restaurant éthiopien et érythréen à Bernex (Genève) : injera maison au teff, plats mijotés, options végétariennes, vegan et sans gluten, cérémonie du café et service traiteur.",
  url: `${SITE_URL}/`,
  image: [`${SITE_URL}/og-image.jpg`, `${SITE_URL}/source/salle-makda-1920.webp`],
  logo: `${SITE_URL}/makda-logo.webp`,
  telephone: restaurant.phone,
  email: restaurant.email,
  priceRange: 'CHF 20–30',
  currenciesAccepted: 'CHF',
  servesCuisine: ['Éthiopienne', 'Érythréenne', 'Africaine', 'Végétarienne', 'Vegan', 'Sans gluten'],
  acceptsReservations: true,
  hasMenu: `${SITE_URL}/menu`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: restaurant.street,
    addressLocality: restaurant.city,
    postalCode: restaurant.postalCode,
    addressRegion: restaurant.canton,
    addressCountry: restaurant.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: restaurant.geo.lat,
    longitude: restaurant.geo.lng,
  },
  areaServed: ['Bernex', 'Confignon', 'Onex', 'Lancy', 'Plan-les-Ouates', 'Genève'],
  openingHoursSpecification: hours.schema.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: [restaurant.instagram, restaurant.facebook],
};
