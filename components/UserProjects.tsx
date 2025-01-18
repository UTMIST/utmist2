import { client } from '@/sanity/lib/client'
import { PROJECTS_BY_USER_QUERY } from '@/sanity/lib/queries';
import React from 'react'
import ProjectCard, { ProjectTypeCard } from './ProjectCard';

const UserProjects = async ({id}: {id: string}) => {

    const projects = await client.fetch(PROJECTS_BY_USER_QUERY, {id});

    return (
        <>
            {projects.length > 0 ? projects.map((project: ProjectTypeCard) => (
                <ProjectCard key={project._id} project={project}/>
            )):(
                <p className='no-result'>No Projects Yet</p>
            )}
        </>
    )
}

export default UserProjects