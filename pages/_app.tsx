import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/common/Navbar";
import Head from "next/head";
import { AppProps } from "next/app";
import WwdHomepage from "./whatWeDo/WwdHomepage";
import SmallCard from "./whatWeDo/SmallCard";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />


      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
