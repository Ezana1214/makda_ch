import type { Lang } from '../i18n';

/** Inscrit une adresse à la newsletter (consentement déjà donné par la personne). */
export const subscribeNewsletter = async (email: string, lang: Lang, source: string, website = '') => {
  const res = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, lang, source, consent: true, website }),
  });
  return res.ok;
};
