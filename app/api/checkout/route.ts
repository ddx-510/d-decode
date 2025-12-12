import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-11-17.clover', // Use latest stable version or passed from env
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST() {
    if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json(
            { success: false, error: 'Stripe configuration missing' },
            { status: 500 }
        );
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'D-Decode Pro Access',
                            description: 'Remove ads forever',
                        },
                        unit_amount: 100, // $1.00
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${APP_URL}/payment_success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${APP_URL}`,
        });

        return NextResponse.json({ success: true, url: session.url });
    } catch (error) {
        console.error('Stripe error:', error);
        return NextResponse.json(
            { success: false, error: 'Payment session creation failed' },
            { status: 500 }
        );
    }
}
