import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import App from './App.tsx';
import './fonts';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  </StrictMode>
);

// Les pages sont pré-rendues au moment de la publication : on "hydrate" le HTML existant.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
