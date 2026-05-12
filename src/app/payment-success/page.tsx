'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function SuccessContent() {
  const params = useSearchParams();
  const txId   = params.get('transaction_id') || params.get('cpm_trans_id') || '';

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
        <h1 className="font-display text-charcoal text-3xl font-bold mb-3">Paiement réussi !</h1>
        <p className="text-charcoal/60 font-body mb-4">
          Merci pour votre commande. Nous vous contacterons sous peu pour confirmer les détails.
        </p>
        {txId && (
          <p className="text-xs text-charcoal/40 font-body bg-cream px-4 py-2 rounded-xl mb-6">
            Réf. transaction : <span className="font-mono">{txId}</span>
          </p>
        )}
        <div className="flex flex-col gap-3">
          <Link href="/" className="btn-primary justify-center">🏠 Retour à l'accueil</Link>
          <Link href="/galerie" className="text-forest font-body text-sm hover:underline">Voir notre galerie</Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="font-body text-charcoal/50">Chargement...</p></div>}><SuccessContent /></Suspense>;
}
