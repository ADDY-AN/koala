"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CorePrograms() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".campaign-header", {
            scrollTrigger: { trigger: container.current, start: "top 80%" },
            y: 30, opacity: 0, duration: 0.6
        });

        gsap.from(".campaign-card", {
            scrollTrigger: { trigger: container.current, start: "top 70%" },
            y: 100,
            opacity: 0,
            rotationX: -15,
            transformOrigin: "top center",
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });
    }, { scope: container });

    return (
        <section ref={container} id="campaigns" className="py-24 px-5 max-w-7xl mx-auto bg-white">
            <div className="text-center mb-16">
                <h2 className="campaign-header text-3xl font-black text-foreground uppercase tracking-wide font-lato mb-4">Our Initiatives in Action</h2>
                <div className="campaign-header w-16 h-1 bg-secondary mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-[1000px]">
                {[
                    {
                        title: "EARLY SCREENINGS",
                        img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=600",
                        desc: "Conducting free developmental screening camps in local Bhagalpur schools and marginalized communities to identify delays early."
                    },
                    {
                        title: "THERAPY SPONSORSHIPS",
                        img: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=600",
                        desc: "Directly funding life-changing speech, occupational, and behavioral therapy sessions at Continua Kids Giggles for families who cannot afford it."
                    },
                    {
                        title: "PARENT WORKSHOPS",
                        img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600",
                        desc: "Educating and empowering parents to continue therapeutic practices at home, replacing stigma with science and fear with support."
                    },
                    {
                        title: "NGO INTERNSHIPS",
                        img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600",
                        desc: "Partnering with local colleges to offer NGO internships, building a recurring pool of motivated youth volunteers for community impact."
                    }
                ].map((card, idx) => (
                    <div key={idx} className="campaign-card group flex flex-col bg-muted/30 rounded-t-2xl hover:bg-muted/60 transition-colors duration-500">
                        <div className="relative h-64 overflow-hidden rounded-t-2xl shadow-md">
                            <img
                                src={card.img}
                                alt={card.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                            <h3 className="absolute bottom-5 left-5 right-5 text-2xl font-black text-white uppercase leading-tight font-lato transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                {card.title}
                            </h3>
                        </div>
                        <div className="p-6 flex flex-col flex-grow border-x border-b border-border rounded-b-2xl">
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                                {card.desc}
                            </p>
                            <Link
                                href="/programs"
                                className="text-primary font-black text-sm uppercase tracking-wider flex items-center gap-1 hover:text-secondary transition-colors w-fit group-hover:gap-3 duration-300"
                            >
                                know more <ArrowRight className="w-4 h-4" strokeWidth={3} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}