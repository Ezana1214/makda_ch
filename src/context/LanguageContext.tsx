import { createContext, useContext, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lang, RouteId, routes, langFromPath, alternatePath } from '../i18n';

interface LanguageContextType {
  language: Lang;
  lang: Lang;
  setLanguage: (lang: Lang) => void;
  t: (key: string) => string;
  /** Adresse d'une page dans la langue courante */
  to: (id: RouteId) => string;
  /** Choisit le texte selon la langue */
  L: <T,>(fr: T, en: T) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

/** La langue vient de l'adresse : /en/… = anglais, sinon français. À placer dans le Router. */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lang = langFromPath(pathname);
  const value: LanguageContextType = {
    language: lang,
    lang,
    setLanguage: (l) => {
      if (l !== lang) navigate(alternatePath(pathname, l));
    },
    t: (key) => translations[lang][key] || key,
    to: (id) => routes[id][lang],
    L: (fr, en) => (lang === 'en' ? en : fr),
  };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

const translations: Record<Lang, Record<string, string>> = {
  fr: {
    'nav.home': 'ACCUEIL',
    'nav.menu': 'MENU',
    'nav.catering': 'TRAITEUR',
    'nav.history': 'NOTRE HISTOIRE',
    'nav.contact': 'CONTACT',
    'nav.reserve': 'Réserver une table',
    'topbar.open': 'Ouvert Mar-Dim',
  },
  en: {
    'nav.home': 'HOME',
    'nav.menu': 'MENU',
    'nav.catering': 'CATERING',
    'nav.history': 'OUR STORY',
    'nav.contact': 'CONTACT',
    'nav.reserve': 'Book a table',
    'topbar.open': 'Open Tue-Sun',
  },
};
