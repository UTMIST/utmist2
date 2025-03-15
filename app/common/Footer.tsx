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
import stripedBg from "public/imgs/fillers/striped_bg.png";

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
  <Link href={href} className="mx-4 my-3">
    <div className="flex items-center space-x-3 group">
      <Image
        src={src}
        className="hover:filter duration-200 ease-in-out brightness-[.5] hover:brightness-100 group-hover:filter-none w-6 h-6"
        alt={alt}
        width={24}
        height={24}
      />

      <span className="font-['Roboto_Mono'] font-normal text-zinc-300 text-xl transition-colors duration-200 ease-in-out group-hover:text-white">
        {text}
      </span>
    </div>
  </Link>
);

export default function Footer() {
  return (
    <>
      <div className="w-full bg-blue-800 relative overflow-hidden">
        {/* Background Stripe Pattern */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
          <Image 
            src={stripedBg} 
            alt="Background pattern" 
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "right center"
            }}
            className="opacity-100"
          />
        </div>

        {/* Larger Screens */}
        <div className="hidden lg:block relative z-10 container mx-auto px-8 py-10">
          <div className="flex items-center justify-center max-w-5xl mx-auto">
            <div className="w-1/3 pr-10">
              <Image src={logo} alt="UTMIST Logo" className="w-full h-auto" />
            </div>
            
            <div className="w-2/3">
              <div className="mb-10">
                <h2 className="font-['Roboto_Mono'] font-bold text-white text-2xl mb-5">
                  Find us at:
                </h2>
                <div className="flex flex-wrap">
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
              
              <div>
                <h2 className="font-['Roboto_Mono'] font-bold text-white text-2xl mb-5">
                  Workspaces
                </h2>
                <div className="flex flex-wrap">
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

        {/* Mobile */}
        <div className="lg:hidden relative z-10 px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="w-2/5 pr-4">
              <Image src={logo} alt="UTMIST Logo" className="w-full h-auto" />
            </div>
            
            <div className="w-3/5">
              <div className="mb-5">
                <h2 className="font-['Roboto_Mono'] font-bold text-white text-lg mb-3">
                  Find us at:
                </h2>
                <div className="flex flex-wrap">
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

              <div>
                <h2 className="font-['Roboto_Mono'] font-bold text-white text-lg mb-3">
                  Workspaces
                </h2>
                <div className="flex flex-wrap">
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
      </div>
    </>
  );
}
