import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@config/auth";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

if (!getApps().length) {
  const firebaseAdminConfig = {
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") as string,
    }),
  };
  initializeApp(firebaseAdminConfig);
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const adminAuth = getAuth();
    // const adminAuth = getAuth();
    // const customToken = await adminAuth.createCustomToken(session.user.id);
    // return NextResponse.json({ token: customToken });
    const firebaseUser = await adminAuth.getUserByEmail(session.user.email!);
    const customToken = await adminAuth.createCustomToken(firebaseUser.uid);
    return NextResponse.json({ token: customToken });
  } catch (error) {
    console.error("Error creating custom token:", error);
    return NextResponse.json({ error: "Error creating custom token" }, { status: 500 });
  }
}
