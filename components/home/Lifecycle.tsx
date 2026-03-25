"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HeartPulse, ShieldCheck, Activity, Users, GraduationCap } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Lifecycle() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 75%",
            }
        });

        tl.from(".lifecycle-title", { y: 30, opacity: 0, duration: 0.6 })
            .from(".lifecycle-line", { scaleX: 0, transformOrigin: "left center", duration: 0.8, ease: "power2.inOut" }, "-=0.2")
            .from(".lifecycle-step", {
                scale: 0,
                opacity: 0,
                rotation: -45,
                duration: 0.6,
                stagger: 0.15,
                ease: "back.out(1.7)"
            }, "-=0.6")
            .from(".lifecycle-text", { x: -30, opacity: 0, duration: 0.8, stagger: 0.2 }, "-=0.4")
            .from(".lifecycle-graphic", { scale: 0.8, opacity: 0, rotation: 10, duration: 1, ease: "elastic.out(1, 0.5)" }, "-=0.8");

    }, { scope: container });

    return (
        <section ref={container} id="lifecycle" className="py-24 px-5 max-w-7xl mx-auto overflow-hidden">
            <div className="text-center mb-20">
                <h2 className="lifecycle-title text-4xl font-black text-foreground uppercase tracking-wide font-lato mb-4">The Lifecycle Approach</h2>
                <div className="lifecycle-title w-20 h-1 bg-secondary mx-auto" />
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-16 mb-24 relative">
                <div className="lifecycle-line hidden md:block absolute top-12 left-[10%] right-[10%] h-[3px] bg-secondary/30 -z-10" />

                {[
                    { icon: HeartPulse, label: "EARLY SCREENING" },
                    { icon: ShieldCheck, label: "THERAPY FUNDING" },
                    { icon: Activity, label: "MILESTONE TRACKING" },
                    { icon: Users, label: "PARENT SUPPORT" },
                    { icon: GraduationCap, label: "INCLUSIVE SCHOOLING" },
                ].map((item, idx) => (
                    <div key={idx} className="lifecycle-step flex flex-col items-center w-28 text-center group cursor-pointer">
                        <div className="w-24 h-24 rounded-full border-[3px] border-secondary bg-white flex items-center justify-center mb-4 shadow-sm group-hover:bg-secondary transition-colors duration-300">
                            <item.icon className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                        </div>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider leading-tight group-hover:text-primary transition-colors">
              {item.label}
            </span>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6 text-muted-foreground leading-relaxed text-lg font-lato">
                    <p className="lifecycle-text">
                        Therapy is only effective when a child is consistently supported both in the clinic and at home. A child's window of early intervention is incredibly narrow.
                    </p>
                    <p className="lifecycle-text">
                        If parents cannot afford the monthly costs, the child drops out of therapy. Unless the mother and family are empowered, the child cannot be either. It is all interlinked.
                    </p>
                    <p className="lifecycle-text">
                        Our programmes evolved logically: from awareness camps to funding therapy at Continua Kids Giggles, to parental empowerment. Through the lifecycle approach, we ensure sustainable growth.
                    </p>
                </div>

                <div className="lifecycle-graphic relative aspect-square max-w-md mx-auto w-full">
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary/20 animate-[spin_60s_linear_infinite]" />
                    <div className="absolute inset-4 rounded-full border-4 border-secondary/40 flex items-center justify-center">
                        <div className="w-64 h-64 bg-primary rounded-full flex flex-col items-center justify-center text-primary-foreground text-center p-6 shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer">
                            <span className="text-6xl mb-2">🐨</span>
                            <span className="font-black text-2xl font-lato uppercase tracking-widest leading-tight">Empowered<br/>Child</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}