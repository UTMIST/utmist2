"use client";

import React from "react";

const joinUsData = [
  {
    title: "Join our Discord",
    imgPath: "Rectangle3.svg",
    buttonHref: "#",
  },
  {
    title: "Sign up for our newsletter",
    imgPath: "Rectangle1.svg",
    buttonHref: "#",
  },
  {
    title: "Attend an event",
    imgPath: "Rectangle4.svg",
    buttonHref: "#",
  },
  {
    title: "View our projects",
    imgPath: "Rectangle2.svg",
    buttonHref: "#",
  },
];

const InfoCard: React.FC<{
  title: string;
  imgPath: string;
  buttonHref: string;
}> = ({ title, imgPath, buttonHref }) => (
  <a
    href={buttonHref}
    target="_blank"
    rel="noopener noreferrer"
    className="block text-center shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform"
  >
    <div className="bg-[#121212]">
      <img src={imgPath} alt={title} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="bg-[#121212] text-[1.5vh] pt-1 pb-1 pr-3 pl-3 text-white">{title}</h3>
    </div>
  </a>
);

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How do I become a member?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "How do I become a member?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "How do I become a member?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "How do I become a member?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "How do I become a member?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="mt-16 flex flex-col items-start pl-[16.7vw] pr-[16.7vw] pb-16">
      <h2 className="text-[2.3vh] font-roboto-mono">Frequently Asked Questions</h2>
      <div className="bg-[#00349F] w-[6vw] h-[6px]"></div>
      <div className="mt-8 w-full">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border border-white border-[1px] mb-4 overflow-hidden font-roboto-mono transition-colors ${
              openIndex === index ? "bg-[#8434c9]" : "hover:bg-gray-800"
            }`}
            style={{ width: "100%" }}
          >
            <button
              className="w-full text-left px-6 py-3 bg-transparent text-white flex justify-between items-center transition-colors font-roboto-mono"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span>{faq.question}</span>
              <span className="text-xl font-roboto-mono icon">
                {openIndex === index ? "▲" : "▼"}
              </span>
            </button>
            <div
              className={`${
                openIndex === index ? "block" : "hidden"
              } px-6 py-4 bg-[#092242] text-white text-[1.6vh] font-roboto-mono`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const JoinUs: React.FC = () => (
  <div className="bg-dark-grey text-white min-h-screen">
    {/* Banner */}
    <div className="w-screen h-[40vh] bg-cover bg-wwd-banner"></div>
    <div className="absolute left-[16.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
      <div>Join Us</div>
      <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
    </div>

    {/* Info Cards Section */}
    <div className="mt-[5vh] flex flex-col items-start pl-[16.7vw] pr-[16.7vw]">
      <h2 className="text-[2.3vh] font-roboto-mono mt-5">
        Get in Touch/Become A Member/Connect with us
      </h2>
      <div className="bg-[#00349F] w-[6vw] h-[6px]"></div>
      <p className="text-[1.6vh] mt-6 font-roboto-mono">
        UTMIST is committed to being an accessible school club. Membership is
        open to any UofT student regardless of faculty or campus affiliation.
      </p>
      <div className="font-roboto-mono grid grid-cols-1 w-[67vw] sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 items-center">
        {joinUsData.map((item) => (
          <InfoCard
            key={item.title}
            title={item.title}
            imgPath={item.imgPath}
            buttonHref={item.buttonHref}
          />
        ))}
      </div>
    </div>

    {/* Team Section */}
    <div className="mt-[5vh] flex flex-col items-start pl-[16.7vw] pr-[16.7vw]">
      <h2 className="text-[2.3vh] font-roboto-mono">
        Join the Team
      </h2>
      <div className="bg-[#00349F] w-[6vw] h-[6px]"></div>
      <div className="mt-8 font-roboto-mono space-y-4">
        <div>
          <h3 className="text-[1.8vh] font-medium">Leadership Positions</h3>
          <p className="text-[1.6vh] font-roboto-mono">We currently don’t have executive openings. Check back later!</p>
        </div>
        <div>
          <h3 className="text-[1.8vh] font-medium mt-8">Regular Team Positions</h3>
          <p className="text-[1.6vh] font-roboto-mono">We currently don’t have executive openings. Check back later!</p>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <FAQSection />
  </div>
);

export default JoinUs;
