import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const session = await getSession();

	console.log("Session:", session);
	if (session) {
		return NextResponse.next();
	}

	console.log("Redirecting to home page");
	return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
	matcher: "/room/:id*"
};
