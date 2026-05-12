'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import fr from './dictionaries/fr.json';
import ee from './dictionaries/ee.json';
import en from './dictionaries/en.json';

// ── Types ──────────────────────────────────────────────────────────────────
export type Locale = 'fr' | 'ee' | 'en';
type Dict = Record<string, unknown>;

const dictionaries: Record<Locale, Dict> = {
  fr: fr as Dict,
  ee: ee as Dict,
  en: en as Dict,
};

/** Safely get a nested translation value via dot-separated key */
function getNestedValue(obj: Dict, path: string): string | undefined {
  const result = path.split('.').reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === 'object') {
      return (acc as Dict)[key];
    }
    return undefined;
  }, obj);
  return typeof result === 'string' ? result : undefined;
}

// ── Context ────────────────────────────────────────────────────────────────
interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

import { createElement } from 'react';
const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr');

  /**
   * Translate a dot-separated key.
   * Falls back to French, then to the fallback param, then to the key itself.
   */
  const t = (key: string, fallback?: string): string => {
    return (
      getNestedValue(dictionaries[locale], key) ??
      getNestedValue(dictionaries['fr'], key) ??
      fallback ??
      key
    );
  };

  return createElement(
    I18nContext.Provider,
    { value: { locale, setLocale, t } },
    children
  );
}

/** Hook to access translations */
export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
