import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
const { auth: middleware } = NextAuth(authConfig);

const publicRoutes = ["/login", "/register"];
const apiAuthPrefix = "/api";

export default middleware((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;

  if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
