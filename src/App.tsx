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
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/traiteur" element={<Catering />} />
          <Route path="/catering" element={<Navigate to="/traiteur" replace />} />
          <Route path="/histoire" element={<History />} />
          <Route path="/contact" element={<Contact />} />
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
  if (location.pathname === '/contact') {
    return null;
  }
  return <Footer />;
}

export default App;
