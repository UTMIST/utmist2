import '@app/globals.css';
import { ReactNode } from 'react';
import Navbar from "@app/common/Navbar";
import Footer from "@app/common/Footer";
import { Providers } from '../providers';
import { FirebaseProvider } from '../firebase/firebase-provider';

import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${robotoMono.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/october-tamil" />
      </head>
      <body>
        <Providers>
          <FirebaseProvider>
            <Navbar />
            {children}
            <Footer />
          </FirebaseProvider>
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'UTMIST',
  description: 'UTMIST',
};