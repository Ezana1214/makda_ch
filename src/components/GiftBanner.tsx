import { Link } from 'react-router-dom';
import { Gift, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/** Bandeau « Offrez un bon cadeau » */
const GiftBanner = () => {
  const { L, to } = useLanguage();
  return (
    <section className="px-4 py-10 bg-cream">
      <div className="container mx-auto max-w-5xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left" style={{ backgroundColor: '#FFF8EF', border: '2px dashed #E3CBB0' }}>
        <span className="rounded-full w-16 h-16 flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#A83D2E' }}>
          <Gift size={30} className="text-white" aria-hidden="true" />
        </span>
        <div className="flex-1" style={{ color: '#401400' }}>
          <h2 className="text-2xl md:text-3xl font-serif mb-1" style={{ fontWeight: 300 }}>{L('Offrez un bon cadeau Makda', 'Give a Makda gift voucher')}</h2>
          <p className="leading-relaxed">
            {L('Montant au choix, paiement par carte ou TWINT, bon reçu tout de suite à imprimer ou envoyer.', 'Any amount, pay by card or TWINT, voucher delivered instantly to print or send.')}
          </p>
        </div>
        <Link to={to('giftVouchers')} className="inline-flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap text-white" style={{ backgroundColor: '#A83D2E', fontWeight: 700 }}>
          {L('Offrir un bon', 'Give a voucher')} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default GiftBanner;
