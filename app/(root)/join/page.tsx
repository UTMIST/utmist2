import FAQ from "@/components/joinUs/FAQ";

const joinUsData = [
  {
    title: "Join our Discord",
    imgPath: "/assets/Rectangle1.svg",
    buttonHref: "https://discord.gg/utm",
  },
  {
    title: "Sign up for our newsletter",
    imgPath: "/assets/Rectangle2.svg",
    buttonHref: "https://utmnewsletter.com",
  },
  {
    title: "Attend an event",
    imgPath: "/assets/Rectangle3.svg",
    buttonHref: "/events",
  },
  {
    title: "View our projects",
    imgPath: "/assets/Rectangle4.svg",
    buttonHref: "/projects",
  },
];

const InfoCard: React.FC<{
  title: string;
  imgPath: string;
  buttonHref: string;
}> = ({ title, imgPath, buttonHref }) => (
  <div className="text-center shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform">
    <img src={imgPath} alt={title} className="w-full h-40 object-cover" />
    <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
    <a
      href={buttonHref}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline"
    >
      Learn More
    </a>
  </div>
);

const JoinUs: React.FC = () => (
  <div className="bg-dark-grey text-white min-h-screen">
    {/* Banner */}
    <div className="w-screen h-[40vh] bg-cover bg-wwd-banner"></div>
    <div className="absolute left-[16.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
      <div>Join Us</div>
      <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
    </div>

    {/* Info Cards Section */}
    <div className="mt-[5vh] flex flex-col items-center">
      <h2 className="text-[3vh] font-bold">
        Get in Touch/Become A Member/Connect with us
      </h2>
      <p className="w-[60vw] text-center mt-4">
        UTMIST is committed to being an accessible school club. Membership is
        open to any UofT student regardless of faculty or campus affiliation.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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
    <div className="mt-16 px-4 text-center">
      <h2 className="text-[3vh] font-bold">Join the Team</h2>
      <div className="mt-4">
        <h3 className="font-semibold">Leadership Positions</h3>
        <p>We currently don’t have executive openings. Check back later!</p>
        <h3 className="mt-4 font-semibold">Regular Team Positions</h3>
        <p>We currently don’t have executive openings. Check back later!</p>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="mt-16 px-4">
      <h2 className="text-[3vh] font-bold text-center">
        Frequently Asked Questions
      </h2>
      <div className="mt-4 max-w-3xl mx-auto">
        <FAQ />
      </div>
    </div>
  </div>
);

export default JoinUs;
