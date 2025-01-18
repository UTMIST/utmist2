import Link from "next/link";


export default function SmallCard(props: {title: string, imgPath: string, buttonHref: string}) {
  const className = "lg:w-[19vw] lg:h-[25vh] sm:w-[40vw] sm:h-[40vw] border border-white bg-[".concat(props.imgPath).concat("]")
  String 
  return (
    <div className={className}>
      <Link href={props.buttonHref}>
        <div className="w-[90%] lg:pt-[15.7vh] sm:pt-[18vh] px-[3vw] font-roboto-mono text-white">
          {props.title}
        </div>
      </Link>
    </div>
  );
}