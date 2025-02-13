import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("Middleware running for:", req.nextUrl.pathname);
    const isAuthenticated = !!req.nextauth.token;
    console.log("Is authenticated:", isAuthenticated);

    // Allow access to the login page even if not authenticated
    if (!isAuthenticated) {

      console.log("Redirecting unauthenticated user to /login");
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Prevent logged-in users from accessing the login page
    if (isAuthenticated && req.nextUrl.pathname === "/login") {
      console.log("Redirecting authenticated user from /login to /");
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  },
  {
    callbacks: { authorized: ({ token }) => !!token },
  }
);

// Ensure middleware applies to all relevant routes
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
