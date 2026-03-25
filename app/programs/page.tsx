// src/app/programs/page.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, HeartHandshake, Stethoscope, Users, Activity } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ProgramsPage() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(".hero-bg", { scale: 1.1, duration: 2, ease: "power2.out" })
            .from(".hero-title-word", { y: 80, opacity: 0, rotationX: -45, duration: 1, stagger: 0.1, ease: "back.out(1.5)" }, "-=1.5")
            .from(".hero-desc", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=1");

        const pillars = gsap.utils.toArray<HTMLElement>(".pillar-section");
        pillars.forEach((pillar, i) => {
            const isEven = i % 2 !== 0;
            const pTl = gsap.timeline({ scrollTrigger: { trigger: pillar, start: "top 75%" }});
            pTl.from(pillar.querySelector(".pillar-image"), { x: isEven ? 100 : -100, opacity: 0, rotationY: isEven ? -15 : 15, duration: 1.2, ease: "power3.out" })
                .from(pillar.querySelector(".pillar-blob"), { scale: 0, rotation: 45, opacity: 0, duration: 1, ease: "back.out(1.2)" }, "-=1")
                .from(pillar.querySelector(".floating-card"), { y: 50, scale: 0.5, opacity: 0, duration: 0.8, ease: "elastic.out(1, 0.6)" }, "-=0.6")
                .from(pillar.querySelectorAll(".pillar-text > *"), { x: isEven ? -50 : 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=1");
        });

        gsap.from(".cta-element", { scrollTrigger: { trigger: ".cta-section", start: "top 80%" }, y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)" });
    }, { scope: container });

    return (
        <main ref={container} className="min-h-screen bg-background pt-16 overflow-hidden">
            <section className="relative py-32 px-5 flex items-center justify-center text-center overflow-hidden min-h-[50vh]">
                <div className="hero-bg absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop")' }} />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
                <div className="relative z-10 max-w-4xl mx-auto perspective-[1000px]">
                    <h1 className="text-5xl md:text-7xl font-playfair font-black text-primary mb-6 flex flex-wrap justify-center gap-x-3 overflow-hidden">
                        <span className="hero-title-word block">Our</span>
                        <span className="hero-title-word block text-secondary">Programs</span>
                    </h1>
                    <p className="hero-desc text-lg md:text-2xl text-muted-foreground font-lato max-w-2xl mx-auto leading-relaxed">
                        Bridging the gap between a child's developmental needs and a family's financial reality through targeted, sustainable action.
                    </p>
                </div>
            </section>

            <section className="py-16 px-5 max-w-7xl mx-auto space-y-32">
                {/* Pillar 1 (UPDATED IMAGE) */}
                <div className="pillar-section grid md:grid-cols-2 gap-16 items-center perspective-[1000px]">
                    <div className="order-2 md:order-1 relative">
                        <div className="pillar-blob absolute -inset-4 bg-secondary/20 rounded-3xl transform -rotate-3 -z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop"
                            alt="Child in therapy session playing with toys"
                            className="pillar-image rounded-3xl shadow-xl border border-border w-full object-cover aspect-[4/3]"
                        />
                        <Card className="floating-card absolute -bottom-8 -right-8 w-64 shadow-2xl border-primary/10 hidden md:block bg-white/95 backdrop-blur-sm">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full text-primary"><Stethoscope size={24} /></div>
                                <div><p className="font-bold text-primary text-xl">100%</p><p className="text-sm text-muted-foreground leading-tight">Funds go directly to partner clinics</p></div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="pillar-text order-1 md:order-2 space-y-6">
                        <span className="text-secondary font-caveat text-4xl block">Pillar 01</span>
                        <h2 className="text-4xl font-playfair font-black text-foreground">Therapy Sponsorships</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">Our flagship initiative ensures that underprivileged children are not left waiting outside the therapy room. We directly fund life-changing therapy sessions at trusted partner facilities.</p>
                        <ul className="space-y-4 pt-4">
                            {["Speech & Language Therapy", "Occupational & Physical Therapy", "Behavioral Intervention (ABA)", "Special Education Support"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-foreground font-medium bg-muted/30 p-3 rounded-xl border border-border">
                                    <CheckCircle2 className="text-secondary fill-secondary/20 shrink-0" size={20} />{item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Pillar 2 (UPDATED IMAGE) */}
                <div className="pillar-section grid md:grid-cols-2 gap-16 items-center perspective-[1000px]">
                    <div className="pillar-text space-y-6">
                        <span className="text-secondary font-caveat text-4xl block">Pillar 02</span>
                        <h2 className="text-4xl font-playfair font-black text-foreground">Early Awareness & Screening Camps</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">Late diagnosis often leads to missed critical windows for neuroplasticity. We conduct free developmental screening camps in local Bhagalpur schools to identify delays early.</p>
                        <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl flex items-center gap-4 my-6">
                            <div className="bg-white p-3 rounded-full shadow-sm text-secondary"><Activity size={24} /></div>
                            <div><h4 className="font-bold text-primary text-sm uppercase tracking-wider">Milestone Checklist</h4><p className="text-xs text-muted-foreground">Empowering parents to spot delays early.</p></div>
                        </div>
                        <Button asChild variant="outline" className="mt-4 rounded-full h-14 px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold shadow-sm group">
                            <Link href="/get-involved">Host a Camp <HeartHandshake className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" /></Link>
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="pillar-blob absolute -inset-4 bg-primary/10 rounded-3xl transform rotate-3 -z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
                            alt="Group of happy children in a community"
                            className="pillar-image rounded-3xl shadow-xl border border-border w-full object-cover aspect-[4/3]"
                        />
                    </div>
                </div>

                {/* Pillar 3 (UPDATED IMAGE) */}
                <div className="pillar-section grid md:grid-cols-2 gap-16 items-center perspective-[1000px]">
                    <div className="order-2 md:order-1 relative">
                        <div className="pillar-blob absolute -inset-4 bg-secondary/20 rounded-3xl transform -rotate-3 -z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop"
                            alt="Parent comforting and supporting their child"
                            className="pillar-image rounded-3xl shadow-xl border border-border w-full object-cover aspect-[4/3]"
                        />
                    </div>
                    <div className="pillar-text order-1 md:order-2 space-y-6">
                        <span className="text-secondary font-caveat text-4xl block">Pillar 03</span>
                        <h2 className="text-4xl font-playfair font-black text-foreground">Parental Empowerment</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">Therapy doesn't stop when a child leaves the clinic. We educate and support parents to continue therapy practices at home safely.</p>
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="bg-muted/50 p-6 rounded-3xl border border-border hover:border-secondary transition-colors duration-300">
                                <Users className="text-primary mb-3" size={32} />
                                <h4 className="font-bold text-foreground mb-2 text-lg">Support Groups</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">Connecting families to share quiet worries.</p>
                            </div>
                            <div className="bg-muted/50 p-6 rounded-3xl border border-border hover:border-primary transition-colors duration-300">
                                <HeartHandshake className="text-secondary mb-3" size={32} />
                                <h4 className="font-bold text-foreground mb-2 text-lg">Home Protocols</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">Resources for at-home development.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section bg-primary text-primary-foreground py-24 px-5 text-center relative overflow-hidden mt-20 rounded-t-[60px] border-t-[12px] border-secondary shadow-[0_-20px_50px_rgba(45,80,22,0.2)]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

                    {/* LOGO BADGE IN CTA */}
                    <div className="cta-element w-24 h-24 rounded-full border-4 border-white/20 shadow-xl overflow-hidden mb-8 bg-white p-1">
                        <img src="/images/koala-logo.png" alt="Koala Kuddle Logo" className="w-full h-full object-cover rounded-full" />
                    </div>

                    <h2 className="cta-element text-4xl md:text-6xl font-playfair font-black leading-tight mb-8">
                        Help Us Keep These <br/><span className="text-secondary">Programs Running</span>
                    </h2>
                    <p className="cta-element text-xl text-primary-foreground/80 font-lato max-w-2xl mx-auto mb-8">
                        Whether you can sponsor a single session or a full month of therapy, your contribution turns financial struggle into second chances.
                    </p>
                    <div className="cta-element flex flex-col sm:flex-row justify-center gap-6">
                        <Button asChild size="lg" className="bg-secondary text-primary-foreground hover:bg-secondary/90 rounded-full h-16 px-10 text-lg font-bold shadow-xl hover:-translate-y-1 transition-transform">
                            <Link href="/donate">Sponsor a Child Today</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}