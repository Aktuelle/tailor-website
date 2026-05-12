import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Decorative wax-pattern circle */}
        <div
          className="w-40 h-40 rounded-full mx-auto mb-8 flex items-center justify-center wax-divider shadow-xl"
          style={{ color: '#1A5C38' }}
        >
          <span className="font-display text-6xl font-bold text-forest relative z-10">404</span>
        </div>

        <h1 className="font-display text-charcoal text-3xl md:text-4xl font-bold mb-4">
          Page introuvable
        </h1>
        <p className="text-charcoal/60 font-body text-base leading-relaxed mb-8">
          Désolé, cette page n'existe pas ou a été déplacée.
          Retournez à l'accueil pour continuer votre visite.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            🏠 Retour à l'accueil
          </Link>
          <Link href="/galerie" className="btn-gold">
            🖼️ Voir la galerie
          </Link>
        </div>
      </div>
    </div>
  );
}
