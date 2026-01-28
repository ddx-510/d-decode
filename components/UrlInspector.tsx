"use client";

import React, { useState } from "react";
import HolographicCard from "./HolographicCard";

const UrlInspector = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleEncode = () => {
        try {
            setOutput(encodeURIComponent(input));
            setError(null);
        } catch (e) {
            setError("Error encoding URL");
        }
    };

    const handleDecode = () => {
        try {
            setOutput(decodeURIComponent(input));
            setError(null);
        } catch (e) {
            setError("Error decoding URL");
        }
    };

    return (
        <HolographicCard title="URL_INSPECTOR">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500 mb-1">
                        <span>INPUT_STREAM</span>
                        <button onClick={() => { setInput(""); setOutput(""); setError(null); }} className="hover:text-red-400 transition-colors">CLEAR</button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter URL to encode/decode..."
                        className="w-full h-48 bg-black/40 border border-white/10 rounded-lg p-4 font-mono text-xs text-neon-cyan/80 focus:outline-none focus:border-neon-cyan/50 resize-none placeholder:text-zinc-700"
                        spellCheck={false}
                    />
                    <div className="flex gap-2 mt-2">
                        <button onClick={handleEncode} className="flex-1 py-2 bg-white/5 border border-white/10 hover:bg-neon-cyan/10 hover:border-neon-cyan/50 hover:text-neon-cyan text-zinc-400 font-mono text-xs tracking-wider rounded transition-all">
                            ENCODE
                        </button>
                        <button onClick={handleDecode} className="flex-1 py-2 bg-white/5 border border-white/10 hover:bg-neon-cyan/10 hover:border-neon-cyan/50 hover:text-neon-cyan text-zinc-400 font-mono text-xs tracking-wider rounded transition-all">
                            DECODE
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500 mb-1">
                        <span>OUTPUT_STREAM</span>
                        {output && (
                            <button onClick={() => navigator.clipboard.writeText(output)} className="hover:text-neon-cyan transition-colors">COPY_RESULT</button>
                        )}
                    </div>
                    <div className="relative h-full min-h-[12rem] bg-black/60 border border-white/10 rounded-lg overflow-hidden">
                        {error ? (
                            <div className="absolute inset-0 flex items-center justify-center text-red-400 font-mono text-xs">{error}</div>
                        ) : (
                            <textarea
                                readOnly
                                value={output}
                                className="w-full h-full bg-transparent p-4 font-mono text-xs text-white focus:outline-none resize-none"
                            />
                        )}
                    </div>
                </div>
            </div>
        </HolographicCard>
    );
};

export default UrlInspector;
