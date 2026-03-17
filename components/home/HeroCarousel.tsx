"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroCarousel() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Background slow zoom
        tl.from(".hero-bg", { scale: 1.15, duration: 2.5, ease: "power2.out" }, 0);

        // Staggered text reveal
        tl.from(".hero-text", {
            y: 80,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "back.out(1.2)",
        }, 0.2);

        // Sub-navigation pop-in
        tl.from(".sub-nav-link", {
            y: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, 0.8);
    }, { scope: container });

    return (
        <section ref={container} className="relative mt-16 flex flex-col">
            {/* Hero Image Area */}
            <div className="relative h-[75vh] flex items-center justify-center overflow-hidden">
                <div
                    className="hero-bg absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2000&auto=format&fit=crop")' }}
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 text-center px-5 max-w-5xl mx-auto overflow-hidden">
                    <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight font-lato mb-4">
                        Real Need.
                    </h1>
                    <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-black text-secondary uppercase tracking-tight font-lato mb-8">
                        Real Growth.
                    </h1>
                    <div className="hero-text overflow-hidden">
                        <p className="text-xl text-white/90 font-lato max-w-2xl mx-auto font-bold uppercase tracking-widest bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full inline-block">
                            Every child deserves to grow 🐨
                        </p>
                    </div>
                </div>
            </div>

            {/* Solid Gold Sub-Navigation (Vision/Mission/Story Removed) */}
            <div className="bg-secondary text-secondary-foreground sticky top-[72px] z-40 shadow-xl border-b-4 border-primary/20">
                <div className="max-w-7xl mx-auto px-5 flex items-center justify-center gap-10 md:gap-16 py-5 whitespace-nowrap text-sm font-black uppercase tracking-widest">
                    <Link href="#lifecycle" className="sub-nav-link hover:text-white transition-colors">The Lifecycle</Link>
                    <Link href="#campaigns" className="sub-nav-link hover:text-white transition-colors">Our Work</Link>
                    <Link href="/donate" className="sub-nav-link hover:text-white transition-colors">Donate</Link>
                </div>
            </div>
        </section>
    );
}