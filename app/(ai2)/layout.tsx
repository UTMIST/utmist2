import { ThemeProvider } from "@ai2/ThemeProvider";
import "@ai2/styles/globals.css";
import { Toaster } from "@ai2components/ui/toaster";
import { Toaster as Sonner } from "@ai2components/ui/sonner";
import { Providers } from '../providers';
import { FirebaseProvider } from '../firebase/firebase-provider';

export const metadata = {
  title: 'UTMIST: AI2 Tournament',
  description: 'UTMIST\'s RL Tournament Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          <FirebaseProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              storageKey="ai2-theme"
            >
              {children}
              <Toaster />
              <Sonner />
            </ThemeProvider>
          </FirebaseProvider>
        </Providers>
      </body>
    </html>
  )
}
