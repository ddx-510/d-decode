import React from "react";

interface HolographicCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    headerAction?: React.ReactNode; // Slot for buttons/actions in header
}

const HolographicCard: React.FC<HolographicCardProps> = ({ children, className = "", title, headerAction }) => {
    return (
        <div className={`relative group ${className}`}>
            {/* Holographic Border Gradient */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-neon-cyan/20 rounded-xl blur-[2px] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Main Container */}
            <div className="relative h-full bg-deep-space/90 backdrop-blur-xl border border-glass-border rounded-xl overflow-hidden">
                {/* Scanline Effect Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,20,28,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]" />

                {/* Content */}
                <div className="relative z-10 p-6">
                    {title && (
                        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                            <h3 className="text-neon-cyan font-mono text-xs uppercase tracking-[0.2em]">{title}</h3>
                            <div className="flex items-center gap-4">
                                {headerAction}
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 bg-neon-cyan rounded-full animate-pulse" />
                                    <div className="w-1 h-1 bg-neon-cyan/50 rounded-full" />
                                    <div className="w-1 h-1 bg-neon-cyan/20 rounded-full" />
                                </div>
                            </div>
                        </div>
                    )}
                    {children}
                </div>

                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-neon-cyan/50 rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-neon-cyan/50 rounded-br-xl" />
            </div>
        </div>
    );
};

export default HolographicCard;
