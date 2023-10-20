"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function RoomLayout({ children }: { children: React.ReactNode }) {
	const supabase = createClientComponentClient();
	const session = supabase.auth.getSession();
	const router = useRouter();

	useEffect(() => {
		if (!session) {
			router.replace("/");
		}
	}, [supabase.auth, router, session]);
	return <>{children}</>;
}
