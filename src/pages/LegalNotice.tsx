import Seo from '../components/Seo';
import LegalLayout from '../components/LegalLayout';
import { restaurant } from '../data/restaurant';

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-serif mb-3" style={{ fontWeight: 300 }}>{children}</h2>
);

const LegalNotice = () => (
  <>
    <Seo
      path="/mentions-legales"
      title="Mentions légales – Makda"
      description="Mentions légales du site makda.ch, exploité par MAKDA Sàrl à Bernex (Genève)."
      noindex
    />
    <LegalLayout title="Mentions légales" updated="12 novembre 2026">
      <div>
        <H2>Éditeur du site</H2>
        <p>
          {restaurant.legalName}
          <br />
          {restaurant.street}, {restaurant.postalCode} {restaurant.city} (GE), Suisse
          <br />
          Numéro IDE : {restaurant.uid || 'CHE-xxx.xxx.xxx'}
          <br />
          Téléphone : <a href={`tel:${restaurant.phone}`} className="underline">{restaurant.phoneDisplay}</a>
          <br />
          E-mail : <a href={`mailto:${restaurant.email}`} className="underline">{restaurant.email}</a>
        </p>
      </div>
      <div>
        <H2>Hébergement</H2>
        <p>
          Le site est hébergé par Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis
          (service Cloudflare Pages).
        </p>
      </div>
      <div>
        <H2>Propriété intellectuelle</H2>
        <p>
          Les textes, photographies, logos et éléments graphiques de ce site appartiennent à {restaurant.legalName} ou
          sont utilisés avec l'autorisation de leurs auteurs. Toute reproduction sans autorisation écrite préalable
          est interdite.
        </p>
      </div>
      <div>
        <H2>Responsabilité</H2>
        <p>
          Les informations publiées (carte, prix, horaires) sont données à titre indicatif et peuvent changer sans
          préavis. Malgré notre soin, nous ne pouvons garantir l'exactitude de chaque information. Les liens vers
          des sites tiers (réservation, réseaux sociaux, cartes) sont fournis pour votre confort ; nous ne sommes
          pas responsables de leur contenu.
        </p>
      </div>
      <div>
        <H2>Protection des données</H2>
        <p>
          Le traitement de vos données personnelles est décrit dans notre{' '}
          <a href="/confidentialite" className="underline">politique de confidentialité</a>.
        </p>
      </div>
    </LegalLayout>
  </>
);

export default LegalNotice;
