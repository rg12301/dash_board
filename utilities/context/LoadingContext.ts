import { useContext, createContext, Dispatch, SetStateAction } from 'react';

interface LoadingInterface {
    loading: boolean;
    setLoading?: Dispatch<SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingInterface>({
    loading: false,
});

export default function useLoadingContext() {
    return useContext(LoadingContext);
}
