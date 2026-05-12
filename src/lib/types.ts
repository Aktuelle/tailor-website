// ── Shared Types ──────────────────────────────────────────────────────────

export interface SiteSettings {
  site_name: string;
  tagline: string;
  city: string;
  hero_image: string;
  whatsapp: string;
  email: string;
  address: string;
  ecommerce_enabled: boolean;
  cinetpay_site_id?: string;
  logo_url?: string;
}

export interface PortfolioItem {
  slug: string;
  title: string;
  image: string;
  category: 'mariage' | 'casual' | 'homme' | 'femme' | 'enfant' | 'traditionnel';
  date: string;
  description?: string;
  featured?: boolean;
}

export interface Testimonial {
  slug: string;
  name: string;
  avatar?: string;
  text: string;
  rating: number;
  city?: string;
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
  in_stock: boolean;
  category: string;
}

export interface Page {
  title: string;
  content: string; // rendered HTML from markdown
}
