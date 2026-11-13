import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import TheForkWidget from './TheForkWidget';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, to, L } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: to('home'), label: t('nav.home') },
    { to: to('menu'), label: t('nav.menu') },
    { to: to('catering'), label: t('nav.catering') },
    { to: to('history'), label: t('nav.history') },
    { to: to('contact'), label: t('nav.contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cream shadow-lg' : 'bg-cream/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to={to('home')} className="flex items-center">
            <img src="/makda-logo.webp" alt={L('Makda – retour à l\'accueil', 'Makda – back to home')} width="139" height="64" className="h-16 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-brown-dark hover:text-gold-muted transition-colors text-sm tracking-wide ${
                  isActive(link.to) ? 'text-gold-muted' : ''
                }`}
                style={{ fontWeight: 400 }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <TheForkWidget />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? L('Fermer le menu', 'Close menu') : L('Ouvrir le menu', 'Open menu')}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden text-brown-dark"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-brown-dark/10 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-brown-dark hover:text-gold-muted transition-colors text-sm tracking-wide ${
                    isActive(link.to) ? 'text-gold-muted' : ''
                  }`}
                  style={{ fontWeight: 400 }}
                >
                  {link.label}
                </Link>
              ))}
              <div onClick={() => setIsMobileMenuOpen(false)}>
                <TheForkWidget />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
