import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Retrieve the JWT token from cookies
  const token = request.cookies.get("jwttoken");

  // If the token is missing, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/home/:path+"], // Apply middleware to all routes under /home
};
