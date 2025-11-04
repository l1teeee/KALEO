import Hero from '@/app/Components/Hero/Hero';
import Lives from '@/app/Components/Lives/Lives';
import BreathSection from "@/app/Components/Breath/BreathSection";

export default function Home() {
    return (
        <main>
            <Hero />
            <Lives />
            <BreathSection />
        </main>
    );
}