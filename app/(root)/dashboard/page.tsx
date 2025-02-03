"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Ensure no extra margin or padding on the top */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="container mx-auto mt-4 p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}!</h1>
          <p>This is your dashboard. You can add more content here.</p>
        </div>
      </div>
    </div>
  );
}