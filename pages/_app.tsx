import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/common/Navbar";
import Head from "next/head";
import { AppProps } from "next/app";
import Footer from "@/common/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />

      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
