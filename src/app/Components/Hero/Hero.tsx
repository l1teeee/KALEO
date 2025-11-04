'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const title = titleRef.current;
        const video = videoRef.current;
        const subtitle = subtitleRef.current;
        const container = containerRef.current;

        if (!title || !video || !subtitle || !container) return;

        // Configuración inicial
        gsap.set(title, {
            opacity: 0
        });

        gsap.set(video, {
            opacity: 0
        });

        gsap.set(subtitle, {
            opacity: 0
        });

        // Timeline de entrada
        const tl = gsap.timeline();

        tl.to(video, {
            duration: 1.5,
            opacity: 1,
            ease: "power1.out"
        })
            .to(title, {
                duration: 1,
                opacity: 1,
                ease: "power1.out"
            }, "-=0.5")
            .to(subtitle, {
                duration: 0.8,
                opacity: 1,
                ease: "power1.out"
            }, "+=3.5");

        // Animación de escala durante el scroll (hasta el 80%)
        const scrollAnimation = gsap.fromTo(container,
            {
                scale: 1,
                y: 0
            },
            {
                scale: 0.85, // Escala ligeramente menos para dejar espacio a la transición
                y: -50, // Movimiento más sutil
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "bottom bottom",
                    end: "bottom 20%", // Termina antes para dar espacio a la transición
                    scrub: 1,
                    // markers: true, // Descomenta para debug
                }
            }
        );

        // Cleanup
        return () => {
            tl.kill();
            scrollAnimation.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="h-screen p-5 relative">
            <div
                ref={containerRef}
                className="h-full rounded-lg overflow-hidden relative"
                style={{ transformOrigin: 'center center' }}
            >
                {/* Video de fondo */}
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/forest.mp4" type="video/mp4" />
                </video>

                <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6">
                    <h1
                        ref={titleRef}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-light tracking-wide cursor-default select-none mb-4"
                        style={{
                            fontFamily: 'var(--font-playfair)',
                            fontWeight: '300',
                            letterSpacing: '0.05em'
                        }}
                    >
                        KALEO
                    </h1>

                    <p
                        ref={subtitleRef}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-normal cursor-default select-none"
                        style={{
                            fontFamily: 'var(--font-playfair)',
                            fontWeight: '300',
                            letterSpacing: '0.05em'
                        }}
                    >
                        Explore Your Inner Self
                    </p>
                </div>
            </div>
        </div>
    );
}