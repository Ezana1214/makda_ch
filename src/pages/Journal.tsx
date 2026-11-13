import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import Seo from '../components/Seo';
import BookingCTA from '../components/BookingCTA';
import NotFound from './NotFound';
import { useLanguage } from '../context/LanguageContext';
import { articles, articlePath, findArticleByPath, type Article } from '../content/journal';
import { SITE_URL } from '../data/restaurant';
import type { Lang, RouteId } from '../i18n';

const brown = '#401400';
const red = '#A83D2E';

const ctaLabels: Partial<Record<RouteId, [string, string]>> = {
  menu: ['Voir la carte', 'See the menu'],
  glutenFree: ['Nos plats sans gluten et véganes', 'Our gluten-free and vegan dishes'],
  buffet: ['Le buffet du dimanche', 'The Sunday buffet'],
  catering: ['Découvrir le traiteur', 'Discover our catering'],
  history: ['Notre histoire', 'Our story'],
};

const formatDate = (d: string, lang: Lang) =>
  new Date(`${d}T12:00:00`).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-CH', { day: 'numeric', month: 'long', year: 'numeric' });

const sorted = () => [...articles].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const ArticleCard = ({ a }: { a: Article }) => {
  const { lang, L } = useLanguage();
  const v = a[lang];
  return (
    <Link to={articlePath(a, lang)} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={a.image} alt={v.imageAlt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="text-sm mb-2 flex items-center gap-2" style={{ color: red, fontWeight: 600 }}>
          <Clock className="w-4 h-4" aria-hidden="true" />
          {L(`${a.readingMinutes} min de lecture`, `${a.readingMinutes} min read`)}
        </p>
        <h3 className="text-2xl font-serif mb-3 leading-snug" style={{ color: brown, fontWeight: 400 }}>{v.title}</h3>
        <p className="leading-relaxed mb-4 flex-1" style={{ color: brown }}>{v.excerpt}</p>
        <span className="inline-flex items-center gap-2" style={{ color: red, fontWeight: 700 }}>
          {L("Lire l'article", 'Read the article')}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
};

export const LatestArticles = () => {
  const { L, to } = useLanguage();
  return (
    <section className="py-16 md:py-20 px-4 bg-cream">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm uppercase tracking-widest mb-2" style={{ color: red, fontWeight: 700 }}>{L('Le journal de Makda', "Makda's journal")}</p>
            <h2 className="text-4xl md:text-5xl font-serif" style={{ color: brown, fontWeight: 300 }}>
              {L('Traditions, plats et histoires', 'Traditions, dishes and stories')}
            </h2>
          </div>
          <Link to={to('journal')} className="inline-flex items-center gap-2 shrink-0" style={{ color: red, fontWeight: 700 }}>
            {L('Tous les articles', 'All articles')}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sorted()
            .slice(0, 3)
            .map((a) => (
              <ArticleCard key={a.id} a={a} />
            ))}
        </div>
      </div>
    </section>
  );
};

export const JournalIndex = () => {
  const { L, to, lang } = useLanguage();
  const list = sorted();
  return (
    <>
      <Seo
        path={to('journal')}
        title={L('Journal – cuisine et traditions éthiopiennes | Makda Bernex', 'Journal – Ethiopian food and traditions | Makda, Bernex')}
        description={L(
          "Le journal de Makda : l'injera au teff, la cérémonie du café, les fêtes éthiopiennes et nos conseils pour un premier repas éthiopien à Genève.",
          "Makda's journal: teff injera, the coffee ceremony, Ethiopian festivals and tips for your first Ethiopian meal in Geneva."
        )}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: L('Le journal de Makda', "Makda's journal"),
          url: `${SITE_URL}${to('journal')}`,
          inLanguage: lang === 'en' ? 'en' : 'fr-CH',
          blogPost: list.map((a) => ({
            '@type': 'BlogPosting',
            headline: a[lang].title,
            url: `${SITE_URL}${articlePath(a, lang)}`,
            datePublished: a.date,
          })),
        }}
      />
      <section className="pt-16 pb-10 px-4 bg-cream">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-widest mb-3" style={{ color: red, fontWeight: 700 }}>{L('Journal', 'Journal')}</p>
          <h1 className="text-5xl md:text-6xl font-serif mb-5" style={{ color: brown, fontWeight: 400 }}>
            {L('Le journal de Makda', "Makda's journal")}
          </h1>
          <p className="text-xl leading-relaxed" style={{ color: brown }}>
            {L(
              "Les plats, les gestes et les fêtes d'Éthiopie et d'Érythrée, racontés depuis notre cuisine de Bernex.",
              'The dishes, customs and festivals of Ethiopia and Eritrea, told from our kitchen in Bernex.'
            )}
          </p>
        </div>
      </section>
      <section className="pb-20 px-4 bg-cream">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((a) => (
            <ArticleCard key={a.id} a={a} />
          ))}
        </div>
      </section>
    </>
  );
};

