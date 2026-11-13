// Journal de Makda : articles en français et en anglais.
// Pour ajouter un article : copier un bloc, changer les slugs (adresses), le texte et l'image.
// Blocs de contenu : { h: 'Titre' } pour un intertitre, { p: 'Paragraphe' }, { ul: ['…', '…'] } pour une liste,
// { cta: 'menu' | 'glutenFree' | 'buffet' | 'catering' | 'history' } pour un bouton vers une page du site.
import type { Lang, RouteId } from '../i18n';

export type Block = { h: string } | { p: string } | { ul: string[] } | { cta: RouteId };

export interface ArticleVersion {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  body: Block[];
  imageAlt: string;
}

export interface Article {
  id: string;
  date: string; // AAAA-MM-JJ
  image: string;
  readingMinutes: number;
  fr: ArticleVersion;
  en: ArticleVersion;
}

export const articles: Article[] = [
  // ——————————————————————————————————————————— Genna
  {
    id: 'genna',
    date: '2026-11-13',
    image: '/source/buffet-poulet-makda.webp',
    readingMinutes: 4,
    fr: {
      slug: 'genna-noel-ethiopien',
      title: 'Genna, le Noël éthiopien du 7 janvier',
      description:
        "Pourquoi l'Éthiopie fête Noël le 7 janvier : le jeûne de 43 jours, la messe de la nuit, les vêtements blancs et le doro wet qui marque la fin du jeûne.",
      excerpt: "Jeûne, messe de la nuit, vêtements blancs et doro wet : les traditions d'un Noël célébré deux semaines après le nôtre.",
      imageAlt: 'Doro wet, le plat de fête éthiopien à base de poulet',
      body: [
        { p: "Quand les sapins disparaissent des salons genevois, une autre fête commence pour les familles éthiopiennes : Genna, le Noël orthodoxe, célébré le 7 janvier. Au Tigray et en Érythrée, on parle aussi de Lidet, « la naissance »." },
        { h: 'Pourquoi le 7 janvier ?' },
        { p: "L'Église orthodoxe éthiopienne suit son propre calendrier, différent du calendrier grégorien que nous utilisons en Suisse. Noël y tombe le 29 du mois de Tahsas, ce qui correspond au 7 janvier. C'est d'ailleurs le même jour que dans plusieurs autres Églises orthodoxes." },
        { h: 'Un long jeûne avant la fête' },
        { p: "Genna se prépare pendant 43 jours de jeûne, appelé Tsome Nebiyat, le jeûne des prophètes. Pendant cette période, les fidèles renoncent à la viande, aux produits laitiers et aux œufs. C'est l'une des raisons pour lesquelles la cuisine éthiopienne est si riche en plats véganes : lentilles, pois cassés, pois chiches et légumes y sont cuisinés avec autant de soin que la viande." },
        { h: 'La nuit de Noël' },
        { p: "La veille, on se rend à l'église pour une messe qui dure une bonne partie de la nuit. Beaucoup portent des vêtements blancs traditionnels, comme le netela, un châle de coton léger. On allume des bougies, on chante, on prie jusqu'à l'aube." },
        { h: 'Le repas qui rompt le jeûne' },
        { p: "Au matin, la famille se retrouve autour d'un grand repas. Le plat roi est le doro wet : du poulet mijoté longuement avec des oignons, de l'ail et du berbéré, puis enrichi de beurre épicé et servi avec des œufs durs. Il demande des heures de préparation, ce qui en fait un vrai plat de fête. On le partage sur l'injera, accompagné de tej, le vin de miel, puis on termine par une cérémonie du café." },
        { h: 'Un jeu, des visites, peu de cadeaux' },
        { p: "Genna n'est pas une fête de cadeaux. C'est surtout un moment de visites, de retrouvailles et de partage. Dans certaines régions, les jeunes jouent aussi au genna, un jeu de balle avec des bâtons qui rappelle le hockey et qui a donné son nom à la fête. Douze jours plus tard, le 19 janvier, viendra Timkat, l'Épiphanie, l'autre grande fête de l'hiver éthiopien." },
        { h: 'Goûter Genna à Bernex' },
        { p: "Le doro wet est à notre carte toute l'année, cuisiné selon la recette de notre cheffe. Et si vous êtes du côté des végétaux, misir wat et shiro vous feront découvrir la cuisine des jours de jeûne." },
        { cta: 'menu' },
      ],
    },
    en: {
      slug: 'genna-ethiopian-christmas',
      title: 'Genna: Ethiopian Christmas on 7 January',
      description:
        'Why Ethiopia celebrates Christmas on 7 January: the 43-day fast, the night-long mass, white clothing and the doro wet that breaks the fast.',
      excerpt: 'A fast, a night-long mass, white clothes and doro wet: the traditions of a Christmas celebrated two weeks after ours.',
      imageAlt: 'Doro wet, the Ethiopian festive chicken dish',
      body: [
        { p: 'When the Christmas trees disappear from Geneva living rooms, another celebration begins for Ethiopian families: Genna, Orthodox Christmas, on 7 January. In Tigray and Eritrea it is also called Lidet, "the birth".' },
        { h: 'Why 7 January?' },
        { p: 'The Ethiopian Orthodox Church follows its own calendar, different from the Gregorian calendar used in Switzerland. Christmas falls on the 29th day of the month of Tahsas, which corresponds to 7 January, the same day as several other Orthodox churches.' },
        { h: 'A long fast before the feast' },
        { p: 'Genna is preceded by 43 days of fasting, known as Tsome Nebiyat, the fast of the prophets. During this time the faithful give up meat, dairy and eggs. It is one of the reasons Ethiopian cooking is so rich in vegan dishes: lentils, split peas, chickpeas and vegetables are cooked with as much care as meat.' },
        { h: 'Christmas night' },
        { p: 'On Christmas Eve, people go to church for a mass that lasts much of the night. Many wear traditional white clothing such as the netela, a light cotton shawl. Candles are lit, and the singing and prayers continue until dawn.' },
        { h: 'The meal that breaks the fast' },
        { p: 'In the morning, the family gathers for a big meal. The star dish is doro wet: chicken slow-cooked with onions, garlic and berbere, enriched with spiced butter and served with hard-boiled eggs. It takes hours to prepare, which makes it a true festive dish. It is shared on injera with tej, the honey wine, and followed by a coffee ceremony.' },
        { h: 'A game, visits and few presents' },
        { p: 'Genna is not about presents. It is above all a time for visits, reunions and sharing. In some regions young men play genna, a stick-and-ball game reminiscent of hockey that gave the feast its name. Twelve days later, on 19 January, comes Timkat, Epiphany, the other great celebration of the Ethiopian winter.' },
        { h: 'A taste of Genna in Bernex' },
        { p: "Doro wet is on our menu all year round, made to our chef's recipe. And if you prefer plant-based food, misir wat and shiro will introduce you to the cooking of fasting days." },
        { cta: 'menu' },
      ],
    },
  },

  // ——————————————————————————————————————————— Injera
  {
    id: 'injera',
    date: '2026-11-13',
    image: '/source/assortiment-plats.webp',
    readingMinutes: 4,
    fr: {
      slug: 'injera-teff-sans-gluten',
      title: "L'injera : le pain au teff qui sert d'assiette (et qui est sans gluten)",
      description:
        "Qu'est-ce que l'injera ? Une galette au teff, céréale naturellement sans gluten, qui sert à la fois d'assiette et de couverts. Comment elle est faite et pourquoi celle de Makda est douce.",
      excerpt: "Une galette au teff qui sert à la fois d'assiette et de couverts. Comment on la fait, et pourquoi elle est naturellement sans gluten.",
      imageAlt: 'Plats éthiopiens servis sur injera au teff',
      body: [
        { p: "Chez Makda, il n'y a ni assiette ni couverts sur le plateau. À la place, une grande galette souple et alvéolée : l'injera. Elle porte les plats, sert à les saisir et s'imbibe de leurs sauces. C'est le cœur de la cuisine éthiopienne et érythréenne." },
        { h: 'Le teff, une toute petite céréale' },
        { p: "L'injera est traditionnellement faite avec du teff, une céréale cultivée depuis des millénaires sur les hauts plateaux d'Éthiopie et d'Érythrée. Ses grains sont minuscules, à peine plus gros qu'une tête d'épingle. Le teff est naturellement sans gluten et riche en fibres." },
        { h: 'Comment on fait une injera' },
        { ul: [
          'La farine de teff est mélangée à de l’eau pour former une pâte liquide.',
          'La pâte repose plusieurs jours : c’est la fermentation qui lui donne sa texture légère.',
          'Elle est versée en spirale sur une grande plaque ronde très chaude, le mitad.',
          'On la cuit d’un seul côté, sous un couvercle : de petites bulles se forment en surface et lui donnent son aspect alvéolé.',
        ] },
        { h: 'Une injera douce' },
        { p: "Beaucoup d'injeras ont un goût acidulé assez marqué, dû à la fermentation. Au fil des années, notre cheffe a perfectionné sa recette pour obtenir une injera plus douce, sans cette acidité prononcée : elle accompagne les plats sans prendre le dessus, ce qui plaît beaucoup à ceux qui la découvrent." },
        { h: '100 % teff, donc sans gluten' },
        { p: "Hors d'Éthiopie, le teff est cher et difficile à trouver. Beaucoup de restaurants coupent donc leur injera avec de la farine de blé ou d'orge, qui contiennent du gluten. Chez Makda, l'injera est 100 % teff. Tous nos plats principaux sont servis dessus et sont donc sans gluten. Seules les sambusa, en pâte de blé, en contiennent." },
        { p: "Une précision importante si vous êtes cœliaque : tout est préparé dans la même cuisine, donc des traces restent possibles. Dites-le-nous en réservant, nous vous conseillerons." },
        { cta: 'glutenFree' },
        { h: 'Le meilleur morceau' },
        { p: "Les habitués le savent : le meilleur moment du repas, c'est à la fin, quand on arrive à l'injera du fond du plateau, gorgée des sauces de tous les plats. Ne la laissez pas !" },
        { cta: 'menu' },
      ],
    },
    en: {
      slug: 'injera-teff-gluten-free',
      title: 'Injera: the teff flatbread that is also your plate (and it is gluten-free)',
      description:
        'What is injera? A flatbread made from teff, a naturally gluten-free grain, that serves as both plate and cutlery. How it is made and why Makda’s is mild.',
      excerpt: 'A teff flatbread that serves as both plate and cutlery. How it is made, and why it is naturally gluten-free.',
      imageAlt: 'Ethiopian dishes served on teff injera',
      body: [
        { p: 'At Makda there are no plates or cutlery on the platter. Instead there is a large, soft, spongy flatbread: injera. It holds the dishes, is used to pick them up and soaks up their sauces. It is the heart of Ethiopian and Eritrean cooking.' },
        { h: 'Teff, a tiny grain' },
        { p: 'Injera is traditionally made from teff, a grain grown for thousands of years in the highlands of Ethiopia and Eritrea. Its seeds are tiny, barely bigger than a pinhead. Teff is naturally gluten-free and rich in fibre.' },
        { h: 'How injera is made' },
        { ul: [
          'Teff flour is mixed with water to make a thin batter.',
          'The batter rests for several days: fermentation gives it its light texture.',
          'It is poured in a spiral onto a large, very hot round griddle called a mitad.',
          'It is cooked on one side only, under a lid: small bubbles form on the surface and create its spongy look.',
        ] },
        { h: 'A mild injera' },
        { p: 'Many injeras have a fairly strong sour taste from the fermentation. Over the years our chef has perfected her recipe to make a milder injera without that pronounced sourness: it goes with the dishes without overpowering them, which first-timers love.' },
        { h: '100% teff, so gluten-free' },
        { p: 'Outside Ethiopia, teff is expensive and hard to find, so many restaurants mix their injera with wheat or barley flour, which contain gluten. At Makda the injera is 100% teff. All our main dishes are served on it and are therefore gluten-free. Only the sambusa, made with wheat pastry, contain gluten.' },
        { p: 'An important note if you are coeliac: everything is prepared in the same kitchen, so traces are possible. Let us know when you book and we will advise you.' },
        { cta: 'glutenFree' },
        { h: 'The best bite' },
        { p: 'Regulars know it: the best part of the meal comes at the end, when you reach the injera at the bottom of the platter, soaked with the sauces of every dish. Do not leave it!' },
        { cta: 'menu' },
      ],
    },
  },

  // ——————————————————————————————————————————— Première fois
  {
    id: 'first-time',
    date: '2026-11-13',
    image: '/source/partage-makda.webp',
    readingMinutes: 4,
    fr: {
      slug: 'premiere-fois-restaurant-ethiopien',
      title: 'Première fois dans un restaurant éthiopien : le petit guide',
      description:
        "Manger avec les mains, partager un plateau, choisir ses plats : tout ce qu'il faut savoir pour un premier repas éthiopien réussi chez Makda à Bernex.",
      excerpt: 'Manger avec les mains, partager un plateau, choisir entre doux et épicé : tout pour un premier repas réussi.',
      imageAlt: 'Convives partageant un plateau éthiopien chez Makda',
      body: [
        { p: "Vous n'avez jamais mangé éthiopien ? Bonne nouvelle : il n'y a rien de compliqué, et c'est justement ce qui rend le repas si convivial. Voici ce qui vous attend." },
        { h: 'On partage' },
        { p: "Les plats arrivent ensemble, posés sur une grande injera, au centre de la table. Chacun pioche devant lui. C'est une cuisine faite pour être partagée, en famille, entre amis ou entre collègues." },
        { h: 'On mange avec la main droite' },
        { ul: [
          'On se lave les mains avant de passer à table.',
          'On déchire un morceau d’injera de la main droite.',
          'On s’en sert pour pincer un peu de plat, puis on porte le tout à la bouche.',
          'Pas besoin d’être adroit du premier coup : tout le monde y arrive vite.',
        ] },
        { p: "Et si un proche vous tend une bouchée directement à la bouche, c'est un gursha : un geste d'affection et d'amitié. Le rendre fait toujours plaisir." },
        { h: 'Que choisir ?' },
        { p: "Le plus simple pour une première fois, c'est le Menu Makda, pensé pour 2 à 4 personnes, en version végane ou avec viande. Vous goûtez plusieurs plats d'un coup. Pour composer vous-même, mélangez les textures et les intensités :" },
        { ul: [
          'Doux : le doro alecha (poulet au curcuma) ou le shiro (pois cassés mijotés).',
          'Plus relevés : les tibs (viande sautée aux piments) ou le zigni (ragoût épicé).',
          'Le grand classique : le doro wet, plat de fête au berbéré.',
          'Pour les curieux : le kitfo, la viande hachée façon tartare, au beurre épicé.',
          'Végane : le misir wat, lentilles rouges au berbéré.',
        ] },
        { h: 'Épicé, mais pas brûlant' },
        { p: "Le berbéré, le mélange d'épices emblématique, est chaleureux et parfumé plus que piquant. Si vous craignez le piment, commencez par les plats doux et dites-le-nous : nous vous guiderons." },
        { h: 'Pourquoi autant de plats véganes ?' },
        { p: "Dans la tradition orthodoxe éthiopienne, on jeûne le mercredi et le vendredi, ainsi que pendant de longues périodes avant les grandes fêtes : pas de viande, pas de produits laitiers. Résultat, les plats de légumineuses ne sont pas des « options », mais des recettes à part entière." },
        { h: 'Pour finir' },
        { p: "Laissez une place pour une glace artisanale de Bernex, ou goûtez le tej, le vin de miel traditionnel. Et surtout, prenez votre temps : un repas éthiopien ne se presse pas." },
        { cta: 'menu' },
      ],
    },
    en: {
      slug: 'first-time-ethiopian-restaurant',
      title: 'First time at an Ethiopian restaurant: a short guide',
      description:
        'Eating with your hands, sharing a platter, choosing dishes: everything you need to know for a great first Ethiopian meal at Makda in Bernex, Geneva.',
      excerpt: 'Eating with your hands, sharing a platter, choosing between mild and spicy: all you need for a great first meal.',
      imageAlt: 'Guests sharing an Ethiopian platter at Makda',
      body: [
        { p: 'Never eaten Ethiopian food? Good news: there is nothing complicated about it, and that is exactly what makes the meal so friendly. Here is what to expect.' },
        { h: 'You share' },
        { p: 'The dishes arrive together, laid on a large injera in the middle of the table. Everyone helps themselves from the part in front of them. It is food made for sharing with family, friends or colleagues.' },
        { h: 'You eat with your right hand' },
        { ul: [
          'Wash your hands before sitting down.',
          'Tear off a piece of injera with your right hand.',
          'Use it to pinch a little of a dish, then bring it to your mouth.',
          'You do not need to get it right first time: everyone gets the hang of it quickly.',
        ] },
        { p: 'And if someone close to you offers you a mouthful by hand, that is gursha: a gesture of affection and friendship. Returning it is always appreciated.' },
        { h: 'What to order?' },
        { p: 'The easiest option for a first visit is the Menu Makda, designed for 2 to 4 people, vegan or with meat. You taste several dishes at once. To build your own, mix textures and intensities:' },
        { ul: [
          'Mild: doro alecha (chicken with turmeric) or shiro (slow-cooked split peas).',
          'Spicier: tibs (meat sautéed with chillies) or zigni (spiced stew).',
          'The classic: doro wet, the festive dish in berbere sauce.',
          'For the curious: kitfo, minced beef tartare-style with spiced butter.',
          'Vegan: misir wat, red lentils in berbere.',
        ] },
        { h: 'Spiced, not fiery' },
        { p: 'Berbere, the signature spice blend, is warm and fragrant rather than burning hot. If you are wary of chilli, start with the mild dishes and tell us: we will guide you.' },
        { h: 'Why so many vegan dishes?' },
        { p: 'In the Ethiopian Orthodox tradition, people fast on Wednesdays and Fridays and during long periods before major feasts: no meat and no dairy. As a result, pulse dishes are not "options" but recipes in their own right.' },
        { h: 'To finish' },
        { p: 'Save room for an artisan ice cream made in Bernex, or try tej, the traditional honey wine. Above all, take your time: an Ethiopian meal is never rushed.' },
        { cta: 'menu' },
      ],
    },
  },

  // ——————————————————————————————————————————— Café
  {
    id: 'buna',
    date: '2026-11-13',
    image: '/source/ceremonie-cafe.webp',
    readingMinutes: 4,
    fr: {
      slug: 'ceremonie-du-cafe-ethiopienne',
      title: 'La cérémonie du café éthiopienne (buna) expliquée',
      description:
        "Torréfaction devant les invités, jebena en argile, trois tournées : comment se déroule la cérémonie du café éthiopienne, ou buna, et ce qu'elle signifie.",
      excerpt: 'Torréfaction devant les invités, jebena en argile et trois tournées : un rituel de convivialité.',
      imageAlt: 'Cérémonie du café éthiopienne avec la jebena',
      body: [
        { p: "En Éthiopie, on ne « prend » pas un café : on le partage, et cela prend du temps. La cérémonie du café, appelée buna, est un moment central de la vie sociale. On la fait pour accueillir un invité, célébrer une fête ou simplement se retrouver entre voisins." },
        { h: 'Le pays du café' },
        { p: "Le café est originaire d'Éthiopie, et plus précisément de la région de Kaffa, dans le sud-ouest du pays. Une légende raconte qu'un berger, Kaldi, aurait remarqué l'énergie de ses chèvres après qu'elles eurent mangé les baies d'un arbuste… le caféier." },
        { h: 'Les étapes du rituel' },
        { ul: [
          'On installe le coin café, souvent avec de l’herbe fraîche ou des fleurs au sol, et on fait brûler de l’encens.',
          'Les grains de café vert sont lavés, puis torréfiés dans une petite poêle sur le feu, devant les invités.',
          'Quand ils sont bien noirs et brillants, on fait passer la poêle fumante pour que chacun en respire l’arôme.',
          'Les grains sont moulus à la main, au mortier.',
          'La poudre est infusée dans la jebena, une verseuse en argile au long col.',
          'Le café est versé d’assez haut dans de petites tasses sans anse.',
        ] },
        { h: 'Trois tournées' },
        { p: "On sert traditionnellement trois tournées, avec le même café que l'on rallonge d'eau : l'abol, la plus forte, la tona, puis la baraka, « la bénédiction ». Rester pour les trois est une marque de respect. Le café s'accompagne souvent de pop-corn ou de grains d'orge grillés." },
        { h: 'Plus qu’une boisson' },
        { p: "Une cérémonie peut durer une heure ou plus. C'est un temps où l'on parle des nouvelles, où l'on règle parfois des différends, où l'on prend des nouvelles de chacun. C'est cette chaleur que nous voulons faire vivre chez Makda." },
        { h: 'La vivre lors de votre événement' },
        { p: "La cérémonie du café fait partie de nos prestations traiteur : pour un mariage, une fête de famille ou un événement d'entreprise, elle offre un moment inoubliable à vos invités." },
        { cta: 'catering' },
      ],
    },
    en: {
      slug: 'ethiopian-coffee-ceremony',
      title: 'The Ethiopian coffee ceremony (buna) explained',
      description:
        'Beans roasted in front of the guests, a clay jebena and three rounds: how the Ethiopian coffee ceremony, or buna, works and what it means.',
      excerpt: 'Beans roasted in front of the guests, a clay jebena and three rounds: a ritual of togetherness.',
      imageAlt: 'Ethiopian coffee ceremony with the jebena',
      body: [
        { p: 'In Ethiopia you do not just "have" a coffee: you share it, and it takes time. The coffee ceremony, called buna, is central to social life. It is held to welcome a guest, celebrate an occasion or simply spend time with neighbours.' },
        { h: 'The home of coffee' },
        { p: 'Coffee comes from Ethiopia, more precisely from the Kaffa region in the south-west. Legend has it that a goatherd named Kaldi noticed how lively his goats became after eating the berries of a certain shrub… the coffee plant.' },
        { h: 'The steps of the ritual' },
        { ul: [
          'The coffee corner is set up, often with fresh grass or flowers on the floor, and incense is burned.',
          'The green coffee beans are washed, then roasted in a small pan over the fire, in front of the guests.',
          'When they are dark and glossy, the smoking pan is passed around so everyone can breathe in the aroma.',
          'The beans are ground by hand with a mortar.',
          'The grounds are brewed in the jebena, a long-necked clay pot.',
          'The coffee is poured from a height into small handleless cups.',
        ] },
        { h: 'Three rounds' },
        { p: 'Traditionally three rounds are served, topping up the same coffee with water: abol, the strongest, then tona, then baraka, "the blessing". Staying for all three is a mark of respect. The coffee is often served with popcorn or roasted barley.' },
        { h: 'More than a drink' },
        { p: 'A ceremony can last an hour or more. It is a time to share news, sometimes to settle disagreements, and to check in on one another. That warmth is what we want you to feel at Makda.' },
        { h: 'Bring it to your event' },
        { p: 'The coffee ceremony is part of our catering: at a wedding, a family celebration or a corporate event, it gives your guests an unforgettable moment.' },
        { cta: 'catering' },
      ],
    },
  },
];

export const articlePath = (a: Article, lang: Lang) => (lang === 'en' ? `/en/journal/${a.en.slug}` : `/journal/${a.fr.slug}`);

export const findArticleByPath = (path: string) =>
  articles.find((a) => articlePath(a, 'fr') === path || articlePath(a, 'en') === path);
