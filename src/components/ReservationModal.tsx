import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReservationModal = ({ isOpen, onClose }: ReservationModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-cream rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-brown-dark hover:text-gold-muted transition-colors z-10"
              >
                <X size={28} />
              </button>

              <div className="p-8">
                <h2 className="text-4xl font-serif text-brown-dark mb-2" style={{ fontWeight: 300 }}>Réserver une table</h2>
                <p className="text-brown-dark/70 mb-8" style={{ fontWeight: 100 }}>
                  Réservez votre table et vivez une expérience culinaire inoubliable
                </p>

                <div className="bg-brown-dark rounded-xl p-8 text-white">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🍽️</span>
                    </div>
                    <h3 className="text-2xl font-serif mb-4" style={{ fontWeight: 300 }}>Widget de réservation TheFork</h3>
                    <p className="text-white/80 mb-6" style={{ fontWeight: 100 }}>
                      Le widget de réservation TheFork sera intégré ici pour permettre aux clients de réserver directement en ligne.
                    </p>
                    <div className="bg-white/10 rounded-lg p-6 border-2 border-dashed border-white/30">
                      <p className="text-white/60 text-sm">
                        Placeholder pour le widget TheFork
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-brown-dark/70 mb-2" style={{ fontWeight: 100 }}>Vous pouvez également nous contacter directement</p>
                  <a href="tel:+41766792845" className="text-gold-muted text-lg hover:underline" style={{ fontWeight: 300 }}>
                    +41 76 679 28 45
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReservationModal;
