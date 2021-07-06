import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { USER } from '../utilities/types';
import useLoadingContext from '../utilities/context/LoadingContext';
import Loading from '../components/Loading';
import { firestore } from '../utilities/firebase';
import { addUser } from '../utilities/controller/UserController';
import { ArrowNarrowLeftIcon, UserCircleIcon } from '@heroicons/react/outline';
import AddIcon from '@material-ui/icons/Add';

interface Props {}

const AddUser = (props: Props) => {
    const router = useRouter();
    const { loading, setLoading } = useLoadingContext();
    const [profileImage, setProfileImage] = useState<File | undefined>();
    const [profileImageUrl, setProfileImageUrl] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);

    useEffect(() => {
        setLoading!(false);
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading!(true);
        const target = event.target as typeof event.target & {
            name: { value: string };
            email: { value: string };
            role: { value: 'Admin' | 'Manager' | 'Developer' };
            password: { value: string };
        };

        const user: USER = {
            name: target.name.value,
            lastAccessed: firestore.FieldValue.serverTimestamp(),
            email: target.email.value,
            profileImage: '',
            role: target.role.value,
        };

        await addUser(user, target.password.value, profileImage)
            .then(() => {
                router.push(`/`);
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
                    className='mt-5 px-5 md:px-9 lg:px-14 py-20 flex flex-col space-y-10 w-full md:w-2/3 lg:w-4/12 border border-gray-300 rounded-xl'
                    onSubmit={handleSubmit}>
                    <div className='w-full'>
                        <ArrowNarrowLeftIcon
                            className='hover:text-_blue cursor-pointer w-7 h-7'
                            onClick={() => {
                                setLoading!(true);
                                router.push(`/`);
                            }}
                        />
                    </div>
                    <h3 className='text-2xl font-semibold text-center'>
                        Enter User Details
                    </h3>
                    <div className='flex flex-col items-center space-y-5'>
                        <div>
                            <input
                                type='file'
                                name='profile_image'
                                id='profile_image'
                                accept='image/*'
                                className='hidden'
                                onChange={(event) => {
                                    setUploading(true);
                                    if (event.target.files) {
                                        setProfileImage(event.target.files[0]);
                                        const url = URL.createObjectURL(
                                            event.target.files[0],
                                        );
                                        setProfileImageUrl(url);
                                    }
                                    setUploading(false);
                                }}
                            />
                            {uploading ? (
                                <div className='w-24 h-24'>
                                    <Loading />
                                </div>
                            ) : (
                                <label
                                    htmlFor='profile_image'
                                    className='mx-auto my-auto cursor-pointer'>
                                    {profileImageUrl ? (
                                        <div className='w-24 h-24 rounded-full overflow-hidden'>
                                            <img
                                                src={profileImageUrl}
                                                className='w-24 h-24 rounded-full object-cover'
                                            />
                                        </div>
                                    ) : (
                                        <UserCircleIcon className=' w-24 h-24' />
                                    )}
                                </label>
                            )}
                        </div>
                        <input
                            className='input'
                            type='text'
                            name='name'
                            placeholder='Name'
                        />
                        <select className='input' name='role'>
                            <option value='Admin'>Admin</option>
                            <option value='Manager'>Manager</option>
                            <option value='Developer'>Developer</option>
                        </select>
                        <input
                            className='input'
                            type='email'
                            name='email'
                            placeholder='Email'
                        />
                        <input
                            className='input'
                            type='password'
                            name='password'
                            placeholder='Password'
                        />
                    </div>
                    <div className='flex flex-col items-center space-y-3'>
                        <button className='btn px-5 py-3 w-full' type='submit'>
                            <AddIcon />
                        </button>
                    </div>
                </form>
            )}
        </section>
    );
};

export default AddUser;
