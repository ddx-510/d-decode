# d-decode: Advanced Sci-Tech Base64 Utility

![D-Decode Banner](public/logo_placeholder_if_any.png)

**d-decode** is a state-of-the-art, privacy-focused utility for decoding, analyzing, and visualizing Base64 artifacts. Built with a "Sci-Tech" aesthetic, it transforms mundane data inspection into an immersive experience.

## 🚀 Features

### Core Capabilities
*   **Universal Decoding:** Instantly decodes standard Base64 strings into their original binary formats.
*   **Privacy-First:** **Zero server-side processing.** All decoding happens locally in your browser using modern Web APIs. Your data never leaves your device.
*   **Advanced File Detection:**
    *   **Images:** Native preview for PNG, JPEG, GIF, WebP, SVG, BMP.
    *   **Documents:** Native PDF rendering and intelligent detection for Office files (Word, Excel, PowerPoint).
    *   **Multimedia:** Integrated HTML5 Audio (MP3, WAV) and Video (MP4, WebM) players.
    *   **Archives:** Detection for Zip, Docx, Xlsx, Jar, and APK formats.
*   **Text & Code:** Automatic detection and syntax highlighting for JSON, XML, JavaScript, and plain text.

### Visualizers
*   **Hex/Binary Matrix:** Inspect raw byte data in a structured, paginated hex viewer.
*   **Data Density Map:** A unique visualization that renders binary data as a 2D pixel density heatmap, allowing you to "see" the structure of unknown files.

### UX/UI
*   **Sci-Tech Theme:** Immersive dark mode interface with holographic HUD components, ambient glows, and interactive particle effects.
*   **Vertical Browser View:** Maximized viewing area for documents and code.
*   **Input Sanitization:** Automatically cleans whitespace and data URI schemes from inputs.

## 🛠️ Tech Stack

*   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Fonts:** Geist Sans & Mono
*   **Deployment:** Vercel

## 📦 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions are welcome! Please check out the [issues](https://github.com/ddx-510/d-decode/issues) or submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
