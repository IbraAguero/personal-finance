import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas/auth-schema";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("credenciales invalidas");
        }

        const user = await db.user.findUnique({ where: { email: data.email } });
        if (!user || !user.password) {
          throw new Error("credenciales invalidas");
        }

        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) {
          throw new Error("credenciales invalidas");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
