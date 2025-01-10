import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri: 'https://utmist2.vercel.app/api/auth/callback/google',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: CustomFirestoreAdapter(firebaseAdminConfig),
  pages: {
    // signIn: '/auth/signin', // Optional: Define if you have a custom sign-in page
    // error: '/auth/error',   // Optional: Define if you have a custom error page
    // signOut: '/auth/signout', // Optional: Define if you have a custom sign-out page
  },
  callbacks: {
    async signIn({ user, account }) {
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
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('http')) {
        return url;
      }
      return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    },
  },
});
