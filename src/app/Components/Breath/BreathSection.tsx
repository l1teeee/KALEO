'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BreathSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const videoContainer = videoContainerRef.current;
        const video = videoRef.current;
        const title = titleRef.current;
        const button = buttonRef.current;

        if (!section || !videoContainer || !video) return;

        // Reproducir el video automáticamente
        video.play().catch(err => console.log('Video autoplay prevented:', err));

        let textShown = false;

        // Animación de zoom en el video mientras se hace scroll - EMPIEZA PEQUEÑO
        const zoomTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    // Cuando el progreso sea mayor a 90%, mostrar el texto
                    if (self.progress > 0.9 && !textShown) {
                        textShown = true;
                        gsap.to([title, button], {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: 'power3.out',
                            stagger: 0.2
                        });
                    }
                    // Cuando el progreso sea menor a 90%, ocultar el texto
                    else if (self.progress < 0.9 && textShown) {
                        textShown = false;
                        gsap.to([title, button], {
                            opacity: 0,
                            y: 30,
                            duration: 0.6,
                            ease: 'power3.in',
                            stagger: 0.1
                        });
                    }
                }
            }
        });

        zoomTimeline.fromTo(
            videoContainer,
            {
                scale: 0.7 // Empieza pequeño
            },
            {
                scale: 1, // Termina en tamaño normal
                ease: 'none'
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden bg-[#efe5d7] flex items-center justify-center"
        >
            {/* Video con efecto de zoom */}
            <div
                ref={videoContainerRef}
                className="relative w-[calc(100%-4rem)] h-[calc(100%-4rem)] md:w-[calc(100%-6rem)] md:h-[calc(100%-6rem)]"
                style={{
                    transformOrigin: 'center center'
                }}
            >
                <div className="w-full h-full relative overflow-hidden rounded-2xl shadow-2xl">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/awake.mp4" type="video/mp4" />
                    </video>
                    {/* Overlay oscuro */}
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
            </div>

            {/* Contenido centrado - FUERA del contenedor del video */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-5 pointer-events-none">
                {/* Título */}
                <h2
                    ref={titleRef}
                    className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-wider opacity-0"
                    style={{
                        fontFamily: 'var(--font-playfair)',
                        letterSpacing: '0.15em',
                        transform: 'translateY(30px)'
                    }}
                >
                    BREATH
                </h2>

                {/* Botón */}
                <button
                    ref={buttonRef}
                    className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 rounded-md opacity-0 pointer-events-auto"
                    style={{
                        transform: 'translateY(30px)'
                    }}
                >
                    Book a Visit
                    <span className="text-lg">+</span>
                </button>
            </div>
        </section>
    );
}