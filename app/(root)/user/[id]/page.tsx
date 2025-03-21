"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@app/components/PageHeader";
import { useParams } from "next/navigation";
import { useFirebase } from "@app/firebase/useFirebase";
import { doc, getDoc, collection, query, where, getDocs, DocumentReference, updateDoc } from "firebase/firestore";
import { User as PublicUser } from "@app/schema/publicUser";
import { Project } from "@app/schema/project";
import { useSession } from 'next-auth/react';

// Import social icons
const socialIcons = {
  LinkedIn: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  GitHub: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  Twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
    </svg>
  ),
  GoogleScholar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
    </svg>
  ),
  Medium: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M0 0v24h24V0H0zm19.938 5.686L18.651 6.92a.376.376 0 0 0-.143.362v9.067a.376.376 0 0 0 .143.361l1.257 1.234v.271h-6.322v-.27l1.302-1.265c.128-.128.128-.165.128-.36V8.99l-3.62 9.195h-.49L6.69 8.99v6.163a.85.85 0 0 0 .233.707l1.694 2.054v.271H3.815v-.27L5.51 15.86a.82.82 0 0 0 .218-.707V8.027a.624.624 0 0 0-.203-.527L4.019 5.686v-.27h4.674l3.613 7.923 3.176-7.924h4.456v.271z"/>
    </svg>
  ),
  Website: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
    </svg>
  )
};

