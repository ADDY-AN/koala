// src/app/get-involved/page.tsx
"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, GraduationCap, Briefcase, HeartHandshake, Sparkles } from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function GetInvolvedPage() {
    const container = useRef<HTMLElement>(null);
    const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", interest: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.6, ease: "back.out(1.5)" })
            .from(".hero-word", { y: 80, opacity: 0, rotation: 5, duration: 1, stagger: 0.1, ease: "power4.out" }, "-=0.4")
            .from(".hero-desc", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

        gsap.from(".role-card", {
            scrollTrigger: { trigger: ".roles-section", start: "top 75%" },
            y: 50, opacity: 0, scale: 0.9, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)"
        });

        gsap.from(".form-section", {
            scrollTrigger: { trigger: ".form-container", start: "top 80%" },
            rotationX: -15, y: 100, opacity: 0, duration: 1, transformOrigin: "center top", ease: "power3.out"
        });

        gsap.to(".floating-shape", {
            y: -20, rotation: 10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.5
        });
    }, { scope: container });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        gsap.to(".submit-btn", { scale: 0.95, yoyo: true, repeat: 1, duration: 0.1 });
        setStatus("loading");

        const { error } = await supabase.from("volunteer_leads").insert([{
            full_name: formData.fullName, email: formData.email, phone: formData.phone, interest_area: formData.interest
        }]);

        if (!error) {
            setStatus("success");
            gsap.fromTo(".success-message", { scale: 0.5, opacity: 0, rotation: -10 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
        } else {
            setStatus("idle");
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <main ref={container} className="min-h-screen bg-background relative overflow-hidden pt-24 pb-20">

            <div className="floating-shape absolute top-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl -z-10" />
            <div className="floating-shape absolute top-60 right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />

            <section className="text-center px-5 max-w-4xl mx-auto mb-32">
                <div className="hero-badge inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full font-bold uppercase tracking-widest text-xs mb-8">
                    <Sparkles size={14} className="text-secondary" /> Join the Movement
                </div>
                <h1 className="text-5xl md:text-7xl font-black font-playfair text-primary mb-6 flex flex-wrap justify-center gap-x-3 overflow-hidden leading-tight">
                    <span className="hero-word block">Your</span>
                    <span className="hero-word block text-secondary">Effort.</span>
                    <span className="hero-word block">Their</span>
                    <span className="hero-word block text-secondary">Progress.</span>
                </h1>
                <p className="hero-desc text-lg md:text-xl text-muted-foreground font-lato max-w-2xl mx-auto">
                    Whether you are a student looking for an internship, a local business seeking CSR impact, or a community member with a big heart—we need you.
                </p>
            </section>

            <section className="roles-section px-5 max-w-6xl mx-auto mb-32">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="role-card bg-white p-8 rounded-3xl shadow-lg border border-border">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary"><GraduationCap size={32} /></div>
                        <h3 className="text-2xl font-black font-playfair text-foreground mb-3">College Interns</h3>
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">Complete your social internship hours by running awareness campaigns and assisting at screening camps.</p>
                    </div>
                    <div className="role-card bg-primary text-primary-foreground p-8 rounded-3xl shadow-xl transform md:-translate-y-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-secondary"><Users size={32} /></div>
                        <h3 className="text-2xl font-black font-playfair mb-3">Community Volunteers</h3>
                        <p className="text-primary-foreground/80 mb-4 text-sm leading-relaxed">Help us with on-ground event support, community outreach, and fundraising activities in Bhagalpur.</p>
                    </div>
                    <div className="role-card bg-white p-8 rounded-3xl shadow-lg border border-border">
                        <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6 text-secondary-foreground"><Briefcase size={32} /></div>
                        <h3 className="text-2xl font-black font-playfair text-foreground mb-3">CSR Partnerships</h3>
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">For local businesses and SMEs. Partner with us to sponsor therapy sessions and build a legacy of inclusive childcare.</p>
                    </div>
                </div>
            </section>

            <section className="form-container px-5 max-w-3xl mx-auto perspective-[1000px]">
                <Card className="form-section border-t-[12px] border-t-primary shadow-[0_20px_60px_rgba(45,80,22,0.1)] rounded-[40px] overflow-visible bg-white relative mt-16">

                    {/* LOGO TRUST BADGE POPPING OUT OF THE FORM */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-[6px] border-white shadow-xl overflow-hidden bg-white z-20 p-1">
                        <img src="/images/logo.png" alt="Koala Kuddle Logo" className="w-full h-full object-cover rounded-full" />
                    </div>

                    <CardContent className="p-8 md:p-14 pt-16">
                        {status === "success" ? (
                            <div className="success-message text-center py-10">
                                <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6"><HeartHandshake size={48} className="text-secondary" /></div>
                                <h3 className="text-4xl font-black font-playfair text-primary mb-4">Thank You! 💛</h3>
                                <p className="text-lg text-muted-foreground font-lato">Your details have been securely saved. Our coordination team will reach out to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl font-black font-playfair text-foreground mb-2">Step up. Fill out the form.</h2>
                                    <p className="text-muted-foreground font-lato">Takes less than 30 seconds to start making an impact.</p>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Full Name</Label>
                                    <Input required placeholder="e.g. Vikram Sharma" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="h-14 rounded-2xl bg-muted/30 border-border px-5" />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Email Address</Label>
                                        <Input type="email" required placeholder="hello@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="h-14 rounded-2xl bg-muted/30 border-border px-5" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Phone / WhatsApp</Label>
                                        <Input required placeholder="+91 99999 99999" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="h-14 rounded-2xl bg-muted/30 border-border px-5" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">How would you like to help?</Label>
                                    <Input required placeholder="e.g. College Internship, CSR Funding, Weekend Volunteer" value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})} className="h-14 rounded-2xl bg-muted/30 border-border px-5" />
                                </div>
                                <Button type="submit" disabled={status === "loading"} className="submit-btn w-full h-16 rounded-2xl text-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 mt-4">
                                    {status === "loading" ? "Submitting..." : "Send Details"}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}