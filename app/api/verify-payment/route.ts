import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-12-18.acacia',
} as any);

// Reuse the same secret for signature generation
const SECRET_KEY = process.env.DONATION_SECRET_KEY || 'default-insecure-secret-for-demo-only';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
        return NextResponse.json({ success: false, error: 'Session ID required' }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
        // Fallback for demo/dev without stripe keys if needed, but for "Real Donation" we expect keys.
        // For safety, error out.
        return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            // Generate the code
            // We can use the Payment Intent ID or Session ID as part of the entropy
            const entropy = session.payment_intent as string || session.id.slice(-8);
            const randomId = crypto.createHash('sha256').update(entropy).digest('hex').substring(0, 8).toUpperCase();

            // Sign it
            const signature = crypto
                .createHmac('sha256', SECRET_KEY)
                .update(randomId)
                .digest('hex')
                .substring(0, 8)
                .toUpperCase();

            const code = `DD-PRO-${randomId}-${signature}`;

            return NextResponse.json({ success: true, code });
        } else {
            return NextResponse.json({ success: false, error: 'Payment not completed' }, { status: 400 });
        }
    } catch (error) {
        console.error('Verification error:', error);
        return NextResponse.json(
            { success: false, error: 'Verification failed' },
            { status: 500 }
        );
    }
}
