import { CalendarHeart, Gift, BookOpen } from 'lucide-react';
import Seo from '../components/Seo';
import NewsletterForm from '../components/NewsletterForm';
import { useLanguage } from '../context/LanguageContext';

const Newsletter = () => {
  const { L, to } = useLanguage();
  const items = [
    { icon: CalendarHeart, fr: 'Les dates des buffets du dimanche et des soirées spéciales', en: 'Dates of Sunday buffets and special evenings' },
    { icon: BookOpen, fr: 'Les nouveaux plats et les fêtes éthiopiennes et érythréennes', en: 'New dishes and Ethiopian and Eritrean festivals' },
    { icon: Gift, fr: 'Des idées de cadeaux et d’événements pour les fêtes', en: 'Gift and event ideas for the holidays' },
  ];
  return (
    <>
      <Seo
        path={to('newsletter')}
        title={L('Newsletter – Makda, restaurant éthiopien à Bernex', 'Newsletter – Makda, Ethiopian restaurant in Bernex')}
        description={L(
          'Inscrivez-vous à la newsletter de Makda : dates des buffets du dimanche, nouveaux plats et fêtes éthiopiennes, environ une fois par mois.',
          "Sign up for Makda's newsletter: Sunday buffet dates, new dishes and Ethiopian festivals, about once a month."
        )}
      />
      <section className="py-16 md:py-24 px-4 bg-cream">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif mb-5 text-center" style={{ color: '#401400', fontWeight: 400 }}>
            {L('Les nouvelles de Makda', 'News from Makda')}
          </h1>
          <p className="text-lg leading-relaxed text-center mb-10" style={{ color: '#5C3B33' }}>
            {L('Environ une fois par mois, jamais plus. Pas de publicité pour d’autres.', 'About once a month, never more. No third-party advertising.')}
          </p>
          <ul className="space-y-4 mb-10">
            {items.map(({ icon: Icon, fr, en }) => (
              <li key={fr} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm" style={{ color: '#401400' }}>
                <Icon className="w-6 h-6 shrink-0" style={{ color: '#A83D2E' }} aria-hidden="true" />
                {L(fr, en)}
              </li>
            ))}
          </ul>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md">
            <NewsletterForm source="page" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
