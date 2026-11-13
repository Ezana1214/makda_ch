// Langues et adresses des pages. Chaque page a une adresse en français et une en anglais.
export type Lang = 'fr' | 'en';

export const routes = {
  home: { fr: '/', en: '/en/' },
  menu: { fr: '/menu', en: '/en/menu' },
  catering: { fr: '/traiteur', en: '/en/catering' },
  weddings: { fr: '/traiteur-mariage', en: '/en/wedding-catering' },
  corporate: { fr: '/traiteur-entreprise', en: '/en/corporate-catering' },
  parties: { fr: '/traiteur-fete-privee', en: '/en/private-party-catering' },
  history: { fr: '/histoire', en: '/en/our-story' },
  contact: { fr: '/contact', en: '/en/contact' },
  glutenFree: { fr: '/sans-gluten-vegan', en: '/en/gluten-free-vegan' },
  buffet: { fr: '/buffet-dimanche', en: '/en/sunday-buffet' },
  privateHire: { fr: '/privatisation', en: '/en/private-hire' },
  access: { fr: '/acces-parking', en: '/en/getting-here' },
  // pages légales : français uniquement
  privacy: { fr: '/confidentialite', en: '/confidentialite' },
  legal: { fr: '/mentions-legales', en: '/mentions-legales' },
} as const;

export type RouteId = keyof typeof routes;

export const langFromPath = (p: string): Lang => (p === '/en' || p.startsWith('/en/') ? 'en' : 'fr');

const norm = (p: string) => (p.length > 1 && p.endsWith('/') && p !== '/en/' ? p.slice(0, -1) : p === '/en' ? '/en/' : p);

export const routeIdFromPath = (p: string): RouteId | undefined => {
  const n = norm(p);
  return (Object.keys(routes) as RouteId[]).find((id) => routes[id].fr === n || routes[id].en === n);
};

/** Adresse équivalente dans l'autre langue (ou accueil de cette langue si la page n'existe pas). */
export const alternatePath = (p: string, target: Lang): string => {
  const id = routeIdFromPath(p);
  return id ? routes[id][target] : routes.home[target];
};
