import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the user is authenticated for the builder page
  const isAuthenticated = request.cookies.get("wedding_builder_auth")?.value === "true"
  const isBuilderPage = request.nextUrl.pathname.startsWith("/builder")

  // If trying to access builder page without authentication, redirect to login
  if (isBuilderPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/builder/:path*"],
}
