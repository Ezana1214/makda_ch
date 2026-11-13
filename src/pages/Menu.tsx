import { motion } from 'framer-motion';
import { AlertCircle, Download } from 'lucide-react';
import BookingCTA from '../components/BookingCTA';
import Seo from '../components/Seo';
import BuffetBanner from '../components/BuffetBanner';
import { SITE_URL } from '../data/restaurant';
import {
  dishSections,
  servedWith,
  menuMakda,
  drinkGroups,
  dessert,
  allergenInfo,
  allergenLabels,
  stories,
  type Dish,
} from '../data/menu';

const RED = '#A83D2E';
const BROWN = '#401400';
const CREAM = '#FFF8EF';

const nav = [
  { id: 'entrees', label: 'Entrées' },
  { id: 'viandes', label: 'Plats carnés' },
  { id: 'vegetariens', label: 'Végétariens' },
  { id: 'menu-makda', label: 'Menu Makda' },
  { id: 'boissons', label: 'Boissons' },
  { id: 'dessert', label: 'Dessert' },
  { id: 'allergenes', label: 'Allergènes' },
];

const Stripe = () => (
  <div className="flex flex-col gap-[3px] w-24 mx-auto my-5" aria-hidden="true">
    <span className="h-[3px] rounded-full" style={{ backgroundColor: '#3E8E3E' }} />
    <span className="h-[3px] rounded-full" style={{ backgroundColor: '#E8B931' }} />
    <span className="h-[3px] rounded-full" style={{ backgroundColor: '#C8372D' }} />
  </div>
);

const Tag = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <span
    title={title}
    className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide"
    style={{ backgroundColor: '#F3E3CF', color: BROWN }}
  >
    {children}
  </span>
);

const SectionTitle = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <div className="text-center mb-10">
    <h2 id={id} className="text-4xl md:text-5xl font-serif scroll-mt-48" style={{ color: BROWN, fontWeight: 300 }}>
      {children}
    </h2>
    <Stripe />
  </div>
);

const DishCard = ({ dish }: { dish: Dish }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.4 }}
    className="flex gap-4 md:gap-5 bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
  >
    {dish.image && (
      <img
        src={dish.image}
        alt={`${dish.name} – plat du restaurant Makda`}
        loading="lazy"
        width={144}
        height={144}
        className="w-24 h-24 md:w-36 md:h-36 rounded-xl object-cover flex-shrink-0"
      />
    )}
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline justify-between gap-3">
        <h3
          className="text-xl md:text-2xl uppercase tracking-wide leading-tight"
          style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, color: RED }}
        >
          {dish.name}
          {dish.detail && (
            <span className="ml-2 text-sm normal-case tracking-normal font-medium" style={{ color: '#7A5852' }}>
              ({dish.detail})
            </span>
          )}
        </h3>
        <span className="whitespace-nowrap font-semibold" style={{ color: RED }}>
          {dish.price} CHF
        </span>
      </div>
      <p className="mt-2 text-sm md:text-[15px] leading-relaxed" style={{ color: '#5C3B33', fontWeight: 400 }}>
        {dish.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {dish.vegan && <Tag title="Végane">VG</Tag>}
        {dish.vegetarian && !dish.vegan && <Tag title="Végétarien">V</Tag>}
        {dish.glutenFree && <Tag title="Sans gluten (injera 100 % teff)">SG</Tag>}
        {dish.halal && <Tag title="Viande certifiée halal">Halal</Tag>}
        {dish.allergens?.map((a) => (
          <span key={a} className="text-[11px] px-2 py-0.5 rounded-full border" style={{ borderColor: '#E3CBB0', color: '#7A5852' }}>
            {allergenLabels[a]}
          </span>
        ))}
      </div>
    </div>
  </motion.article>
);

const menuJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Carte du restaurant Makda',
  url: `${SITE_URL}/menu`,
  inLanguage: 'fr',
  hasMenuSection: dishSections.map((s) => ({
    '@type': 'MenuSection',
    name: s.title,
    hasMenuItem: s.dishes.map((d) => ({
      '@type': 'MenuItem',
      name: d.name,
      description: d.description,
      offers: { '@type': 'Offer', price: d.price, priceCurrency: 'CHF' },
      suitableForDiet: [
        d.vegan ? 'https://schema.org/VeganDiet' : null,
        d.vegetarian ? 'https://schema.org/VegetarianDiet' : null,
        d.glutenFree ? 'https://schema.org/GlutenFreeDiet' : null,
        d.halal ? 'https://schema.org/HalalDiet' : null,
      ].filter(Boolean),
    })),
  })),
};

