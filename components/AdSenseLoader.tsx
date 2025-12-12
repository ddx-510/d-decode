'use client';

import { useProStatus } from '../hooks/useProStatus';
import Script from 'next/script';

export default function AdSenseLoader() {
    const { isPro, isLoading } = useProStatus();

    // Don't load anything while checking status
    if (isLoading) return null;

    // Don't load if user is Pro
    if (isPro) return null;

    return (
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5200484239514910"
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
