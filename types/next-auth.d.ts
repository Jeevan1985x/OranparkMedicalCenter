import type { DefaultSession, User as DefaultUser } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  /**
   * Extends the built-in session.user object to include `id` and `role`.
   */
  export interface Session {
    user: DefaultSession["user"] & {
      id?: string;
      role?: Role;
    };
  }

  export interface User extends DefaultUser {
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  export interface JWT {
    role?: Role;
  }
}
