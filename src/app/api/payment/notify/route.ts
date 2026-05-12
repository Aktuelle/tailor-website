import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/payment/notify
 * CinetPay IPN (Instant Payment Notification) endpoint.
 * Called server-to-server by CinetPay after payment completion.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { cpm_trans_id, cpm_site_id, cpm_amount, cpm_currency, cpm_payid, cpm_payment_date, cpm_result } = body;

    // Log notification (replace with your DB/email notification)
    console.log('CinetPay IPN received:', {
      transactionId:   cpm_trans_id,
      siteId:          cpm_site_id,
      amount:          cpm_amount,
      currency:        cpm_currency,
      paymentId:       cpm_payid,
      paymentDate:     cpm_payment_date,
      result:          cpm_result,  // '00' = success
    });

    // TODO: Verify the transaction with CinetPay's check endpoint
    // TODO: Update your order database / send confirmation email

    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    console.error('IPN error:', error);
    return NextResponse.json({ status: 'ERROR' }, { status: 500 });
  }
}
