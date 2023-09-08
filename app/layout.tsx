import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../providers/nextui-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sync Tube",
  description: "Real-Time Synchronized Video Streaming and Chat Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
