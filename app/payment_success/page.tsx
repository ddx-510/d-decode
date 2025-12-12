'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [code, setCode] = useState<string | null>(null);

    useEffect(() => {
        if (!sessionId) {
            setStatus('error');
            return;
        }

        const verify = async () => {
            try {
                const res = await fetch(`/api/verify-payment?session_id=${sessionId}`);
                const data = await res.json();

                if (data.success && data.code) {
                    // Auto-redeem/save locally
                    localStorage.setItem('dd_pro_code', data.code);
                    setCode(data.code);
                    setStatus('success');

                    // Force refresh/redirect after a moment to update layout
                    // setTimeout(() => router.push('/'), 3000); 
                } else {
                    setStatus('error');
                }
            } catch (err) {
                console.error(err);
                setStatus('error');
            }
        };

        verify();
    }, [sessionId, router]);

    return (
        <div className="min-h-screen bg-deep-space flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#0a0f16] border border-neon-cyan/20 p-8 rounded-xl text-center space-y-6 shadow-[0_0_50px_rgba(0,188,212,0.15)]">
                {status === 'verifying' && (
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin mb-4" />
                        <h2 className="text-xl font-bold text-white">Verifying Payment...</h2>
                        <p className="text-zinc-400 text-sm">Please wait while we confirm your transaction.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-400">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
                        <p className="text-zinc-400 text-sm mb-6">
                            Thank you for your support. Ads have been removed.
                        </p>

                        <div className="w-full bg-black border border-zinc-800 p-4 rounded-lg mb-6">
                            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Your Recovery Code</p>
                            <p className="text-neon-cyan font-mono font-bold select-all">{code}</p>
                        </div>

                        <Link
                            href="/"
                            className="w-full py-3 bg-neon-cyan text-black font-bold rounded-lg hover:bg-neon-cyan/90 transition-all flex items-center justify-center"
                        >
                            RETURN TO APP
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-400">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Verification Failed</h2>
                        <p className="text-zinc-400 text-sm mb-6">
                            We couldn't verify your payment. If you were charged, please contact support with your session ID.
                        </p>
                        <Link
                            href="/"
                            className="w-full py-3 bg-zinc-800 text-white font-bold rounded-lg hover:bg-zinc-700 transition-all"
                        >
                            RETURN HOME
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
