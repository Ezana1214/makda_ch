// Pré-rendu : génère un fichier HTML complet pour chaque page,
// pour que Google, Bing, les IA et les aperçus de liens voient le contenu sans exécuter le JavaScript.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

// route → fichier (Cloudflare Pages sert /menu.html à l'adresse /menu)
const pages = {
  '/': 'index.html',
  '/menu': 'menu.html',
  '/traiteur': 'traiteur.html',
  '/histoire': 'histoire.html',
  '/contact': 'contact.html',
  '/confidentialite': 'confidentialite.html',
  '/mentions-legales': 'mentions-legales.html',
  '/404': '404.html',
};

for (const [url, file] of Object.entries(pages)) {
  const { html, head } = render(url);
  const out = template
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html);
  fs.writeFileSync(path.join(dist, file), out);
  console.log(`pré-rendu ${url.padEnd(18)} → ${file} (${(out.length / 1024).toFixed(1)} Ko)`);
}
