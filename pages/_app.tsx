import '../styles/globals.tailwind.css';
import type { AppProps } from 'next/app';
import { LoadingContext } from '../utilities/context/LoadingContext';
import { UserContext } from '../utilities/context/UserContext';
import React, { useEffect, useState } from 'react';
import { auth } from '../utilities/firebase';
import { ProjectContext } from '../utilities/context/ProjectContext';
import { USER } from '../utilities/types';

function MyApp({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [authUser, setAuthUser] = useState<firebase.default.User | null>(
        null,
    );
    const [user, setUser] = useState<USER | undefined>();
    const [initializedProject, setInitializedProject] =
        useState<firebase.default.app.App | null>(null);
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((_user) => {
            setAuthUser(_user);
        });
        return unsubscribe;
    }, [authUser]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <LoadingContext.Provider value={{ loading, setLoading }}>
                <ProjectContext.Provider
                    value={{ initializedProject, setInitializedProject }}>
                    <Component {...pageProps} />
                </ProjectContext.Provider>
            </LoadingContext.Provider>
        </UserContext.Provider>
    );
}
export default MyApp;
