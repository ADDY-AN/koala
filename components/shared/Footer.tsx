// src/components/shared/Footer.tsx
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground pt-16 pb-8 px-5 border-t-4 border-secondary">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-12">
                <div>
                    <h3 className="font-playfair text-2xl font-bold mb-4 text-secondary">Koala Kuddle</h3>
                    <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-sm">
                        Wrapping underprivileged little ones in therapy, hope, and warm kuddles. Ensuring no child's progress is paused due to financial constraints.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-primary-foreground/80">
                        <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                        <li><Link href="/programs" className="hover:text-secondary transition-colors">Our Programs</Link></li>
                        <li><Link href="/get-involved" className="hover:text-secondary transition-colors">Volunteer</Link></li>
                        <li><Link href="/donate" className="hover:text-secondary transition-colors">Sponsor a Child</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">Legal & Contact</h4>
                    <ul className="space-y-2 text-sm text-primary-foreground/80">
                        <li>Registered NGO in India</li>
                        <li>All donations are 80G Tax Deductible</li>
                        <li className="pt-4">Email: hello@koalakuddle.org</li>
                        <li>Bhagalpur, Bihar, India</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto text-center text-xs text-primary-foreground/50 pt-8 border-t border-primary-foreground/10">
                © {new Date().getFullYear()} Koala Kuddle Kids Foundation. All rights reserved.
            </div>
        </footer>
    );
}