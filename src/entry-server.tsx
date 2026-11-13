import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import App from './App';
export { routes } from './i18n';

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );
  const h = helmetContext.helmet!;
  const head = [h.title, h.meta, h.link, h.script].map((x) => x.toString()).join('\n    ');
  return { html, head, htmlAttributes: h.htmlAttributes.toString() };
}
