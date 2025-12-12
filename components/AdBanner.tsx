'use client';

import React from 'react';
import GoogleAdUnit from './GoogleAdUnit';

interface AdBannerProps {
    className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '' }) => {
    return (
        <div className={`w-full min-h-[100px] border border-yellow-500/30 bg-yellow-500/5 rounded-lg relative overflow-hidden group ${className}`}>
            {/* Google Ad Unit */}
            <div className="absolute inset-0 z-20 flex justify-center bg-black">
                <GoogleAdUnit slotId="YOUR-AD-SLOT-ID-HERE" className="w-full h-full" />
            </div>

            {/* Fallback / Placeholder (Visible if ad fails to load or while loading) */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(234,179,8,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
                <span className="text-[10px] font-mono tracking-[0.2em] text-yellow-500/70 border border-yellow-500/30 px-2 py-0.5 rounded mb-2 uppercase">
                    Advertisement
                </span>
                <h3 className="text-sm md:text-base font-bold text-yellow-100 mb-1">
                    Unlock Premium Features
                </h3>
                <p className="text-xs text-yellow-200/70 max-w-md mx-auto">
                    Support development by disabling your ad blocker or donating.
                </p>
            </div>
        </div>
    );
};

export default AdBanner;
