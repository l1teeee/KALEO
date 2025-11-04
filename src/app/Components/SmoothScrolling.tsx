'use client'

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 2.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical', // Cambio de 'direction' a 'orientation'
            gestureOrientation: 'vertical', // Cambio de 'gestureDirection' a 'gestureOrientation'
            wheelMultiplier: 0.8, // Cambio de 'mouseMultiplier' a 'wheelMultiplier'
            smoothWheel: true,
            touchMultiplier: 1.5,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}