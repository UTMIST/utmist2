"use client";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  imageOverlayClass?: string;
  imageFilterStyle?: object;
  imageSrc?: string;
}

export default function PageHeader({ 
  title, 
  imageOverlayClass = "bg-[#3749E4] opacity-60 mix-blend-overlay", 
  imageFilterStyle = { 
    objectFit: "cover", 
    objectPosition: "center 30%", 
    filter: "brightness(.9) contrast(1) saturate(1.2) hue-rotate(00deg)",
  },
  imageSrc = "/imgs/headers/header1.png"
}: PageHeaderProps) {
  return (
    <>
      <div className="w-screen h-[60vh] bg-cover relative">
        <Image 
          src={imageSrc} 
          alt="Header Image" 
          fill
          sizes="100vw"
          style={imageFilterStyle}
        />
        <div className={`absolute inset-0 ${imageOverlayClass}`}></div>
      </div>
      <div className="absolute left-[8.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
        <div className="font-bold">{title}</div>
        <div className="bg-[#DA92F6] w-[11.1vw] h-[6px]"></div>
      </div>
    </>
  );
} 