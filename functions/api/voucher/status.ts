// Vérifie le paiement d'un bon et renvoie ses informations publiques.
import { type Ctx, json, getVoucher, refreshPayment, publicVoucher, normCode } from '../../../server/lib';

export const onRequestGet = async ({ request, env }: Ctx) => {
  const code = normCode(new URL(request.url).searchParams.get('code'));
  const v = code ? await getVoucher(env, code) : null;
  if (!v) return json({ error: 'not_found' }, 404);
  try {
    return json(publicVoucher(await refreshPayment(env, v)));
  } catch (e) {
    console.error(e);
    return json(publicVoucher(v));
  }
};