const Menu = () => {
  return (
    <>
      <Seo
        path="/menu"
        title="Menu éthiopien : injera, kitfo, tibs, plats végé – Makda"
        description="La carte de Makda à Bernex : sambusa, kitfo, tibs, doro wat, misir et shiro véganes, Menu Makda à partager, tej maison et vins genevois. Injera 100 % teff sans gluten."
        jsonLd={menuJsonLd}
      />

      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/source/assortiment-plats.webp"
            fetchPriority="high"
            srcSet="/source/assortiment-plats-960.webp 960w, /source/assortiment-plats.webp 1920w"
            sizes="100vw"
            alt="Assortiment de plats éthiopiens sur injera chez Makda"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-serif mb-4 text-white" style={{ fontWeight: 400 }}>
            Notre carte
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ fontWeight: 300, color: '#ECEDEA' }}>
            Cuisine éthiopienne et érythréenne maison, servie sur injera 100 % teff, à partager.
          </p>
        </motion.div>
      </section>

      {/* Navigation dans la carte */}
      <nav
        aria-label="Sections de la carte"
        className="sticky top-[96px] z-40 border-b backdrop-blur"
        style={{ backgroundColor: 'rgba(255,248,239,0.95)', borderColor: '#EBCDAD' }}
      >
        <div className="container mx-auto max-w-6xl px-4 flex gap-2 overflow-x-auto py-3 no-scrollbar">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="whitespace-nowrap px-4 py-2 rounded-full text-sm transition-colors hover:bg-[#5A2B20] hover:text-white"
              style={{ color: '#5A2B20', border: '1px solid #E3CBB0', fontWeight: 500 }}
            >
              {n.label}
            </a>
          ))}
        </div>
      </nav>

      <div style={{ backgroundColor: CREAM }}>
        {/* Légende */}
        <div className="container mx-auto max-w-6xl px-4 pt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm" style={{ color: '#5C3B33' }}>
          <span className="flex items-center gap-2"><Tag title="Végane">VG</Tag> Végane</span>
          <span className="flex items-center gap-2"><Tag title="Végétarien">V</Tag> Végétarien</span>
          <span className="flex items-center gap-2"><Tag title="Sans gluten">SG</Tag> Sans gluten (injera 100 % teff)</span>
          <span className="flex items-center gap-2"><Tag title="Halal">Halal</Tag> Viande certifiée halal</span>
        </div>

        {dishSections.map((section) => (
          <section key={section.id} className="container mx-auto max-w-6xl px-4 pt-16" aria-labelledby={section.id}>
            <SectionTitle id={section.id}>{section.title}</SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {section.dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
            {section.note && (
              <p className="text-center text-sm mt-5 italic" style={{ color: '#7A5852' }}>
                {section.note}
              </p>
            )}
          </section>
        ))}

        <div className="container mx-auto max-w-3xl px-4 pt-10">
          <p className="text-center rounded-2xl px-6 py-4" style={{ backgroundColor: '#F3E3CF', color: BROWN, fontWeight: 500 }}>
            {servedWith}
          </p>
        </div>

        {/* Menu Makda */}
        <section className="container mx-auto max-w-4xl px-4 pt-20" aria-labelledby="menu-makda">
          <div className="rounded-3xl px-6 py-10 md:px-12 md:py-12 text-white" style={{ backgroundColor: BROWN }}>
            <h2 id="menu-makda" className="text-4xl md:text-5xl font-serif text-center scroll-mt-48" style={{ fontWeight: 300, color: '#FFFFFF' }}>
              {menuMakda.title}
            </h2>
            <Stripe />
            <p className="text-center max-w-2xl mx-auto mb-8 text-white/85 leading-relaxed" style={{ fontWeight: 300 }}>
              {menuMakda.description}
            </p>
            <table className="w-full max-w-xl mx-auto text-center">
              <caption className="sr-only">Prix du Menu Makda selon le nombre de personnes</caption>
              <thead>
                <tr className="text-sm uppercase tracking-wider" style={{ color: '#EBCDAD' }}>
                  <th className="py-2 font-medium text-left"></th>
                  <th className="py-2 font-medium">Formule végane</th>
                  <th className="py-2 font-medium">Formule carnée</th>
                </tr>
              </thead>
              <tbody>
                {menuMakda.rows.map((r) => (
                  <tr key={r.people} className="border-t border-white/15">
                    <th scope="row" className="py-3 text-left font-medium">{r.people}</th>
                    <td className="py-3 text-lg">{r.vegan} CHF</td>
                    <td className="py-3 text-lg">{r.meat} CHF</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="pt-16">
          <BuffetBanner />
        </div>

        {/* Boissons */}
        <section className="container mx-auto max-w-6xl px-4 pt-20" aria-labelledby="boissons">
          <SectionTitle id="boissons">Boissons</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drinkGroups.map((g) => (
              <div key={g.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-baseline justify-between mb-4 gap-3">
                  <h3 className="text-2xl font-serif" style={{ color: BROWN, fontWeight: 400 }}>{g.title}</h3>
                  {g.unit && <span className="text-xs whitespace-nowrap" style={{ color: '#7A5852' }}>{g.unit}</span>}
                </div>
                <ul className="space-y-3">
                  {g.drinks.map((d) => (
                    <li key={d.name}>
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold uppercase tracking-wide" style={{ fontFamily: 'Barlow Condensed, sans-serif', color: RED, fontSize: '1.05rem' }}>
                          {d.name}
                        </span>
                        <span className="flex-1 border-b border-dotted translate-y-[-4px]" style={{ borderColor: '#D9BFA3' }} aria-hidden="true" />
                        <span className="whitespace-nowrap text-sm font-semibold" style={{ color: RED }}>{d.price} CHF</span>
                      </div>
                      {d.description && (
                        <p className="text-sm leading-snug mt-0.5" style={{ color: '#5C3B33' }}>{d.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Dessert */}
        <section className="container mx-auto max-w-3xl px-4 pt-20" aria-labelledby="dessert">
          <SectionTitle id="dessert">Dessert</SectionTitle>
          <DishCard dish={{ id: 'glaces', vegetarian: true, allergens: ['lait'], ...dessert }} />
        </section>

        {/* Allergènes */}
        <section className="container mx-auto max-w-4xl px-4 pt-20" aria-labelledby="allergenes">
          <SectionTitle id="allergenes">Allergènes</SectionTitle>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'À la carte et au buffet', rows: allergenInfo.carte },
                { title: 'Boissons et dessert', rows: allergenInfo.boissons },
              ].map((block) => (
                <div key={block.title}>
                  <h3 className="text-xl font-serif mb-3" style={{ color: BROWN }}>{block.title}</h3>
                  <dl className="space-y-2 text-sm">
                    {block.rows.map((r) => (
                      <div key={r.allergen} className="grid grid-cols-[9rem_1fr] gap-3">
                        <dt className="font-semibold" style={{ color: RED }}>{r.allergen}</dt>
                        <dd style={{ color: '#5C3B33' }}>{r.items}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm" style={{ color: '#5C3B33' }}>
              Les autres plats et boissons ne contiennent pas d'allergènes majeurs ajoutés.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: '#FBEDE0' }}>
              <AlertCircle size={22} className="flex-shrink-0 mt-0.5" style={{ color: RED }} />
              <p className="text-sm leading-relaxed" style={{ color: BROWN }}>{allergenInfo.warning}</p>
            </div>
            <a
              href={allergenInfo.pdf}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex items-center gap-2 text-sm underline"
              style={{ color: '#5A2B20', fontWeight: 600 }}
            >
              <Download size={16} /> Télécharger la fiche allergènes (PDF)
            </a>
          </div>
        </section>

        {/* Traditions */}
        <section className="container mx-auto max-w-6xl px-4 pt-20" aria-labelledby="traditions">
          <SectionTitle id="traditions">Le saviez-vous ?</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {stories.map((s) => (
              <div key={s.title} className="rounded-2xl p-6" style={{ backgroundColor: '#F3E3CF' }}>
                <h3 className="text-2xl font-serif mb-3" style={{ color: BROWN }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C3B33' }}>{s.text}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
      <BookingCTA dark />
    </>
  );
};

export default Menu;
