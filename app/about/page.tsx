// src/app/about/page.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(".hero-title-word", {
            y: 100, opacity: 0, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2
        })
            .from(".hero-subtitle", {
                y: 30, opacity: 0, duration: 1, ease: "power3.out"
            }, "-=0.8")
            .from(".scroll-indicator", {
                opacity: 0, y: -20, duration: 1, repeat: -1, yoyo: true, ease: "power1.inOut"
            }, "-=0.5");

        gsap.to(".bg-marquee", {
            scrollTrigger: {
                trigger: container.current, start: "top top", end: "bottom bottom", scrub: 1
            },
            xPercent: -50, ease: "none"
        });

        gsap.from(".story-paragraph", {
            scrollTrigger: { trigger: ".story-section", start: "top 70%" },
            y: 50, opacity: 0, duration: 1, stagger: 0.3, ease: "power3.out"
        });

        gsap.from(".vision-text", {
            scrollTrigger: { trigger: ".vision-section", start: "top 75%" },
            x: -50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
        });

        gsap.fromTo(".vision-image",
            { y: -50, scale: 1.1 },
            {
                scrollTrigger: { trigger: ".vision-section", start: "top bottom", end: "bottom top", scrub: true },
                y: 50, scale: 1, ease: "none"
            }
        );

        gsap.from(".mission-card", {
            scrollTrigger: { trigger: ".mission-section", start: "top 80%" },
            scale: 0.8, rotationX: 20, y: 100, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.7)", transformOrigin: "center bottom"
        });

    }, { scope: container });

    return (
        <main ref={container} className="min-h-screen bg-background relative overflow-hidden pt-20">

            {/* MASSIVE BACKGROUND MARQUEE */}
            <div className="fixed top-1/3 left-0 w-[300vw] -z-10 opacity-[0.03] pointer-events-none overflow-hidden">
                <h1 className="bg-marquee text-[15vw] font-black text-primary font-playfair whitespace-nowrap leading-none">
                    EVERY CHILD DESERVES TO GROW · EVERY CHILD DESERVES TO GROW · EVERY CHILD DESERVES TO GROW
                </h1>
            </div>

            {/* CUSTOM CRAZY HERO */}
            <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-5 overflow-hidden">

                {/* GIANT FADED LOGO WATERMARK */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-[0.04] pointer-events-none -z-10 mix-blend-multiply">
                    <img src="/images/koala-logo.png" alt="Watermark" className="w-full h-full object-contain grayscale" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-5xl md:text-8xl font-playfair font-black text-primary mb-6 flex flex-wrap justify-center gap-x-4 overflow-hidden">
                        <span className="hero-title-word block">About</span>
                        <span className="hero-title-word block text-secondary">Koala</span>
                        <span className="hero-title-word block text-secondary">Kuddle</span>
                    </h1>
                    <p className="hero-subtitle text-xl md:text-3xl text-muted-foreground font-lato max-w-2xl mx-auto leading-relaxed">
                        Turning financial struggle into second chances, and quiet worries into brave little victories.
                    </p>
                </div>
                <div className="scroll-indicator absolute bottom-10 w-[2px] h-16 bg-gradient-to-b from-primary to-transparent" />
            </section>

            {/* THE STORY (HEARTBREAK TO HOPE) */}
            <section className="story-section py-24 px-5 max-w-3xl mx-auto text-center relative z-10">
                <span className="story-paragraph text-secondary font-caveat text-4xl mb-6 block">The Heartbreak</span>
                <p className="story-paragraph text-2xl md:text-3xl font-playfair text-foreground leading-snug mb-8">
                    At Continua Kids, we see it every single day. A parent brings their 3-year-old who hasn't spoken a word yet. The assessment is clear — speech therapy can transform their life.
                </p>
                <p className="story-paragraph text-xl text-muted-foreground font-lato leading-relaxed mb-8">
                    The verdict? <strong className="text-primary">"We can't afford it."</strong> They walk out. The child's window of early intervention slowly closes.
                </p>
                <div className="story-paragraph p-8 border-l-4 border-secondary bg-primary/5 rounded-r-2xl text-left">
                    <p className="text-xl font-playfair italic text-primary">
                        "No child's progress should pause because a parent cannot pay for therapy."
                    </p>
                </div>
            </section>

            {/* PARALLAX VISION SECTION (UPDATED IMAGE TO ENGAGED 6-7 YR OLD) */}
            <section className="vision-section py-24 px-5 max-w-6xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="overflow-hidden">
                        <span className="vision-text text-secondary font-caveat text-4xl mb-4 block">Our Vision</span>
                        <h2 className="vision-text text-4xl md:text-5xl font-playfair font-black text-foreground mb-6 leading-tight">
                            A world where no child's progress is paused.
                        </h2>
                        <p className="vision-text text-muted-foreground text-lg leading-relaxed mb-6">
                            We envision a future where every little hand finds the support it needs to grow, play, and shine with confidence. Potential should never depend on financial privilege.
                        </p>
                    </div>
                    <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white relative h-[500px]">
                        <img
                            src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1000&auto=format&fit=crop"
                            alt="Young boy focused and happy while learning"
                            className="vision-image w-full h-[120%] object-cover absolute top-[-10%] left-0"
                        />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                    </div>
                </div>
            </section>

            {/* POP-IN MISSION CARD */}
            <section className="mission-section py-32 px-5 max-w-5xl mx-auto relative z-10 perspective-[1000px]">
                <div className="mission-card bg-primary text-primary-foreground rounded-[60px] p-12 md:p-20 relative overflow-hidden shadow-[0_30px_60px_rgba(45,80,22,0.4)] border-b-[12px] border-secondary">
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-[spin_10s_linear_infinite]" />
                    <span className="text-secondary font-caveat text-5xl mb-8 block relative z-10 transform -rotate-2">Our Mission</span>
                    <p className="text-3xl md:text-4xl font-playfair font-bold leading-tight mb-8 relative z-10 text-white">
                        Koala Kuddle exists so that underprivileged children are not left waiting outside the therapy room while others move ahead.
                    </p>
                    <div className="w-24 h-1 bg-secondary mb-8 relative z-10" />
                    <p className="text-primary-foreground/90 text-xl font-lato leading-relaxed relative z-10">
                        By nurturing early intervention and funding life-changing therapy sessions at partner clinics, we wrap families in a community of hope. We exist because you choose to care.
                    </p>
                </div>
            </section>

        </main>
    );
}