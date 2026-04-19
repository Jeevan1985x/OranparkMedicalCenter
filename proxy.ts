import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth;

// Configure which paths the proxy should run on.
export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/appointments/:path*"],
};
