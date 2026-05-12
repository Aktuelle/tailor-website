import type { Metadata } from 'next';
import Link from 'next/link';
import { getPage, getSiteSettings } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'À Propos – Atelier de Couture Élégance',
  description: 'Découvrez l\'histoire et la philosophie de l\'Atelier de Couture Élégance à Lomé, Togo.',
};

export default async function AboutPage() {
  const page     = await getPage('about');
  const settings = getSiteSettings();

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero header */}
      <div className="bg-earth py-16 relative overflow-hidden">
        <div className="absolute inset-0 wax-divider opacity-15" style={{ color: '#D4AF37' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-cream text-4xl md:text-5xl font-bold mb-4">
            À <span className="text-gold italic">Propos</span>
          </h1>
          <p className="text-cream/70 font-body text-lg max-w-xl mx-auto">
            L'histoire d'un atelier né de la passion pour la mode africaine.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Values cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {[
            { icon: '💎', title: 'Qualité',      desc: 'Matériaux premium, finitions soignées à chaque couture.' },
            { icon: '⏱️', title: 'Ponctualité', desc: 'Vos tenues livrées dans les délais convenus, toujours.' },
            { icon: '❤️', title: 'Passion',      desc: 'Chaque pièce créée avec amour et dévouement total.' },
          ].map(v => (
            <div key={v.title} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-earth/10">
              <div className="text-4xl mb-3">{v.icon}</div>
              <h3 className="font-display text-charcoal font-semibold text-lg mb-2">{v.title}</h3>
              <p className="text-charcoal/60 font-body text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Markdown article */}
        {page ? (
          <article
            className="prose-elegance"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        ) : (
          <p className="text-charcoal/50 font-body italic">Page en cours de rédaction...</p>
        )}

        {/* CTA */}
        <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/galerie" className="btn-primary">🖼️ Voir nos créations</Link>
          <Link href="/contact" className="btn-gold">✂️ Nous contacter</Link>
        </div>
      </div>
    </div>
  );
}
