'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/i18n/client';
import type { SiteSettings } from '@/lib/types';
import { heroImage } from '@/lib/cloudinary';

interface HeroProps {
  settings: SiteSettings;
}

export function Hero({ settings }: HeroProps) {
  const { t } = useI18n();
  const imgSrc = heroImage(settings.hero_image);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imgSrc}
          alt="Atelier de Couture Élégance"
          fill
          className="object-cover object-center"
          priority
          quality={80}
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/60 to-transparent" />
        {/* Subtle wax pattern overlay */}
        <div className="absolute inset-0 wax-divider opacity-10" style={{ color: '#D4AF37' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/40 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold font-body font-semibold text-sm">{t('hero.badge')}</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-cream text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 animate-slide-up opacity-0-init animate-delay-100">
            Votre couturier<br />
            <span className="text-gold italic">de confiance</span><br />
            à {settings.city}
          </h1>

          {/* Tagline */}
          <p className="text-cream/80 font-body text-lg leading-relaxed mb-8 animate-slide-up opacity-0-init animate-delay-200">
            {settings.tagline}. Tenues sur mesure, retouches et location de costumes traditionnels.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up opacity-0-init animate-delay-300">
            <Link href="/contact" className="btn-gold font-semibold text-base px-8 py-4 shadow-xl">
              ✂️ {t('hero.cta_primary')}
            </Link>
            <Link href="/galerie" className="btn-secondary text-base px-8 py-4">
              🖼️ {t('hero.cta_secondary')}
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-6 mt-10 animate-fade-in opacity-0-init animate-delay-400">
            {[
              ['10+', 'Ans d\'expérience'],
              ['500+', 'Clients satisfaits'],
              ['100%', 'Sur mesure'],
            ].map(([num, label]) => (
              <div key={num} className="text-center">
                <p className="font-display text-gold text-2xl font-bold">{num}</p>
                <p className="text-cream/60 font-body text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-cream/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
