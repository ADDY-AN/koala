"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ImpactGrid() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Stagger the boxes appearing
        gsap.from(".impact-box", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)"
        });

        // Animate the numbers counting up
        const numbers = gsap.utils.toArray<HTMLElement>(".count-up");
        numbers.forEach((num) => {
            const target = parseInt(num.getAttribute("data-target") || "0");
            gsap.to(num, {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 85%",
                },
                innerHTML: target,
                duration: 2,
                ease: "power2.out",
                snap: { innerHTML: 1 },
                onUpdate: function() {
                    // Format with commas and prefixes/suffixes if needed
                    const prefix = num.getAttribute("data-prefix") || "";
                    const suffix = num.getAttribute("data-suffix") || "";
                    num.innerHTML = `${prefix}${Math.ceil(Number(num.innerHTML)).toLocaleString()}${suffix}`;
                }
            });
        });
    }, { scope: container });

    return (
        <section ref={container} className="bg-primary py-20 px-5 border-b-8 border-secondary">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                <div className="impact-box px-4">
                    <div className="text-4xl md:text-6xl font-black text-secondary mb-2 font-lato">
                        <span className="count-up" data-target="1">0</span>
                    </div>
                    <div className="text-xs md:text-sm text-primary-foreground font-bold uppercase tracking-wider">Children in 6 Face Delays</div>
                </div>
                <div className="impact-box px-4">
                    <div className="text-4xl md:text-6xl font-black text-secondary mb-2 font-lato">
                        <span className="count-up" data-target="100" data-suffix="%">0</span>
                    </div>
                    <div className="text-xs md:text-sm text-primary-foreground font-bold uppercase tracking-wider">Donations to Therapy</div>
                </div>
                <div className="impact-box px-4">
                    <div className="text-4xl md:text-6xl font-black text-secondary mb-2 font-lato">
                        <span className="count-up" data-target="6000" data-prefix="₹">0</span>
                    </div>
                    <div className="text-xs md:text-sm text-primary-foreground font-bold uppercase tracking-wider">Avg Monthly Cost</div>
                </div>
                <div className="impact-box px-4">
                    <div className="text-4xl md:text-6xl font-black text-secondary mb-2 font-lato">
                        <span className="count-up" data-target="47">0</span>
                    </div>
                    <div className="text-xs md:text-sm text-primary-foreground font-bold uppercase tracking-wider">Children Reached</div>
                </div>
            </div>
        </section>
    );
}