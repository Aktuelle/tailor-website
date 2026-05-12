/**
 * SectionWrapper – consistent section padding + optional wax-divider accent.
 * Use this to wrap any top-level page section for uniform spacing.
 */
interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Adds the wax-print pattern bar at the top of the section */
  waxAccent?: boolean;
  id?: string;
}

export function SectionWrapper({
  children,
  className = '',
  waxAccent = false,
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={`py-14 md:py-20 ${className}`}>
      {waxAccent && (
        <div className="h-1.5 w-full wax-divider mb-0" style={{ color: '#1A5C38' }} />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

/** Reusable section title with gold underline */
interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean; // for dark backgrounds
}

export function SectionTitle({ title, subtitle, centered = true, light = false }: SectionTitleProps) {
  return (
    <div className={`mb-10 md:mb-14 ${centered ? 'text-center' : ''}`}>
      <h2 className={`font-display text-3xl md:text-4xl font-bold title-underline ${light ? 'text-cream' : 'text-charcoal'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-6 font-body text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-cream/70' : 'text-charcoal/60'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
