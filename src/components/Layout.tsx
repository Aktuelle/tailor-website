'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/i18n/client';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { SiteSettings } from '@/lib/types';

interface SiteLayoutProps {
  children: React.ReactNode;
  settings: SiteSettings;
}

// ── Header ─────────────────────────────────────────────────────────────────
function Header({ settings }: { settings: SiteSettings }) {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/',         label: t('nav.home')    },
    { href: '/galerie',  label: t('nav.gallery')  },
    { href: '/services', label: t('nav.services') },
    { href: '/about',    label: 'À Propos'         },
    { href: '/contact',  label: t('nav.contact')  },
    ...(settings.ecommerce_enabled ? [{ href: '/boutique', label: t('nav.shop') }] : []),
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-charcoal shadow-xl' : 'bg-charcoal/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Name */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-accent font-display font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              K
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-cream font-semibold text-sm leading-tight">
                {settings.site_name}
              </p>
              <p className="text-gold text-xs font-body">{settings.city}, Togo</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/80 hover:text-gold font-body font-medium text-sm transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: language + CTA */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="hidden md:inline-flex btn-gold text-sm px-4 py-2"
            >
              {t('hero.cta_primary')}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-cream hover:text-gold transition-colors"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-charcoal-light border-t border-white/10">
          <nav className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/80 hover:text-gold font-body font-medium py-1 border-b border-white/5"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-gold text-center mt-2"
              onClick={() => setMenuOpen(false)}
            >
              {t('hero.cta_primary')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer({ settings }: { settings: SiteSettings }) {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/70">
      {/* Wax pattern accent bar */}
      <div className="h-2 wax-divider opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-cream text-xl mb-3">{settings.site_name}</h3>
            <p className="text-sm leading-relaxed mb-4">{settings.tagline}</p>
            <p className="text-xs text-cream/40">{settings.address}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-cream text-lg mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['/', t('nav.home')],
                ['/galerie', t('nav.gallery')],
                ['/services', t('nav.services')],
                ['/contact', t('nav.contact')],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-gold transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-cream text-lg mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <span>📱</span> {t('common.whatsapp_cta')}
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                <span>✉️</span> {settings.email}
              </a>
              <p className="flex items-start gap-2">
                <span>📍</span> {settings.address}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream/40">
          <p>© {year} {settings.site_name}. {t('footer.rights')}.</p>
          <p>Fait avec ❤️ au Togo 🇹🇬</p>
        </div>
      </div>
    </footer>
  );
}

// ── WhatsApp floating button ───────────────────────────────────────────────
function WhatsAppButton({ number }: { number: string }) {
  const { t } = useI18n();
  return (
    <a
      href={`https://wa.me/${number}?text=Bonjour%2C%20je%20souhaite%20commander%20une%20tenue.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('common.whatsapp_cta')}
      className="fixed bottom-6 right-4 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-2xl px-4 py-3 font-body font-semibold text-sm hover:bg-[#1DA851] transition-all duration-200 hover:scale-105 animate-float group"
    >
      {/* WhatsApp icon */}
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      <span className="hidden sm:inline">{t('common.whatsapp_cta')}</span>
    </a>
  );
}

// ── Main Layout ─────────────────────────────────────────────────────────────
export function SiteLayout({ children, settings }: SiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header settings={settings} />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer settings={settings} />
      <WhatsAppButton number={settings.whatsapp} />
    </div>
  );
}
