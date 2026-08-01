import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/** Hostnames that should land on the Desafio Fit Club page instead of the teleconsulta home. */
const FITCLUB_HOSTS = ["lannyfitclub.com.br", "www.lannyfitclub.com.br"];

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isFitClubDomain = FITCLUB_HOSTS.some((h) => host === h || host.startsWith(`${h}:`));

  if (isFitClubDomain && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/desafio-fitclub";
    return NextResponse.rewrite(url);
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/",
    "/admin/:path*",
  ],
};
