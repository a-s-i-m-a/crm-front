// useBarcodeScanner.tsx
import { useState, useEffect } from 'react';

const useBarcodeScanner = () => {
    const [barcodeRead, setBarcodeRead] = useState('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                setBarcodeRead('');
            } else if (/^[a-zA-Z0-9]+$/.test(e.key)) {
                setBarcodeRead((prevBarcode) => prevBarcode + e.key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return barcodeRead;
};

export default useBarcodeScanner;
