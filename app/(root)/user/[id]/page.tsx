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
                Your Projects
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