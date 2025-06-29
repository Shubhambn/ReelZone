// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        const isPublic =
          pathname === "/" ||
          pathname === "/login" ||
          pathname === "/register" ||
          pathname === "/api/auth" ||
          pathname.startsWith("/welcome");

        // ✅ Public routes are always allowed
        if (isPublic) return true;

        // ✅ Everything else is protected: require token
        return !!token;
      },
    },
  }
);

// ✅ Match all routes except static assets
export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
