import type { NextAuthConfig } from "next-auth";

const authenticatedRoutes = [
  "/cart",
  "empty",
  "/checkout",
  "/profile",
  "/orders",
  "/admin",
];
const isOnAuthenticatedRoutes = (onRoute: string) => {
  return authenticatedRoutes.some((authRoutes) =>
    onRoute.startsWith(authRoutes)
  );
};

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  // el user es el "rest"
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (isOnAuthenticatedRoutes(nextUrl.pathname)) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
