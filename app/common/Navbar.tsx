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

import { useState, useEffect, useRef } from "react";
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
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const handleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleSignIn = () => {
    signIn('google', { 
      callbackUrl: window.location.origin + '/'
    });
  };
  
  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#171C69] shadow-md font-roboto-mono h-14 flex items-center">
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
              <Link href="/wwd">
                <li className="inline-block ml-10 text-white">What We Do</li>
              </Link>
              <Link href="/alumni">
                <li className="inline-block ml-10 text-white">Impact & Alumni</li>
              </Link>
              <Link href="/projects">
                <li className="inline-block ml-10 text-white">Projects</li>
              </Link>
              <Link href="/sponsor">
                <li className="inline-block ml-10 text-white">Sponsor Us</li>
              </Link>
              <Link href="/join">
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
                    <div 
                      ref={profileMenuRef}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 overflow-hidden"
                    >
                      <Link 
                        href={`/user/${session.user.firestoreid}`} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
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
                    onClick={handleSignIn}
                    style={{ borderRadius: '8px', border: '1px solid #64C8FA' }}
                    className="bg-[#92DEFF] hover:bg-[#7BCFE6] text-[#1E1E1E] font-bold py-2 px-4 transition duration-200 shadow-md"
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
                <Link href="/wwd">What We Do</Link>
              </li>
              <li className="text-white mt-2">
                <Link href="/projects">Projects</Link>
              </li>
              <li className="text-white mt-2">
                <Link href="/alumni">Impact & Alumni</Link>
              </li>
              <li className="text-white mt-2">
                <Link href="/sponsor">Sponsor Us</Link>
              </li>
              <li className="text-white mt-2">
                <Link href="/join">Join Us</Link>
              </li>
              <li className="text-white mt-2 mb-2">
                <Link href="/calendar">Calendar</Link>
              </li>
              {session ? (
                <>
                  <li className="text-white mt-2">
                    <Link href={`/user/${session.user.firestoreid}`}>Profile</Link>
                  </li>
                  <li className="text-white mt-2">
                    <button onClick={() => signOut()}>Sign out</button>
                  </li>
                </>
              ) : (
                <li className="text-white mt-2">
                  <button onClick={handleSignIn}>
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}