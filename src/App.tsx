import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Catering from './pages/Catering';
import History from './pages/History';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import LegalNotice from './pages/LegalNotice';
import NotFound from './pages/NotFound';
import MobileActionBar from './components/MobileActionBar';
import LandingPage from './components/LandingPage';
import { routes } from './i18n';
import { JournalIndex, ArticlePage } from './pages/Journal';
import GiftVouchers, { GiftThanks } from './pages/GiftVouchers';
import VoucherAdmin from './pages/VoucherAdmin';
import Newsletter from './pages/Newsletter';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="min-h-screen bg-cream pb-16 lg:pb-0">
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <main>
        <Routes>
          {(['fr', 'en'] as const).map((l) => [
            <Route key={`home-${l}`} path={routes.home[l]} element={<Home />} />,
            <Route key={`menu-${l}`} path={routes.menu[l]} element={<Menu />} />,
            <Route key={`catering-${l}`} path={routes.catering[l]} element={<Catering />} />,
            <Route key={`history-${l}`} path={routes.history[l]} element={<History />} />,
            <Route key={`contact-${l}`} path={routes.contact[l]} element={<Contact />} />,
            <Route key={`gift-${l}`} path={routes.giftVouchers[l]} element={<GiftVouchers />} />,
            <Route key={`giftThanks-${l}`} path={routes.giftThanks[l]} element={<GiftThanks />} />,
            <Route key={`newsletter-${l}`} path={routes.newsletter[l]} element={<Newsletter />} />,
            <Route key={`journal-${l}`} path={routes.journal[l]} element={<JournalIndex />} />,
            <Route key={`article-${l}`} path={`${routes.journal[l]}/:slug`} element={<ArticlePage />} />,
            ...(['glutenFree', 'buffet', 'privateHire', 'access', 'weddings', 'corporate', 'parties'] as const).map((id) => (
              <Route key={`${id}-${l}`} path={routes[id][l]} element={<LandingPage key={`${id}-${l}`} id={id} />} />
            )),
          ])}
          <Route path="/catering" element={<Navigate to="/traiteur" replace />} />
          <Route path="/bons-cadeaux/admin" element={<VoucherAdmin />} />
          <Route path="/confidentialite" element={<Privacy />} />
          <Route path="/mentions-legales" element={<LegalNotice />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <AppFooter />
      <MobileActionBar />
    </div>
  );
}

function AppFooter() {
  const location = useLocation();
  if (location.pathname === '/contact' || location.pathname === '/en/contact') {
    return null;
  }
  return <Footer />;
}

export default App;