const EditProfileModal = ({ isOpen, onClose, userData, onSave }: { 
  isOpen: boolean, 
  onClose: () => void, 
  userData: PublicUser,
  onSave: (data: Partial<PublicUser>) => Promise<void>
}) => {
  const [displayName, setDisplayName] = useState(userData.displayName || "");
  const [image, setImage] = useState(userData.image || "");
  const [linkedIn, setLinkedIn] = useState(userData.socials?.LinkedIn || "");
  const [gitHub, setGitHub] = useState(userData.socials?.GitHub || "");
  const [twitter, setTwitter] = useState(userData.socials?.Twitter || "");
  const [googleScholar, setGoogleScholar] = useState(userData.socials?.GoogleScholar || "");
  const [medium, setMedium] = useState(userData.socials?.Medium || "");
  const [website, setWebsite] = useState(userData.socials?.Website || "");
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await onSave({
        displayName,
        image,
        socials: {
          LinkedIn: linkedIn,
          GitHub: gitHub,
          Twitter: twitter,
          GoogleScholar: googleScholar,
          Medium: medium,
          Website: website
        }
      });
      onClose();
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="text-sm text-red-600 mb-4">
            <p>Please note: Any inappropriate content or misuse of this feature may result in account suspension or termination. All changes are subject to review by administrators.</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Profile Image URL
              </label>
              <input
                id="image"
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Social Links</h3>
              
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="linkedin">
                  LinkedIn
                </label>
                <input
                  id="linkedin"
                  type="url"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="github">
                  GitHub
                </label>
                <input
                  id="github"
                  type="url"
                  value={gitHub}
                  onChange={(e) => setGitHub(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="twitter">
                  Twitter
                </label>
                <input
                  id="twitter"
                  type="url"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="scholar">
                  Google Scholar
                </label>
                <input
                  id="scholar"
                  type="url"
                  value={googleScholar}
                  onChange={(e) => setGoogleScholar(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="medium">
                  Medium
                </label>
                <input
                  id="medium"
                  type="url"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="website">
                  Personal Website
                </label>
                <input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-[#8B7FFF] hover:bg-[#7A6FEB] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="bg-[#1E1650] rounded-[25px] overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(148,97,255,0.5)] transition-all">
        <div className="absolute bg-black text-white py-1 px-3 rounded font-roboto-mono">
          {project.status}
        </div>
        <Image
          className="w-full h-48 object-cover"
          src={project.thumbnail}
          alt={project.title}
          width={400}
          height={192}
        />
        <div className="p-4 text-center bg-[#665ADF] hover:bg-[#7A6FEB] transition-colors cursor-pointer flex flex-col justify-center">
          <div className="font-bold text-left text-white font-roboto-mono">
            {project.title}
          </div>
          <p className="text-white text-left font-roboto-mono mt-1">
            {project.synopsis}
          </p>
        </div>
      </div>
    </Link>
  );
};

const UserProfile = () => {
  const params = useParams();
  const userId = params.id as string;
  const { db } = useFirebase();
  const { data: session } = useSession();
  const [userData, setUserData] = useState<PublicUser | null>(null);
  const [teamName, setTeamName] = useState<string>("Team");
  const [userTeams, setUserTeams] = useState<DocumentReference[]>([]);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  console.log(userId, session);
  const isOwnProfile = session?.user?.firestoreid === userId;

  const saveProfileChanges = async (data: Partial<PublicUser>) => {
    if (!db || !isOwnProfile || !userData) return;
    
    try {
      const userDocRef = doc(db, "publicUsers", userId);
      await updateDoc(userDocRef, {
        displayName: data.displayName,
        image: data.image,
        socials: {
          ...userData.socials,
          ...data.socials
        }
      });
      
      setUserData(prev => {
        if (!prev) return null;
        return {
          ...prev,
          displayName: data.displayName || prev.displayName,
          image: data.image || prev.image,
          socials: {
            ...prev.socials,
            ...data.socials
          }
        };
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (!db) {
      console.warn("[UserProfile] Database not initialized");
      setError("Database not initialized");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "publicUsers", userId);
        const userDocSnap = await getDoc(userDocRef);
        
        if (!userDocSnap.exists()) {
          setError("User not found");
          setLoading(false);
          return;
        }
        
        const publicUserData = userDocSnap.data() as PublicUser;
        
        const teamsRef = collection(db, "teams");
        const userRef = doc(db, "publicUsers", userId);
        const teamsQuery = query(teamsRef, where("members", "array-contains", userRef));
        const teamsSnapshot = await getDocs(teamsQuery);
        
        const userTeamRefs: DocumentReference[] = [];
        
        if (!teamsSnapshot.empty) {
          const teamDoc = teamsSnapshot.docs[0];
          const teamData = teamDoc.data();
          setTeamName(teamData.title || "Team");
          
          teamsSnapshot.docs.forEach(doc => {
            userTeamRefs.push(doc.ref);
          });
          
          setUserTeams(userTeamRefs);
        }
        
        if (userTeamRefs.length > 0) {
          const projectsRef = collection(db, "projects");
          const projectsQuery = query(projectsRef, where("teamId", "in", userTeamRefs));
          const projectsSnapshot = await getDocs(projectsQuery);
          
          if (!projectsSnapshot.empty) {
            const projects = projectsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })) as Project[];
            
            setUserProjects(projects);
          }
        }
        
        if (isMounted) {
          setUserData(publicUserData);
          setLoading(false);
        }
      } catch (error) {
        console.error("[UserProfile] Error fetching user data:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to fetch user data");
        }
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, [db, userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-dark-grey">
        <div className="text-white text-xl">Loading user profile...</div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-dark-grey">
        <div className="text-white text-xl">Error: {error || "User not found"}</div>
      </div>
    );
  }

    return (
        <>
            <div className="relative w-screen h-auto">
        <div className="relative w-screen h-auto bg-gradient-to-b from-[#131B6B] to-[#483EE0] pb-16 pt-32">
          <div className="mx-auto max-w-5xl px-4">
            <div className="rounded-[30px] bg-gradient-to-r from-[#8B7FFF] to-[#92DEFF] p-16 shadow-xl relative">
              <div className="absolute top-10 left-16 text-white text-2xl font-bold">
                {teamName}
              </div>
              
              {isOwnProfile && (
                <div className="absolute top-7 right-16">
                  <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="bg-transparent text-[#FF69B4] rounded-full w-12 h-12 flex items-center justify-center hover:opacity-80 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
              )}
              
              <div className="flex flex-col md:flex-row items-center justify-between mt-16">
                <div className="flex-1 text-white text-center md:pr-16">
                  <div className="text-3xl mb-6">@{userData.name}</div>
                  <div className="text-6xl font-bold mb-6">{userData.displayName}</div>
                  <div className="text-2xl mb-10">{userData.role}</div>
                  
                  {/* Social Media Links */}
                  {userData.socials && Object.entries(userData.socials).filter(([_, url]) => url).length > 0 && (
                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                      {Object.entries(userData.socials)
                        .filter(([_, url]) => url)
                        .map(([platform, url]) => (
                          <Link
                            key={platform}
                            href={url as string}
                            target="_blank"
                            className="flex items-center justify-center bg-indigo-900 p-2.5 rounded-full hover:bg-indigo-700 transition-colors"
                            title={platform}
                          >
                            {socialIcons[platform as keyof typeof socialIcons] || (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M14 9v2h-4v-2c0-1.104.897-2 2-2s2 .896 2 2zm10 3c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-8-1h-1v-2c0-1.656-1.343-3-3-3s-3 1.344-3 3v2h-1v6h8v-6z"/>
                              </svg>
                            )}
                          </Link>
                        ))}
                    </div>
                  )}
                  
                  <div className="mt-10">
                    <svg className="w-full h-24" viewBox="0 0 280 60">
                      <rect x="0" y="0" width="280" height="60" fill="none" />
                      {[...Array(40)].map((_, i) => (
                        <rect 
                          key={i} 
                          x={i * 7} 
                          y="0" 
                          width={Math.random() > 0.5 ? 3 : 2} 
                          height="60" 
                          fill="#000" 
                        />
                      ))}
                    </svg>
                  </div>
                </div>
                <div className="flex-shrink-0 mt-10 md:mt-0 md:ml-16">
                  <div className="rounded-[30px] overflow-hidden border-4 border-[#D285F1] w-80 h-80">
                    <Image
                      src={userData.image}
                      alt="Profile Picture"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-6 text-white text-center text-xl">
                    Joined: {userData.Joined ? (
                      typeof userData.Joined === 'object' && 'seconds' in userData.Joined ? 
                        new Date((userData.Joined as any).seconds * 1000).toLocaleDateString() : 
                        typeof userData.Joined === 'string' ? 
                          userData.Joined : 
                          userData.Joined instanceof Date ? 
                            userData.Joined.toLocaleDateString() : 
                            'NA'
                    ) : 'NA'}
                  </div>
                </div>
              </div>
                    </div>
                    </div>
          
          <div className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-white text-5xl font-roboto-mono font-normal">
                Projects
              </h2>
              <div className="mx-auto w-60 h-1 bg-gradient-to-r from-[#8B7FFF] to-[#92DEFF] mt-3"></div>
                    </div>
                    
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-16">
              {userProjects.length > 0 ? (
                userProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <div className="col-span-3 text-center text-white text-xl">
                  No projects found for this user.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {userData && (
        <EditProfileModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          userData={userData}
          onSave={saveProfileChanges}
        />
      )}
        </>
    );
};

export default UserProfile;