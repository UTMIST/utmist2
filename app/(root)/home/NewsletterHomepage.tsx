import LinkButton from "@app/common/LinkButton";
import LinkButtonSmall from "@app/common/LinkButtonSmall"
import Image from 'next/image'

export default function NewsletterHomepage() {
    return (
        <div className="lg:px-[7vw] lg:py-[23vh] sm:py-[13vh] sm:px-[13vw] bg-[#001128] font-roboto-mono">
            <div className="w-full lg:flex flex-row items-center gap-[11vw] sm:hidden">
                <div>
                    <div className="w-[37.5vw] h-[92px] text-white text-[30px]">
                        Subscribe to our newsletter
                    </div>
                    <div className="px-[1.6vw]">
                        <form className="flex bg-white w-[37.5vw] h-[50px] mb-[38px]">
                            <input className="items-center w-[100%] px-[32px]" placeholder="Email Address" />
                        </form>
                        <LinkButton buttonText="Subscribe" redirectPath="/" />
                    </div>
                </div>
                <Image src="/assets/newsletterPageImage.svg" width={451} height={321} alt="newsletter subscription image" />
            </div>
            <div className="lg:hidden sm:flex gap-[37px] flex-col items-center">
                <div className="text-[24px] text-white">
                    Subscribe to our newsletter
                </div>
                <form className="flex bg-white w-full h-[40px]">
                    <input className="items-center w-[100%] px-[24px]" placeholder="Email Address" />
                </form>
                <LinkButtonSmall buttonText="Subscribe" redirectPath="/" />
                <div className="w-[249px] h-[182px]">
                    <Image 
                        src="/assets/newsletterPageImage.svg" 
                        width={249} 
                        height={182} 
                        alt="newsletter subscription image"
                    />
                </div>
            </div>

        </div>
    );
}