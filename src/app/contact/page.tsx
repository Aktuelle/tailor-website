import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { getSiteSettings } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Contact – Atelier de Couture Élégance',
  description: 'Contactez l\'Atelier de Couture Élégance pour votre tenue sur mesure à Lomé, Togo.',
};

export default function ContactPage() {
  const settings = getSiteSettings();

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-earth py-16 relative overflow-hidden">
        <div className="absolute inset-0 wax-divider opacity-15" style={{ color: '#D4AF37' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-cream text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gold italic">Contactez</span>-Nous
          </h1>
          <p className="text-cream/70 font-body text-lg max-w-xl mx-auto">
            Parlons de votre projet. Notre équipe vous répondra dans les plus brefs délais.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          
          {/* Contact info sidebar */}
          <aside className="lg:col-span-2 space-y-6">
            {/* WhatsApp – primary CTA */}
            <a
              href={`https://wa.me/${settings.whatsapp}?text=Bonjour%2C%20je%20souhaite%20commander%20une%20tenue.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366] text-white rounded-2xl p-5 shadow-lg hover:bg-[#1DA851] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                📱
              </div>
              <div>
                <p className="font-body font-bold text-base">WhatsApp</p>
                <p className="text-white/80 text-sm font-body">+{settings.whatsapp}</p>
                <p className="text-white/60 text-xs mt-0.5">Réponse rapide garantie</p>
              </div>
            </a>

            {/* Other contact info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-earth/10 space-y-5">
              <h3 className="font-display text-charcoal text-lg font-semibold border-b border-earth/10 pb-3">
                Informations
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">✉️</span>
                  <div>
                    <p className="font-body font-medium text-charcoal text-sm">Email</p>
                    <a href={`mailto:${settings.email}`} className="text-forest hover:underline font-body text-sm">
                      {settings.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">📍</span>
                  <div>
                    <p className="font-body font-medium text-charcoal text-sm">Adresse</p>
                    <p className="text-charcoal/60 font-body text-sm">{settings.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🕒</span>
                  <div>
                    <p className="font-body font-medium text-charcoal text-sm">Horaires</p>
                    <p className="text-charcoal/60 font-body text-sm">Lun–Sam : 8h–19h</p>
                    <p className="text-charcoal/60 font-body text-sm">Dim : 10h–14h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ quick tips */}
            <div className="bg-gold/10 border border-gold/30 rounded-2xl p-5">
              <h4 className="font-display text-charcoal font-semibold mb-3">💡 Bon à savoir</h4>
              <ul className="space-y-2 text-sm font-body text-charcoal/70">
                <li>✅ Consultation initiale gratuite</li>
                <li>✅ Devis sans engagement</li>
                <li>✅ Livraison à domicile à Lomé</li>
                <li>✅ Paiement Mobile Money accepté</li>
                <li>✅ Envoi de tissu de l'étranger possible</li>
              </ul>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-earth/10 p-6 md:p-8">
              <h2 className="font-display text-charcoal text-2xl font-semibold mb-6">
                Envoyez-nous un message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
