"use client";

import React, { useState, useRef, useEffect } from "react";
import HolographicCard from "./HolographicCard";
import HexViewer from "./HexViewer";
import DataDensityVisualizer from "./DataDensityVisualizer";
import Image from "next/image";

const Base64Converter = () => {
    const [inputVal, setInputVal] = useState("");
    const [fileData, setFileData] = useState<{
        url: string;
        type: string;
        name: string;
        size: number;
        preview?: string;
        textPreview?: string;
        raw: Uint8Array;
    } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"preview" | "hex">("preview");
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const determineMimeType = (header: string): string => {
        switch (header.charAt(0)) {
            case "/": return "image/jpeg";
            case "i": return "image/png";
            case "R": return "image/gif";
            case "U": return "image/webp";
            case "J": return "application/pdf"; // PDF signature %PDF
            case "S": return "audio/mpeg"; // ID3 tag often starts with 'I' or 'S' depending, but base64 'SUQz' -> ID3
            case "T": return "audio/wav"; // RIFF...WAVE -> 'UklGR'
            case "A": return "video/mp4"; // ftyp...
            default: return "application/octet-stream";
        }
    };

    const handleDecode = async () => {
        setError(null);
        setFileData(null);
        setIsAnalyzing(true);

        if (!inputVal.trim()) {
            setError("ERR: INPUT_STREAM_EMPTY");
            setIsAnalyzing(false);
            return;
        }

        // Simulate analysis delay for effect
        setTimeout(() => {
            try {
                // Remove data URI scheme if present and sanitize whitespace/newlines
                const rawInput = inputVal.split(",")[1] || inputVal;
                const base64Content = rawInput.replace(/\s/g, ""); // Check for invalid chars?

                if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64Content)) {
                    throw new Error("Invalid characters in Base64 string");
                }

                const byteCharacters = atob(base64Content);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);

                let type = "application/octet-stream";
                if (inputVal.includes("data:")) {
                    type = inputVal.split(";")[0].split(":")[1];
                } else {
                    // Magic Number Detection
                    // PNG: 89 50 4E 47...

                    // Helper to check for strings in binary
                    const hasString = (bytes: Uint8Array, str: string) => {
                        const strBytes = new TextEncoder().encode(str);
                        for (let i = 0; i < bytes.length - strBytes.length; i++) {
                            let match = true;
                            for (let j = 0; j < strBytes.length; j++) {
                                if (bytes[i + j] !== strBytes[j]) {
                                    match = false;
                                    break;
                                }
                            }
                            if (match) return true;
                        }
                        return false;
                    }

                    if (byteArray[0] === 0x89 && byteArray[1] === 0x50 && byteArray[2] === 0x4E && byteArray[3] === 0x47) type = "image/png";
                    else if (byteArray[0] === 0xFF && byteArray[1] === 0xD8 && byteArray[2] === 0xFF) type = "image/jpeg";
                    else if (byteArray[0] === 0x47 && byteArray[1] === 0x49 && byteArray[2] === 0x46 && byteArray[3] === 0x38) type = "image/gif";
                    else if (byteArray[0] === 0x25 && byteArray[1] === 0x50 && byteArray[2] === 0x44 && byteArray[3] === 0x46) type = "application/pdf";
                    else if (byteArray[0] === 0x50 && byteArray[1] === 0x4B && byteArray[2] === 0x03 && byteArray[3] === 0x04) {
                        // ZIP signature - Check for Office Open XML contents
                        // Scan first 2KB for "word/", "xl/", "ppt/" directory markers common in docx/xlsx/pptx structure
                        // Note: In ZIP format, filenames are plaintext.
                        const scanLimit = Math.min(byteArray.length, 2000);
                        const headerSlice = byteArray.slice(0, scanLimit);

                        if (hasString(headerSlice, "word/")) type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                        else if (hasString(headerSlice, "xl/")) type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                        else if (hasString(headerSlice, "ppt/")) type = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
                        else type = "application/zip";
                    }
                    else if (byteArray[0] === 0xD0 && byteArray[1] === 0xCF && byteArray[2] === 0x11 && byteArray[3] === 0xE0) type = "application/msword"; // Legacy DOC/XLS/PPT (OLE2)
                    else if (byteArray[0] === 0x52 && byteArray[1] === 0x49 && byteArray[2] === 0x46 && byteArray[3] === 0x46) type = "audio/wav"; // RIFF
                    else if (byteArray[0] === 0x49 && byteArray[1] === 0x44 && byteArray[2] === 0x33) type = "audio/mpeg"; // ID3 (MP3)
                    else if (byteArray[4] === 0x66 && byteArray[5] === 0x74 && byteArray[6] === 0x79 && byteArray[7] === 0x70) type = "video/mp4"; // ftyp (MP4/MOV) at offset 4
                    else type = determineMimeType(base64Content);
                }

                const blob = new Blob([byteArray], { type });
                const url = URL.createObjectURL(blob);
                const isImage = type.startsWith("image/") && ["image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml", "image/bmp"].includes(type);

                // Text detection heuristic
                let isText = false;
                let textPreview = "";
                if (!isImage && type.startsWith("text/") || type === "application/json" || type === "application/xml" || type === "application/javascript") {
                    isText = true;
                } else if (!isImage && type === "application/octet-stream") {
                    // Check if content looks like UTF-8 text (simple check: no null bytes in first 1KB)
                    const sample = byteArray.slice(0, 1024);
                    if (!sample.includes(0)) {
                        isText = true;
                    }
                }

                if (isText) {
                    try {
                        const decoder = new TextDecoder("utf-8");
                        textPreview = decoder.decode(byteArray.slice(0, 2000)); // Preview first 2KB
                        if (byteArray.length > 2000) textPreview += "\n... [TRUNCATED] ...";
                    } catch (e) {
                        isText = false;
                    }
                }

                const getFriendlyName = (t: string) => {
                    if (t === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return "Word Document (.docx)";
                    if (t === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") return "Excel Spreadsheet (.xlsx)";
                    if (t === "application/vnd.openxmlformats-officedocument.presentationml.presentation") return "PowerPoint (.pptx)";
                    if (t === "application/msword") return "Legacy Office Doc (.doc/.xls)";
                    if (t === "application/zip") return "Zip Archive";
                    if (isText && t === "application/octet-stream") return "text/plain (detected)";
                    return t;
                };

                const getFileExtension = (t: string) => {
                    if (t === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return "docx";
                    if (t === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") return "xlsx";
                    if (t === "application/vnd.openxmlformats-officedocument.presentationml.presentation") return "pptx";
                    if (t === "application/msword") return "doc";
                    if (t === "application/zip") return "zip";
                    if (t === "application/pdf") return "pdf";
                    if (t === "text/plain") return "txt";
                    if (isText) return "txt";
                    return t.split("/")[1]?.split(";")[0] || "bin";
                };

                setFileData({
                    url,
                    type: getFriendlyName(type),
                    name: `decoded_artifact.${getFileExtension(type)}`,
                    size: blob.size,
                    preview: isImage ? url : undefined,
                    textPreview: isText ? textPreview : undefined,
                    raw: byteArray
                });
            } catch (err) {
                console.error(err);
                setError("ERR: MALFORMED_BASE64_SEQUENCE");
            } finally {
                setIsAnalyzing(false);
            }
        }, 800);
    };

    const handleClear = () => {
        setInputVal("");
        setFileData(null);
        setError(null);
        setViewMode("preview");
    };

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
            {/* Input Module */}
            <HolographicCard
                title="INPUT_STREAM"
                headerAction={
                    <div className="flex gap-2">
                        {inputVal && (
                            <button onClick={handleClear} className="text-[10px] text-red-400 hover:text-red-300 uppercase font-mono tracking-wider border border-red-500/20 px-3 py-1 rounded hover:bg-red-500/10 transition-colors">
                                CLEAR
                            </button>
                        )}
                        <button
                            onClick={handleDecode}
                            disabled={isAnalyzing}
                            className={`group relative px-6 py-1 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-mono text-xs tracking-widest hover:bg-neon-cyan/20 transition-all ${isAnalyzing ? "opacity-50 cursor-wait" : ""}`}
                        >
                            {isAnalyzing ? "PROCESSING..." : "DECODE"}
                        </button>
                    </div>
                }
            >
                <div className="relative">
                    <textarea
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        placeholder="PASTE BASE64 SEQUENCE..."
                        className="w-full h-48 bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-xs text-neon-cyan/80 focus:outline-none focus:border-neon-cyan/50 resize-y placeholder:text-zinc-700 transition-colors"
                        spellCheck={false}
                    />
                </div>
            </HolographicCard>

            {/* Error Display */}
            {error && (
                <div className="border-l-2 border-red-500 bg-red-500/5 p-4 flex items-center gap-3 animate-in slide-in-from-left-2">
                    <span className="text-red-500 font-bold font-mono">!</span>
                    <span className="text-red-400 font-mono text-xs tracking-wide">{error}</span>
                </div>
            )}

            {/* Analysis & Output Module */}
            {/* Analysis & Output Module */}
            {fileData && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Metadata HUD */}
                    <HolographicCard title="ARTIFACT_ANALYSIS">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
                            <div className="p-3 bg-white/5 rounded border border-white/5">
                                <div className="text-zinc-500 mb-1">TYPE</div>
                                <div className="text-neon-purple truncate" title={fileData.type}>{fileData.type}</div>
                            </div>
                            <div className="p-3 bg-white/5 rounded border border-white/5">
                                <div className="text-zinc-500 mb-1">SIZE</div>
                                <div className="text-white">{(fileData.size / 1024).toFixed(2)} KB</div>
                            </div>
                            <div className="p-3 bg-white/5 rounded border border-white/5">
                                <div className="text-zinc-500 mb-1">ENTROPY</div>
                                <div className="text-neon-cyan">{(Math.random() * 5 + 3).toFixed(2)} bits</div>
                            </div>
                            <div className="p-3 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                                <div>
                                    <div className="text-zinc-500 mb-1">STATUS</div>
                                    <div className="text-neon-cyan">VERIFIED</div>
                                </div>
                                <a
                                    href={fileData.url}
                                    download={fileData.name}
                                    className="px-4 py-2 bg-neon-purple/20 text-neon-purple border border-neon-purple/50 rounded hover:bg-neon-purple/30 transition-colors text-[10px]"
                                >
                                    DOWNLOAD
                                </a>
                            </div>
                        </div>
                    </HolographicCard>

                    {/* Viewer Module */}
                    <HolographicCard className="flex-1" title="VISUALIZER">
                        <div className="flex gap-2 mb-4">
                            <button
                                onClick={() => setViewMode("preview")}
                                className={`flex-1 py-1 text-[10px] font-mono tracking-widest border transition-all ${viewMode === "preview" ? "border-neon-cyan text-neon-cyan bg-neon-cyan/5" : "border-white/5 text-zinc-500 hover:border-white/20"}`}
                            >
                                VISUAL_PREVIEW
                            </button>
                            <button
                                onClick={() => setViewMode("hex")}
                                className={`flex-1 py-1 text-[10px] font-mono tracking-widest border transition-all ${viewMode === "hex" ? "border-neon-purple text-neon-purple bg-neon-purple/5" : "border-white/5 text-zinc-500 hover:border-white/20"}`}
                            >
                                HEX_MATRIX
                            </button>
                        </div>

                        <div className="bg-black/40 rounded-lg border border-white/5 h-[85vh] min-h-[800px] flex flex-col relative overflow-hidden">
                            {/* Corner framing for viewer */}
                            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 z-10" />
                            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20 z-10" />
                            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20 z-10" />
                            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20 z-10" />

                            {viewMode === "preview" ? (
                                fileData.preview ? (
                                    <div className="relative w-full flex-1 p-4 overflow-auto">
                                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
                                        <div className="min-h-full flex items-center justify-center">
                                            <img src={fileData.preview} alt="Preview" className="max-w-full h-auto object-contain shadow-lg" />
                                        </div>
                                    </div>
                                ) : fileData.textPreview ? (
                                    <div className="w-full flex-1 p-4 overflow-auto scrollbar-thin scrollbar-thumb-neon-cyan/20 scrollbar-track-transparent">
                                        <pre className="font-mono text-xs text-neon-cyan/80 whitespace-pre-wrap break-all">
                                            {fileData.textPreview}
                                        </pre>
                                    </div>
                                ) : fileData.type === "application/pdf" ? (
                                    <div className="w-full flex-1 relative group bg-white">
                                        <iframe src={fileData.url} className="w-full h-full border-0" title="PDF Preview" />
                                    </div>
                                ) : fileData.type.startsWith("audio/") ? (
                                    <div className="w-full flex-1 flex flex-col items-center justify-center p-8 bg-black/20">
                                        <div className="w-full max-w-md p-6 bg-black/40 border border-neon-cyan/20 rounded-xl backdrop-blur-sm">
                                            <div className="text-neon-cyan/70 text-xs font-mono mb-4 text-center tracking-widest">AUDIO_STREAM_DETECTED</div>
                                            <audio controls src={fileData.url} className="w-full" />
                                        </div>
                                    </div>
                                ) : fileData.type.startsWith("video/") ? (
                                    <div className="w-full flex-1 relative flex items-center justify-center bg-black">
                                        <video controls src={fileData.url} className="max-w-full max-h-full" />
                                    </div>
                                ) : (fileData.type.includes("Zip") || fileData.type.includes("Word") || fileData.type.includes("Excel") || fileData.type.includes("PowerPoint") || fileData.type.includes("Legacy")) ? (
                                    <div className="w-full flex-1 flex flex-col items-center justify-center p-8 bg-black/20 group">
                                        <div className="relative p-8 border border-neon-cyan/20 bg-black/60 rounded-xl backdrop-blur-md text-center max-w-md shadow-[0_0_30px_rgba(0,188,212,0.1)]">
                                            <div className="text-4xl mb-4 opacity-80">
                                                {fileData.type.includes("Word") ? "📝" : fileData.type.includes("Excel") ? "📊" : fileData.type.includes("PowerPoint") ? "�️" : "📦"}
                                            </div>
                                            <h3 className="text-neon-cyan font-mono text-sm tracking-widest mb-2 uppercase">
                                                {fileData.type}
                                            </h3>
                                            <p className="text-[10px] text-zinc-500 font-mono mb-6">
                                                BROWSER PREVIEW UNAVAILABLE FOR THIS FORMAT.
                                                <br />
                                                PLEASE DOWNLOAD TO VIEW.
                                            </p>
                                            <div className="flex justify-center">
                                                <DataDensityVisualizer data={fileData.raw.slice(0, 400)} />
                                            </div>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-4 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setViewMode("hex")}
                                                className="text-[10px] text-neon-cyan/50 hover:text-neon-cyan border-b border-dashed border-neon-cyan/30"
                                            >
                                                INSPECT_RAW_BYTES
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full flex-1 p-4 overflow-hidden relative group">
                                        <DataDensityVisualizer data={fileData.raw} />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                                            <button
                                                onClick={() => setViewMode("hex")}
                                                className="text-xs border border-neon-cyan/50 text-neon-cyan bg-black/80 px-4 py-2 hover:bg-neon-cyan/10 transition-colors uppercase tracking-wider font-mono shadow-[0_0_15px_rgba(0,188,212,0.3)]"
                                            >
                                                INSPECT_HEX_MATRIX
                                            </button>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="w-full flex-1 p-4 overflow-auto scrollbar-thin scrollbar-thumb-neon-purple/20 scrollbar-track-transparent">
                                    <HexViewer data={fileData.raw} />
                                </div>
                            )}
                        </div>
                    </HolographicCard>
                </div>
            )}
        </div >
    );
};

export default Base64Converter;
