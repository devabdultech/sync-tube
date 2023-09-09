import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../providers/nextui-provider";
import { SessionWrapper } from "@/providers/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sync Tube",
	description: "Real-Time Synchronized Video Streaming and Chat Application"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionWrapper>
					<Providers>{children}</Providers>
				</SessionWrapper>
			</body>
		</html>
	);
}
