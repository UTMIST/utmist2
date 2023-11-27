import Link from "next/link";

export default function LinkButton(props: {
  buttonText: string;
  redirectPath: string;
}) {
  return (
    <Link
      href={props.redirectPath}
      className="flex flex-col justify-center rounded-md bg-utmist-purple shadow-md text-[2.2vh] text-center sm:w-[25vw] sm:h-[7vh] lg:w-[8vw] lg:h-[4.9vh]"
    >
      <div className="mx-auto text-white font-roboto-mono px-[5%]">{props.buttonText}</div>
    </Link>
  );
}