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

	// if session is signed in and the current path is /login redirect the session to /app
	if (session && req.nextUrl.pathname.startsWith("/login")) {
		return NextResponse.redirect(new URL("/app", req.url));
	}

	// if session is not signed in and the current path is /app redirect the session to /login
	if (!session && req.nextUrl.pathname.startsWith("/app")) {
		const code = req.nextUrl.searchParams.get("code");
		if (code) {
			return res;
		}
		return NextResponse.redirect(new URL("/login", req.url));
	}

	// if request is /r redirect to /app
	if (req.nextUrl.pathname === "/app/r") {
		return NextResponse.redirect(new URL("/app", req.url));
	}

	return res;
}

export const config = {
	matcher: ["/app/:path*", "/login", "/", "/app/r"]
};
