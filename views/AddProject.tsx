import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { addProject } from '../utilities/controller/ProjectController';
import { useRouter } from 'next/router';
import { PROJECT } from '../utilities/types';
import useLoadingContext from '../utilities/context/LoadingContext';
import Loading from '../components/Loading';

interface Props {}

const AddProject = (props: Props) => {
    const { loading, setLoading } = useLoadingContext();
    const router = useRouter();

    useEffect(() => {
        setLoading!(false);
    }, []);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading!(true);
        const target = event.target as typeof event.target & {
            title: { value: string };
            description: { value: string };
            apiKey: { value: string };
            authDomain: { value: string };
            projectId: { value: string };
            storageBucket: { value: string };
            messagingSenderId: { value: string };
            appId: { value: string };
        };
        const project: PROJECT = {
            title: target.title.value,
            description: target.description.value,
            firebaseConfig: {
                apiKey: target.apiKey.value,
                authDomain: target.authDomain.value,
                projectId: target.projectId.value,
                storageBucket: target.storageBucket.value,
                messagingSenderId: target.messagingSenderId.value,
                appId: target.appId.value,
            },
        };
        addProject(project)
            .then(() => {
                router.push(`/project_selection`);
                setLoading!(true);
            })
            .catch(() => {
                router.reload();
                setLoading!(true);
            });
    }
    return (
        <section className='w-screen h-screen flex flex-col justify-start items-center px-3'>
            <Navbar />
            {loading ? (
                <Loading />
            ) : (
                <form
                    className='my-5 p-5 md:p-9 lg:p-10 flex flex-col space-y-10 w-full md:w-4/5 lg:w-8/12 border border-gray-300 rounded-xl'
                    onSubmit={handleSubmit}>
                    <h3 className='text-2xl font-semibold text-center'>
                        Enter Project Details
                    </h3>
                    <div className='flex flex-row items-center space-x-8'>
                        <div className='w-full'>
                            <div className='w-full flex flex-col justify-start items-start space-y-1'>
                                <label htmlFor='title'>Title</label>
                                <input
                                    className='input'
                                    type='text'
                                    name='title'
                                    required
                                />
                            </div>
                            <div className='w-full flex flex-col justify-start items-start space-y-1'>
                                <label htmlFor='description'>Description</label>
                                <textarea
                                    className='input'
                                    rows={12}
                                    name='description'
                                />
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full flex flex-col justify-start items-start space-y-1'>
                                <label htmlFor='projectId'>Project Id</label>
                                <input
                                    className='input'
                                    type='text'
                                    name='projectId'
                                    required
                                />
                            </div>
                            <div className='w-full flex flex-col justify-start items-start space-y-1'>
                                <label htmlFor='apiKey'>API Key</label>
                                <input
                                    className='input'
                                    type='text'
                                    name='apiKey'
                                    required
                                />
                            </div>
                            <div className='w-full flex flex-col justify-start items-start space-y-1'>
                                <label htmlFor='appId'>App ID</label>
                                <input
                                    className='input'
                                    type='text'
                                    name='appId'
                                    required
                                />
                            </div>
                            <div className='w-full flex flex-col justify-start items-start space-y-1'>
                                <label htmlFor='authDomain'>Auth Domain</label>
                                <input
                                    className='input'
                                    type='text'
                                    name='authDomain'
                                    required
                                />
                            </div>
                            <div className='w-full flex flex-col justify-start items-start space-y-1'>
                                <label htmlFor='storageBucket'>
                                    Storage Bucket
                                </label>
                                <input
                                    className='input'
                                    type='text'
                                    name='storageBucket'
                                    required
                                />
                            </div>
                            <div className='w-full flex flex-col justify-start items-start space-y-1'>
                                <label htmlFor='messagingSenderId'>
                                    Messaging Sender ID
                                </label>
                                <input
                                    className='input'
                                    type='text'
                                    name='messagingSenderId'
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center space-y-3'>
                        <button className='btn px-5 py-3 w-full' type='submit'>
                            Add Project
                        </button>
                    </div>
                </form>
            )}
        </section>
    );
};

export default AddProject;
