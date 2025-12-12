'use client';

import React, { useState } from 'react';

interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRedeem: (code: string) => Promise<boolean>;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, onRedeem }) => {
    const [activeTab, setActiveTab] = useState<'donate' | 'redeem'>('donate');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);
    const [redeemInput, setRedeemInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleDonate = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/checkout', { method: 'POST' });
            const data = await res.json();
            if (data.success && data.url) {
                window.location.href = data.url;
            } else {
                setError('Failed to initiate checkout. Please check configuration.');
            }
        } catch (err) {
            setError('Network error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRedeem = async () => {
        setIsLoading(true);
        setError(null);
        setSuccessMsg(null);

        if (!redeemInput.trim()) {
            setError('Please enter a code.');
            setIsLoading(false);
            return;
        }

        const success = await onRedeem(redeemInput.trim());
        if (success) {
            setSuccessMsg('Code redeemed successfully! Ads removed.');
            setTimeout(() => {
                onClose();
                setSuccessMsg(null);
                setRedeemInput('');
                setGeneratedCode(null);
            }, 2000);
        } else {
            setError('Invalid or expired code.');
        }
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#0a0f16] border border-neon-cyan/20 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,188,212,0.1)]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                    <h2 className="text-lg font-mono font-bold text-white tracking-widest">
                        ACCESS <span className="text-neon-cyan">PRO</span>
                    </h2>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/5">
                    <button
                        onClick={() => setActiveTab('donate')}
                        className={`flex-1 py-3 text-sm font-mono transition-colors ${activeTab === 'donate' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                    >
                        DONATE $1
                    </button>
                    <button
                        onClick={() => setActiveTab('redeem')}
                        className={`flex-1 py-3 text-sm font-mono transition-colors ${activeTab === 'redeem' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                    >
                        REDEEM CODE
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 min-h-[300px] flex flex-col">
                    {activeTab === 'donate' ? (
                        <div className="space-y-6 flex-1 flex flex-col justify-center">
                            {!generatedCode ? (
                                <>
                                    <div className="text-center space-y-2">
                                        <div className="w-16 h-16 mx-auto bg-neon-cyan/10 rounded-full flex items-center justify-center mb-4">
                                            <svg className="w-8 h-8 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-white font-bold">Support Development</h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed">
                                            Get a lifetime code to remove ads. <br />
                                            <span className="text-xs text-zinc-500">(Mock payment for demo)</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleDonate}
                                        disabled={isLoading}
                                        className="w-full py-3 bg-neon-cyan text-black font-bold rounded-lg hover:bg-neon-cyan/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        ) : (
                                            'PAY $1.00'
                                        )}
                                    </button>
                                </>
                            ) : (
                                <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                                        <p className="text-green-400 font-mono text-xs uppercase mb-1">Payment Successful</p>
                                        <p className="text-white font-bold text-lg">Here is your code:</p>
                                    </div>
                                    <div className="relative">
                                        <input
                                            readOnly
                                            value={generatedCode}
                                            className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-center font-mono text-neon-cyan text-sm focus:outline-none"
                                        />
                                        <button
                                            onClick={() => navigator.clipboard.writeText(generatedCode)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-2 py-1 rounded transition-colors"
                                        >
                                            COPY
                                        </button>
                                    </div>
                                    <p className="text-xs text-zinc-500 text-center">
                                        Copy this code and switch to the "Redeem" tab to activate it. Keep it safe!
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6 flex-1 flex flex-col justify-center">
                            <div className="text-center space-y-2">
                                <h3 className="text-white font-bold">Enter Redemption Code</h3>
                                <p className="text-zinc-400 text-sm">
                                    Paste your code below to unlock Pro status.
                                </p>
                            </div>
                            <input
                                value={redeemInput}
                                onChange={(e) => setRedeemInput(e.target.value)}
                                placeholder="DD-PRO-XXXXXXXX-XXXXXXXX"
                                className="w-full bg-black/50 border border-zinc-700 focus:border-neon-cyan rounded-lg p-3 text-white font-mono text-sm placeholder:text-zinc-700 focus:outline-none transition-colors"
                            />
                            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                            {successMsg && <p className="text-green-400 text-xs text-center">{successMsg}</p>}
                            <button
                                onClick={handleRedeem}
                                disabled={isLoading}
                                className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    'REDEEM'
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DonationModal;
