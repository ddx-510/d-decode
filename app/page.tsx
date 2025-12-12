import SciTechLayout from "@/components/SciTechLayout";
import Base64Converter from "@/components/Base64Converter";

export default function Home() {
  return (
    <SciTechLayout>
      {/* Hidden Semantic Content for SEO */}
      <div className="sr-only">
        <h1>Base64 Decode Online Tool</h1>
        <h2>Convert Base64 to Image, PDF, and File</h2>
        <p>
          D-Decode is a free online utility to decode Base64 strings back to their original file formats.
          Support for PNG, JPEG, GIF, WebP, SVG, PDF, MP3, MP4, and more.
          All processing is done locally in your browser for maximum privacy.
        </p>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "D-Decode",
            "url": process.env.NEXT_PUBLIC_APP_URL,
            "description": "Advanced Base64 decoder and file visualizer.",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }),
        }}
      />

      <Base64Converter />
    </SciTechLayout>
  );
}
