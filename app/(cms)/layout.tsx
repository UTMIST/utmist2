import '@app/globals.css';
import { ReactNode } from 'react';
import { Providers } from '../providers';
import { FirebaseProvider } from '../firebase/firebase-provider';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <FirebaseProvider>
            {children}
          </FirebaseProvider>
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'UTMIST CMS',
  description: 'UTMIST CMS',
};