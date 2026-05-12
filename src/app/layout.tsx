import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteLayout } from '@/components/Layout';
import { I18nProvider } from '@/i18n/client';
import { getSiteSettings } from '@/lib/markdown';

/** Viewport & theme colour (separate export as required by Next.js 14) */
export const viewport: Viewport = {
  themeColor:    '#1A5C38',
  width:         'device-width',
  initialScale:  1,
  viewportFit:   'cover',
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSiteSettings();
  return {
    title:       `${settings.site_name} – ${settings.city}`,
    description: settings.tagline,
    keywords:    ['couturier', 'togo', 'lomé', 'wax', 'mode africaine', 'couture sur mesure'],
    authors:     [{ name: settings.site_name }],
    openGraph: {
      title:       settings.site_name,
      description: settings.tagline,
      images:      [settings.hero_image],
      locale:      'fr_TG',
      type:        'website',
    },
    manifest: '/manifest.json',
    icons: {
      apple: '/images/icon-192.png',
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = getSiteSettings();
  return (
    <html lang="fr">
      <head>
        {/* Netlify Identity Widget – needed for Decap CMS login redirect */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async />
      </head>
      <body>
        <I18nProvider>
          <SiteLayout settings={settings}>
            {children}
          </SiteLayout>
        </I18nProvider>
      </body>
    </html>
  );
}
