import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  // Get the session before running the middleware logic
  const { data: { session } } = await supabase.auth.getSession();

  // if session is signed in and the current path is /login redirect the session to /app
  if (session && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/app", req.url));
  }

  // if session is not signed in and the current path is not / redirect the session to /
  if (!session && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  
  return res;
}

export const config = {
  matcher: ["/app/:path*", "/login", "/"]
};