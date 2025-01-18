import { cn, formatDate } from "@/lib/utils";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Project, User } from '@/sanity/types';
import { EyeIcon } from 'lucide-react';
import { Skeleton } from "./ui/skeleton";

export type ProjectTypeCard = Omit<Project, 'user'> & { user?: User };

const ProjectCard = ({ project }: { project: ProjectTypeCard }) => {
    const { _createdAt, views, user, title, category, _id, image, description, status } = project;

    return (
        <li className="rounded-md overflow-hidden bg-black shadow-lg w-362 project-card group">
            <div className="absolute bg-black text-white py-1 px-3 rounded font-roboto-mono">
                {status}
            </div>
            <img src={image} alt="Card Image" className="w-full h-315" />
            <div className="px-6 py-4">
                <div className="flex items-center gap-3">
                    {user?.image && (
                        <Link href={`/user/${user._id}`}>
                            <Image src={user.image} alt={user.name || 'User Avatar'} width={48} height={48} className="rounded-full" />
                        </Link>
                    )}
                    <div>
                        <Link href={`/user/${user?._id}`} className="font-bold text-white font-roboto-mono">
                            {user?.name || 'Unknown User'}
                        </Link>
                    </div>
                </div>
                <div className="font-bold text-white font-roboto-mono mt-4">{title}</div>
                <p className="text-white font-roboto-mono">{description}</p>
            </div>
            <div className="flex justify-between px-6 mt-4">
                <p className="text-white">{category}</p>
                <div className="flex items-center gap-2">
                    <EyeIcon />
                    <span>{views}</span>
                </div>
            </div>
            <div className="px-6 py-4">
                <Button asChild>
                    <Link href={`/projects/${_id}`}>Details</Link>
                </Button>
            </div>
        </li>
    );
};

export const ProjectCardSkeleton = () => (
    <>
      {[0, 1, 2, 3, 4, 5].map((index: number) => (
        <li key={index} className="project-card_skeleton">
          <Skeleton className="h-48 w-full bg-gray-200 rounded-md" />
          <div className="mt-4">
            <Skeleton className="h-6 w-3/4 bg-gray-200" />
            <Skeleton className="h-6 w-1/2 mt-2 bg-gray-200" />
          </div>
          <Skeleton className="h-24 w-full mt-4 bg-gray-200 rounded-md" />
          <div className="mt-4 flex justify-between">
            <Skeleton className="h-6 w-1/4 bg-gray-200" />
            <Skeleton className="h-8 w-20 bg-gray-200 rounded-md" />
          </div>
        </li>
      ))}
    </>
  );

export default ProjectCard;
