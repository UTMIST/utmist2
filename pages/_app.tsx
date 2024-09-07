import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/common/Navbar";
import Head from "next/head";
import { AppProps } from "next/app";
import Footer from "@/common/Footer";;
import { SessionProvider } from "next-auth/react";
import '@/styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
