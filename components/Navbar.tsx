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

import Link from "next/link";
import { BadgePlus, LogOut } from 'lucide-react'
import Image from "next/image";
import { auth, signIn, signOut } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Navbar = async () => {
// export default function Navbar() {
  const session = await auth();

  return (
    <>
      <nav className="fixed font-roboto-mono bg-[#1E1E1E] z-10 w-full h-14 flex items-center">
        <div className="flex justify-between items-center px-4 w-full">
          <Link href="/"><Image src={`/UTMIST logo.png`} alt='logo' width={100} height={30}/></Link>
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center">
              <Link href="/about">
                <li className="inline-block ml-10 text-white">About Us</li>
              </Link>
              <Link href="/team">
                <li className="inline-block ml-10 text-white">Team</li>
              </Link>
              <Link href="/what-we-do">
                <li className="inline-block ml-10 text-white">What We Do</li>
              </Link>
              <Link href="/impact">
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
              <div className='flex items-center gap-5 text-black'>
                    {session && session?.user ? (
                        <>
                            <Link href="/projects/create">
                                <span className="max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden" />
                            </Link>
                            <form action={async ()=>{
                                "use server";
                                await signOut({redirectTo: "/"});
                            }}>
                                <button type='submit'>
                                    <span className="max-sm:hidden">Logout</span>
                                    <LogOut className="size-6 sm:hidden text-red-500" />
                                </button>
                            </form>
                            <Link href={`/user/${session?.id}`}>
                                <Avatar className='size-10'>
                                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""}/>
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                    ):(
                        <>
                            <form action={async () =>{
                                "use server";
                                await signIn('github');
                            }}>
                                <button type='submit'>Join Us</button>
                            </form>
                        </>
                    )}
                </div>
            </ul>
          </div>
        
        </div>
      </nav>
    </>
  );
}

export default Navbar