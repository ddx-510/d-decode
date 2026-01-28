"use client";

import React, { useState } from "react";
import HolographicCard from "./HolographicCard";

const HtmlEntityConverter = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleEncode = () => {
        const text = document.createElement("textarea");
        text.innerText = input;
        setOutput(text.innerHTML);
        setError(null);
    };

    const handleDecode = () => {
        const text = document.createElement("textarea");
        text.innerHTML = input;
        text.value = text.value; // Decode HTML entities
        setOutput(text.value);
        setError(null);
    };

    return (
        <HolographicCard title="HTML_ENTITIES">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500 mb-1">
                        <span>INPUT_TEXT</span>
                        <button onClick={() => { setInput(""); setOutput(""); setError(null); }} className="hover:text-red-400 transition-colors">CLEAR</button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter HTML or text..."
                        className="w-full h-48 bg-black/40 border border-white/10 rounded-lg p-4 font-mono text-xs text-neon-cyan/80 focus:outline-none focus:border-neon-cyan/50 resize-none placeholder:text-zinc-700"
                        spellCheck={false}
                    />
                    <div className="flex gap-2 mt-2">
                        <button onClick={handleEncode} className="flex-1 py-2 bg-white/5 border border-white/10 hover:bg-neon-cyan/10 hover:border-neon-cyan/50 hover:text-neon-cyan text-zinc-400 font-mono text-xs tracking-wider rounded transition-all">
                            ESCAPE
                        </button>
                        <button onClick={handleDecode} className="flex-1 py-2 bg-white/5 border border-white/10 hover:bg-neon-cyan/10 hover:border-neon-cyan/50 hover:text-neon-cyan text-zinc-400 font-mono text-xs tracking-wider rounded transition-all">
                            UNESCAPE
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500 mb-1">
                        <span>RESULT</span>
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

export default HtmlEntityConverter;
