'use client';

import { ArrowLeft, Settings, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@ai2components/ui/button";
import { useRouter } from "next/navigation";
import { useTheme } from "@ai2components/ThemeProvider";

export const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full bg-background border-b border-border px-4 py-2 fixed top-0 left-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="h-4 w-4" />
            Return to UTMIST
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
            onClick={() => router.push('/ai2/dashboard')}
          >
            Dashboard
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button variant="ghost">
            <Settings className="h-5 w-5" />
          </Button>

          <Button variant="ghost">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};