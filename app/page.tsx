"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
	const { data: session, status } = useSession();

	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<h1>Sync Tube</h1>

			{session && (
				<>
					<div>
						<h2>Signed in as {session.user?.email}</h2>
						<p>
							Go to <a href="/room">room</a>
						</p>
					</div>
					<button onClick={() => signOut()}>Sign out</button>
				</>
			)}

			<button onClick={() => signIn("google", { callbackUrl: "http://localhost:3000/room" })}>
				Sign in with Google
			</button>
		</main>
	);
}
