'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/i18n/client';
import { PORTFOLIO_CATEGORIES } from '@/lib/constants';
import { galleryThumb } from '@/lib/cloudinary';
import type { PortfolioItem } from '@/lib/types';

interface PortfolioGridProps {
  items: PortfolioItem[];
  showFilters?: boolean;
  /** Limit items (e.g. for homepage preview) */
  limit?: number;
}

export function PortfolioGrid({ items, showFilters = true, limit }: PortfolioGridProps) {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);

  const filtered = activeFilter === 'all'
    ? items
    : items.filter(i => i.category === activeFilter);

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <>
      {/* Category filters */}
      {showFilters && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {PORTFOLIO_CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 ${
                activeFilter === cat.value
                  ? 'bg-forest text-cream shadow-md scale-105'
                  : 'bg-white text-charcoal/70 border border-earth/20 hover:border-forest hover:text-forest'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{t(`gallery.filter_${cat.value}`)}</span>
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {displayed.map((item, idx) => (
          <button
            key={item.slug}
            onClick={() => setLightbox(item)}
            className="card group relative aspect-square cursor-pointer"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <Image
              src={galleryThumb(item.image)}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading={idx < 8 ? 'eager' : 'lazy'}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <div className="text-left">
                <p className="text-cream font-display font-semibold text-sm leading-tight">{item.title}</p>
                <span className="inline-block mt-1 bg-gold/90 text-charcoal text-xs px-2 py-0.5 rounded-full capitalize">
                  {item.category}
                </span>
              </div>
            </div>
            {/* Featured badge */}
            {item.featured && (
              <div className="absolute top-2 right-2 bg-gold text-charcoal text-xs font-semibold px-2 py-0.5 rounded-full">
                ⭐
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={galleryThumb(lightbox.image)}
                alt={lightbox.title}
                fill
                className="object-cover"
                sizes="(max-width: 672px) 100vw, 672px"
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl text-charcoal font-semibold">{lightbox.title}</h3>
                  <span className="inline-block mt-1 bg-forest/10 text-forest text-xs px-2 py-0.5 rounded-full capitalize border border-forest/20">
                    {lightbox.category}
                  </span>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="text-charcoal/40 hover:text-charcoal transition-colors flex-shrink-0"
                  aria-label="Fermer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {lightbox.description && (
                <p className="mt-3 text-charcoal/60 font-body text-sm leading-relaxed">{lightbox.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
