'use client';

import Image from 'next/image';
import { useI18n } from '@/i18n/client';
import { productThumb } from '@/lib/cloudinary';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  siteId: string;
}

export function ProductCard({ product, siteId }: ProductCardProps) {
  const { t } = useI18n();

  async function handleBuy() {
    try {
      // Call our server-side API route to get the payment URL
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount:         product.price,
          product_name:   product.name,
          customer_name:  '',
          customer_phone: '',
        }),
      });

      if (!res.ok) throw new Error('Payment init failed');
      const { payment_url } = await res.json() as { payment_url: string };
      window.location.href = payment_url;
    } catch (err) {
      alert('Erreur de paiement. Veuillez nous contacter sur WhatsApp.');
    }
  }

  return (
    <div className="card flex flex-col">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={productThumb(product.image)}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />
        {!product.in_stock && (
          <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center">
            <span className="bg-wax-red text-cream font-body font-semibold text-sm px-4 py-2 rounded-full">
              {t('shop.out_stock')}
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-gold text-charcoal font-body font-bold text-sm px-3 py-1 rounded-full shadow">
          {product.price.toLocaleString('fr-FR')} {t('shop.fcfa')}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display text-charcoal text-base font-semibold leading-snug">{product.name}</h3>
        <p className="text-charcoal/50 font-body text-xs mt-1 flex-1 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-wax-red'}`} />
          <span className="text-xs font-body text-charcoal/50">
            {product.in_stock ? t('shop.in_stock') : t('shop.out_stock')}
          </span>
        </div>
        <button
          onClick={handleBuy}
          disabled={!product.in_stock}
          className="mt-4 btn-primary w-full justify-center text-sm py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          💳 {t('shop.buy')}
        </button>
      </div>
    </div>
  );
}
