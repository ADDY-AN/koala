// src/app/page.tsx
import HeroCarousel from "@/components/home/HeroCarousel";
import ImpactGrid from "@/components/home/ImpactGrid";
import Lifecycle from "@/components/home/Lifecycle";
import CorePrograms from "@/components/home/CorePrograms";

export default function Home() {
    return (
        <main className="min-h-screen bg-background overflow-hidden">
            <HeroCarousel />
            <ImpactGrid />
            <Lifecycle />
            <CorePrograms />
        </main>
    );
}