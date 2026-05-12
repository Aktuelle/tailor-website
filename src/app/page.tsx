import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { PortfolioGrid } from '@/components/PortfolioGrid';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { getSiteSettings, getFeaturedPortfolioItems, getAllTestimonials } from '@/lib/markdown';

export default function HomePage() {
  const settings     = getSiteSettings();
  const portfolio    = getFeaturedPortfolioItems(6);
  const testimonials = getAllTestimonials();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <Hero settings={settings} />

      {/* ── Services overview ────────────────────────── */}
      <section className="py-16 md:py-20 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-charcoal title-underline">
              Ce que nous faisons
            </h2>
            <p className="mt-6 text-charcoal/60 font-body max-w-xl mx-auto">
              De la robe de mariée à la tenue traditionnelle, nous donnons vie à vos idées avec passion et précision.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '👗', title: 'Couture Sur Mesure',    desc: 'Tenues uniques créées selon vos mensurations exactes.',    price: 'Dès 15 000 FCFA' },
              { icon: '💍', title: 'Tenues de Mariage',    desc: 'Robes, costumes et ensembles pour votre jour spécial.',    price: 'Devis gratuit' },
              { icon: '✂️', title: 'Retouches',            desc: 'Ajustements précis pour un ajustement parfait.',           price: 'Dès 2 500 FCFA' },
              { icon: '🌍', title: 'Costumes Traditionnels', desc: 'Boubous, agbadas et tenues wax pour vos cérémonies.',   price: 'Location dès 5 000' },
            ].map(service => (
              <div key={service.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-earth/10">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-display text-charcoal text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-charcoal/60 font-body text-sm leading-relaxed mb-3">{service.desc}</p>
                <span className="text-xs font-body font-semibold text-forest bg-forest/10 px-3 py-1 rounded-full">
                  {service.price}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-primary">
              Voir tous nos services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Wax pattern divider ───────────────────────── */}
      <div className="h-16 wax-divider" style={{ color: '#1A5C38' }} />

      {/* ── Portfolio preview ─────────────────────────── */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-charcoal title-underline">
              Nos Réalisations
            </h2>
            <p className="mt-6 text-charcoal/60 font-body max-w-lg mx-auto">
              Un aperçu de nos créations. Chaque pièce est unique, confectionnée avec amour.
            </p>
          </div>
          <PortfolioGrid items={portfolio} showFilters={false} limit={6} />
          <div className="text-center mt-10">
            <Link href="/galerie" className="btn-primary">
              🖼️ Voir toute la galerie →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-20 bg-forest text-cream relative overflow-hidden">
          {/* Wax pattern overlay */}
          <div className="absolute inset-0 wax-divider opacity-10" style={{ color: '#D4AF37' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-cream title-underline">
                Ce que disent nos clients
              </h2>
              <div className="mt-2 flex justify-center">
                <span className="block h-1 w-16 bg-gold rounded-full" />
              </div>
            </div>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* ── CTA Banner ────────────────────────────────── */}
      <section className="py-14 bg-gold">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal font-bold mb-4">
            Prêt à créer votre tenue idéale ?
          </h2>
          <p className="text-charcoal/70 font-body mb-8">
            Contactez-nous dès aujourd'hui. Consultation gratuite et devis sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-charcoal text-cream font-body font-semibold hover:bg-charcoal-light transition-all shadow-lg"
            >
              ✂️ Commander une tenue
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-white font-body font-semibold hover:bg-[#1DA851] transition-all shadow-lg"
            >
              📱 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
