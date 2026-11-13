// Source unique des informations du restaurant.
// Modifier ici met à jour le site, le pied de page, la page Contact et les données pour Google.

export const SITE_URL = 'https://makda.ch';

export const restaurant = {
  name: 'Makda',
  legalName: 'MAKDA Sàrl',
  // Numéro IDE/UID au registre du commerce (format CHE-123.456.789) — à compléter
  uid: 'CHE-449.556.743',
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
  mapsUrl: 'https://maps.google.com/?cid=5705022007057696673',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Makda%2C+Rue+de+Bernex+224%2C+1233+Bernex',
  reviewsUrl: 'https://maps.google.com/?cid=5705022007057696673',
  googleRating: '4,9',
  googleReviewCount: 182,
  theforkRating: '9,4',
  takeaway: true, // vente à emporter, commande par téléphone
  cateringArea: 'Suisse romande',
  theforkUrl: 'https://widget.thefork.com/c210f176-61da-4d21-acdb-fc90eeae5a6c',
};

// Buffet à volonté (sources : carte imprimée et affiche Instagram)
export const buffet = {
  title: 'Buffet à volonté le premier dimanche du mois',
  when: 'Chaque 1er dimanche du mois',
  hours: 'de 12h00 à 17h00',
  price: '30 CHF par personne',
  includes: 'Boissons chaudes et sirops à discrétion inclus. Réservation conseillée.',
};

export const buffetEn = {
  title: 'All-you-can-eat buffet on the first Sunday of the month',
  when: 'Every first Sunday of the month',
  hours: '12pm to 5pm',
  price: 'CHF 30 per person',
  includes: 'Hot drinks and cordials included. Booking recommended.',
};

// Privatisation (confirmé par Ezana le 13.11.2026)
export const privateHire = { indoor: 50, terrace: 20 };

// Services et équipements (confirmés par Ezana le 12.11.2026)
export const amenities = {
  freeParking: true,
  terrace: true,
  dogsAllowed: true,
  highChairs: true,
  glutenFreeInjera: true, // injera 100 % teff
};

// Horaires d'ouverture
export const hours = {
  // Pour l'affichage
  display: [
    { day: 'Lundi', hours: 'Fermé' },
    { day: 'Mardi – Samedi', hours: '11h30 – 14h00 · 18h00 – 22h30' },
    { day: 'Dimanche', hours: '12h00 – 17h00' },
  ],
  displayEn: [
    { day: 'Monday', hours: 'Closed' },
    { day: 'Tuesday – Saturday', hours: '11:30am – 2pm · 6pm – 10:30pm' },
    { day: 'Sunday', hours: '12pm – 5pm' },
  ],
  // Pour Google (schema.org)
  schema: [
    { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '11:30', closes: '14:00' },
    { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '18:00', closes: '22:30' },
    { days: ['Sunday'], opens: '12:00', closes: '17:00' },
  ],
};

export const restaurantJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${SITE_URL}/#restaurant`,
  name: 'Makda',
  alternateName: 'Makda – Restaurant éthiopien et érythréen',
  description:
    "Restaurant éthiopien et érythréen à Bernex (Genève) : injera 100 % teff sans gluten, plats mijotés, options végétariennes et vegan, buffet à volonté le premier dimanche du mois, terrasse, parking gratuit et service traiteur.",
  url: `${SITE_URL}/`,
  image: [`${SITE_URL}/og-image.jpg`, `${SITE_URL}/source/salle-makda-1920.webp`],
  logo: `${SITE_URL}/makda-logo.webp`,
  telephone: restaurant.phone,
  email: restaurant.email,
  priceRange: 'CHF 20–30',
  currenciesAccepted: 'CHF',
  servesCuisine: ['Éthiopienne', 'Érythréenne', 'Africaine', 'Végétarienne', 'Vegan', 'Sans gluten'],
  acceptsReservations: true,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Parking gratuit', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Terrasse', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Chiens acceptés', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Chaises hautes', value: true },
  ],
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

export const restaurantJsonLdEn = {
  ...restaurantJsonLd,
  alternateName: 'Makda – Ethiopian & Eritrean restaurant',
  description:
    'Ethiopian and Eritrean restaurant in Bernex, Geneva: gluten-free 100% teff injera, slow-cooked stews, vegetarian and vegan options, an all-you-can-eat buffet on the first Sunday of the month, terrace, free parking and catering.',
  url: `${SITE_URL}/en/`,
  servesCuisine: ['Ethiopian', 'Eritrean', 'African', 'Vegetarian', 'Vegan', 'Gluten-free'],
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Free parking', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Terrace', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Dogs allowed', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'High chairs', value: true },
  ],
  hasMenu: `${SITE_URL}/en/menu`,
};
