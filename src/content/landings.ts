// Contenu des pages thématiques (sans gluten & vegan, buffet, privatisation, accès, traiteur par occasion).
// Chaque page existe en français et en anglais. Modifier le texte ici met à jour la page.
import type { Lang, RouteId } from '../i18n';
import type { EventType } from '../components/QuoteForm';
import { SITE_URL, privateHire, restaurant } from '../data/restaurant';

export type IconName =
  | 'wheat'
  | 'leaf'
  | 'alert'
  | 'calendar'
  | 'clock'
  | 'coins'
  | 'coffee'
  | 'users'
  | 'sun'
  | 'car'
  | 'tram'
  | 'map'
  | 'utensils'
  | 'heart'
  | 'briefcase'
  | 'sparkles'
  | 'truck'
  | 'cake';

export interface LandingSection {
  h2: string;
  paragraphs?: string[];
  bullets?: string[];
  image?: { src: string; alt: string };
}

export interface LandingContent {
  title: string;
  description: string;
  hero: { image: string; srcSet?: string; alt: string; kicker: string; h1: string; lead: string };
  highlights: { icon: IconName; title: string; text: string }[];
  sections: LandingSection[];
  faq: { q: string; a: string }[];
  cta: { kind: 'booking'; title: string; text: string } | { kind: 'quote'; type: EventType; title: string; text: string };
  related: RouteId[];
}

export type LandingId = 'glutenFree' | 'buffet' | 'privateHire' | 'access' | 'weddings' | 'corporate' | 'parties';

const area = { fr: 'Genève et toute la Suisse romande', en: 'Geneva and the whole of French-speaking Switzerland' };

