import Features from "@/components/sections/features";
import Hero from "@/components/sections/hero";
import Navbar from "@/components/sections/navbar";

export default function Home() {
	return (
		<main className="min-h-[100dvh]">
			<Navbar />
			<Hero />
			<Features />
		</main>
	);
}
