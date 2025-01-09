import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { cert } from 'firebase-admin/app';
import { initializeApp, getApps } from 'firebase-admin/app';

// Firebase Admin SDK configuration B
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter(firebaseAdminConfig),
  pages: {
    // signIn: '/auth/signin', // Optional: Define if you have a custom sign-in page
    // error: '/auth/error',   // Optional: Define if you have a custom error page
    // signOut: '/auth/signout', // Optional: Define if you have a custom sign-out page
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to the dashboard after sign-in
      return `${baseUrl}/dashboard`;
    },
  },
});
