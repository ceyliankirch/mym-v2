// auth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // On utilise les JWT car on utilise un provider "Credentials" (Email/MDP)
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.prenom = user.prenom;
        token.nom = user.nom;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.prenom = token.prenom;
        session.user.nom = token.nom;
      }
      return session;
    }
  },
  pages: {
    signIn: "/", // Si NextAuth veut rediriger vers une page de login, on le renvoie à l'accueil (vu qu'on a une modale)
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        // 1. Chercher l'utilisateur en base de données
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        if (!user || !user.password) return null; // Utilisateur non trouvé ou pas de mot de passe
        
        // 2. Vérifier si le mot de passe correspond au hash en base
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isPasswordValid) return null; // Mauvais mot de passe
        
        // 3. Connexion réussie ! On retourne l'utilisateur
        return user;
      }
    })
  ]
});