"use client";

import React, { useState } from "react";
import HolographicCard from "./HolographicCard";

const JwtScanner = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleDecode = () => {
        try {
            const parts = input.split('.');
            if (parts.length !== 3) throw new Error("Invalid JWT format");

            const decodePart = (str: string) => {
                const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(jsonPayload);
            };

            const header = decodePart(parts[0]);
            const payload = decodePart(parts[1]);

            setOutput(JSON.stringify({ header, payload }, null, 2));
            setError(null);
        } catch (e) {
            setError("Invalid JWT or malformed payload");
        }
    };

    return (
        <HolographicCard title="JWT_SCANNER">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500 mb-1">
                        <span>TOKEN_INPUT</span>
                        <button onClick={() => { setInput(""); setOutput(""); setError(null); }} className="hover:text-red-400 transition-colors">CLEAR</button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste JWT token (header.payload.signature)..."
                        className="w-full h-48 bg-black/40 border border-white/10 rounded-lg p-4 font-mono text-xs text-neon-cyan/80 focus:outline-none focus:border-neon-cyan/50 resize-none placeholder:text-zinc-700"
                        spellCheck={false}
                    />
                    <div className="flex gap-2 mt-2">
                        <button onClick={handleDecode} className="flex-1 py-2 bg-neon-purple/10 border border-neon-purple/30 hover:bg-neon-purple/20 text-neon-purple font-mono text-xs tracking-wider rounded transition-all">
                            DECODE_TOKEN
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500 mb-1">
                        <span>DECODED_PAYLOAD</span>
                        {output && (
                            <button onClick={() => navigator.clipboard.writeText(output)} className="hover:text-neon-cyan transition-colors">COPY_JSON</button>
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

export default JwtScanner;
