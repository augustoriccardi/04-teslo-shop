import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";
import { z } from "zod";

export const { signIn, signOut, auth, handlers } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user) return null;

        if (user.password) {
          if (!bcryptjs.compareSync(password, user.password)) return null;
        }

        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
});
