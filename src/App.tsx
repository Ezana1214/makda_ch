import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Catering from './pages/Catering';
import History from './pages/History';
import Contact from './pages/Contact';

function App() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-cream">
        <TopBar />
        <Navbar onReserveClick={() => setIsReservationModalOpen(true)} />
        <main>
          <Routes>
            <Route path="/" element={<Home onReserveClick={() => setIsReservationModalOpen(true)} />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/histoire" element={<History />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <AppFooter />
        <ReservationModal
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
        />
      </div>
    </Router>
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
