'use client'

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function WhatLivesHere() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const imagesContainerRef = useRef<HTMLDivElement>(null);
    const indicatorsRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Animación de entrada del título
        gsap.fromTo(
            titleRef.current,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Animación de entrada del texto principal
        gsap.fromTo(
            textRef.current,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.2,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Animación de entrada del contenedor de imágenes
        gsap.fromTo(
            imagesContainerRef.current,
            {
                opacity: 0,
                scale: 0.95
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.4,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Animación de entrada de los indicadores
        gsap.fromTo(
            indicatorsRef.current,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.6,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // ScrollTrigger para cambiar imágenes
        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            onUpdate: (self) => {
                const progress = self.progress;

                if (progress < 0.33) {
                    setCurrentImage(0);
                } else if (progress < 0.66) {
                    setCurrentImage(1);
                } else {
                    setCurrentImage(2);
                }
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Animación de transición entre imágenes
    useEffect(() => {
        imageRefs.current.forEach((imageRef, index) => {
            if (!imageRef) return;

            if (index === currentImage) {
                gsap.to(imageRef, {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    duration: 1,
                    ease: 'power2.inOut'
                });
            } else {
                gsap.to(imageRef, {
                    opacity: 0,
                    scale: 0.9,
                    rotate: -3,
                    duration: 1,
                    ease: 'power2.inOut'
                });
            }
        });
    }, [currentImage]);

    const images = [
        {
            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            alt: "Horses grazing in mountain landscape"
        },
        {
            src: "https://images.unsplash.com/photo-1544737151406-6e4b99e1ec7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            alt: "Sheep grazing on hills"
        },
        {
            src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            alt: "Pastoral landscape with cattle"
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="min-h-screen bg-[#efe5d7] py-20 px-5 flex flex-col items-center justify-center relative overflow-hidden"
        >
            <div className="max-w-4xl w-full text-center relative z-10">
                {/* Título pequeño */}
                <h3
                    ref={titleRef}
                    className="text-sm md:text-base font-light tracking-[0.2em] text-gray-600 mb-8 uppercase opacity-0"
                    style={{
                        fontFamily: 'var(--font-playfair)',
                        letterSpacing: '0.3em'
                    }}
                >
                    What Lives Here
                </h3>

                {/* Texto principal */}
                <p
                    ref={textRef}
                    className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-gray-800 mb-16 opacity-0"
                    style={{
                        fontFamily: 'var(--font-playfair)',
                        lineHeight: '1.6'
                    }}
                >
                    Kaleo is more than a home ✦ it&#39;s a living rhythm. Open fields. Wooden fences weathered by time. Horses grazing at dawn. Smoke curling from the hearth as dusk settles in.
                </p>

                {/* Contenedor de imágenes */}
                <div
                    ref={imagesContainerRef}
                    className="w-full max-w-2xl mx-auto relative opacity-0"
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                imageRefs.current[index] = el;
                            }}
                            className="absolute inset-0 overflow-hidden rounded-xl shadow-lg"
                            style={{
                                transformOrigin: 'center center',
                                zIndex: currentImage === index ? 10 : 1,
                                opacity: 0
                            }}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                            />
                        </div>
                    ))}

                    {/* Imagen base para mantener la altura del contenedor */}
                    <div className="relative overflow-hidden rounded-xl shadow-lg opacity-0">
                        <div className="w-full h-[300px] md:h-[350px] lg:h-[400px]"></div>
                    </div>
                </div>

                {/* Indicadores de imagen */}
                <div
                    ref={indicatorsRef}
                    className="flex justify-center mt-8 space-x-2 opacity-0"
                >
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                currentImage === index
                                    ? 'bg-gray-600 scale-125'
                                    : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}