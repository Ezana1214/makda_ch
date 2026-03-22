import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onReserveClick: () => void;
}

const Navbar = ({ onReserveClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'ACCUEIL' },
    { to: '/menu', label: 'MENU' },
    { to: '/catering', label: 'SERVICE TRAITEUR' },
    { to: '/histoire', label: 'NOTRE HISTOIRE' },
    { to: '/contact', label: 'CONTACT' },
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
          <Link to="/" className="flex items-center">
            <img src="/makda-logo.png" alt="MAKDA" className="h-16 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-brown-dark hover:text-gold-muted transition-colors text-sm tracking-wide ${
                  isActive(link.to) ? 'text-gold-muted' : ''
                }`}
                style={{ fontWeight: 100 }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={onReserveClick}
            className="hidden lg:block bg-brown-dark text-white px-6 py-2.5 rounded-full hover:bg-brown-deep transition-colors text-sm tracking-wide"
            style={{ fontWeight: 100 }}
          >
            RÉSERVER
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                  style={{ fontWeight: 100 }}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  onReserveClick();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-brown-dark text-white px-6 py-3 rounded-full hover:bg-brown-deep transition-colors text-sm tracking-wide"
                style={{ fontWeight: 100 }}
              >
                RÉSERVER
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
