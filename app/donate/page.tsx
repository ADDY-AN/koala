// src/app/donate/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Heart, Copy, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { QRCodeSVG } from "qrcode.react";

export default function DonatePage() {
    const container = useRef<HTMLElement>(null);

    // UI State: 1 = Details, 2 = QR Code, 3 = Success/WhatsApp
    const [step, setStep] = useState<1 | 2 | 3>(1);

    const [amount, setAmount] = useState<number>(2500);
    const [donorName, setDonorName] = useState("");
    const [donations, setDonations] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Live Carousel Logic
    useEffect(() => {
        const fetchD = async () => {
            const { data } = await supabase.from("donations").select("*").order("created_at", { ascending: false }).limit(10);
            if (data) setDonations(data);
        };
        fetchD();

        const ch = supabase.channel("public:donations").on("postgres_changes", { event: "INSERT", schema: "public", table: "donations" }, (p) => {
            setDonations((cur) => [p.new, ...cur].slice(0, 10));
        }).subscribe();

        return () => { supabase.removeChannel(ch); };
    }, []);

    // GSAP Animations based on step changes
    useGSAP(() => {
        const tl = gsap.timeline();

        if (step === 1) {
            gsap.from(".live-ticker", { y: -50, opacity: 0, duration: 0.8, ease: "power3.out" });
            tl.from(".donate-card", { y: 60, opacity: 0, duration: 0.8, ease: "power3.out" })
                .from(".donate-header > *", { y: -20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4")
                .from(".amount-btn", { scale: 0.8, opacity: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2")
                .from(".donate-form-area", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2");
        } else if (step === 2) {
            tl.from(".upi-reveal-container", {
                rotationY: 90, scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.2)", transformOrigin: "center center"
            })
                .from(".upi-element", { x: 30, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.3")
                .to(".qr-box", { scale: 1.02, repeat: -1, yoyo: true, duration: 1.5, ease: "sine.inOut" });
        } else if (step === 3) {
            tl.from(".success-container", { scale: 0.8, opacity: 0, duration: 0.6, ease: "back.out(1.2)" })
                .from(".success-element", { y: 20, opacity: 0, stagger: 0.1, duration: 0.4 }, "-=0.2");
        }
    }, { scope: container, dependencies: [step] });

    // Step 1 -> Step 2 (Just showing the QR, NO database saving yet)
    const handleProceedToQR = () => {
        if (!donorName) return alert("Please enter your name for the Impact Wall!");
        gsap.to(".submit-btn", { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
        setStep(2);
    };

    // Step 2 -> Step 3 (Saving to DB ONLY AFTER they confirm they paid)
    const handleConfirmPayment = async () => {
        setIsSubmitting(true);
        gsap.to(".confirm-btn", { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });

        // NOW we save it to the database, so it appears on the wall!
        await supabase.from("donations").insert([{ donor_name: donorName, amount: amount }]);

        setIsSubmitting(false);
        setStep(3);
    };

    return (
        <main ref={container} className="min-h-screen bg-background relative overflow-hidden pt-24 pb-20">

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/10 to-transparent -z-10" />
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[80px] -z-10" />

            {/* Live Ticker */}
            {donations.length > 0 && (
                <div className="live-ticker w-full bg-primary overflow-hidden py-3 border-y border-primary/20 relative flex items-center shadow-md mb-12">
                    <div className="absolute left-0 w-16 h-full bg-gradient-to-r from-primary to-transparent z-10" />
                    <div className="flex w-max my-custom-marquee items-center">
                        {[...donations, ...donations].map((d, i) => (
                            <div key={i} className="flex items-center mx-6 gap-2 shrink-0 text-sm">
                                <Heart size={14} className="text-secondary fill-secondary animate-pulse" />
                                <span className="text-primary-foreground font-lato">
                                    <strong className="text-secondary font-playfair tracking-wide text-base">{d.donor_name}</strong> donated ₹{d.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="absolute right-0 w-16 h-full bg-gradient-to-l from-primary to-transparent z-10" />
                </div>
            )}

            <section className="px-5 max-w-3xl mx-auto perspective-[1000px]">
                <Card className="donate-card border-t-[12px] border-t-primary shadow-[0_20px_60px_rgba(45,80,22,0.15)] rounded-[40px] overflow-hidden bg-white/95 backdrop-blur-sm">
                    <CardHeader className="donate-header text-center pb-8 pt-12 relative">
                        <div className="absolute top-6 right-8 text-secondary/30">
                            <Sparkles size={48} />
                        </div>
                        <CardTitle className="text-4xl md:text-5xl font-playfair font-black mb-4 text-primary leading-tight">
                            Fund a Child's <br/><span className="text-secondary">Breakthrough</span>
                        </CardTitle>
                        <CardDescription className="text-base text-muted-foreground font-lato">
                            Zero platform fees. 100% of your contribution goes directly to therapy.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-8 md:px-12 pb-12">

                        {/* STEP 1: AMOUNT AND NAME */}
                        {step === 1 && (
                            <div className="space-y-10">
                                <div className="grid grid-cols-2 gap-4 md:gap-6">
                                    {[{ v: 500, pop: false }, { v: 999, pop: false }, { v: 2500, pop: true }, { v: 5000, pop: false }].map((p) => (
                                        <div key={p.v} onClick={() => setAmount(p.v)} className={`amount-btn relative cursor-pointer p-6 rounded-3xl border-2 text-center transition-colors duration-300 flex items-center justify-center min-h-[100px] ${amount === p.v ? "border-primary bg-primary/5 shadow-inner" : "border-border hover:border-primary/40 hover:bg-muted/30"}`}>
                                            {p.pop && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-primary-foreground text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md animate-bounce">Most Popular</span>}
                                            <span className="font-playfair text-4xl font-black text-foreground">₹{p.v}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="donate-form-area space-y-8 mt-4">
                                    <div className="space-y-3 bg-muted/20 p-6 rounded-3xl border border-border">
                                        <Label className="text-sm font-bold text-primary uppercase tracking-wider ml-2">Your Name (For the Impact Wall)</Label>
                                        <Input placeholder="e.g., Anjali from Mumbai" value={donorName} onChange={(e) => setDonorName(e.target.value)} className="h-14 rounded-2xl bg-white border-transparent shadow-sm focus-visible:ring-secondary text-lg px-6" />
                                    </div>

                                    <Button onClick={handleProceedToQR} className="submit-btn w-full rounded-2xl h-16 text-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 group">
                                        Proceed to Pay ₹{amount}
                                    </Button>

                                    <div className="flex justify-center items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mt-2">
                                        <ShieldCheck size={16} className="text-secondary" /><span>Secure & 80G Tax Deductible</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: SCAN QR AND CONFIRM */}
                        {step === 2 && (
                            <div className="upi-reveal-container space-y-8 text-center bg-muted/10 p-2 rounded-3xl">
                                <div className="bg-white p-8 rounded-[32px] border border-border flex flex-col items-center shadow-lg relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary" />
                                    <h3 className="upi-element text-2xl font-black text-primary mb-8 font-playfair">Scan to Pay via UPI</h3>

                                    <div className="upi-element qr-box bg-background p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-border mb-8 flex justify-center items-center">
                                        <QRCodeSVG value={`upi://pay?pa=koalakuddle@bank&pn=Koala%20Kuddle%20Foundation&am=${amount}&cu=INR`} size={180} level={"H"} includeMargin={false} imageSettings={{ src: "/images/logo.jpg", height: 40, width: 40, excavate: true }} />
                                    </div>

                                    <div className="upi-element bg-muted/50 p-4 w-full max-w-sm rounded-2xl border border-border flex justify-between items-center hover:bg-muted transition-colors">
                                        <div className="text-left">
                                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Official UPI ID</p>
                                            <p className="font-black text-lg text-foreground font-lato tracking-wide">koalakuddle@bank</p>
                                        </div>
                                        <Button variant="secondary" size="icon" className="rounded-xl h-12 w-12 hover:scale-105 shadow-md" onClick={() => { navigator.clipboard.writeText("koalakuddle@bank"); alert("UPI ID Copied!"); }}>
                                            <Copy className="h-5 w-5 text-primary-foreground" />
                                        </Button>
                                    </div>
                                </div>

                                {/* NEW CONFIRMATION BUTTON */}
                                <div className="upi-element pt-4">
                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Done Scanning?</p>
                                    <Button disabled={isSubmitting} onClick={handleConfirmPayment} className="confirm-btn w-full rounded-2xl h-16 text-xl font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl shadow-secondary/20 group">
                                        <Heart className="mr-3 h-6 w-6 fill-primary text-primary group-hover:scale-125 transition-transform duration-300" />
                                        {isSubmitting ? "Updating Impact Wall..." : "I Have Completed the Payment"}
                                    </Button>
                                    <button onClick={() => setStep(1)} className="text-sm text-muted-foreground underline mt-4 hover:text-primary">Wait, I need to change details</button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: SUCCESS & WHATSAPP RECEIPT */}
                        {step === 3 && (
                            <div className="success-container space-y-8 text-center bg-primary/5 p-8 rounded-[32px] border border-primary/20">
                                <div className="success-element w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto shadow-lg shadow-primary/30 mb-6">
                                    <CheckCircle2 size={48} className="text-secondary" />
                                </div>
                                <h3 className="success-element text-3xl font-black text-primary font-playfair mb-4">Thank You, {donorName}!</h3>
                                <p className="success-element text-muted-foreground font-lato text-lg max-w-sm mx-auto">
                                    Your name has been added to our Impact Wall. To receive your 80G tax exemption receipt, please send us a screenshot of your successful transaction.
                                </p>
                                <div className="success-element pt-6">
                                    <Button className="rounded-full h-16 px-10 font-bold text-lg bg-[#25D366] hover:bg-[#20b858] text-white shadow-xl shadow-[#25D366]/30 hover:-translate-y-1 transition-transform" onClick={() => window.open(`https://wa.me/919999999999?text=Hi,%20I%20just%20donated%20Rs.%20${amount}.%20Here%20is%20my%20screenshot%20for%20the%20receipt.`, '_blank')}>
                                        Send Screenshot on WhatsApp
                                    </Button>
                                </div>
                            </div>
                        )}

                    </CardContent>
                </Card>
            </section>
        </main>
    );
}