import type { Metadata } from 'next';
import Link from 'next/link';
import { getPage, getSiteSettings } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Services – Atelier de Couture Élégance',
  description: 'Couture sur mesure, retouches, tenues de mariage et location de costumes à Lomé, Togo.',
};

export default async function ServicesPage() {
  const page     = await getPage('services');
  const settings = getSiteSettings();

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-forest py-16 relative overflow-hidden">
        <div className="absolute inset-0 wax-divider opacity-15" style={{ color: '#D4AF37' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-cream text-4xl md:text-5xl font-bold mb-4">
            Nos <span className="text-gold italic">Services</span>
          </h1>
          <p className="text-cream/70 font-body text-lg max-w-xl mx-auto">
            De la conception à la livraison — tout pour vous habiller avec élégance.
          </p>
        </div>
      </div>

      {/* Quick-reference price table */}
      <div className="bg-white border-b border-earth/10 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Couture sur mesure', price: 'Dès 15 000', icon: '✂️' },
              { label: 'Retouches',          price: 'Dès 2 500',  icon: '🧵' },
              { label: 'Mariage',            price: 'Sur devis',  icon: '💍' },
              { label: 'Location tenue',     price: 'Dès 5 000',  icon: '🌍' },
            ].map(s => (
              <div key={s.label} className="p-4 rounded-xl bg-cream border border-earth/10">
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="font-body text-xs text-charcoal/60 mb-1">{s.label}</p>
                <p className="font-display text-forest font-semibold">{s.price} <span className="text-xs font-body">FCFA</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Markdown content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {page ? (
          <article
            className="prose-elegance"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        ) : (
          <p className="text-charcoal/50 font-body">Contenu en cours de rédaction...</p>
        )}

        {/* CTA */}
        <div className="mt-14 bg-gold/15 border border-gold/30 rounded-2xl p-8 text-center">
          <p className="font-display text-charcoal text-2xl font-semibold mb-3">
            Prêt à commander votre tenue ?
          </p>
          <p className="text-charcoal/60 font-body mb-6 text-sm">
            Consultation gratuite, devis sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-primary">
              ✂️ Prendre rendez-vous
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold bg-[#25D366] text-white hover:bg-[#1DA851] transition-all"
            >
              📱 WhatsApp direct
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
