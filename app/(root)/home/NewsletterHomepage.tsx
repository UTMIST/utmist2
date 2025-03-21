import Image from "next/image";

export default function NewsletterHomepage() {
    return (
        <div className="relative flex justify-center items-center w-full h-[60vh] bg-[#001128] py-12">
            <div className="absolute inset-0">
                <Image 
                    src="/assets/Rectangle45.svg" 
                    layout="fill" 
                    objectFit="cover"
                    alt="Background Circuit Design"
                    className="opacity-40"
                />
            </div>

            <div className="relative bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-[25px] p-6 md:p-16 w-full max-w-4xl flex flex-col items-center shadow-lg mx-4">
                
                <h2 className="text-white text-2xl md:text-3xl font-bold text-center">
                    Subscribe to our newsletter
                </h2>
                <p className="text-white text-md md:text-lg opacity-80 mt-2 text-center">
                    Stay up to date on all things UTMIST
                </p>

                <form className="mt-6 flex w-full max-w-lg">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="flex-1 p-3 rounded-l-md text-black text-md outline-none"
                    />
                    <button 
                        type="submit" 
                        className="bg-[#64C8FA] hover:bg-[#4DB2E6] text-[#1E1E1E] font-semibold px-6 py-3 rounded-r-md shadow-md transition"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
}