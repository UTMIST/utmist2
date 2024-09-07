'use client';

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

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import logo from "public/assets/UTMIST logo.png";
import Hamburger from "public/assets/Hamburger.png";
import defaultAvatar from "public/assets/default-avatar.png"; // Import your fallback image

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const handleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <>
      <nav className="fixed font-roboto-mono bg-[#1E1E1E] z-10 w-full h-14 flex items-center">
        <div className="flex justify-between items-center px-4 w-full">
          <Link href="/">
            <Image src={logo} alt="logo" className="cursor-pointer h-9 w-auto"/>
          </Link>
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center">
              <Link href="/about">
                <li className="inline-block ml-10 text-white">About Us</li>
              </Link>
              <Link href="/team">
                <li className="inline-block ml-10 text-white">Team</li>
              </Link>
              <Link href="/whatWeDo">
                <li className="inline-block ml-10 text-white">What We Do</li>
              </Link>
              <Link href="/impactAndAlumni">
                <li className="inline-block ml-10 text-white">Impact & Alumni</li>
              </Link>
              <Link href="/projects">
                <li className="inline-block ml-10 text-white">Projects</li>
              </Link>
              <Link href="/sponsorUs">
                <li className="inline-block ml-10 text-white">Sponsor Us</li>
              </Link>
              <Link href="/joinUs">
                <li className="inline-block ml-10 text-white">Join Us</li>
              </Link>
              <Link href="/calendar">
                <li className="inline-block ml-10 text-white">Calendar</li>
              </Link>
              {session ? (
                <li className="inline-block ml-10 relative">
                  <Image
                    src={session.user.image ?? defaultAvatar} // Use defaultAvatar as fallback
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full cursor-pointer"
                    onClick={handleProfileMenu}
                  />
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Dashboard
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </li>
              ) : (
                <li className="inline-block ml-10">
                  <button
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
          <button onClick={handleNav} className="lg:hidden">
            <Image src={Hamburger} alt="hamburger" width={22} height={19}/>
          </button>
        
          <div className={menuOpen ? "fixed top-12 right-0 bg-[#1E1E1E] h-screen w-[45%] text-center lg:hidden" : "hidden"}>
            <ul>
              <li className="text-white">
                <Link href="/about">About Us</Link>
              </li>
              <li className="text-white mt-2">
                <Link href="/team">Team</Link>
              </li>
              <li className="text-white mt-2">
                <Link href="/whatWeDo">What We Do</Link>
              </li>
              <li className="text-white mt-2">
                <Link href="/projects">Projects</Link>
              </li>
              <li className="text-white mt-2">
                <Link href="/impactAndAlumni">Impact & Alumni</Link>
              </li>
              <li className="text-white mt-2">
                <Link href="/sponsorUs">Sponsor Us</Link>
              </li>
              <li className="text-white mt-2">
                <Link href="/joinUs">Join Us</Link>
              </li>
              <li className="text-white mt-2 mb-2">
                <Link href="/calendar">Calendar</Link>
              </li>
              {session ? (
                <>
                  <li className="text-white mt-2">
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li className="text-white mt-2">
                    <button onClick={() => signOut()}>Sign out</button>
                  </li>
                </>
              ) : (
                <li className="text-white mt-2">
                  <button onClick={() => signIn('google')}>Login</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}