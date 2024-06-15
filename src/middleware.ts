import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Get the user token from cookies
  const token = request.cookies.get("token")?.value;
  const reqPath = request.nextUrl.pathname;
  // Set the public paths and regex for /shop paths
  const publicPaths = ["/login", "/signup", "/"];
  const publicShopPathRegex = /^\/shop(\/.*)?$/; // to match all paths after /shop/:paths
  const isPublicPath =
    publicPaths.some((path) => path === reqPath) ||
    publicShopPathRegex.test(reqPath);
  const isAuthReq = reqPath === "/login" || reqPath === "/signup";
  // Check if the user is already logged in to prevent him from going to login or signup pages
  if (token && isAuthReq) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // Check if the path is private and the user is not logged in to send him to login first
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // to check if the use is admin i'll do it in the dashboard layout cuz here i can'nt access database here
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/cart",
    "/",
    "/shop/:path*",
    "/cart",
    "/checkout",
  ],
};