export const ArticlePage = () => {
  const { pathname } = useLocation();
  const { lang, L, to } = useLanguage();
  const a = findArticleByPath(pathname.replace(/\/$/, ''));
  if (!a) return <NotFound />;
  const v = a[lang];
  const url = `${SITE_URL}${articlePath(a, lang)}`;
  const others = sorted().filter((x) => x.id !== a.id).slice(0, 3);

  return (
    <>
      <Seo
        path={articlePath(a, lang)}
        title={`${v.title} | Makda`}
        description={v.description}
        image={a.image}
        imageAlt={v.imageAlt}
        type="article"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: v.title,
            description: v.description,
            image: `${SITE_URL}${a.image}`,
            datePublished: a.date,
            dateModified: a.date,
            inLanguage: lang === 'en' ? 'en' : 'fr-CH',
            mainEntityOfPage: url,
            author: { '@type': 'Organization', name: 'Makda', url: SITE_URL },
            publisher: { '@type': 'Organization', name: 'Makda', logo: { '@type': 'ImageObject', url: `${SITE_URL}/makda-logo.webp` } },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: L('Accueil', 'Home'), item: `${SITE_URL}${to('home')}` },
              { '@type': 'ListItem', position: 2, name: 'Journal', item: `${SITE_URL}${to('journal')}` },
              { '@type': 'ListItem', position: 3, name: v.title, item: url },
            ],
          },
        ]}
      />
      <article>
        <header className="pt-12 pb-8 px-4 bg-cream">
          <div className="container mx-auto max-w-3xl">
            <nav aria-label={L("Fil d'Ariane", 'Breadcrumb')} className="text-sm mb-6" style={{ color: brown }}>
              <Link to={to('home')} className="hover:underline">{L('Accueil', 'Home')}</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <Link to={to('journal')} className="hover:underline">Journal</Link>
            </nav>
            <h1 className="text-4xl md:text-5xl font-serif mb-5 leading-tight" style={{ color: brown, fontWeight: 400 }}>{v.title}</h1>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm" style={{ color: red, fontWeight: 600 }}>
              <time dateTime={a.date}>{formatDate(a.date, lang)}</time>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {L(`${a.readingMinutes} min de lecture`, `${a.readingMinutes} min read`)}
              </span>
            </p>
          </div>
        </header>
        <div className="px-4 bg-cream">
          <div className="container mx-auto max-w-4xl">
            <img src={a.image} alt={v.imageAlt} fetchPriority="high" className="w-full aspect-[16/9] object-cover rounded-2xl shadow-lg" />
          </div>
        </div>
        <div className="py-12 px-4 bg-cream">
          <div className="container mx-auto max-w-3xl">
            {v.body.map((b, i) => {
              if ('h' in b)
                return (
                  <h2 key={i} className="text-3xl font-serif mt-10 mb-4" style={{ color: brown, fontWeight: 400 }}>
                    {b.h}
                  </h2>
                );
              if ('ul' in b)
                return (
                  <ul key={i} className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed" style={{ color: brown }}>
                    {b.ul.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                );
              if ('cta' in b) {
                const [fr, en] = ctaLabels[b.cta] ?? ['En savoir plus', 'Learn more'];
                return (
                  <p key={i} className="my-8">
                    <Link
                      to={to(b.cta)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: red, fontWeight: 700 }}
                    >
                      {L(fr, en)}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </p>
                );
              }
              return (
                <p key={i} className="text-lg leading-relaxed mb-5" style={{ color: brown }}>
                  {b.p}
                </p>
              );
            })}
            <p className="mt-12">
              <Link to={to('journal')} className="inline-flex items-center gap-2" style={{ color: red, fontWeight: 700 }}>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                {L('Tous les articles', 'All articles')}
              </Link>
            </p>
          </div>
        </div>
      </article>
      {others.length > 0 && (
        <section className="py-16 px-4" style={{ backgroundColor: '#EBCDAD' }}>
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-serif mb-8" style={{ color: brown, fontWeight: 300 }}>
              {L('À lire aussi', 'Read next')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {others.map((o) => (
                <ArticleCard key={o.id} a={o} />
              ))}
            </div>
          </div>
        </section>
      )}
      <BookingCTA />
    </>
  );
};
