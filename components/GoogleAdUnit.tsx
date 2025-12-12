'use client';

import { useEffect, useRef } from 'react';
import { useProStatus } from '../hooks/useProStatus';

interface GoogleAdUnitProps {
    slotId: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    layoutKey?: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function GoogleAdUnit({
    slotId,
    format = 'auto',
    layoutKey,
    className = '',
    style = { display: 'block' }
}: GoogleAdUnitProps) {
    const { isPro, isLoading } = useProStatus();
    const adRef = useRef<HTMLModElement>(null);
    const initializedRef = useRef(false);

    useEffect(() => {
        // If not pro, not loading, and not already initialized
        if (!isLoading && !isPro && adRef.current && !initializedRef.current) {
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                initializedRef.current = true;
            } catch (err) {
                console.error('AdSense error:', err);
            }
        }
    }, [isPro, isLoading]);

    if (isLoading || isPro) return null;

    return (
        <div className={`google-ad-container overflow-hidden ${className}`}>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={style}
                data-ad-client="ca-pub-5200484239514910"
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive="true"
                {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
            />
        </div>
    );
}
