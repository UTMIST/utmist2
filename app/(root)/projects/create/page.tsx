import ProjectForm from '@/components/ProjectForm'
import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation';

const page = async () => {
    
    const session = await auth();

    if(!session) redirect("/")

    return (
        <>
            <section className='blue_container !min-h-[230px]'>
                <h1 className='heading'>Submit Your Project</h1>
            </section>

            <ProjectForm />
        </>
    )
}

export default page