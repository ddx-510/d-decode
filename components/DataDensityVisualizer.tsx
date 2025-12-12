import React, { useEffect, useRef } from "react";

interface DataDensityVisualizerProps {
    data: Uint8Array;
}

const DataDensityVisualizer: React.FC<DataDensityVisualizerProps> = ({ data }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Calculate optimal dimensions based on data size (aim for roughly square or 16:9)
        const totalPixels = data.length;
        const width = Math.ceil(Math.sqrt(totalPixels * (16 / 9)));
        const height = Math.ceil(totalPixels / width);

        canvas.width = width;
        canvas.height = height;

        const imageData = ctx.createImageData(width, height);
        const buf = imageData.data;

        for (let i = 0; i < totalPixels; i++) {
            const byte = data[i];
            const offset = i * 4;

            // Sci-Tech Color Mapping
            // Map 0-255 to shades of Cyan/Purple/Dark Blue
            // Low values -> Dark Blue/Black
            // Mid values -> Purple
            // High values -> Bright Cyan

            if (byte === 0) {
                // Null bytes - Transparent/Black
                buf[offset] = 0;     // R
                buf[offset + 1] = 0; // G
                buf[offset + 2] = 0; // B
                buf[offset + 3] = 255; // Alpha
            } else if (byte < 128) {
                // Lower range - Deep Purple/Blue
                // byte 1 -> 127 maps to blue intensity
                const intensity = Math.floor((byte / 127) * 200) + 55;
                buf[offset] = 20;     // R
                buf[offset + 1] = 0;   // G
                buf[offset + 2] = intensity; // B
                buf[offset + 3] = 255;
            } else {
                // Upper range - Cyan/White
                // byte 128 -> 255 maps to cyan intensity
                const intensity = Math.floor(((byte - 128) / 127) * 200) + 55;
                buf[offset] = 0;       // R
                buf[offset + 1] = intensity; // G
                buf[offset + 2] = intensity; // B
                buf[offset + 3] = 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);

    }, [data]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <div className="relative border border-neon-cyan/20 bg-black/50 p-2 rounded-lg max-h-full overflow-hidden shadow-[0_0_20px_rgba(0,188,212,0.1)]">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain image-pixelated max-h-[400px] min-w-[200px] min-h-[100px]"
                    style={{ imageRendering: "pixelated" }}
                />
                {data.length > 500 && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-[10px] text-neon-cyan font-mono backdrop-blur-sm border border-neon-cyan/20 rounded">
                        DENSITY_MAP_RENDER
                    </div>
                )}
            </div>
            <div className="mt-2 text-[10px] text-zinc-500 font-mono text-center">
                Visualizing {data.length.toLocaleString()} bytes as 2D Bitmap
            </div>
        </div>
    );
};

export default DataDensityVisualizer;
