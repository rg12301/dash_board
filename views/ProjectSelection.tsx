import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { ViewGridAddIcon, ExclamationCircleIcon } from '@heroicons/react/solid';
import { getAllProjects } from '../utilities/controller/ProjectController';
import { PROJECT } from '../utilities/types';
import useLoadingContext from '../utilities/context/LoadingContext';
import Loading from '../components/Loading';
import { useRouter } from 'next/router';
import { auth } from '../utilities/firebase';

interface Props {}

const ProjectSelection = (props: Props) => {
    const router = useRouter();
    const [projects, setProjects] = useState<PROJECT[]>([]);
    const { loading, setLoading } = useLoadingContext();
    useEffect(() => {
        if (!auth().currentUser) {
            router.push('/');
        }
        getAllProjects().then((projectsData) => {
            if (projectsData) {
                setProjects(projectsData);
                setLoading!(false);
            }
        });
    }, []);

    return (
        <div className='min-h-screen'>
            <Navbar />
            <section className='p-4 md:p-10 lg:p-20'>
                {loading ? (
                    <div className='mt-24'>
                        <Loading />
                    </div>
                ) : (
                    <>
                        <div
                            className='mb-5 w-full flex flex-row justify-end cursor-pointer'
                            onClick={() => {
                                router.push(`/add_project`);
                            }}>
                            <button
                                className='btn p-1 md:p-2 lg:p-2.5 w-1/6 md:w-1/6 lg:w-1/12 flex flex-row justify-center space-x-2 items-center text-xs'
                                type='button'>
                                <ViewGridAddIcon className='w-5 h-5' />
                                <span className='hidden md:inline-block'>
                                    Add Project
                                </span>
                            </button>
                        </div>
                        {projects.length !== 0 ? (
                            <div className='grid grid-cols-1 md:grid-cols-2 md:grid-row-col gap-2 md:gap-5 lg:grid-cols-4'>
                                {projects.map((project) => {
                                    return (
                                        <ProjectCard
                                            key={
                                                project.firebaseConfig.projectId
                                            }
                                            title={project.title}
                                            description={project.description}
                                            firebaseConfig={
                                                project.firebaseConfig
                                            }
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <div className='text-3xl flex flex-row justify-center space-x-3 items-center mt-20 text-yellow-400'>
                                <ExclamationCircleIcon className='w-10 h-20' />
                                <span>No projects to display</span>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default ProjectSelection;
