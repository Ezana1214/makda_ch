import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, Record<string, string>> = {
  fr: {
    'nav.home': 'Accueil',
    'nav.menu': 'Menu',
    'nav.catering': 'Traiteur',
    'nav.history': 'Notre Histoire',
    'nav.contact': 'Contact',
    'nav.reserve': 'Réserver',
    'topbar.open': 'Ouvert Mar-Dim',
    'home.hero.title': 'Bienvenue chez Makda',
    'home.hero.subtitle': 'Une expérience culinaire éthiopienne authentique au cœur de Genève',
    'home.hero.discover': 'Découvrir notre menu',
    'home.about.title': 'À Propos de Makda',
    'home.about.text1': 'Depuis notre ouverture, Makda apporte les saveurs authentiques de l\'Éthiopie à Genève. Notre restaurant familial propose une cuisine traditionnelle préparée avec passion et des ingrédients de qualité.',
    'home.about.text2': 'Chaque plat raconte une histoire de tradition culinaire transmise de génération en génération.',
    'home.specialties.title': 'Nos Spécialités',
    'home.specialty.injera.title': 'Injera Traditionnel',
    'home.specialty.injera.desc': 'Pain éthiopien fermenté fait maison',
    'home.specialty.doro.title': 'Doro Wat',
    'home.specialty.doro.desc': 'Ragoût de poulet épicé traditionnel',
    'home.specialty.kitfo.title': 'Kitfo',
    'home.specialty.kitfo.desc': 'Tartare de bœuf éthiopien aux épices',
    'home.specialty.veggie.title': 'Plats Végétariens',
    'home.specialty.veggie.desc': 'Large sélection de plats végétariens',
    'home.atmosphere.title': 'Une Atmosphère Chaleureuse',
    'home.atmosphere.text': 'Plongez dans l\'ambiance chaleureuse de notre restaurant, où décoration traditionnelle et hospitalité éthiopienne se rencontrent pour créer une expérience culinaire inoubliable.',
    'home.reservation.title': 'Réservez Votre Table',
    'home.reservation.text': 'Rejoignez-nous pour une expérience culinaire mémorable',
    'home.reservation.button': 'Faire une réservation',
    'menu.title': 'Notre Menu',
    'menu.subtitle': 'Découvrez nos plats traditionnels éthiopiens',
    'menu.starters': 'Entrées',
    'menu.mains': 'Plats Principaux',
    'menu.vegetarian': 'Plats Végétariens',
    'menu.desserts': 'Desserts',
    'menu.drinks': 'Boissons',
    'catering.title': 'Service Traiteur',
    'catering.subtitle': 'Apportez les saveurs de l\'Éthiopie à votre événement',
    'catering.intro': 'Notre service traiteur propose une cuisine éthiopienne authentique pour tous vos événements, des réunions d\'entreprise aux célébrations familiales.',
    'catering.events.title': 'Événements que nous servons',
    'catering.event.corporate': 'Événements d\'entreprise',
    'catering.event.weddings': 'Mariages',
    'catering.event.private': 'Fêtes privées',
    'catering.event.cultural': 'Événements culturels',
    'catering.services.title': 'Nos Services',
    'catering.service.delivery': 'Livraison',
    'catering.service.delivery.desc': 'Livraison fraîche sur votre lieu',
    'catering.service.setup': 'Installation',
    'catering.service.setup.desc': 'Installation et présentation professionnelle',
    'catering.service.custom': 'Menus personnalisés',
    'catering.service.custom.desc': 'Adaptés à vos besoins et préférences',
    'catering.service.staff': 'Personnel de service',
    'catering.service.staff.desc': 'Personnel expérimenté disponible',
    'catering.contact.title': 'Contactez-nous',
    'catering.contact.text': 'Contactez-nous pour discuter de vos besoins en restauration',
    'history.title': 'Notre Histoire',
    'history.subtitle': 'Un voyage de tradition et de passion',
    'history.beginning.title': 'Le Début',
    'history.beginning.text': 'Makda a été fondé avec la vision de partager la riche tradition culinaire éthiopienne avec la communauté genevoise. Notre voyage a commencé par un rêve de créer un espace où les gens pourraient découvrir les saveurs authentiques de l\'Éthiopie.',
    'history.tradition.title': 'Notre Tradition',
    'history.tradition.text': 'Nous sommes fiers de préserver les recettes et techniques culinaires traditionnelles transmises de génération en génération. Chaque plat est préparé avec le même soin et la même attention au détail qui caractérisent la cuisine éthiopienne depuis des siècles.',
    'history.today.title': 'Aujourd\'hui',
    'history.today.text': 'Aujourd\'hui, Makda est devenu un lieu de rencontre pour ceux qui apprécient une cuisine authentique et une atmosphère chaleureuse. Nous continuons d\'honorer nos racines tout en créant de nouveaux souvenirs avec nos clients.',
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Nous serions ravis de vous entendre',
    'contact.info.title': 'Informations de Contact',
    'contact.address': 'Adresse',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.hours': 'Heures d\'ouverture',
    'contact.hours.weekday': 'Mardi - Dimanche',
    'contact.hours.time': '11:00 - 22:00',
    'contact.hours.closed': 'Fermé le lundi',
    'contact.form.title': 'Envoyez-nous un message',
    'contact.form.name': 'Nom',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Sujet',
    'contact.form.message': 'Message',
    'contact.form.send': 'Envoyer le message',
    'contact.form.sending': 'Envoi en cours...',
    'contact.map.title': 'Trouvez-nous',
    'footer.about': 'À Propos',
    'footer.about.text': 'Restaurant éthiopien authentique au cœur de Genève, proposant une cuisine traditionnelle et une hospitalité chaleureuse.',
    'footer.hours.title': 'Heures d\'ouverture',
    'footer.connect': 'Restez Connecté',
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.catering': 'Catering',
    'nav.history': 'Our Story',
    'nav.contact': 'Contact',
    'nav.reserve': 'Reserve',
    'topbar.open': 'Open Tue-Sun',
    'home.hero.title': 'Welcome to Makda',
    'home.hero.subtitle': 'An authentic Ethiopian culinary experience in the heart of Geneva',
    'home.hero.discover': 'Discover our menu',
    'home.about.title': 'About Makda',
    'home.about.text1': 'Since our opening, Makda has been bringing the authentic flavors of Ethiopia to Geneva. Our family restaurant offers traditional cuisine prepared with passion and quality ingredients.',
    'home.about.text2': 'Each dish tells a story of culinary tradition passed down through generations.',
    'home.specialties.title': 'Our Specialties',
    'home.specialty.injera.title': 'Traditional Injera',
    'home.specialty.injera.desc': 'Homemade fermented Ethiopian flatbread',
    'home.specialty.doro.title': 'Doro Wat',
    'home.specialty.doro.desc': 'Traditional spicy chicken stew',
    'home.specialty.kitfo.title': 'Kitfo',
    'home.specialty.kitfo.desc': 'Ethiopian spiced beef tartare',
    'home.specialty.veggie.title': 'Vegetarian Dishes',
    'home.specialty.veggie.desc': 'Wide selection of vegetarian options',
    'home.atmosphere.title': 'A Warm Atmosphere',
    'home.atmosphere.text': 'Immerse yourself in the warm ambiance of our restaurant, where traditional decor and Ethiopian hospitality meet to create an unforgettable dining experience.',
    'home.reservation.title': 'Reserve Your Table',
    'home.reservation.text': 'Join us for a memorable dining experience',
    'home.reservation.button': 'Make a Reservation',
    'menu.title': 'Our Menu',
    'menu.subtitle': 'Discover our traditional Ethiopian dishes',
    'menu.starters': 'Starters',
    'menu.mains': 'Main Courses',
    'menu.vegetarian': 'Vegetarian Dishes',
    'menu.desserts': 'Desserts',
    'menu.drinks': 'Beverages',
    'catering.title': 'Catering Service',
    'catering.subtitle': 'Bring the flavors of Ethiopia to your event',
    'catering.intro': 'Our catering service offers authentic Ethiopian cuisine for all your events, from corporate meetings to family celebrations.',
    'catering.events.title': 'Events We Serve',
    'catering.event.corporate': 'Corporate Events',
    'catering.event.weddings': 'Weddings',
    'catering.event.private': 'Private Parties',
    'catering.event.cultural': 'Cultural Events',
    'catering.services.title': 'Our Services',
    'catering.service.delivery': 'Delivery',
    'catering.service.delivery.desc': 'Fresh delivery to your location',
    'catering.service.setup': 'Setup',
    'catering.service.setup.desc': 'Professional setup and presentation',
    'catering.service.custom': 'Custom Menus',
    'catering.service.custom.desc': 'Tailored to your needs and preferences',
    'catering.service.staff': 'Service Staff',
    'catering.service.staff.desc': 'Experienced staff available',
    'catering.contact.title': 'Contact Us',
    'catering.contact.text': 'Get in touch to discuss your catering needs',
    'history.title': 'Our Story',
    'history.subtitle': 'A journey of tradition and passion',
    'history.beginning.title': 'The Beginning',
    'history.beginning.text': 'Makda was founded with the vision of sharing Ethiopia\'s rich culinary tradition with the Geneva community. Our journey began with a dream to create a space where people could experience the authentic flavors of Ethiopia.',
    'history.tradition.title': 'Our Tradition',
    'history.tradition.text': 'We take pride in preserving traditional recipes and cooking techniques passed down through generations. Each dish is prepared with the same care and attention to detail that has characterized Ethiopian cuisine for centuries.',
    'history.today.title': 'Today',
    'history.today.text': 'Today, Makda has become a gathering place for those who appreciate authentic cuisine and warm atmosphere. We continue to honor our roots while creating new memories with our guests.',
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We\'d love to hear from you',
    'contact.info.title': 'Contact Information',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Opening Hours',
    'contact.hours.weekday': 'Tuesday - Sunday',
    'contact.hours.time': '11:00 AM - 10:00 PM',
    'contact.hours.closed': 'Closed on Monday',
    'contact.form.title': 'Send us a Message',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.map.title': 'Find Us',
    'footer.about': 'About',
    'footer.about.text': 'Authentic Ethiopian restaurant in the heart of Geneva, offering traditional cuisine and warm hospitality.',
    'footer.hours.title': 'Opening Hours',
    'footer.connect': 'Stay Connected',
    'footer.rights': 'All rights reserved.',
  },
};
