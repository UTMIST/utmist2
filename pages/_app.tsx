import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/common/Navbar";
import Head from "next/head";
import { AppProps } from "next/app";
import Footer from "@/common/Footer";;
import { SessionProvider } from "next-auth/react";
import '@/styles/globals.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const isDashboard = router.pathname === '/dashboard';

  return (
    <SessionProvider session={session}>
      {!isDashboard && <Navbar />}
      <Component {...pageProps} />
      {!isDashboard && <Footer />}
    </SessionProvider>
  );
}

export default MyApp;
