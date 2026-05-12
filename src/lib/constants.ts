/** Portfolio categories with labels and emoji */
export const PORTFOLIO_CATEGORIES = [
  { value: 'all',          label: 'Tout',          emoji: '✨' },
  { value: 'mariage',      label: 'Mariage',        emoji: '💍' },
  { value: 'casual',       label: 'Casual',         emoji: '👕' },
  { value: 'homme',        label: 'Homme',          emoji: '👔' },
  { value: 'femme',        label: 'Femme',          emoji: '👗' },
  { value: 'enfant',       label: 'Enfant',         emoji: '🧒' },
  { value: 'traditionnel', label: 'Traditionnel',   emoji: '🌍' },
] as const;

export type PortfolioCategory = typeof PORTFOLIO_CATEGORIES[number]['value'];

/** CinetPay payment endpoint */
export const CINETPAY_CHECKOUT_URL = 'https://api-checkout.cinetpay.com/v2/payment';

/** Site name fallback */
export const SITE_NAME = 'Klin Clothing';
