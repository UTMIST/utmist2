import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cert } from 'firebase-admin/app';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { CustomFirestoreAdapter } from '@/lib/customFirestoreAdapter';

// Firebase Admin SDK configuration 
const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  }),
};

if (!getApps().length) {
  initializeApp(firebaseAdminConfig);
}

export default NextAuth({
  providers: [
    process.env.VERCEL_ENV === "preview"
      ? CredentialsProvider({
          name: "Preview Account",
          credentials: {
            username: { label: "Username", type: "text", placeholder: "preview" },
            password: { label: "Password", type: "password" }
          },
          async authorize() {
            return {
              id: "preview-user",
              name: "Preview User",
              email: "preview@example.com",
              image: "https://i.pravatar.cc/150?u=preview@example.com",
            }
          },
        })
      : GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (process.env.VERCEL_ENV === "preview") {
        return true;
      }

      try {
        const adminAuth = getAuth();
        
        try {
          await adminAuth.getUserByEmail(user.email!);
        } catch (error) {
          await adminAuth.createUser({
            email: user.email!,
            displayName: user.name!,
            photoURL: user.image,
            emailVerified: true,
          });
        }
        
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async session({ session, user }) {
      if (session?.user) {
        if (process.env.VERCEL_ENV === "preview") {
          session.user.id = 'preview-user';
        } else {
          session.user.id = user.id;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: process.env.VERCEL_ENV === "preview" ? undefined : CustomFirestoreAdapter(firebaseAdminConfig),
});
