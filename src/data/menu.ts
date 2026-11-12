// Carte de Makda — reprise de la carte imprimée (MAKDA_MENU, MENU Table sign)
// et de la fiche allergènes (MAKDA_allergenes). Modifier ici met à jour la page Menu.

export type Allergen = 'gluten' | 'oeufs' | 'lait' | 'soja' | 'sulfites' | 'legumineuses';

export const allergenLabels: Record<Allergen, string> = {
  gluten: 'Gluten',
  oeufs: 'Œufs',
  lait: 'Lait',
  soja: 'Soja',
  sulfites: 'Sulfites',
  legumineuses: 'Légumineuses',
};

export interface Dish {
  id: string;
  name: string;
  detail?: string;
  description: string;
  price: string;
  image?: string;
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  halal?: boolean;
  allergens?: Allergen[];
}

export interface DishSection {
  id: string;
  title: string;
  note?: string;
  dishes: Dish[];
}

export const dishSections: DishSection[] = [
  {
    id: 'entrees',
    title: 'Entrées',
    dishes: [
      {
        id: 'sambusa',
        name: 'Sambusa végétarien',
        detail: '3 pièces',
        description:
          "Triangles de pâte finement croustillante, farcis de légumes épicés, relevés d'une pointe de cumin et de coriandre, accompagnés de notre awazé, une sauce traditionnelle au piment, à l'ail et aux épices fermentées.",
        price: '6',
        image: '/source/menu-sambusa.webp',
        vegetarian: true,
        allergens: ['gluten'],
      },
    ],
  },
  {
    id: 'viandes',
    title: 'Plats carnés',
    note: "La viande d'agneau et de poulet est certifiée halal.",
    dishes: [
      {
        id: 'kitfo',
        name: 'Kitfo',
        detail: 'bœuf',
        description:
          'La version éthiopienne du steak tartare : bœuf haché mélangé au kibbeh (beurre épicé) et au mitmita (piments en poudre).',
        price: '28',
        image: '/source/menu-kitfo.webp',
        glutenFree: true,
        allergens: ['lait'],
      },
      {
        id: 'tibs',
        name: 'Tibs',
        detail: 'bœuf ou agneau',
        description:
          'Tendres cubes de viande marinés dans notre sauce signature, puis sautés à la poêle avec oignon rouge, piments, ail frais et tomates.',
        price: '26',
        image: '/source/menu-tibs.webp',
        glutenFree: true,
      },
      {
        id: 'doro-wet',
        name: 'Doro wet',
        detail: 'poulet',
        description:
          "Cuisse de poulet mijotée avec oignon, ail et berbéré, finie au kibbeh (beurre épicé), servie avec un œuf dur et de l'ayib (fromage frais).",
        price: '24',
        image: '/source/menu-doro-wet.webp',
        glutenFree: true,
        halal: true,
        allergens: ['oeufs', 'lait'],
      },
      {
        id: 'doro-alecha',
        name: 'Doro alecha',
        detail: 'poulet',
        description: "Cuisses de poulet mijotées avec oignon et ail, dans une sauce douce au curcuma.",
        price: '24',
        image: '/source/menu-doro-alecha.webp',
        glutenFree: true,
        halal: true,
      },
      {
        id: 'zigni',
        name: 'Zigni',
        detail: 'bœuf',
        description: 'Ragoût de viande assaisonné aux piments, oignons et ail.',
        price: '22',
        image: '/source/menu-zigni.webp',
        glutenFree: true,
      },
    ],
  },
  {
    id: 'vegetariens',
    title: 'Plats végétariens',
    dishes: [
      {
        id: 'misir-wat',
        name: 'Misir wat',
        description: 'Lentilles rouges dans la sauce berbéré, avec ail frais et oignon.',
        price: '20',
        image: '/source/menu-misir-wot-large.webp',
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        allergens: ['legumineuses'],
      },
      {
        id: 'shiro',
        name: 'Shiro',
        description: "Pois cassés moulus et rôtis, mijotés avec oignon, ail frais et tomates.",
        price: '20',
        image: '/source/menu-shiro.webp',
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        allergens: ['legumineuses'],
      },
    ],
  },
];

export const servedWith =
  "Tous nos plats sont servis avec de l'injera 100 % teff (sans gluten), des épinards, des pois cassés jaunes et une salade.";

export const menuMakda = {
  title: 'Menu Makda',
  description:
    "Une expérience pensée pour être partagée : un assortiment généreux de nos plats, équilibré pour une harmonie de textures, d'arômes et de saveurs. Le Menu Makda est l'expression la plus complète de notre cuisine.",
  rows: [
    { people: '2 personnes', vegan: '50', meat: '65' },
    { people: '3 personnes', vegan: '75', meat: '90' },
    { people: '4 personnes', vegan: '90', meat: '110' },
  ],
};

export interface Drink {
  name: string;
  description?: string;
  price: string;
}

