/**
 * Admin route — Decap CMS
 *
 * The actual CMS UI is the static file at /public/admin/index.html.
 * Netlify redirects /admin → /admin/index.html automatically via netlify.toml.
 *
 * This Next.js page redirects to the static HTML file so dev also works.
 */
import { redirect } from 'next/navigation';

export default function AdminCatchAll() {
  // Redirect to the static CMS HTML served from public/admin/index.html
  redirect('/admin/index.html');
}

export function generateStaticParams() {
  return [{ slug: [] }];
}
