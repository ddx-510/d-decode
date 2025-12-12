'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdBanner from "./AdBanner";
import DonationModal from "./DonationModal";
import { useProStatus } from "../hooks/useProStatus";

interface SciTechLayoutProps {
    children: React.ReactNode;
}

const SciTechLayout: React.FC<SciTechLayoutProps> = ({ children }) => {
    const { isPro, isLoading, verifyCode } = useProStatus();
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-deep-space">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-neon-cyan/5 blur-[120px] pointer-events-none" />

            {/* Side Status Rail (Visual Only) */}
            <div className="fixed left-0 top-0 h-full w-[2px] bg-glass-border hidden lg:block">
                <div className="absolute top-1/4 left-0 w-[2px] h-32 bg-neon-cyan/50 blur-[2px]" />
                <div className="absolute bottom-1/4 left-0 w-[2px] h-16 bg-neon-purple/50 blur-[2px]" />
            </div>

            {/* Header */}
            <header className="border-b border-glass-border bg-glass-bg backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="relative w-8 h-8 flex items-center justify-center bg-neon-cyan/20 border border-neon-cyan/50 rounded-lg shadow-[0_0_10px_rgba(0,188,212,0.5)] group-hover:shadow-[0_0_15px_rgba(0,188,212,0.8)] transition-all">
                                <span className="font-mono font-bold text-neon-cyan text-lg leading-none">D</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-mono font-bold tracking-widest text-white leading-none group-hover:text-neon-cyan transition-colors">
                                    D-DECODE
                                </h1>
                                <span className="text-[10px] text-neon-cyan font-mono tracking-[0.3em] opacity-70">ADVANCED UTILITY</span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden sm:flex items-center gap-4 text-xs font-mono">
                        {!isPro && !isLoading && (
                            <button
                                onClick={() => setIsDonationModalOpen(true)}
                                className="px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 rounded hover:bg-yellow-500/20 transition-colors animate-pulse hover:animate-none"
                            >
                                REMOVE ADS
                            </button>
                        )}
                        {isPro && (
                            <div className="flex items-center gap-2 text-neon-cyan border border-neon-cyan/30 px-2 py-1 rounded bg-neon-cyan/5">
                                <span className="text-[10px]">★ PRO ACCESS</span>
                            </div>
                        )}


                        <div className="flex items-center gap-2 text-zinc-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                            SYS_ONLINE
                        </div>
                        <div className="px-2 py-1 bg-white/5 rounded border border-white/5 text-zinc-400">
                            V 2.0.0
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 relative z-10">
                {!isPro && !isLoading && (
                    <div className="mb-8">
                        <AdBanner />
                    </div>
                )}
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-glass-border py-8">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex justify-center gap-6 mb-4 text-[10px] font-mono tracking-widest uppercase text-zinc-500">
                        <a href="/privacy" className="hover:text-neon-cyan transition-colors">Privacy Policy</a>
                        <span className="text-zinc-700">|</span>
                        <a href="/terms" className="hover:text-neon-cyan transition-colors">Terms of Service</a>
                    </div>
                    <p className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase mb-2">
                        Secured End-to-End Encryption / Local Processing Only
                    </p>
                    <p className="text-xs text-zinc-500 font-mono">
                        &copy; 2025 D-DECODE SYSTEMS
                    </p>
                </div>
            </footer>

            <DonationModal
                isOpen={isDonationModalOpen}
                onClose={() => setIsDonationModalOpen(false)}
                onRedeem={verifyCode}
            />
        </div>
    );
};

export default SciTechLayout;
