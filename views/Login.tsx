import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import useLoadingContext from '../utilities/context/LoadingContext';
import Loading from '../components/Loading';
import { getUser, signInUser } from '../utilities/controller/UserController';
import useUserContext from '../utilities/context/UserContext';

interface Props {}

const Login = (props: Props) => {
    const { loading, setLoading } = useLoadingContext();
    const { setUser } = useUserContext();

    useEffect(() => {
        setLoading!(false);
    }, []);

    const router = useRouter();
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading!(true);
        const target = event.target as typeof event.target & {
            email: { value: string };
            password: { value: string };
        };
        // TODO:  Uncomment this section after entering legit data into firebase
        signInUser(target.email.value, target.password.value).then((uid) => {
            if (uid) {
                getUser(uid).then((userData) => {
                    if (userData) {
                        setUser!(userData);
                    }
                });
                router.push(`/project_selection`);
            } else {
                router.reload();
            }
        });
    }
    return (
        <section className='w-screen h-screen flex flex-col justify-start items-center px-3'>
            <Navbar />
            {loading ? (
                <Loading />
            ) : (
                <form
                    className='mt-20 px-5 md:px-9 lg:px-14 py-20 flex flex-col space-y-10 w-full md:w-2/3 lg:w-4/12 border border-gray-300 rounded-xl'
                    onSubmit={handleSubmit}>
                    <h3 className='text-2xl font-semibold text-center'>
                        Welcome!
                    </h3>
                    <div className='flex flex-col items-center space-y-5'>
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
                            Login
                        </button>
                        <span
                            className='text-sm text-gray-500 hover:text-_blue font-medium hover:font-semibold hover:underline cursor-pointer'
                            onClick={() => {
                                router.push(`/add_user`);
                            }}>
                            New User
                        </span>
                    </div>
                </form>
            )}
        </section>
    );
};

export default Login;