export interface DrinkGroup {
  title: string;
  unit?: string;
  drinks: Drink[];
}

export const drinkGroups: DrinkGroup[] = [
  {
    title: 'Fait maison',
    unit: '1 dl / 75 cl',
    drinks: [
      { name: 'Tej', description: 'Hydromel traditionnel au miel fermenté, doux et subtilement floral.', price: '5 / 16' },
      {
        name: 'Tella',
        description: 'Bière traditionnelle artisanale, légère et douce, brassée avec des céréales et des épices.',
        price: '5 / 16',
      },
    ],
  },
  {
    title: 'Vins rouges',
    unit: '1 dl / 75 cl',
    drinks: [
      { name: 'Diolinoir', description: 'Robe sombre, arômes épicés et fruités, touche sauvage. Vins Guyot.', price: '6.5 / 42' },
      { name: 'Trois Helvètes', description: 'Très fruité et épicé, tanins soyeux, belle structure. Vins Guyot.', price: '6 / 36' },
      { name: 'Pinot noir', description: 'Notes de violette, fruits rouges et sous-bois. Domaine de Beauvent.', price: '6 / 38' },
      { name: 'Gamay', description: 'Fruité, léger, bien équilibré, avec une touche végétale. Domaine de Beauvent.', price: '5.5' },
    ],
  },
  {
    title: 'Vin blanc & rosé',
    unit: '1 dl / 75 cl',
    drinks: [
      { name: 'Chasselas', description: 'Sec, floral et frais, touche de levure en finale. Domaine de Beauvent.', price: '5 / 32' },
      { name: 'Rosé de Gamay', description: 'Frais, fruité et rond, belle persistance. Domaine de Beauvent.', price: '5' },
    ],
  },
  {
    title: 'Apéritifs & bière',
    drinks: [
      { name: 'Crème de cassis', description: 'Verdenne', price: '5.5' },
      { name: 'Martini blanc ou rouge', price: '6' },
      { name: 'Prosecco', price: '5.5' },
      {
        name: 'Bière Père Jakob',
        description: 'Blonde artisanale de Soral : céréales toastées et agrumes.',
        price: '6',
      },
    ],
  },
  {
    title: 'Sans alcool',
    drinks: [
      { name: 'Coca-Cola, Coca-Cola Zero', price: '4.5' },
      { name: 'Fuze Tea pêche ou citron', price: '4.5' },
      { name: 'Eau plate ou gazeuse', price: '4' },
      { name: 'Cardinal sans alcool', description: '33 cl', price: '6' },
      { name: "Sirop à l'eau", description: 'Grenadine, fraise, cassis, menthe', price: '2' },
    ],
  },
  {
    title: 'Boissons chaudes',
    drinks: [
      { name: 'Thé maison', price: '4' },
      { name: 'Thé, infusions', price: '3' },
      { name: 'Café, espresso', price: '3.5' },
    ],
  },
];

export const dessert = {
  name: 'Crèmes glacées',
  description:
    'Caramel beurre salé, fior di latte ou chocolat. Glaces artisanales fabriquées à Bernex avec des ingrédients naturels.',
  price: '6',
  image: '/source/menu-pauseglace.webp',
};

export const allergenInfo = {
  carte: [
    { allergen: 'Gluten (blé)', items: 'Sambusa végétarien' },
    { allergen: 'Œufs', items: 'Doro wet' },
    { allergen: 'Lait / produits laitiers', items: 'Doro wet, Kitfo (kibbeh)' },
    { allergen: 'Soja', items: 'Doulet (salade de soja)' },
    { allergen: 'Légumineuses', items: 'Shiro, Misir wat, Kik alicha, Shimbra asa' },
  ],
  boissons: [
    { allergen: 'Gluten (céréales)', items: 'Bière Père Jakob, Tella' },
    { allergen: 'Sulfites', items: 'Vins, Prosecco, Martini, Crème de cassis' },
    { allergen: 'Lait', items: 'Crèmes glacées' },
  ],
  warning:
    "Tous les plats sont préparés dans la même cuisine : des traces de gluten, lait, œufs ou soja sont possibles. Signalez-nous toute allergie ou intolérance.",
  pdf: '/makda-allergenes.pdf',
};

export const stories = [
  {
    title: "L'injera",
    text: "La galette traditionnelle érythréenne et éthiopienne, préparée à partir de teff, la plus petite céréale du monde, naturellement fermentée pendant plusieurs jours. On y dépose les plats, puis on en déchire des morceaux pour les saisir.",
  },
  {
    title: 'Le gursha',
    text: "« Bouchée ». Offrir à la main un morceau d'injera à son voisin de table est un geste de fraternité au cœur de chaque repas. Osez le gursha !",
  },
  {
    title: 'Le buna',
    text: "« Café ». Torréfaction des grains devant vous, mouture traditionnelle, puis infusion lente dans la jebena. Servi en trois tournées, de plus en plus corsées.",
  },
];
