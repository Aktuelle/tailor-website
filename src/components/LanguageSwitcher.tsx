'use client';

import { useI18n, type Locale } from '@/i18n/client';

const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'ee', label: 'EE', flag: '🇹🇬' },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-full px-1 py-1">
      {LOCALES.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => setLocale(code)}
          aria-label={`Switch to ${label}`}
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-semibold transition-all duration-200 ${
            locale === code
              ? 'bg-gold text-charcoal shadow-sm'
              : 'text-cream/70 hover:text-cream'
          }`}
        >
          <span>{flag}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
