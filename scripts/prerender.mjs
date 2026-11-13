// Pré-rendu : génère un fichier HTML complet pour chaque page (français et anglais),
// pour que Google, Bing, les IA et les aperçus de liens voient le contenu sans exécuter le JavaScript.
// Génère aussi le sitemap.xml avec les versions linguistiques (hreflang).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');
const { render, routes, articlePairs, extraPages } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);
const SITE = 'https://makda.ch';

// adresse → fichier (Cloudflare Pages sert /menu.html à l'adresse /menu et en/index.html à /en/)
const fileFor = (url) => (url === '/' ? 'index.html' : url.endsWith('/') ? `${url.slice(1)}index.html` : `${url.slice(1)}.html`);

const pages = new Map();
for (const r of Object.values(routes)) {
  pages.set(r.fr, fileFor(r.fr));
  pages.set(r.en, fileFor(r.en));
}
for (const r of articlePairs) {
  pages.set(r.fr, fileFor(r.fr));
  pages.set(r.en, fileFor(r.en));
}
for (const u of extraPages) pages.set(u, fileFor(u));
pages.set('/404', '404.html');

for (const [url, file] of pages) {
  const { html, head, htmlAttributes } = render(url);
  const out = template
    .replace(/<html[^>]*>/, `<html ${htmlAttributes}>`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html);
  const target = path.join(dist, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, out);
  console.log(`pré-rendu ${url.padEnd(28)} → ${file} (${(out.length / 1024).toFixed(1)} Ko)`);
}

// Sitemap
const today = new Date().toISOString().slice(0, 10);
const priority = { home: '1.0', menu: '0.9', catering: '0.9' };
const skip = new Set(['privacy', 'legal', 'giftThanks']);
const urls = [];
const all = [...Object.entries(routes), ...articlePairs.map((r) => ['article', r])];
for (const [id, r] of all) {
  if (skip.has(id)) continue;
  for (const loc of [r.fr, r.en]) {
    urls.push(
      `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${loc === r.en ? (Number(priority[id] ?? '0.8') - 0.1).toFixed(1) : priority[id] ?? '0.8'}</priority>\n` +
        `    <xhtml:link rel="alternate" hreflang="fr" href="${SITE}${r.fr}"/>\n` +
        `    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${r.en}"/>\n` +
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${r.fr}"/>\n  </url>`
    );
  }
}
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
);
console.log(`sitemap.xml : ${urls.length} adresses`);
