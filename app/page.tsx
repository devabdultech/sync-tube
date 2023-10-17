"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main className="flex min-h-[100dvh] flex-col items-center  bg-black text-white">
			<h1>Sync Tube</h1>
			<p>Real-Time Synchronized Video Streaming and Chat Application</p>
			<Button>Get Started</Button>
		</main>
	);
}
