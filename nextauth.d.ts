import NextAuth, { DefaultSession } from "next-auth";

// Esto arregla el problema del tipado de que la session no reconoce propiedades "role", "image" y "emailVerifed"
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerifed: boolean;
      role: string;
      image?: string;
    } & DefaultSession["user"];
  }
}
