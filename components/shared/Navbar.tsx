// src/components/shared/Navbar.tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
    const pathname = usePathname();
    const container = useRef<HTMLElement>(null);
    const logoRef = useRef(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // GSAP Hover Animation for the Desktop Logo
    const handleLogoHover = () => {
        gsap.to(logoRef.current, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
            ease: "back.out(2)"
        });
    };

    const handleLogoLeave = () => {
        gsap.to(logoRef.current, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    // GSAP Mobile Menu Animations
    useGSAP(() => {
        if (isMobileOpen) {
            // 1. Slide down the full-screen menu
            gsap.to(".mobile-menu", {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
                display: "flex"
            });
            // 2. Stagger the links popping up
            gsap.fromTo(".mobile-link",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.5)", delay: 0.2 }
            );
        } else {
            // Hide the menu by sliding it back up
            gsap.to(".mobile-menu", {
                y: "-100%",
                opacity: 0,
                duration: 0.4,
                ease: "power3.in",
                display: "none"
            });
        }
    }, { scope: container, dependencies: [isMobileOpen] });

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Our Programs", path: "/programs" },
        { name: "Get Involved", path: "/get-involved" },
    ];

    return (
        <nav ref={container} className="fixed top-0 w-full z-50">

            {/* 1. THE MAIN TOP BAR (Always Visible) */}
            <div className="relative z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
                <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">

                    {/* LOGO SECTION */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 group"
                        onMouseEnter={handleLogoHover}
                        onMouseLeave={handleLogoLeave}
                        onClick={() => setIsMobileOpen(false)} // Close mobile menu if logo clicked
                    >
                        <div ref={logoRef} className="relative w-12 h-12 overflow-hidden rounded-full shadow-sm border border-border">
                            <Image
                                src="/images/logo.png"
                                alt="Koala Kuddle Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="leading-tight">
              <span className="block font-playfair font-black text-xl text-primary group-hover:text-secondary transition-colors duration-300">
                Koala Kuddle
              </span>
                            <span className="block text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
                Kids Foundation
              </span>
                        </div>
                    </Link>

                    {/* DESKTOP LINKS (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                                    pathname === link.path
                                        ? "text-secondary scale-105"
                                        : "text-muted-foreground hover:text-primary hover:scale-105"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                            <Link href="/donate">
                                <Heart className="mr-2 h-4 w-4 fill-secondary text-secondary group-hover:scale-125 transition-transform" />
                                Donate Now
                            </Link>
                        </Button>
                    </div>

                    {/* MOBILE MENU TOGGLE BUTTON (Visible only on Mobile) */}
                    <button
                        className="md:hidden text-primary p-2 transition-transform active:scale-90"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>

                </div>
            </div>

            {/* 2. THE FULL-SCREEN MOBILE MENU (Hidden on Desktop) */}
            <div className="mobile-menu hidden fixed inset-0 bg-background/98 backdrop-blur-2xl z-40 flex-col justify-center items-center h-screen w-screen -translate-y-full opacity-0 px-8 pb-20">
                <div className="flex flex-col gap-8 items-center text-center w-full">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => setIsMobileOpen(false)}
                            className={`mobile-link font-black text-3xl uppercase tracking-widest font-playfair transition-colors ${
                                pathname === link.path ? "text-secondary" : "text-primary hover:text-secondary"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="mobile-link mt-8 w-full max-w-xs">
                        <Button asChild size="lg" className="w-full rounded-2xl h-16 text-xl font-bold bg-primary text-white shadow-xl shadow-primary/20">
                            <Link href="/donate" onClick={() => setIsMobileOpen(false)}>
                                <Heart className="mr-3 h-6 w-6 fill-secondary text-secondary" />
                                Donate Now
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Fun decorative Koala watermark at the bottom */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none select-none">
                    <span className="text-7xl">🐨</span>
                </div>
            </div>

        </nav>
    );
}