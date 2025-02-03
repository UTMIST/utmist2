/*
 * Copyright (C) 2023 UTMIST (utorontomist@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use client'
import Link from "next/link";
import Image from "next/image";
import logo from "public/assets/UTMIST circular logo.svg";
import emailLogo from "public/assets/Email.svg";
import facebookLogo from "public/assets/FB.svg";
import instagramLogo from "public/assets/Insta.svg";
import twitterLogo from "public/assets/X.svg";
import linkedinLogo from "public/assets/LinkedinIcon.svg";
import discordLogo from "public/assets/Disc.svg";
import githubLogo from "public/assets/GitH.svg";
import gitlabLogo from "public/assets/GitLab.svg";
import mediumLogo from "public/assets/Medium.svg";
import youtubeLogo from "public/assets/YT.svg";

interface SocialMediaLinkProps {
  href: string;
  src: string;
  alt: string;
  text: string;
}

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({
  href,
  src,
  alt,
  text,
}) => (
  <Link href={href}>
    <div className="flex space-x-2 group">
      <Image
        src={src}
        className="hover:filter duration-200 ease-in-out brightness-[.5] hover:brightness-100 group-hover:filter-none"
        alt={alt}
      />

      <span className="font-['Roboto_Mono'] text-zinc-300 text-lg transition-colors duration-200 ease-in-out group-hover:text-white">
        {text}
      </span>
    </div>
  </Link>
);

export default function Footer() {
  return (
    <>
      <div className="w-full bg-blue-800">
        {/* Mobile */}
        <div className="lg:hidden">
          <div className="flex flex-row justify-center items-center py-4 space-x-20">
            <div className="text-center text-white">
              <div className="text-lg font-bold font-['Roboto_Mono'] text-white text-lg my-2 py-5">
                Social Media
              </div>
              <div className="flex flex-col justify-center space-y-2">
                <SocialMediaLink
                  href="mailto:utorontomist@gmail.com"
                  src={emailLogo}
                  alt="Email"
                  text="Email"
                />
                <SocialMediaLink
                  href="https://www.facebook.com/UofT.MIST"
                  src={facebookLogo}
                  alt="Facebook"
                  text="Facebook"
                />
                <SocialMediaLink
                  href="https://www.instagram.com/uoft_utmist"
                  src={instagramLogo}
                  alt="Instagram"
                  text="Instagram"
                />
                <SocialMediaLink
                  href="https://twitter.com/UTMIST1"
                  src={twitterLogo}
                  alt="Twitter"
                  text="Twitter"
                />
                <SocialMediaLink
                  href="https://www.linkedin.com/company/utmist/"
                  src={linkedinLogo}
                  alt="LinkedIn"
                  text="LinkedIn"
                />
              </div>
            </div>

            <div className="text-center text-white">
              <div className="text-lg font-bold font-['Roboto_Mono'] text-white text-lg my-2 py-5">
                Workspaces
              </div>
              <div className="flex flex-col justify-center space-y-2">
                <SocialMediaLink
                  href="https://discord.com/invite/88mSPw8"
                  src={discordLogo}
                  alt="Discord"
                  text="Discord"
                />
                <SocialMediaLink
                  href="https://github.com/UTMIST"
                  src={githubLogo}
                  alt="Github"
                  text="Github"
                />
                <SocialMediaLink
                  href="https://gitlab.com/utmist"
                  src={gitlabLogo}
                  alt="Gitlab"
                  text="Gitlab"
                />
                <SocialMediaLink
                  href="https://medium.com/@utorontomist"
                  src={mediumLogo}
                  alt="Medium"
                  text="Medium"
                />
                <SocialMediaLink
                  href="https://youtube.com/channel/UC7G_kmlXrUUvoHyfT3ZTxaw"
                  src={youtubeLogo}
                  alt="YouTube"
                  text="YouTube"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center py-4">
            <div className="w-1/8 max-w-xs">
              <Image src={logo} alt="UTMIST Logo" className="w-full h-auto" />
            </div>
          </div>
        </div>

        {/* Larger */}
        <div className="hidden lg:flex lg:items-center lg:py-10 lg:w-full lg:justify-center">
          <div className="flex flex-col justify-center">
            <div className="mr-8">
              <Image src={logo} alt="UTMIST Logo" className="w-auto h-auto" />
            </div>
          </div>

          <div>
            <div className="text-left text-white mb-8">
              <div className="text-xl font-bold font-['Roboto_Mono'] text-white text-lg mb-4">
                Social Media
              </div>
              <div className="flex flex-row space-x-14">
                <SocialMediaLink
                  href="mailto:utorontomist@gmail.com"
                  src={emailLogo}
                  alt="Email"
                  text="Email"
                />
                <SocialMediaLink
                  href="https://www.facebook.com/UofT.MIST"
                  src={facebookLogo}
                  alt="Facebook"
                  text="Facebook"
                />
                <SocialMediaLink
                  href="https://www.instagram.com/uoft_utmist"
                  src={instagramLogo}
                  alt="Instagram"
                  text="Instagram"
                />
                <SocialMediaLink
                  href="https://twitter.com/UTMIST1"
                  src={twitterLogo}
                  alt="Twitter"
                  text="Twitter"
                />
                <SocialMediaLink
                  href="https://www.linkedin.com/company/utmist/"
                  src={linkedinLogo}
                  alt="LinkedIn"
                  text="LinkedIn"
                />
              </div>
            </div>
            <div className="text-left text-white">
              <div className="text-xl font-bold font-['Roboto_Mono'] text-white text-lg mb-4">
                Workspaces
              </div>
              <div className="flex flex-row space-x-14">
                <SocialMediaLink
                  href="https://discord.com/invite/88mSPw8"
                  src={discordLogo}
                  alt="Discord"
                  text="Discord"
                />
                <SocialMediaLink
                  href="https://github.com/UTMIST"
                  src={githubLogo}
                  alt="Github"
                  text="Github"
                />
                <SocialMediaLink
                  href="https://gitlab.com/utmist"
                  src={gitlabLogo}
                  alt="Gitlab"
                  text="Gitlab"
                />
                <SocialMediaLink
                  href="https://medium.com/@utorontomist"
                  src={mediumLogo}
                  alt="Medium"
                  text="Medium"
                />
                <SocialMediaLink
                  href="https://youtube.com/channel/UC7G_kmlXrUUvoHyfT3ZTxaw"
                  src={youtubeLogo}
                  alt="YouTube"
                  text="YouTube"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
