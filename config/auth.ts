import { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CustomFirestoreAdapter } from '@app/firebase/customFirestoreAdapter';
import { cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  }),
};

export const authOptions: NextAuthOptions = {
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
      async session({ session, token }) {
        if (session?.user) {
          // session.user.id = token?.sub ?? 'unknown';
          const adminAuth = getAuth();
          const firebaseUser = await adminAuth.getUserByEmail(session.user.email!);
          session.user.id = firebaseUser.uid;
          const adminDb = getFirestore();
          try {
            const userQuery = await adminDb.collection('users')
              .where('email', '==', session.user.email!)
              .limit(1)
              .get();
            const userDoc = userQuery.docs[0];
            // console.log("[AI2] User doc:", userDoc?.data(), session.user.email);
            session.user.displayName = userDoc?.data()?.displayName || session.user.name;
            session.user.firestoreid = userDoc?.data()?.id;
          } catch (error) {
            console.error("Error fetching user document:", error);
          }
        }
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.sub = user.id;
        }
        return token;
      }
    },
    secret: process.env.NEXTAUTH_SECRET!,
    adapter: process.env.VERCEL_ENV === "preview" ? undefined : CustomFirestoreAdapter(firebaseAdminConfig),
  };