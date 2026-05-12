/**
 * Cloudinary URL helpers.
 * All transformations are applied via URL segments so no SDK is needed client-side.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';

type TransformOptions = {
  width?:   number;
  height?:  number;
  quality?: 'auto' | number;
  format?:  'auto' | 'webp' | 'jpg' | 'png';
  crop?:    'fill' | 'fit' | 'thumb' | 'scale';
  gravity?: 'auto' | 'face' | 'center';
};

/**
 * Build a Cloudinary URL with transformations.
 * If the image is already a full Cloudinary URL, inject transforms.
 * If it's a public_id, build the full URL.
 */
export function cloudinaryUrl(imageOrId: string, opts: TransformOptions = {}): string {
  const {
    width,
    height,
    quality = 'auto',
    format  = 'auto',
    crop    = 'fill',
    gravity = 'auto',
  } = opts;

  // Build transformation string
  const transforms: string[] = [];
  if (width)   transforms.push(`w_${width}`);
  if (height)  transforms.push(`h_${height}`);
  if (crop)    transforms.push(`c_${crop}`);
  if (gravity) transforms.push(`g_${gravity}`);
  transforms.push(`q_${quality}`, `f_${format}`);
  const t = transforms.join(',');

  // If it's already a Cloudinary URL, inject transforms after /upload/
  if (imageOrId.includes('res.cloudinary.com')) {
    return imageOrId.replace('/upload/', `/upload/${t}/`);
  }

  // Otherwise treat as a public_id
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${t}/${imageOrId}`;
}

/** Preset: gallery thumbnail 400×400 */
export const galleryThumb = (src: string) =>
  cloudinaryUrl(src, { width: 400, height: 400, crop: 'fill', gravity: 'auto' });

/** Preset: hero full-width, large */
export const heroImage = (src: string) =>
  cloudinaryUrl(src, { width: 1200, quality: 'auto', format: 'auto', crop: 'scale' });

/** Preset: product card 300×350 */
export const productThumb = (src: string) =>
  cloudinaryUrl(src, { width: 300, height: 350, crop: 'fill', gravity: 'auto' });

/** Preset: avatar 80×80 */
export const avatarThumb = (src: string) =>
  cloudinaryUrl(src, { width: 80, height: 80, crop: 'fill', gravity: 'face' });
