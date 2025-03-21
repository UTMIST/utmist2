"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@app/components/PageHeader";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left font-roboto-mono text-lg p-6 rounded-t-2xl bg-white/20 backdrop-blur-sm opacity-90 flex justify-between items-center transition-colors hover:bg-white/30"
        style={{ 
          borderBottomLeftRadius: isOpen ? '0' : '1rem',
          borderBottomRightRadius: isOpen ? '0' : '1rem'
        }}
      >
        <span>{question}</span>
        <svg 
          className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-b-2xl border-t border-white/20">
              <p className="font-roboto-mono">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function SponsorPage() {
  const faqs: FAQItemProps[] = [
    {
      question: "How can organizations partner with UTMIST?",
      answer: "Organizations can partner with UTMIST through sponsorship packages, collaborative research initiatives, hosting events, or providing mentorship opportunities. We offer various tiers of partnerships tailored to your organization's goals and engagement level."
    },
    {
      question: "What benefits do partners receive?",
      answer: "Partners receive exclusive access to talented students, branding presence at our events, recruitment opportunities, showcase of technologies, and engagement with cutting-edge AI research and projects developed by our community."
    },
    {
      question: "How long does a partnership last?",
      answer: "Standard partnerships are established on an annual basis, aligning with the academic year. However, we're flexible and can discuss custom timeframes based on specific initiatives or organizational needs."
    },
    {
      question: "How can I get more information about partnership opportunities?",
      answer: "Please contact our partnerships team at partnerships@utmist.org to discuss potential collaboration opportunities or to request our detailed partnership prospectus."
    }
  ];

  return (
    <>
      <div className="relative w-screen h-auto">
        <PageHeader title="Become a UTMIST Partner" />

        <div className="mt-[-0vh] flex flex-col justify-around items-center text-white">
          
          <div className="w-full py-24 bg-gradient-to-b from-[#131B6B] to-[#4B3EE0] min-h-[40vh] flex items-center">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <p className="text-2xl md:text-3xl mb-12 font-october-tamil leading-relaxed max-w-4xl mx-auto">
                At UTMIST, we produce in-house academic content, spearhead design teams 
                to collaborate on machine learning and infrastructure projects, and host 
                annual milestone events, empowering our members to become the next 
                generation of engineers, researchers, and leaders in AI/ML.
              </p>
              <button className="bg-[#4B9EFF] hover:bg-[#3A7DD3] text-white font-roboto-mono py-3 px-8 rounded-md transition-colors text-lg">
                Get Involved
              </button>
            </div>
          </div>

          <div className="w-full relative py-32 min-h-[100vh] flex items-center">
            <div className="absolute inset-0 z-0">
              <Image 
                src="/imgs/fillers/webbed_links_bg.png" 
                alt="Webbed Background" 
                fill
                sizes="100vw"
                style={{ 
                  objectFit: "cover",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#131B6B] to-[#4B3EE0] opacity-70 mix-blend-multiply"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                <div className="rounded-[30px] p-12 bg-gradient-to-br from-[#8B7FFF] to-[#92DEFF] text-white bg-opacity-80 backdrop-blur-sm shadow-lg opacity-90 h-[500px] flex flex-col justify-center">
                  <h3 className="font-roboto-mono font-bold text-2xl mb-6">Contribute to AI Innovation</h3>
                  <p className="font-roboto-mono text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum leo urna vel vehiculum eu. Sed in suscipit enim, in lacinia. Nullam ut enim ornare, consectetur nunc a felis.
                  </p>
                </div>
                
                <div className="rounded-[30px] p-12 bg-gradient-to-br from-[#8B7FFF] to-[#92DEFF] text-white bg-opacity-80 backdrop-blur-sm shadow-lg opacity-90 h-[500px] flex flex-col justify-center">
                  <h3 className="font-roboto-mono font-bold text-2xl mb-6">Contribute to AI Innovation</h3>
                  <p className="font-roboto-mono text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum leo urna vel vehiculum eu. Sed in suscipit enim, in lacinia. Nullam ut enim ornare, consectetur nunc a felis.
                  </p>
                </div>
                
                <div className="rounded-[30px] p-12 bg-gradient-to-br from-[#8B7FFF] to-[#92DEFF] text-white bg-opacity-80 backdrop-blur-sm shadow-lg opacity-90 h-[500px] flex flex-col justify-center">
                  <h3 className="font-roboto-mono font-bold text-2xl mb-6">Contribute to AI Innovation</h3>
                  <p className="font-roboto-mono text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum leo urna vel vehiculum eu. Sed in suscipit enim, in lacinia. Nullam ut enim ornare, consectetur nunc a felis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full py-20 bg-gradient-to-b from-[#131B6B] to-[#4B3EE0] min-h-[60vh] flex items-center">
            <div className="max-w-6xl mx-auto px-6 w-full">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="mb-8 md:mb-0">
                  <h2 className="font-roboto-mono font-bold text-3xl">Partner Benefits</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 flex-grow">
                  <div className="rounded-[40px] p-12 bg-gradient-to-br from-[#8B7FFF] to-[#92DEFF] text-white text-center shadow-lg opacity-90 min-h-[250px] flex flex-col justify-center">
                    <div className="font-roboto-mono font-bold text-5xl mb-4">1500+</div>
                    <p className="font-roboto-mono text-lg">Lorem Ipsum Dolor</p>
                  </div>
                  
                  <div className="rounded-[40px] p-12 bg-gradient-to-br from-[#8B7FFF] to-[#92DEFF] text-white text-center shadow-lg opacity-90 min-h-[250px] flex flex-col justify-center">
                    <div className="font-roboto-mono font-bold text-5xl mb-4">1500+</div>
                    <p className="font-roboto-mono text-lg">Lorem Ipsum Dolor</p>
                  </div>
                  
                  <div className="rounded-[40px] p-12 bg-gradient-to-br from-[#8B7FFF] to-[#92DEFF] text-white text-center shadow-lg opacity-90 min-h-[250px] flex flex-col justify-center">
                    <div className="font-roboto-mono font-bold text-5xl mb-4">1500+</div>
                    <p className="font-roboto-mono text-lg">Lorem Ipsum Dolor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full relative">
            <div className="fixed-bg w-full h-[100vh] overflow-hidden relative">
              <Image 
                src="/imgs/headers/header1.png" 
                alt="FAQ Background" 
                fill
                sizes="100vw"
                style={{ 
                  objectFit: "cover",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#131B6B] to-[#4B3EE0] opacity-70 mix-blend-multiply"></div>
            </div>
            
            <div className="relative z-10 py-32 min-h-[90vh]">
              <div className="max-w-4xl mx-auto px-6">
                <h2 className="font-roboto-mono font-bold text-3xl mb-16 text-center">Frequently Asked Questions</h2>
                
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <FAQItem 
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fixed-bg {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
        }
      `}</style>
    </>
  );
}
