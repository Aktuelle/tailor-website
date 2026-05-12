import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import type { SiteSettings, PortfolioItem, Testimonial, Product, Page } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

// ── Generic helpers ────────────────────────────────────────────────────────

function readMdFile(filePath: string): { data: Record<string, unknown>; content: string } {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { data, content };
}

async function markdownToHtml(md: string): Promise<string> {
  const result = await remark().use(remarkHtml, { sanitize: false }).process(md);
  return result.toString();
}

function getFilesInDir(dir: string): string[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter(f => f.endsWith('.md'));
}

// ── Site Settings ──────────────────────────────────────────────────────────

export function getSiteSettings(): SiteSettings {
  const filePath = path.join(CONTENT_DIR, 'site-settings', 'settings.md');
  if (!fs.existsSync(filePath)) {
    // Return sensible defaults if file doesn't exist yet
    return {
      site_name:         'Atelier de Couture Élégance',
      tagline:           'Votre couturier de confiance à Lomé',
      city:              'Lomé',
      hero_image:        'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
      whatsapp:          '22890000000',
      email:             'contact@elegance-couture.tg',
      address:           'Lomé, Togo',
      ecommerce_enabled: false,
    };
  }
  const { data } = readMdFile(filePath);
  return data as unknown as SiteSettings;
}

// ── Portfolio ──────────────────────────────────────────────────────────────

export function getAllPortfolioItems(): PortfolioItem[] {
  const files = getFilesInDir('portfolio');
  return files
    .map(filename => {
      const { data } = readMdFile(path.join(CONTENT_DIR, 'portfolio', filename));
      return {
        ...(data as Omit<PortfolioItem, 'slug'>),
        slug: filename.replace(/\.md$/, ''),
      } as PortfolioItem;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPortfolioItems(count = 3): PortfolioItem[] {
  const all = getAllPortfolioItems();
  const featured = all.filter(i => i.featured);
  return featured.length >= count ? featured.slice(0, count) : all.slice(0, count);
}

// ── Testimonials ───────────────────────────────────────────────────────────

export function getAllTestimonials(): Testimonial[] {
  const files = getFilesInDir('testimonials');
  return files.map(filename => {
    const { data } = readMdFile(path.join(CONTENT_DIR, 'testimonials', filename));
    return {
      ...(data as Omit<Testimonial, 'slug'>),
      slug: filename.replace(/\.md$/, ''),
    } as Testimonial;
  });
}

// ── Pages ──────────────────────────────────────────────────────────────────

export async function getPage(slug: string): Promise<Page | null> {
  const filePath = path.join(CONTENT_DIR, 'pages', `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = readMdFile(filePath);
  const html = await markdownToHtml(content);
  return { title: data.title as string, content: html };
}

// ── Products ───────────────────────────────────────────────────────────────

export function getAllProducts(): Product[] {
  const files = getFilesInDir('products');
  return files.map(filename => {
    const { data } = readMdFile(path.join(CONTENT_DIR, 'products', filename));
    return {
      ...(data as Omit<Product, 'slug'>),
      slug: filename.replace(/\.md$/, ''),
    } as Product;
  });
}
