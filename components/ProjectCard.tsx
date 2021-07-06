import React from 'react';
import { ArrowRightIcon as ArrowRight } from '@heroicons/react/outline';
import { PROJECT } from '../utilities/types';
import { initializeProject } from '../utilities/controller/ProjectController';
import router from 'next/router';
import useProjectContext from '../utilities/context/ProjectContext';
import useLoadingContext from '../utilities/context/LoadingContext';

const ProjectCard = ({ title, description, firebaseConfig }: PROJECT) => {
    const { setInitializedProject } = useProjectContext();
    const { setLoading } = useLoadingContext();

    function handleClick() {
        setLoading!(true);
        const initializedProject = initializeProject(firebaseConfig);
        setInitializedProject && setInitializedProject(initializedProject);
        router.push(`/dashboard`);
    }
    return (
        <div
            className='card flex flex-row items-center justify-between space-x-8 group'
            onClick={handleClick}>
            <div className='flex flex-col justify-evenly group-hover:text-gray-800 w-auto h-full space-y-3'>
                <h1 className='text-xl font-semibold'>{title}</h1>
                <span>{`${description.slice(0, 150)}...`}</span>
            </div>
            <div className='h-full flex flex-col justify-center'>
                <ArrowRight className='w-5 h-5 text-white group-hover:text-_blue' />
            </div>
        </div>
    );
};

export default ProjectCard;
