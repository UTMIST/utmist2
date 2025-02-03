'use client';

import { Header } from "@ai2/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <div className="pt-16 p-4 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-center text-hackathon-text dark:text-white">
          Welcome to the UTMIST AI2 Tournament!
        </h1>
      </div>
    </div>
  );
};

export default Index;