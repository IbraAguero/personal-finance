import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { defaultCategories } from "./lib/default-categories";
import { defaultWallets } from "./lib/deafult-wallets";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    session: ({ session, token }) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  events: {
    async linkAccount({ user }) {
      if (!user.id) throw new Error("No se encontró el ID del usuario");

      await db.category.createMany({
        data: defaultCategories.map((cat) => ({
          ...cat,
          userId: user.id!,
        })),
      });

      await db.wallet.createMany({
        data: defaultWallets.map((wallet) => ({
          ...wallet,
          userId: user.id!,
        })),
      });
    },
  },
  ...authConfig,
});
