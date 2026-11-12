import { ReactNode } from 'react';

interface LegalLayoutProps {
  title: string;
  updated: string;
  children: ReactNode;
}

const LegalLayout = ({ title, updated, children }: LegalLayoutProps) => (
  <section className="pt-16 md:pt-24 pb-20 px-4" style={{ backgroundColor: '#FFF3E6' }}>
    <div className="container mx-auto max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-serif mb-3" style={{ color: '#401400', fontWeight: 300 }}>
        {title}
      </h1>
      <p className="text-sm mb-12" style={{ color: '#7A5852' }}>Dernière mise à jour : {updated}</p>
      <div className="legal space-y-8 leading-relaxed" style={{ color: '#401400', fontWeight: 300 }}>
        {children}
      </div>
    </div>
  </section>
);

export default LegalLayout;
