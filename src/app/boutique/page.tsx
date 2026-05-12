import type { Metadata } from 'next';
import { ProductCard } from '@/components/ProductCard';
import { getAllProducts, getSiteSettings } from '@/lib/markdown';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Boutique – Atelier de Couture Élégance',
  description: 'Achetez nos tenues prêtes à porter en wax africain. Paiement Mobile Money.',
};

export default function BoutiquePage() {
  const settings = getSiteSettings();
  if (!settings.ecommerce_enabled) redirect('/contact');
  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-charcoal py-16 relative overflow-hidden">
        <div className="absolute inset-0 wax-divider opacity-10" style={{ color: '#D4AF37' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-cream text-4xl md:text-5xl font-bold mb-4">
            Notre <span className="text-gold italic">Boutique</span>
          </h1>
          <p className="text-cream/70 font-body text-lg max-w-xl mx-auto">
            Pièces prêtes à porter — payez avec MTN Mobile Money ou Moov Money via CinetPay.
          </p>
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {['🔒 Paiement sécurisé', '📱 Mobile Money', '🚚 Livraison Lomé', '✅ Qualité garantie'].map(b => (
              <span key={b} className="bg-white/10 text-cream/80 text-xs font-body px-3 py-1.5 rounded-full border border-white/20">{b}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(product => (
              <ProductCard key={product.slug} product={product} siteId={settings.cinetpay_site_id || ''} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🪡</p>
            <p className="font-display text-charcoal text-xl">Boutique en cours de préparation...</p>
          </div>
        )}
      </div>
    </div>
  );
}
