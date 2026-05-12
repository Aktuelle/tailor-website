import Link from 'next/link';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-wax-red/10 flex items-center justify-center text-4xl mx-auto mb-6">❌</div>
        <h1 className="font-display text-charcoal text-3xl font-bold mb-3">Paiement annulé</h1>
        <p className="text-charcoal/60 font-body mb-8">
          Votre paiement a été annulé. Aucun montant n'a été débité. Vous pouvez réessayer ou nous contacter.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/boutique" className="btn-primary justify-center">🛍️ Retour à la boutique</Link>
          <Link href="/contact" className="text-forest font-body text-sm hover:underline">Nous contacter</Link>
        </div>
      </div>
    </div>
  );
}
