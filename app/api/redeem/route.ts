import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SECRET_KEY = process.env.DONATION_SECRET_KEY || 'default-insecure-secret-for-demo-only';

export async function POST(request: Request) {
    try {
        const { code } = await request.json();

        if (!code || typeof code !== 'string') {
            return NextResponse.json({ success: false, error: 'Invalid code format' }, { status: 400 });
        }

        // Format: DD-PRO-[RANDOM]-[SIGNATURE]
        // Example: DD-PRO-1A2B3C4D-9Z8Y7X6W
        const parts = code.split('-');

        if (parts.length !== 4 || parts[0] !== 'DD' || parts[1] !== 'PRO') {
            return NextResponse.json({ success: false, error: 'Invalid code format' }, { status: 400 });
        }

        const randomId = parts[2];
        const providedSignature = parts[3];

        // Verify signature
        const expectedSignature = crypto
            .createHmac('sha256', SECRET_KEY)
            .update(randomId)
            .digest('hex')
            .substring(0, 8)
            .toUpperCase();

        if (providedSignature === expectedSignature) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Invalid code signature' }, { status: 400 });
        }
    } catch (error) {
        console.error('Redemption error:', error);
        return NextResponse.json(
            { success: false, error: 'Verification failed' },
            { status: 500 }
        );
    }
}
