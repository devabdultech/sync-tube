import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/sections/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sync Tube - Watching Together, No Matter The Distance",
	description: "Real-Time Synchronized Video Streaming and Chat Application"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn("min-h-[100dvh] bg-background text-primary", GeistSans.variable)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
					{children}
					<Footer />
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
