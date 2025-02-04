'use client';

import { TeamCreate } from "@ai2components/TeamCreate";
import { useNavigate } from "react-router-dom";
import { Header } from "@ai2components/Header";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { collection, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@app/firebase/firebase-provider";
import { useState } from "react";
import { useFirebase } from "@app/firebase/useFirebase";
import { useEffect } from "react";

const DashboardCreatePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { db } = useFirebase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      if (status === 'authenticated' && session?.user?.email && db) {
        try {
          const registrationDoc = await getDoc(doc(db, 'AI2Registration', session.user.email));

          if (registrationDoc.exists() && registrationDoc.data().team !== null) {
            console.log("[AI2] User already registered");
            // send back to dashboard
            router.push('/ai2/dashboard');
          }
        } catch (error) {
          console.error('Error fetching team:', error);
        } finally {
          setLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [status, session, db]);

  if (status === 'loading' || loading) {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated' || !session) {
    signIn('google', { callbackUrl: window.location.origin + '/ai2/dashboard' });
    return null;
  }

  const handleTeamCreated = (teamName: string) => {
    // localStorage.setItem("teamName", teamName);
    router.push('/ai2/dashboard');
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <div className="pt-16 p-4 flex flex-col items-center justify-center">
        <TeamCreate onTeamCreated={handleTeamCreated} />
      </div>
    </div>
  );
};

export default DashboardCreatePage;