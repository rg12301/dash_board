import { useContext, createContext, Dispatch, SetStateAction } from 'react';
import { USER } from '../types';

interface UserInterface {
    user: USER | undefined;
    setUser?: Dispatch<SetStateAction<USER | undefined>>;
}

export const UserContext = createContext<UserInterface>({
    user: undefined,
});

export default function useUserContext() {
    return useContext(UserContext);
}