export const landings: Record<LandingId, Record<Lang, LandingContent>> = {
  // ————————————————————————————————— Sans gluten & vegan
  glutenFree: {
    fr: {
      title: 'Restaurant sans gluten et vegan à Genève – injera 100 % teff | Makda',
      description:
        "Chez Makda à Bernex, l'injera est 100 % teff, naturellement sans gluten. Plats véganes (misir wat, shiro), Menu Makda végan à partager et viande halal.",
      hero: {
        image: '/source/menu-misir-wot-large.webp',
        alt: 'Misir wat, lentilles rouges au berbéré, servies sur injera',
        kicker: 'Sans gluten · Végane · Végétarien',
        h1: 'Sans gluten & vegan à Genève',
        lead: "Une cuisine où l'on mange sans gluten et sans produits animaux sans y penser : l'injera est au teff, et les plats de légumineuses sont au cœur de la tradition.",
      },
      highlights: [
        { icon: 'wheat', title: 'Injera 100 % teff', text: 'Notre galette est faite uniquement de teff, une céréale naturellement sans gluten.' },
        { icon: 'leaf', title: 'Plats véganes', text: 'Misir wat et shiro, et une formule végane du Menu Makda pour 2 à 4 personnes.' },
        { icon: 'alert', title: 'Allergies prises au sérieux', text: 'Fiche allergènes complète et équipe à l’écoute : signalez-nous toute intolérance.' },
      ],
      sections: [
        {
          h2: "Pourquoi l'injera est sans gluten",
          paragraphs: [
            "L'injera est la galette qui sert à la fois d'assiette et de couverts dans la cuisine éthiopienne et érythréenne. Chez Makda, elle est préparée avec 100 % de teff, la plus petite céréale du monde, cultivée depuis des millénaires sur les hauts plateaux d'Éthiopie et naturellement dépourvue de gluten.",
            "Fermentée plusieurs jours, elle a une saveur légèrement acidulée et une texture souple et alvéolée. Tous nos plats sont servis avec cette injera, des épinards, des pois cassés jaunes et une salade.",
          ],
          image: { src: '/source/assortiment-plats-960.webp', alt: 'Assortiment de plats éthiopiens sur injera au teff' },
        },
        {
          h2: 'Ce que vous pouvez commander',
          bullets: [
            'Véganes et sans gluten : misir wat (lentilles rouges au berbéré) et shiro (pois cassés rôtis et mijotés).',
            'Menu Makda, formule végane : un assortiment à partager, 50 CHF pour 2, 75 CHF pour 3, 90 CHF pour 4 personnes.',
            'Sans gluten avec viande : kitfo, tibs, doro wet, doro alecha et zigni. Agneau et poulet certifiés halal.',
            'Végétarien mais avec gluten : les sambusa (pâte au blé).',
            'Contiennent des produits laitiers : le kitfo et le doro wet (kibbeh, beurre épicé) ; le doro wet contient aussi un œuf.',
          ],
        },
        {
          h2: 'Intolérance ou maladie cœliaque',
          paragraphs: [
            "Tous nos plats sont préparés dans la même cuisine, où l'on utilise aussi du blé (pour les sambusa) : des traces de gluten, de lait, d'œufs ou de soja restent possibles. Si vous êtes cœliaque ou allergique, dites-le-nous en réservant et à votre arrivée : nous vous conseillons les plats les plus adaptés.",
            'La fiche allergènes détaillée est disponible sur la page Menu et en PDF.',
          ],
        },
      ],
      faq: [
        {
          q: "L'injera de Makda est-elle vraiment sans gluten ?",
          a: "Oui, elle est faite à 100 % de teff, une céréale sans gluten. Comme elle est préparée dans une cuisine où l'on utilise aussi du blé, nous ne pouvons pas exclure des traces : prévenez-nous si vous êtes cœliaque.",
        },
        {
          q: 'Quels plats sont véganes ?',
          a: 'Le misir wat (lentilles rouges) et le shiro (pois cassés), ainsi que la formule végane du Menu Makda à partager. Ils sont aussi sans gluten.',
        },
        {
          q: 'Peut-on venir à plusieurs avec des régimes différents ?',
          a: 'Oui, c’est même l’idéal : on partage un grand plateau où chacun pioche, avec des plats véganes, végétariens et carnés côte à côte.',
        },
        {
          q: 'La viande est-elle halal ?',
          a: "La viande d'agneau et de poulet est certifiée halal.",
        },
      ],
      cta: {
        kind: 'booking',
        title: 'Réservez votre table',
        text: 'Signalez votre régime ou votre allergie en réservant : nous vous guiderons sur place. Tous nos plats sont aussi disponibles à emporter.',
      },
      related: ['menu', 'buffet', 'access'],
    },
    en: {
      title: 'Gluten-free & vegan restaurant in Geneva – 100% teff injera | Makda',
      description:
        "At Makda in Bernex, Geneva, the injera is 100% teff and naturally gluten-free. Vegan dishes (misir wat, shiro), a vegan Menu Makda for sharing and halal meat.",
      hero: {
        image: '/source/menu-misir-wot-large.webp',
        alt: 'Misir wat, red lentils in berbere sauce, served on injera',
        kicker: 'Gluten-free · Vegan · Vegetarian',
        h1: 'Gluten-free & vegan in Geneva',
        lead: 'A cuisine where eating gluten-free and plant-based comes naturally: the injera is made from teff, and pulse dishes are at the heart of the tradition.',
      },
      highlights: [
        { icon: 'wheat', title: '100% teff injera', text: 'Our flatbread is made only from teff, a naturally gluten-free grain.' },
        { icon: 'leaf', title: 'Vegan dishes', text: 'Misir wat and shiro, plus a vegan Menu Makda for 2 to 4 people.' },
        { icon: 'alert', title: 'Allergies taken seriously', text: 'A full allergen sheet and a team that listens: tell us about any intolerance.' },
      ],
      sections: [
        {
          h2: 'Why injera is gluten-free',
          paragraphs: [
            'Injera is the flatbread that serves as both plate and cutlery in Ethiopian and Eritrean cooking. At Makda it is made with 100% teff, the smallest grain in the world, grown for thousands of years in the Ethiopian highlands and naturally free of gluten.',
            'Fermented over several days, it has a gently sour taste and a soft, spongy texture. Every dish comes with this injera, spinach, yellow split peas and a salad.',
          ],
          image: { src: '/source/assortiment-plats-960.webp', alt: 'Selection of Ethiopian dishes on teff injera' },
        },
        {
          h2: 'What you can order',
          bullets: [
            'Vegan and gluten-free: misir wat (red lentils in berbere) and shiro (roasted, slow-cooked split peas).',
            'Menu Makda, vegan version: a sharing selection, CHF 50 for 2, CHF 75 for 3, CHF 90 for 4 people.',
            'Gluten-free with meat: kitfo, tibs, doro wet, doro alecha and zigni. Lamb and chicken are certified halal.',
            'Vegetarian but containing gluten: sambusa (wheat pastry).',
            'Contain dairy: kitfo and doro wet (kibbeh, spiced butter); doro wet also contains egg.',
          ],
        },
        {
          h2: 'Intolerance or coeliac disease',
          paragraphs: [
            'All our dishes are prepared in the same kitchen, where wheat is also used (for the sambusa): traces of gluten, milk, eggs or soy are possible. If you are coeliac or allergic, let us know when booking and when you arrive, and we will point you to the most suitable dishes.',
            'The detailed allergen sheet is on the Menu page and available as a PDF (in French).',
          ],
        },
      ],
      faq: [
        {
          q: "Is Makda's injera really gluten-free?",
          a: 'Yes, it is made from 100% teff, a gluten-free grain. Because it is prepared in a kitchen that also uses wheat, we cannot rule out traces: please tell us if you are coeliac.',
        },
        {
          q: 'Which dishes are vegan?',
          a: 'Misir wat (red lentils) and shiro (split peas), as well as the vegan Menu Makda for sharing. They are also gluten-free.',
        },
        {
          q: 'Can a group with different diets eat together?',
          a: 'Yes, that is the best way: you share one large platter, with vegan, vegetarian and meat dishes side by side.',
        },
        { q: 'Is the meat halal?', a: 'Our lamb and chicken are certified halal.' },
      ],
      cta: {
        kind: 'booking',
        title: 'Book your table',
        text: 'Mention your diet or allergy when booking and we will guide you on the day. All our dishes are also available to take away.',
      },
      related: ['menu', 'buffet', 'access'],
    },
  },

  // ————————————————————————————————— Buffet du dimanche
  buffet: {
    fr: {
      title: 'Buffet éthiopien à volonté le 1er dimanche du mois – Makda Bernex',
      description:
        "Buffet éthiopien et érythréen à volonté chaque premier dimanche du mois chez Makda à Bernex, de 12h à 17h, 30 CHF par personne, boissons chaudes et sirops inclus.",
      hero: {
        image: '/source/buffet-plats-makda.webp',
        alt: 'Plats du buffet éthiopien de Makda',
        kicker: 'Chaque 1er dimanche du mois',
        h1: 'Buffet éthiopien à volonté',
        lead: 'Un dimanche par mois, toute la cuisine de Makda en libre-service : de quoi tout goûter, à son rythme, en famille ou entre amis.',
      },
      highlights: [
        { icon: 'calendar', title: '1er dimanche du mois', text: 'Le buffet revient chaque premier dimanche du mois.' },
        { icon: 'clock', title: 'De 12h00 à 17h00', text: 'Un long service pour un brunch tardif, un déjeuner ou un goûter salé.' },
        { icon: 'coins', title: '30 CHF par personne', text: 'Boissons chaudes et sirops à discrétion inclus.' },
      ],
      sections: [
        {
          h2: "Le meilleur moyen de découvrir la cuisine éthiopienne",
          paragraphs: [
            "Vous hésitez entre le doro wet et les tibs ? Au buffet, plus besoin de choisir. On remplit son assiette d'injera et l'on compose son propre plateau : plats mijotés au berbéré, ragoûts plus doux au curcuma, légumineuses, légumes et salades.",
            "Certains dimanches, on y trouve aussi des spécialités qui ne figurent pas à la carte, comme le kik alicha (pois cassés doux) ou le shimbra asa (bouchées de pois chiches en sauce).",
          ],
          image: { src: '/source/buffet-salle-makda-800.webp', alt: 'Buffet installé dans la salle du restaurant Makda' },
        },
        {
          h2: 'Pour tous les appétits et tous les régimes',
          bullets: [
            'Des plats carnés (viande halal pour l’agneau et le poulet) et des plats végétariens.',
            "L'injera est 100 % teff, sans gluten.",
            'Chaises hautes disponibles pour les plus petits.',
            'Parking gratuit, et la terrasse aux beaux jours.',
          ],
        },
      ],
      faq: [
        { q: 'Faut-il réserver pour le buffet ?', a: 'C’est conseillé : le buffet est très demandé. Réservez en ligne via TheFork ou par téléphone.' },
        {
          q: 'Que comprend le prix de 30 CHF ?',
          a: "L'accès au buffet à volonté ainsi que les boissons chaudes et les sirops à discrétion. Les autres boissons (vins, bières, tej…) sont à la carte.",
        },
        { q: 'Y a-t-il des plats végétariens ?', a: 'Oui, le buffet comprend des plats végétariens, notamment à base de lentilles et de pois cassés.' },
        { q: 'Le restaurant est-il ouvert à la carte les autres dimanches ?', a: 'Oui, Makda est ouvert tous les dimanches de 12h00 à 17h00, avec la carte habituelle.' },
      ],
      cta: {
        kind: 'booking',
        title: 'Réservez votre place au prochain buffet',
        text: 'Le buffet a lieu chaque premier dimanche du mois, de 12h00 à 17h00. Réservation conseillée.',
      },
      related: ['menu', 'glutenFree', 'access'],
    },
    en: {
      title: 'All-you-can-eat Ethiopian buffet, first Sunday of the month – Makda',
      description:
        'All-you-can-eat Ethiopian and Eritrean buffet every first Sunday of the month at Makda in Bernex, Geneva, 12pm to 5pm, CHF 30 per person, hot drinks and cordials included.',
      hero: {
        image: '/source/buffet-plats-makda.webp',
        alt: "Dishes from Makda's Ethiopian buffet",
        kicker: 'Every first Sunday of the month',
        h1: 'All-you-can-eat Ethiopian buffet',
        lead: 'One Sunday a month, all of Makda’s cooking laid out to help yourself: try everything, at your own pace, with family or friends.',
      },
      highlights: [
        { icon: 'calendar', title: 'First Sunday of the month', text: 'The buffet returns on the first Sunday of every month.' },
        { icon: 'clock', title: '12pm to 5pm', text: 'A long service for a late brunch, lunch or an afternoon bite.' },
        { icon: 'coins', title: 'CHF 30 per person', text: 'Unlimited hot drinks and cordials included.' },
      ],
      sections: [
        {
          h2: 'The best way to discover Ethiopian food',
          paragraphs: [
            "Can't decide between doro wet and tibs? At the buffet you don't have to. Start with injera and build your own platter: stews in berbere sauce, milder turmeric stews, pulses, vegetables and salads.",
            'On some Sundays you will also find specialities that are not on the menu, such as kik alicha (mild split peas) or shimbra asa (chickpea dumplings in sauce).',
          ],
          image: { src: '/source/buffet-salle-makda-800.webp', alt: 'Buffet set up in the dining room at Makda' },
        },
        {
          h2: 'For every appetite and diet',
          bullets: [
            'Meat dishes (halal lamb and chicken) and vegetarian dishes.',
            'The injera is 100% teff and gluten-free.',
            'High chairs available for little ones.',
            'Free parking, and the terrace in fine weather.',
          ],
        },
      ],
      faq: [
        { q: 'Do I need to book for the buffet?', a: 'It is recommended, as the buffet is popular. Book online through TheFork or by phone.' },
        {
          q: 'What does the CHF 30 price include?',
          a: 'Unlimited access to the buffet plus hot drinks and cordials. Other drinks (wine, beer, tej…) are charged separately.',
        },
        { q: 'Are there vegetarian dishes?', a: 'Yes, the buffet includes vegetarian dishes, especially lentil and split pea stews.' },
        { q: 'Are you open on other Sundays?', a: 'Yes, Makda is open every Sunday from 12pm to 5pm with the regular menu.' },
      ],
      cta: {
        kind: 'booking',
        title: 'Book your place at the next buffet',
        text: 'The buffet takes place on the first Sunday of every month, 12pm to 5pm. Booking recommended.',
      },
      related: ['menu', 'glutenFree', 'access'],
    },
  },

  // ————————————————————————————————— Privatisation
  privateHire: {
    fr: {
      title: `Privatiser un restaurant à Genève – jusqu'à ${privateHire.indoor} personnes | Makda Bernex`,
      description: `Privatisez le restaurant Makda à Bernex pour votre fête, votre repas d'entreprise ou votre réception : jusqu'à ${privateHire.indoor} personnes en salle et ${privateHire.terrace} en terrasse, cuisine éthiopienne à partager.`,
      hero: {
        image: '/source/salle-makda-tables.webp',
        alt: 'Salle du restaurant Makda dressée pour un groupe',
        kicker: `Jusqu'à ${privateHire.indoor} personnes`,
        h1: 'Privatiser le restaurant Makda',
        lead: "Toute la salle rien que pour vous, avec la cuisine et l'accueil de Makda : anniversaires, repas d'équipe, fêtes de famille ou réceptions.",
      },
      highlights: [
        { icon: 'users', title: `${privateHire.indoor} personnes en salle`, text: 'La salle entière privatisée pour votre groupe.' },
        { icon: 'sun', title: `${privateHire.terrace} en terrasse`, text: 'Aux beaux jours, la terrasse peut accueillir vos invités en plus.' },
        { icon: 'car', title: 'Parking gratuit', text: 'Pratique pour vos invités venus en voiture.' },
      ],
      sections: [
        {
          h2: 'Une soirée sur mesure',
          paragraphs: [
            "Nous composons avec vous le repas qui vous ressemble : grands plateaux à partager sur injera, Menu Makda pour chaque table, formule buffet, et pourquoi pas une cérémonie du café pour terminer en beauté.",
            'Plats carnés, végétariens et véganes peuvent cohabiter sur la même table, et notre injera est 100 % teff, sans gluten.',
          ],
          image: { src: '/source/salle-makda-clients-800.webp', alt: 'Groupe attablé chez Makda' },
        },
        {
          h2: 'Pour quelles occasions ?',
          bullets: [
            'Anniversaires et fêtes de famille',
            'Baptêmes, fiançailles, réceptions après une cérémonie',
            "Repas d'entreprise, fêtes de fin d'année, départs à la retraite",
            'Soirées associatives et culturelles',
          ],
        },
      ],
      faq: [
        {
          q: 'Combien de personnes peut-on accueillir ?',
          a: `Jusqu'à ${privateHire.indoor} personnes en salle, et ${privateHire.terrace} de plus en terrasse lorsque la météo le permet.`,
        },
        {
          q: 'Combien coûte une privatisation ?',
          a: 'Cela dépend de la date, du nombre d’invités et de la formule choisie. Décrivez-nous votre projet et nous vous envoyons une proposition.',
        },
        {
          q: 'Peut-on combiner privatisation et service traiteur ?',
          a: 'Oui. Et si vous préférez recevoir chez vous ou dans une salle, notre service traiteur se déplace dans toute la Suisse romande.',
        },
      ],
      cta: {
        kind: 'quote',
        type: 'privatisation',
        title: 'Demandez une proposition',
        text: 'Indiquez la date, le nombre d’invités et vos envies : nous revenons vers vous rapidement.',
      },
      related: ['catering', 'menu', 'access'],
    },
    en: {
      title: `Private hire restaurant in Geneva – up to ${privateHire.indoor} guests | Makda Bernex`,
      description: `Hire Makda in Bernex, Geneva, for your party, team dinner or reception: up to ${privateHire.indoor} guests indoors and ${privateHire.terrace} on the terrace, with Ethiopian food made for sharing.`,
      hero: {
        image: '/source/salle-makda-tables.webp',
        alt: 'Dining room at Makda laid for a group',
        kicker: `Up to ${privateHire.indoor} guests`,
        h1: 'Private hire at Makda',
        lead: 'The whole dining room just for you, with Makda’s food and hospitality: birthdays, team dinners, family celebrations or receptions.',
      },
      highlights: [
        { icon: 'users', title: `${privateHire.indoor} guests indoors`, text: 'The entire dining room reserved for your group.' },
        { icon: 'sun', title: `${privateHire.terrace} on the terrace`, text: 'In fine weather, the terrace can welcome extra guests.' },
        { icon: 'car', title: 'Free parking', text: 'Easy for guests arriving by car.' },
      ],
      sections: [
        {
          h2: 'An evening made to measure',
          paragraphs: [
            'We plan the meal with you: large sharing platters on injera, a Menu Makda for each table, a buffet, and perhaps a coffee ceremony to round things off.',
            'Meat, vegetarian and vegan dishes can share the same table, and our injera is 100% teff and gluten-free.',
          ],
          image: { src: '/source/salle-makda-clients-800.webp', alt: 'Group dining at Makda' },
        },
        {
          h2: 'Which occasions?',
          bullets: [
            'Birthdays and family celebrations',
            'Christenings, engagements, receptions after a ceremony',
            'Team dinners, end-of-year parties, retirement send-offs',
            'Community and cultural evenings',
          ],
        },
      ],
      faq: [
        {
          q: 'How many guests can you host?',
          a: `Up to ${privateHire.indoor} guests indoors, plus ${privateHire.terrace} on the terrace when the weather allows.`,
        },
        {
          q: 'How much does private hire cost?',
          a: 'It depends on the date, the number of guests and the format you choose. Tell us about your plans and we will send you a proposal.',
        },
        {
          q: 'Can private hire be combined with catering?',
          a: 'Yes. And if you would rather host at home or in a venue, our catering service travels across French-speaking Switzerland.',
        },
      ],
      cta: {
        kind: 'quote',
        type: 'privatisation',
        title: 'Request a proposal',
        text: 'Give us the date, number of guests and what you have in mind, and we will get back to you quickly.',
      },
      related: ['catering', 'menu', 'access'],
    },
  },

  // ————————————————————————————————— Accès & parking
  access: {
    fr: {
      title: 'Accès et parking – Makda, Rue de Bernex 224, Bernex (Genève)',
      description:
        'Comment venir chez Makda, Rue de Bernex 224 à Bernex : parking gratuit, accès en voiture depuis Genève, tram 14 direction Bernex-Vailly. Horaires et itinéraire.',
      hero: {
        image: '/source/facade-makda-nuit.webp',
        alt: 'Façade du restaurant Makda de nuit, rue de Bernex',
        kicker: 'Rue de Bernex 224 · 1233 Bernex',
        h1: 'Accès & parking',
        lead: 'Au cœur du village de Bernex, à l’ouest de Genève : facile d’accès en voiture, avec un parking gratuit, ou en transports publics.',
      },
      highlights: [
        { icon: 'car', title: 'Parking gratuit', text: 'Garez-vous sans souci et sans ticket.' },
        { icon: 'tram', title: 'Tram 14', text: 'Direction Bernex-Vailly, depuis Bel-Air, Cornavin ou Meyrin.' },
        { icon: 'map', title: 'Rue de Bernex 224', text: '1233 Bernex, canton de Genève.' },
      ],
      sections: [
        {
          h2: 'En voiture',
          paragraphs: [
            "Depuis le centre de Genève, suivez la route de Chancy en direction de Bernex, puis rejoignez la rue de Bernex qui traverse le village. Makda se trouve au numéro 224. Le parking est gratuit.",
            "Depuis l'autoroute A1, prenez la sortie Bernex, puis suivez Bernex-centre.",
          ],
        },
        {
          h2: 'En transports publics',
          paragraphs: [
            "Le tram 14 relie le centre-ville (Bel-Air, Cornavin) à Bernex ; son terminus est Bernex-Vailly. Plusieurs lignes de bus desservent aussi le village. Pour l'arrêt le plus proche et l'horaire du moment, utilisez notre bouton Itinéraire ou l'horaire en ligne des TPG.",
          ],
        },
        {
          h2: 'Sur place',
          bullets: [
            'Terrasse aux beaux jours',
            'Chiens bienvenus',
            'Chaises hautes pour les enfants',
            'Vente à emporter : commandez par téléphone et passez récupérer vos plats',
          ],
        },
      ],
      faq: [
        { q: 'Y a-t-il un parking ?', a: 'Oui, le parking est gratuit.' },
        { q: 'Comment venir en tram ?', a: "Prenez le tram 14 en direction de Bernex-Vailly, puis rejoignez la rue de Bernex. Le bouton Itinéraire vous indique le trajet exact depuis l'endroit où vous êtes." },
        { q: 'Quels sont les horaires ?', a: 'Mardi à samedi de 11h30 à 14h00 et de 18h00 à 22h30, dimanche de 12h00 à 17h00. Fermé le lundi.' },
        { q: 'Peut-on venir avec son chien ?', a: 'Oui, les chiens sont les bienvenus.' },
      ],
      cta: {
        kind: 'booking',
        title: 'À tout bientôt chez Makda',
        text: 'Réservez votre table en ligne ou appelez-nous. Tous nos plats sont aussi disponibles à emporter.',
      },
      related: ['contact', 'menu', 'privateHire'],
    },
    en: {
      title: 'Getting here and parking – Makda, Rue de Bernex 224, Bernex (Geneva)',
      description:
        'How to get to Makda, Rue de Bernex 224 in Bernex, Geneva: free parking, by car from central Geneva, or tram 14 towards Bernex-Vailly. Opening hours and directions.',
      hero: {
        image: '/source/facade-makda-nuit.webp',
        alt: 'Makda restaurant at night on Rue de Bernex',
        kicker: 'Rue de Bernex 224 · 1233 Bernex',
        h1: 'Getting here & parking',
        lead: 'In the heart of Bernex village, west of Geneva: easy to reach by car, with free parking, or by public transport.',
      },
      highlights: [
        { icon: 'car', title: 'Free parking', text: 'Park easily, no ticket needed.' },
        { icon: 'tram', title: 'Tram 14', text: 'Towards Bernex-Vailly, from Bel-Air, Cornavin or Meyrin.' },
        { icon: 'map', title: 'Rue de Bernex 224', text: '1233 Bernex, canton of Geneva.' },
      ],
      sections: [
        {
          h2: 'By car',
          paragraphs: [
            'From central Geneva, follow Route de Chancy towards Bernex, then take Rue de Bernex through the village. Makda is at number 224. Parking is free.',
            'From the A1 motorway, take the Bernex exit and follow signs for Bernex-centre.',
          ],
        },
        {
          h2: 'By public transport',
          paragraphs: [
            'Tram 14 runs from the city centre (Bel-Air, Cornavin) to Bernex, terminating at Bernex-Vailly. Several bus lines also serve the village. For the nearest stop and current times, use our Directions button or the TPG online timetable.',
          ],
        },
        {
          h2: 'On site',
          bullets: [
            'Terrace in fine weather',
            'Dogs welcome',
            'High chairs for children',
            'Takeaway: order by phone and collect your food',
          ],
        },
      ],
      faq: [
        { q: 'Is there parking?', a: 'Yes, parking is free.' },
        { q: 'How do I get there by tram?', a: 'Take tram 14 towards Bernex-Vailly, then make your way to Rue de Bernex. The Directions button shows the exact route from wherever you are.' },
        { q: 'What are the opening hours?', a: 'Tuesday to Saturday 11:30am–2pm and 6pm–10:30pm, Sunday 12pm–5pm. Closed on Monday.' },
        { q: 'Can I bring my dog?', a: 'Yes, dogs are welcome.' },
      ],
      cta: {
        kind: 'booking',
        title: 'See you soon at Makda',
        text: 'Book your table online or call us. All our dishes are also available to take away.',
      },
      related: ['contact', 'menu', 'privateHire'],
    },
  },

  // ————————————————————————————————— Traiteur mariage
  weddings: {
    fr: {
      title: 'Traiteur mariage éthiopien et érythréen à Genève – Makda',
      description:
        "Traiteur éthiopien et érythréen pour mariages à Genève et en Suisse romande : buffets à partager, injera sans gluten, plats véganes et halal, cérémonie du café. Devis sur mesure.",
      hero: {
        image: '/source/buffet-poulet-makda.webp',
        srcSet: '/source/buffet-poulet-makda-800.webp 800w, /source/buffet-poulet-makda.webp 1600w',
        alt: 'Plats de fête préparés par Makda pour un mariage',
        kicker: 'Traiteur mariage',
        h1: 'Traiteur mariage éthiopien à Genève',
        lead: 'Un festin à partager pour le plus beau jour : les saveurs de l’Éthiopie et de l’Érythrée, généreuses et colorées, pour tous vos invités.',
      },
      highlights: [
        { icon: 'heart', title: 'Mariages traditionnels et mixtes', text: 'Une cuisine qui rassemble les familles, d’ici et d’ailleurs.' },
        { icon: 'leaf', title: 'Tous les régimes', text: 'Végane, végétarien, halal et sans gluten à la même table.' },
        { icon: 'coffee', title: 'Cérémonie du café', text: 'Le rituel du buna pour clore le repas en beauté.' },
      ],
      sections: [
        {
          h2: 'Un repas qui rassemble',
          paragraphs: [
            "Dans la tradition éthiopienne et érythréenne, partager un plat, c'est partager un lien. Nos grands plateaux d'injera garnis de wats mijotés invitent vos invités à se servir ensemble, à goûter, à échanger.",
            "Pour un mariage traditionnel, un mariage mixte ou simplement des mariés qui aiment cette cuisine, nous adaptons la formule à votre fête : buffet, plateaux à table ou bouchées pour le vin d'honneur.",
          ],
          image: { src: '/source/traiteur-plateau.webp', alt: 'Plats éthiopiens prêts à être servis' },
        },
        {
          h2: 'Ce que nous proposons',
          bullets: [
            'Buffets royaux : plats carnés et végétariens, injera fraîche 100 % teff',
            "Bouchées et finger food pour l'apéritif ou le vin d'honneur",
            'Cérémonie du café avec torréfaction sur place',
            'Service en tenue traditionnelle sur demande',
            `Déplacement dans ${area.fr}`,
          ],
        },
      ],
      faq: [
        {
          q: 'Pour combien d’invités pouvez-vous cuisiner ?',
          a: 'Des petits comités aux grandes réceptions. Indiquez-nous le nombre d’invités dans la demande de devis et nous vous proposons la formule adaptée.',
        },
        {
          q: 'Pouvez-vous gérer les régimes particuliers ?',
          a: "Oui : notre injera est 100 % teff (sans gluten), nous avons des plats véganes, et l'agneau et le poulet sont certifiés halal.",
        },
        { q: 'Vous déplacez-vous hors de Genève ?', a: 'Oui, dans toute la Suisse romande.' },
        { q: 'Combien de temps à l’avance faut-il réserver ?', a: 'Le plus tôt possible pour les dates de haute saison. Envoyez votre demande même si la date n’est pas encore fixée.' },
      ],
      cta: {
        kind: 'quote',
        type: 'mariage',
        title: 'Parlons de votre mariage',
        text: 'Quelques informations suffisent pour que nous vous préparions une proposition sur mesure.',
      },
      related: ['catering', 'privateHire', 'parties'],
    },
    en: {
      title: 'Ethiopian & Eritrean wedding catering in Geneva – Makda',
      description:
        'Ethiopian and Eritrean wedding catering in Geneva and French-speaking Switzerland: sharing buffets, gluten-free injera, vegan and halal dishes, coffee ceremony. Tailored quotes.',
      hero: {
        image: '/source/buffet-poulet-makda.webp',
        srcSet: '/source/buffet-poulet-makda-800.webp 800w, /source/buffet-poulet-makda.webp 1600w',
        alt: 'Festive dishes prepared by Makda for a wedding',
        kicker: 'Wedding catering',
        h1: 'Ethiopian wedding catering in Geneva',
        lead: 'A sharing feast for the big day: the generous, colourful flavours of Ethiopia and Eritrea for all your guests.',
      },
      highlights: [
        { icon: 'heart', title: 'Traditional and mixed weddings', text: 'Food that brings families together, from here and far away.' },
        { icon: 'leaf', title: 'Every diet', text: 'Vegan, vegetarian, halal and gluten-free at the same table.' },
        { icon: 'coffee', title: 'Coffee ceremony', text: 'The buna ritual to end the meal in style.' },
      ],
      sections: [
        {
          h2: 'A meal that brings people together',
          paragraphs: [
            'In Ethiopian and Eritrean tradition, sharing a dish means sharing a bond. Our large injera platters topped with slow-cooked wats invite your guests to eat together, taste and talk.',
            'For a traditional wedding, a mixed wedding or simply a couple who love this food, we adapt the format to your celebration: buffet, platters at the table or bites for the drinks reception.',
          ],
          image: { src: '/source/traiteur-plateau.webp', alt: 'Ethiopian dishes ready to serve' },
        },
        {
          h2: 'What we offer',
          bullets: [
            'Royal buffets: meat and vegetarian dishes, fresh 100% teff injera',
            'Bites and finger food for the drinks reception',
            'Coffee ceremony with beans roasted on site',
            'Service in traditional dress on request',
            `We travel across ${area.en}`,
          ],
        },
      ],
      faq: [
        {
          q: 'How many guests can you cater for?',
          a: 'From small gatherings to large receptions. Tell us the number of guests in your quote request and we will suggest the right format.',
        },
        {
          q: 'Can you cater for special diets?',
          a: 'Yes: our injera is 100% teff (gluten-free), we have vegan dishes, and our lamb and chicken are certified halal.',
        },
        { q: 'Do you travel outside Geneva?', a: 'Yes, throughout French-speaking Switzerland.' },
        { q: 'How far ahead should I book?', a: 'As early as possible for peak-season dates. Send your request even if the date is not fixed yet.' },
      ],
      cta: {
        kind: 'quote',
        type: 'mariage',
        title: "Let's talk about your wedding",
        text: 'A few details are all we need to prepare a tailored proposal.',
      },
      related: ['catering', 'privateHire', 'parties'],
    },
  },

  // ————————————————————————————————— Traiteur entreprise
  corporate: {
    fr: {
      title: "Traiteur d'entreprise éthiopien à Genève – séminaires, apéritifs | Makda",
      description:
        "Traiteur éthiopien pour entreprises à Genève et en Suisse romande : repas d'équipe, séminaires, apéritifs dînatoires, fêtes de fin d'année. Options véganes, halal et sans gluten.",
      hero: {
        image: '/source/traiteur-buffet.webp',
        srcSet: '/source/traiteur-buffet-960.webp 960w, /source/traiteur-buffet.webp 1920w',
        alt: 'Buffet traiteur Makda installé pour un événement',
        kicker: 'Traiteur entreprise',
        h1: "Traiteur d'entreprise à Genève",
        lead: 'Surprenez vos équipes et vos clients avec une cuisine qui se partage : conviviale, colorée et adaptée à tous les régimes.',
      },
      highlights: [
        { icon: 'briefcase', title: 'Tous formats', text: "Repas d'équipe, séminaire, apéritif dînatoire, soirée de fin d'année." },
        { icon: 'leaf', title: 'Inclusif', text: 'Végane, végétarien, halal et sans gluten sans menus séparés.' },
        { icon: 'truck', title: 'On se déplace', text: `Dans vos locaux ou une salle, dans ${area.fr}.` },
      ],
      sections: [
        {
          h2: 'Une pause qui fait parler',
          paragraphs: [
            "Un buffet éthiopien change des plateaux habituels. Les plats se partagent, on discute, on goûte : c'est une manière naturelle de créer du lien entre collègues ou avec vos invités.",
            'Comme une grande partie de notre cuisine est naturellement végane et sans gluten, chacun trouve son bonheur sans menus séparés.',
          ],
          image: { src: '/source/traiteur-evenement.webp', alt: 'Service du buffet Makda lors d’un événement' },
        },
        {
          h2: 'Nos formules',
          bullets: [
            'Buffet à partager pour un déjeuner ou un dîner',
            'Bouchées et finger food pour un apéritif debout',
            'Cérémonie du café en animation',
            'Privatisation du restaurant à Bernex pour votre soirée',
          ],
        },
      ],
      faq: [
        {
          q: 'Pouvez-vous livrer dans nos bureaux ?',
          a: `Oui, nous nous déplaçons dans ${area.fr}. Indiquez le lieu dans votre demande de devis.`,
        },
        {
          q: 'Proposez-vous des options pour tous les régimes ?',
          a: "Oui : plats véganes et végétariens, viande d'agneau et de poulet certifiée halal, injera 100 % teff sans gluten.",
        },
        { q: 'Pouvons-nous organiser notre soirée au restaurant ?', a: `Oui, le restaurant peut être privatisé jusqu'à ${privateHire.indoor} personnes en salle.` },
      ],
      cta: {
        kind: 'quote',
        type: 'entreprise',
        title: 'Demandez votre devis entreprise',
        text: 'Date, nombre de participants, lieu : nous vous préparons une proposition adaptée.',
      },
      related: ['catering', 'privateHire', 'weddings'],
    },
    en: {
      title: 'Ethiopian corporate catering in Geneva – seminars, receptions | Makda',
      description:
        'Ethiopian corporate catering in Geneva and French-speaking Switzerland: team lunches, seminars, drinks receptions and end-of-year parties. Vegan, halal and gluten-free options.',
      hero: {
        image: '/source/traiteur-buffet.webp',
        srcSet: '/source/traiteur-buffet-960.webp 960w, /source/traiteur-buffet.webp 1920w',
        alt: 'Makda catering buffet set up for an event',
        kicker: 'Corporate catering',
        h1: 'Corporate catering in Geneva',
        lead: 'Treat your team and clients to food made for sharing: friendly, colourful and suited to every diet.',
      },
      highlights: [
        { icon: 'briefcase', title: 'Any format', text: 'Team meals, seminars, drinks receptions, end-of-year parties.' },
        { icon: 'leaf', title: 'Inclusive', text: 'Vegan, vegetarian, halal and gluten-free without separate menus.' },
        { icon: 'truck', title: 'We come to you', text: `At your offices or a venue, across ${area.en}.` },
      ],
      sections: [
        {
          h2: 'A break people talk about',
          paragraphs: [
            'An Ethiopian buffet makes a change from the usual platters. Dishes are shared, people chat and taste: a natural way to bring colleagues and guests together.',
            'Because much of our cooking is naturally vegan and gluten-free, everyone finds something they love without separate menus.',
          ],
          image: { src: '/source/traiteur-evenement.webp', alt: 'Makda buffet service at an event' },
        },
        {
          h2: 'Our formats',
          bullets: [
            'Sharing buffet for lunch or dinner',
            'Bites and finger food for a standing reception',
            'Coffee ceremony as an experience',
            'Private hire of the restaurant in Bernex for your evening',
          ],
        },
      ],
      faq: [
        { q: 'Can you deliver to our offices?', a: `Yes, we travel across ${area.en}. Add the location to your quote request.` },
        {
          q: 'Do you have options for every diet?',
          a: 'Yes: vegan and vegetarian dishes, certified halal lamb and chicken, and gluten-free 100% teff injera.',
        },
        { q: 'Can we hold our event at the restaurant?', a: `Yes, the restaurant can be hired for up to ${privateHire.indoor} guests indoors.` },
      ],
      cta: {
        kind: 'quote',
        type: 'entreprise',
        title: 'Request a corporate quote',
        text: 'Date, number of guests, location: we will prepare a proposal to suit.',
      },
      related: ['catering', 'privateHire', 'weddings'],
    },
  },

  // ————————————————————————————————— Traiteur fête privée
  parties: {
    fr: {
      title: 'Traiteur pour fêtes privées à Genève – anniversaires, baptêmes | Makda',
      description:
        "Traiteur éthiopien et érythréen pour vos fêtes privées à Genève et en Suisse romande : anniversaires, baptêmes, fêtes de famille. Buffets à partager et cérémonie du café.",
      hero: {
        image: '/source/convives-makda.webp',
        srcSet: '/source/convives-makda-800.webp 800w, /source/convives-makda.webp 1600w',
        alt: 'Famille et amis réunis autour d’un repas Makda',
        kicker: 'Traiteur fête privée',
        h1: 'Traiteur pour vos fêtes privées',
        lead: 'Anniversaire, baptême, fête de famille ou soirée entre amis : recevez sans vous soucier de la cuisine.',
      },
      highlights: [
        { icon: 'cake', title: 'Toutes les fêtes', text: 'Anniversaires, baptêmes, communions, retrouvailles.' },
        { icon: 'utensils', title: 'À partager', text: "De grands plateaux d'injera garnis, comme à la maison." },
        { icon: 'sparkles', title: 'Une touche de tradition', text: 'Cérémonie du café et service en tenue traditionnelle sur demande.' },
      ],
      sections: [
        {
          h2: 'Recevez comme en Éthiopie',
          paragraphs: [
            "Chez nous, recevoir, c'est faire déborder la table. Nous préparons pour vos invités des plats mijotés, des légumineuses parfumées et de l'injera fraîche, à poser au centre pour que chacun se serve.",
            'Chez vous, dans une salle louée ou au restaurant : nous nous adaptons à votre lieu et à votre nombre d’invités.',
          ],
          image: { src: '/source/ceremonie-cafe-torrefaction-800.webp', alt: 'Torréfaction du café lors d’une cérémonie' },
        },
        {
          h2: 'Ce que nous pouvons prévoir',
          bullets: [
            'Buffet à partager, carné et végétarien',
            'Plats véganes et sans gluten pour ceux qui en ont besoin',
            'Cérémonie du café pour le dessert',
            `Déplacement dans ${area.fr}, ou privatisation du restaurant (jusqu'à ${privateHire.indoor} personnes)`,
          ],
        },
      ],
      faq: [
        { q: 'Faites-vous les petites fêtes ?', a: 'Oui, nous cuisinons aussi pour les petits groupes. Décrivez-nous votre projet dans la demande de devis.' },
        { q: 'Pouvez-vous venir chez nous ?', a: `Oui, nous nous déplaçons dans ${area.fr}.` },
        { q: 'Et si nous voulons fêter au restaurant ?', a: `Le restaurant peut être privatisé : jusqu'à ${privateHire.indoor} personnes en salle et ${privateHire.terrace} en terrasse.` },
      ],
      cta: {
        kind: 'quote',
        type: 'fete',
        title: 'Organisons votre fête',
        text: 'Dites-nous l’occasion, la date et le nombre d’invités : nous vous faisons une proposition.',
      },
      related: ['catering', 'privateHire', 'weddings'],
    },
    en: {
      title: 'Private party catering in Geneva – birthdays, christenings | Makda',
      description:
        'Ethiopian and Eritrean catering for private parties in Geneva and French-speaking Switzerland: birthdays, christenings, family gatherings. Sharing buffets and coffee ceremony.',
      hero: {
        image: '/source/convives-makda.webp',
        srcSet: '/source/convives-makda-800.webp 800w, /source/convives-makda.webp 1600w',
        alt: 'Family and friends sharing a Makda meal',
        kicker: 'Private party catering',
        h1: 'Catering for private parties',
        lead: 'Birthday, christening, family gathering or an evening with friends: host without worrying about the cooking.',
      },
      highlights: [
        { icon: 'cake', title: 'Every celebration', text: 'Birthdays, christenings, communions, reunions.' },
        { icon: 'utensils', title: 'Made for sharing', text: 'Large injera platters, just like at home.' },
        { icon: 'sparkles', title: 'A touch of tradition', text: 'Coffee ceremony and service in traditional dress on request.' },
      ],
      sections: [
        {
          h2: 'Host the Ethiopian way',
          paragraphs: [
            'For us, hosting means a table that overflows. We prepare slow-cooked stews, fragrant pulses and fresh injera for your guests, placed in the middle so everyone can help themselves.',
            'At home, in a hired venue or at the restaurant: we adapt to your space and your number of guests.',
          ],
          image: { src: '/source/ceremonie-cafe-torrefaction-800.webp', alt: 'Roasting coffee during a ceremony' },
        },
        {
          h2: 'What we can arrange',
          bullets: [
            'Sharing buffet with meat and vegetarian dishes',
            'Vegan and gluten-free dishes for those who need them',
            'Coffee ceremony for dessert',
            `We travel across ${area.en}, or hire the restaurant (up to ${privateHire.indoor} guests)`,
          ],
        },
      ],
      faq: [
        { q: 'Do you cater for small parties?', a: 'Yes, we also cook for small groups. Tell us about your plans in the quote request.' },
        { q: 'Can you come to our home?', a: `Yes, we travel across ${area.en}.` },
        { q: 'What if we want to celebrate at the restaurant?', a: `The restaurant can be hired: up to ${privateHire.indoor} guests indoors and ${privateHire.terrace} on the terrace.` },
      ],
      cta: {
        kind: 'quote',
        type: 'fete',
        title: "Let's plan your party",
        text: 'Tell us the occasion, date and number of guests and we will send you a proposal.',
      },
      related: ['catering', 'privateHire', 'weddings'],
    },
  },
};

/** Données structurées « service traiteur » pour Google. */
export const cateringServiceJsonLd = (lang: Lang, name?: string, path?: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: lang === 'en' ? 'Catering' : 'Traiteur',
  name: name ?? (lang === 'en' ? 'Makda Ethiopian catering' : 'Traiteur éthiopien Makda'),
  url: `${SITE_URL}${path ?? (lang === 'en' ? '/en/catering' : '/traiteur')}`,
  provider: { '@id': `${SITE_URL}/#restaurant`, '@type': 'Restaurant', name: restaurant.name, telephone: restaurant.phone },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Genève' },
    { '@type': 'AdministrativeArea', name: 'Vaud' },
    { '@type': 'AdministrativeArea', name: 'Valais' },
    { '@type': 'AdministrativeArea', name: 'Fribourg' },
    { '@type': 'AdministrativeArea', name: 'Neuchâtel' },
    { '@type': 'AdministrativeArea', name: 'Jura' },
  ],
});
