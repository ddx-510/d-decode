import React from "react";

interface HexViewerProps {
    data: Uint8Array;
}

const HexViewer: React.FC<HexViewerProps> = ({ data }) => {
    // Pagination state
    const [page, setPage] = React.useState(0);
    const BYTES_PER_PAGE = 1024; // 1KB per page
    const totalPages = Math.ceil(data.length / BYTES_PER_PAGE);

    const viewData = data.slice(page * BYTES_PER_PAGE, (page + 1) * BYTES_PER_PAGE);
    const rows = [];
    const bytesPerRow = 16;

    for (let i = 0; i < viewData.length; i += bytesPerRow) {
        const chunk = viewData.slice(i, i + bytesPerRow);
        rows.push({
            offset: (page * BYTES_PER_PAGE) + i,
            bytes: Array.from(chunk),
            text: Array.from(chunk).map(b => (b >= 32 && b <= 126 ? String.fromCharCode(b) : "."))
        });
    }

    return (
        <div className="flex flex-col h-full">
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mb-2 px-1 border-b border-white/5 pb-2 sticky top-0 bg-black/90 backdrop-blur z-10">
                    <button
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="text-[10px] text-neon-cyan hover:bg-neon-cyan/20 px-2 py-1 rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors font-mono"
                    >
                        &lt; PREV_BLOCK
                    </button>
                    <span className="text-[10px] text-zinc-500 font-mono">
                        BLOCK {page + 1}/{totalPages} <span className="text-zinc-700">|</span> {data.length.toLocaleString()} BYTES
                    </span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                        disabled={page === totalPages - 1}
                        className="text-[10px] text-neon-cyan hover:bg-neon-cyan/20 px-2 py-1 rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors font-mono"
                    >
                        NEXT_BLOCK &gt;
                    </button>
                </div>
            )}

            <div className="font-mono text-[10px] md:text-xs leading-relaxed overflow-x-auto text-zinc-400 select-text flex-1">
                {rows.map((row) => (
                    <div key={row.offset} className="flex hover:bg-white/5 transition-colors">
                        {/* Offset */}
                        <div className="w-16 md:w-24 text-neon-purple/70 select-none border-r border-white/5 mr-3 pr-2 text-right">
                            {row.offset.toString(16).padStart(8, "0").toUpperCase()}
                        </div>

                        {/* Hex Bytes */}
                        <div className="flex-1 flex gap-2 text-neon-cyan/80 min-w-[280px]">
                            <div className="flex gap-1">
                                {row.bytes.slice(0, 8).map((b, idx) => (
                                    <span key={idx} className="w-[1.2em] text-center inline-block">{b.toString(16).padStart(2, "0").toUpperCase()}</span>
                                ))}
                            </div>
                            <div className="flex gap-1 border-l border-white/5 pl-2">
                                {row.bytes.slice(8, 16).map((b, idx) => (
                                    <span key={idx} className="w-[1.2em] text-center inline-block opacity-90">{b.toString(16).padStart(2, "0").toUpperCase()}</span>
                                ))}
                            </div>
                        </div>

                        {/* ASCII Representation */}
                        <div className="w-32 md:w-48 text-zinc-500 border-l border-white/5 pl-3 hidden sm:block whitespace-pre">
                            {row.text.join("")}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HexViewer;
