import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * POST /api/revalidate
 * Webhook called by Netlify after a CMS content update.
 * Clears the Next.js ISR cache for affected pages.
 *
 * Protect with a secret token:
 * - Set REVALIDATE_SECRET in Netlify environment variables
 * - Pass as ?secret=<token> in the Netlify build hook URL
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    revalidatePath('/', 'layout');
    revalidatePath('/galerie');
    revalidatePath('/services');
    revalidatePath('/boutique');
    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
