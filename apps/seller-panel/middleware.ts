import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

interface AuthNextRequest extends NextRequest {
  auth?: object | null
}

export default auth((req: AuthNextRequest) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if(nextUrl.pathname.startsWith("/api/auth")) return NextResponse.next();

//   if(nextUrl.pathname.startsWith("/api")) {
//     const adminKey = req.headers.get('adminKey');
//     if(!adminKey || adminKey !== `Bearer-${process.env.AUTH_SECRET}`) return NextResponse.json({ success: false, error: "Unauthorised"}, { status: 401 });
//     return NextResponse.next();
//   }

  if(isLoggedIn && nextUrl.pathname === "/") return NextResponse.redirect(new URL("/dashboard", nextUrl));
  if (!isLoggedIn && nextUrl.pathname !== "/") return NextResponse.redirect(new URL("/", nextUrl));

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ]
}