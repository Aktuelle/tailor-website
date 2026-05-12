'use client';

import { useState } from 'react';
import { useI18n } from '@/i18n/client';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const { t } = useI18n();
  const [state, setState] = useState<FormState>('idle');

  const garmentOptions = [
    'Robe de mariée', 'Tenue traditionnelle', 'Costume homme',
    'Tenue casual', 'Vêtement enfant', 'Retouche', 'Autre',
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (res.ok) {
        setState('success');
        form.reset();
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  }

  const inputClass = `w-full px-4 py-3 rounded-xl border border-earth/20 bg-white
    font-body text-charcoal placeholder-charcoal/40
    focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/20
    transition-all duration-200`;

  if (state === 'success') {
    return (
      <div className="bg-forest/10 border border-forest/30 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="font-display text-forest text-xl font-semibold mb-2">
          {t('contact.success')}
        </h3>
        <p className="text-charcoal/60 font-body text-sm">
          Nous vous répondrons dans les plus brefs délais.
        </p>
        <button
          onClick={() => setState('idle')}
          className="mt-4 btn-primary text-sm"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    /* Netlify Forms: hidden form-name field + data-netlify attr */
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Netlify hidden fields */}
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Ne pas remplir si vous êtes humain : <input name="bot-field" />
        </label>
      </p>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-body font-medium text-charcoal/70 mb-1">
            {t('contact.name')} *
          </label>
          <input
            type="text"
            name="nom"
            required
            placeholder="Marie Kouma"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-body font-medium text-charcoal/70 mb-1">
            {t('contact.email')}
          </label>
          <input
            type="email"
            name="email"
            placeholder="marie@exemple.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Phone + Garment type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-body font-medium text-charcoal/70 mb-1">
            {t('contact.phone')} *
          </label>
          <input
            type="tel"
            name="telephone"
            required
            placeholder="+228 90 00 00 00"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-body font-medium text-charcoal/70 mb-1">
            {t('contact.garment')} *
          </label>
          <select name="type_vetement" required className={inputClass}>
            <option value="">Choisir...</option>
            {garmentOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-body font-medium text-charcoal/70 mb-1">
          {t('contact.message')} *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Décrivez votre projet : tissu souhaité, occasion, délai, budget..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Photo upload */}
      <div>
        <label className="block text-sm font-body font-medium text-charcoal/70 mb-1">
          {t('contact.photo')}
        </label>
        <input
          type="file"
          name="photo_inspiration"
          accept="image/*"
          className="w-full text-sm text-charcoal/60 font-body file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-forest/10 file:text-forest hover:file:bg-forest/20 transition-all"
        />
        <p className="text-xs text-charcoal/40 mt-1">JPG, PNG, WEBP – max 5 MB</p>
      </div>

      {/* Error message */}
      {state === 'error' && (
        <p className="text-wax-red font-body text-sm bg-wax-red/10 border border-wax-red/20 rounded-xl px-4 py-3">
          Une erreur est survenue. Veuillez réessayer ou nous contacter sur WhatsApp.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'sending' ? (
          <>
            <span className="animate-spin">⟳</span> Envoi en cours...
          </>
        ) : (
          <>✉️ {t('contact.send')}</>
        )}
      </button>
    </form>
  );
}
