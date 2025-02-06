'use client';

import { ArrowLeft, Settings, LogOut, Moon, Sun } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@ai2components/ui/button";
import { useRouter } from "next/navigation";
import { useTheme } from "@ai2components/ThemeProvider";
import { siDiscord } from 'simple-icons';
// import { Notification } from "@app/hooks/useNotifications";
import { useNotifications } from '@app/context/NotificationsContext';

import { NotificationsPanel } from "@app/components/NotificationsPanel";

export const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const { notifications, markRead } = useNotifications();

  const handleSignIn = () => {
    signIn('google', { 
      callbackUrl: window.location.origin + '/'
    });
  };

  return (
    <header className="w-full bg-background border-b border-border px-4 py-2 fixed top-0 left-0 z-50 transition-colors duration-200">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            // onClick={() => router.back()}
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => router.push('/ai2')}
          >
            AI2
          </Button>

          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => router.push('/ai2/teams')}
          >
            Teams
          </Button>


          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => router.push('/ai2/dashboard')}
          >
            Dashboard
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <NotificationsPanel 
            notifications={notifications}
            markRead={markRead}
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {session ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut()}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignIn}
            >
              <Settings className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};