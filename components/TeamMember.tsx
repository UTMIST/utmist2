import { User } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";

type TeamMemberProps = {
  data: User;
};

export default function TeamMember({ data }: TeamMemberProps) {
  const memberPhoto = data.image || "/imgs/team/default.svg";

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-center mb-[1.5vh]">
        {data.socials?.LinkedIn && (
          <Link
            href={data.socials.LinkedIn}
            target="_blank"
            className="bg-linkedin w-[16px] h-[14px] mr-[0.25vw]"
          />
        )}
        {data.socials?.GitHub && (
          <Link
            href={data.socials.GitHub}
            target="_blank"
            className="bg-github w-[17px] h-[15px] ml-[0.25vw]"
          />
        )}
      </div>

      <div className="w-[158px] h-[151px] mb-[1.5vh] bg-[#C5C5C5] rounded-full overflow-hidden">
        <Image
          src={memberPhoto}
          alt={data.name || "Team member image"}
          width={158}
          height={151}
          className="object-cover"
        />
      </div>

      <div className="flex flex-row justify-center text-white font-roboto-mono text-[16px]">
        {data.name}
      </div>
    </div>
  );
}
