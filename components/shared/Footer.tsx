// src/components/shared/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t-[8px] border-secondary relative z-50">
            <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-4 gap-12 mb-12">

                {/* BRAND COLUMN WITH LOGO */}
                <div className="space-y-6 md:col-span-1">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-16 h-16 overflow-hidden rounded-full shadow-lg border-2 border-secondary bg-white">
                            <Image
                                src="/images/koala-logo.png"
                                alt="Koala Kuddle Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="leading-tight">
                            <span className="block font-playfair font-black text-2xl text-white">Koala Kuddle</span>
                            <span className="block text-[10px] font-bold text-secondary tracking-widest uppercase">Kids Foundation</span>
                        </div>
                    </Link>
                    <p className="text-primary-foreground/80 font-lato text-sm leading-relaxed">
                        Ensuring no child's progress is paused because a parent cannot pay for therapy.
                    </p>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h4 className="font-bold text-secondary uppercase tracking-widest mb-6 text-sm">Explore</h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><Link href="/about" className="hover:text-secondary transition-colors">Our Story</Link></li>
                        <li><Link href="/programs" className="hover:text-secondary transition-colors">Our Programs</Link></li>
                        <li><Link href="/get-involved" className="hover:text-secondary transition-colors">Volunteer</Link></li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div className="md:col-span-2">
                    <h4 className="font-bold text-secondary uppercase tracking-widest mb-6 text-sm">Reach Out</h4>
                    <ul className="space-y-4 text-sm text-primary-foreground/90">
                        <li className="flex items-start gap-3">
                            <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                            <span>Bhagalpur, Bihar, India</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={18} className="text-secondary shrink-0" />
                            <a href="mailto:hello@koalakuddle.org" className="hover:text-white">hello@koalakuddle.org</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* BOTTOM COPYRIGHT */}
            <div className="max-w-7xl mx-auto px-5 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/60 font-medium">
                <p>© {new Date().getFullYear()} Koala Kuddle Kids Foundation. All rights reserved.</p>
                <p className="flex items-center gap-1">Made with <Heart size={12} className="text-secondary fill-secondary" /> for Bhagalpur</p>
            </div>
        </footer>
    );
}