import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });

	// Get the session before running the middleware logic
	const {
		data: { session }
	} = await supabase.auth.getSession();

	// if session is signed in and the current path is /login redirect the session to /dashboard
	if (session && req.nextUrl.pathname.startsWith("/login")) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	// if session is not signed in and the current path is /dashboard redirect the session to /login
	if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
		const code = req.nextUrl.searchParams.get("code");
		if (code) {
			return res;
		}
		return NextResponse.redirect(new URL("/login", req.url));
	}

	// if session is not signed in and the current path is /room/:id redirect the session to /login
	if (!session && req.nextUrl.pathname.startsWith("/room")) {
		const code = req.nextUrl.searchParams.get("code");
		if (code) {
			return res;
		}
		return NextResponse.redirect(new URL("/login", req.url));
	}

	// if request is /room redirect to /dashboard
	if (req.nextUrl.pathname === "/room") {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	const roomPathMatch = req.nextUrl.pathname.match(/^\/room\/([^/]+)/);

	// If the current request path is /room/:id
	if (roomPathMatch) {
		const roomId = roomPathMatch[1];

		// Query Supabase Room table to check if the room with roomId exists
		const { data: room } = await supabase
			.from("Room")
			.select("room_id")
			.eq("room_id", roomId)
			.single();

		// If the room does not exist, return a JSON response with a 404 status code
		if (!room) {
			return NextResponse.redirect(new URL("/not-found", req.url));
		}
	}

	return res;
}

export const config = {
	matcher: ["/dashboard/:path*", "/login", "/", "/room/:path*"]
};
