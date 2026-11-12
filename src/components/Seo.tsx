import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../data/restaurant';

interface SeoProps {
  title: string;
  description: string;
  /** Chemin de la page, ex. "/menu" */
  path: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

const Seo = ({
  title,
  description,
  path,
  image = '/og-image.jpg',
  imageAlt = 'Salle du restaurant Makda à Bernex, Genève',
  noindex = false,
  jsonLd,
}: SeoProps) => {
  const url = `${SITE_URL}${path === '/' ? '/' : path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const ld = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang="fr" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {path !== '/404' && <link rel="canonical" href={url} />}
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Makda" />
      <meta property="og:locale" content="fr_CH" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />

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
