import React from 'react';
import { UserCircleIcon as UserCircleIconSolid } from '@heroicons/react/solid';
import useLoadingContext from '../utilities/context/LoadingContext';
import { signOutUser } from '../utilities/controller/UserController';
import { useRouter } from 'next/router';
import useProjectContext from '../utilities/context/ProjectContext';
import useUserContext from '../utilities/context/UserContext';

interface Props {}

const Navbar = (props: Props) => {
    const { loading } = useLoadingContext();
    const { user, setUser } = useUserContext();
    const { setInitializedProject } = useProjectContext();

    const router = useRouter();
    return (
        <nav
            className={`w-full p-4 md:p-10 lg:px-20 text-_blue ${
                loading && ' animate-pulse'
            }`}>
            <div className='flex flex-row justify-between'>
                <span className='text-2xl md:text-3xl font-bold tracking-wider'>
                    <span className='tracking-tighter font-extrabold'>
                        _____&nbsp;
                    </span>
                    board
                </span>
                <div className='flex flex-row justify-between items-center space-x-3'>
                    {user && (
                        <div
                            className='btn p-1 md:py-1.5 md:px-2 lg:px-2.5 text-xs'
                            onClick={() => {
                                signOutUser();
                                router.push(`/`);
                                setInitializedProject!(null);
                                setUser!(undefined);
                            }}>
                            Log Out
                        </div>
                    )}

                    <div className='rounded-full w-16 h-16 overflow-hidden'>
                        {user?.profileImage ? (
                            <img
                                src={user.profileImage}
                                className='rounded-full w-16 h-16 object-cover'
                            />
                        ) : (
                            <UserCircleIconSolid className='w-16 h-16' />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
