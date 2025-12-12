import { useState, useEffect } from 'react';

const STORAGE_KEY = 'dd_pro_code';

export function useProStatus() {
    const [isPro, setIsPro] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const verifyCode = async (code: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/redeem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem(STORAGE_KEY, code);
                setIsPro(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Code verification failed:', error);
            return false;
        }
    };

    useEffect(() => {
        const checkStatus = async () => {
            const savedCode = localStorage.getItem(STORAGE_KEY);
            if (savedCode) {
                // Optimistically set true, but could verify periodically in background
                // For this demo, valid format check is enough for optimism? 
                // Or re-verify with server? verification is fast, let's verify.
                const isValid = await verifyCode(savedCode);
                if (!isValid) {
                    localStorage.removeItem(STORAGE_KEY); // Remove invalid code
                    setIsPro(false);
                }
            }
            setIsLoading(false);
        };

        checkStatus();
    }, []);

    const restorePurchase = async (code: string) => {
        return verifyCode(code);
    };

    return { isPro, isLoading, verifyCode, restorePurchase };
}
