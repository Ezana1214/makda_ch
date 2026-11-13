import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../data/restaurant';
import { langFromPath, routeIdFromPath, routes } from '../i18n';

interface SeoProps {
  title: string;
  description: string;
  /** Chemin de la page, ex. "/menu" ou "/en/menu" */
  path: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

const Seo = ({ title, description, path, image = '/og-image.jpg', imageAlt, noindex = false, jsonLd }: SeoProps) => {
  const lang = langFromPath(path);
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const ld = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const id = routeIdFromPath(path);
  const alt = id && routes[id].fr !== routes[id].en ? routes[id] : null;
  const altText =
    imageAlt ?? (lang === 'en' ? 'Dining room of Makda restaurant in Bernex, Geneva' : 'Salle du restaurant Makda à Bernex, Genève');

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {path !== '/404' && <link rel="canonical" href={url} />}
      {alt && <link rel="alternate" hrefLang="fr" href={`${SITE_URL}${alt.fr}`} />}
      {alt && <link rel="alternate" hrefLang="en" href={`${SITE_URL}${alt.en}`} />}
      {alt && <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${alt.fr}`} />}
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Makda" />
      <meta property="og:locale" content={lang === 'en' ? 'en_GB' : 'fr_CH'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={altText} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {ld.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
