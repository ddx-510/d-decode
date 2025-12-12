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

                        <a
                            href="https://github.com/ddx-510/d-decode"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all group"
                            title="View on GitHub"
                        >
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </a>
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
