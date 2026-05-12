'use client';

import { useState } from 'react';
import Image from 'next/image';
import { avatarThumb } from '@/lib/cloudinary';
import type { Testimonial } from '@/lib/types';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(n => (
        <svg
          key={n}
          className={`w-4 h-4 ${n <= rating ? 'text-gold' : 'text-earth/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const count = testimonials.length;

  if (count === 0) return null;

  const prev = () => setCurrent(c => (c - 1 + count) % count);
  const next = () => setCurrent(c => (c + 1) % count);

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
        {/* Decorative quote mark */}
        <div className="absolute top-4 right-6 font-display text-8xl text-gold/10 leading-none select-none">
          "
        </div>

        {/* Testimonial content */}
        <div className="relative z-10">
          <StarRating rating={testimonials[current].rating} />
          <blockquote className="mt-4 font-body text-charcoal/80 text-base leading-relaxed italic">
            "{testimonials[current].text}"
          </blockquote>
          <div className="mt-6 flex items-center gap-4">
            {/* Avatar */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-earth/20 flex-shrink-0">
              {testimonials[current].avatar ? (
                <Image
                  src={avatarThumb(testimonials[current].avatar!)}
                  alt={testimonials[current].name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-forest text-cream font-display text-xl font-bold">
                  {testimonials[current].name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="font-body font-semibold text-charcoal">{testimonials[current].name}</p>
              {testimonials[current].city && (
                <p className="text-charcoal/40 font-body text-xs flex items-center gap-1">
                  📍 {testimonials[current].city}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {count > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border-2 border-forest text-forest hover:bg-forest hover:text-cream transition-all flex items-center justify-center"
            aria-label="Précédent"
          >
            ‹
          </button>
          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 bg-forest' : 'w-2 bg-earth/30'
                }`}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border-2 border-forest text-forest hover:bg-forest hover:text-cream transition-all flex items-center justify-center"
            aria-label="Suivant"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
