'use client'

import Link from "next/link";

export default function LinkButton(props: {
  buttonText: string;
  redirectPath: string;
}) {
  return (
    <Link
      href={props.redirectPath}
      className="flex flex-col justify-center rounded-md bg-utmist-purple shadow-md text-[2.2vh] text-center w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]"
    >
      <div className="mx-auto text-white font-roboto-mono">{props.buttonText}</div>
    </Link>
  );
}
