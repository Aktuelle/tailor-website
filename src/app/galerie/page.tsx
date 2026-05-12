import type { Metadata } from 'next';
import { PortfolioGrid } from '@/components/PortfolioGrid';
import { getAllPortfolioItems, getSiteSettings } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Galerie – Atelier de Couture Élégance',
  description: 'Découvrez nos créations: robes de mariée, tenues traditionnelles, costumes hommes, et bien plus.',
};

export default function GaleriePage() {
  const items    = getAllPortfolioItems();
  const settings = getSiteSettings();

  return (
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <div className="bg-charcoal py-16 relative overflow-hidden">
        <div className="absolute inset-0 wax-divider opacity-10" style={{ color: '#D4AF37' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-cream text-4xl md:text-5xl font-bold mb-4">
            Notre <span className="text-gold italic">Galerie</span>
          </h1>
          <p className="text-cream/70 font-body text-lg max-w-xl mx-auto">
            Chaque tenue raconte une histoire. Parcourez nos créations et trouvez l'inspiration.
          </p>
          <p className="mt-4 text-cream/40 font-body text-sm">{items.length} réalisations</p>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PortfolioGrid items={items} showFilters={true} />

        {items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🪡</p>
            <p className="font-display text-charcoal text-xl">Galerie en cours de construction...</p>
            <p className="text-charcoal/50 font-body mt-2">Revenez bientôt !</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-forest/10 border-t border-forest/10 py-12">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="font-display text-charcoal text-2xl font-semibold mb-4">
            Vous avez une idée en tête ?
          </p>
          <a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            📱 Discutons sur WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
