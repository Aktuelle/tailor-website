import { NextRequest, NextResponse } from 'next/server';

const CINETPAY_URL = 'https://api-checkout.cinetpay.com/v2/payment';

interface PaymentRequest {
  amount:         number;
  product_name:   string;
  customer_name:  string;
  customer_phone: string;
}

interface CinetPayResponse {
  code:    string;
  message: string;
  data?: {
    payment_url:    string;
    payment_token:  string;
  };
}

/**
 * POST /api/payment
 * Initiates a CinetPay hosted payment and returns the redirect URL.
 * API key is kept server-side for security.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as PaymentRequest;
    const { amount, product_name, customer_name, customer_phone } = body;

    // Validate input
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Montant invalide' }, { status: 400 });
    }

    const apiKey  = process.env.CINETPAY_API_KEY;
    const siteId  = process.env.CINETPAY_SITE_ID;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elegance-couture.tg';

    if (!apiKey || !siteId) {
      return NextResponse.json({ error: 'Configuration de paiement manquante' }, { status: 500 });
    }

    // Unique transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const payload = {
      apikey:         apiKey,
      site_id:        siteId,
      transaction_id: transactionId,
      amount:         amount.toString(),
      currency:       'XOF',          // West African CFA franc
      alternative_currency: '',
      description:    product_name || 'Commande – Atelier Élégance',
      customer_id:    customer_phone || 'client',
      customer_name:  customer_name  || 'Client',
      customer_email: '',
      customer_phone_number: customer_phone,
      customer_address: '',
      customer_city:    'Lomé',
      customer_country: 'TG',
      customer_state:   'TG',
      customer_zip_code: '00228',
      notify_url:    `${baseUrl}/api/payment/notify`,
      return_url:    `${baseUrl}/payment-success?transaction_id=${transactionId}`,
      channels:      'ALL',    // Show all available channels (MTN, Moov, etc.)
      metadata:      JSON.stringify({ product: product_name }),
      lang:          'FR',
      invoice_data:  {},
    };

    const response = await fetch(CINETPAY_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`CinetPay API error: ${response.status}`);
    }

    const result = await response.json() as CinetPayResponse;

    if (result.code !== '201' || !result.data?.payment_url) {
      return NextResponse.json(
        { error: result.message || 'Erreur d\'initialisation du paiement' },
        { status: 400 }
      );
    }

    return NextResponse.json({ payment_url: result.data.payment_url });

  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
