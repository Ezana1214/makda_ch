import Seo from '../components/Seo';
import LegalLayout from '../components/LegalLayout';
import { restaurant } from '../data/restaurant';

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-serif mb-3" style={{ fontWeight: 300 }}>{children}</h2>
);

const Privacy = () => (
  <>
    <Seo
      path="/confidentialite"
      title="Politique de confidentialité – Makda"
      description="Comment MAKDA Sàrl traite vos données personnelles sur makda.ch, conformément à la loi suisse sur la protection des données (nLPD)."
      noindex
    />
    <LegalLayout title="Politique de confidentialité" updated="12 novembre 2026">
      <p>
        Nous respectons votre vie privée. Cette page explique quelles données nous traitons lorsque vous utilisez
        makda.ch, pourquoi, et quels sont vos droits selon la loi fédérale suisse sur la protection des données
        (nLPD).
      </p>
      <div>
        <H2>Responsable du traitement</H2>
        <p>
          {restaurant.legalName}, {restaurant.street}, {restaurant.postalCode} {restaurant.city}, Suisse.
          <br />
          Contact : <a href={`mailto:${restaurant.email}`} className="underline">{restaurant.email}</a>
        </p>
      </div>
      <div>
        <H2>Données que nous traitons</H2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Formulaire de contact et demandes de devis</strong> : nom, adresse e-mail, téléphone et
            message, ainsi que les détails de votre événement le cas échéant. Ces données servent uniquement à vous
            répondre. Le formulaire est transmis par le service FormSubmit (formsubmit.co) vers notre messagerie.
          </li>
          <li>
            <strong>Bons cadeaux</strong> : nom et e-mail de l'acheteur, nom du bénéficiaire et message, pour créer
            le bon et en suivre l'utilisation. Le paiement est traité par Stripe (stripe.com) : nous ne voyons ni ne
            conservons vos données de carte. Les données du bon sont conservées jusqu'à sa date de validité, puis le
            temps requis par la comptabilité.
          </li>
          <li>
            <strong>Newsletter</strong> : votre adresse e-mail, uniquement si vous avez coché la case d'accord.
            Elle sert à vous envoyer nos nouvelles (environ une fois par mois), via notre prestataire d'envoi
            (Brevo). Vous pouvez vous désinscrire à tout moment grâce au lien présent dans chaque e-mail ou en
            nous écrivant.
          </li>
          <li>
            <strong>Réservations</strong> : elles sont gérées par TheFork (TripAdvisor), qui traite vos données
            selon sa propre politique de confidentialité.
          </li>
          <li>
            <strong>Données techniques</strong> : notre hébergeur Cloudflare enregistre des données techniques
            (adresse IP, navigateur, pages consultées) pour assurer la sécurité et le bon fonctionnement du site.
          </li>
          <li>
            <strong>Mesure d'audience</strong> : nous utilisons, le cas échéant, une statistique de visites sans
            cookie et sans profil individuel (Cloudflare Web Analytics).
          </li>
          <li>
            <strong>Carte Google Maps</strong> : la carte intégrée est fournie par Google, qui peut collecter des
            données lorsque vous l'affichez.
          </li>
        </ul>
      </div>
      <div>
        <H2>Cookies</H2>
        <p>
          Notre site ne dépose pas de cookies publicitaires ni de suivi. Des services tiers intégrés (carte Google,
          module de réservation) peuvent utiliser leurs propres cookies lorsque vous les utilisez.
        </p>
      </div>
      <div>
        <H2>Transferts à l'étranger</H2>
        <p>
          Certains prestataires (Cloudflare, Google, FormSubmit, TheFork, Stripe, Brevo) peuvent traiter des données hors de
          Suisse, notamment dans l'Union européenne et aux États-Unis, avec les garanties prévues par la loi.
        </p>
      </div>
      <div>
        <H2>Durée de conservation</H2>
        <p>
          Nous conservons vos messages le temps nécessaire pour traiter votre demande, puis au maximum deux ans,
          sauf obligation légale de conservation plus longue (par exemple pour la comptabilité).
        </p>
      </div>
      <div>
        <H2>Vos droits</H2>
        <p>
          Vous pouvez à tout moment demander l'accès à vos données, leur rectification ou leur effacement, en
          écrivant à <a href={`mailto:${restaurant.email}`} className="underline">{restaurant.email}</a>. Vous
          pouvez aussi vous adresser au Préposé fédéral à la protection des données et à la transparence (PFPDT).
        </p>
      </div>
    </LegalLayout>
  </>
);

export default Privacy;
