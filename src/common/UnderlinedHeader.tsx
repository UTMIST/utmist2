"use client";

interface UnderlinedHeaderProps {
  text: string;
  underlineColor?: string; // optional color prop with a default value
}

export default function UnderlinedHeader({ text, underlineColor = "#00349F" }: UnderlinedHeaderProps) {
  return (
    // <div className="absolute left-[16.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
    //   <div>{text}</div>
    //   <div className="h-[6px]" style={{ backgroundColor: underlineColor, width: "13.1vw" }}></div>
    // </div>
    <div className="px-[7.4vw] font-roboto-mono text-white text-[24px] font-[700] mb-[3vh]">
      <div className="mb-[1vh]">{text}</div>
      <div className="h-[6px]" style={{ backgroundColor: underlineColor, width: "8.1vw" }}></div>
    </div>
  );
}
