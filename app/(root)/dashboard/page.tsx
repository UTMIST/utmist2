"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
    return (
      <div className="min-h-screen bg-background dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-hackathon-primary animate-pulse">
            UTMIST
          </h1>
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-hackathon-primary animate-progress"
              style={{ width: '45%' }}
            />
          </div>
        </div>
      </div>
    );
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