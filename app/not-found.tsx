import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Not Found - Sync Tube"
};

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<h2 className="mb-4 text-2xl font-bold">Not Found</h2>
			<p className="mb-4 text-lg">Oops this page not found. Nice to see you here thou :)</p>
			<Image src="/mad-computer.gif" alt="Mad at Computer GIF" width={300} height={300} />
			<p className="mt-4 text-lg">
				Go back{" "}
				<p>
					<Link className="text-green-400" href="/">
						[Home]
					</Link>
				</p>
			</p>
		</div>
	);
}
