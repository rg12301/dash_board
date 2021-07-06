import { useContext, createContext, Dispatch, SetStateAction } from 'react';

interface ProjectInterface {
    initializedProject: firebase.default.app.App | null;
    setInitializedProject?: Dispatch<
        SetStateAction<firebase.default.app.App | null>
    >;
}

export const ProjectContext = createContext<ProjectInterface>({
    initializedProject: null,
});

export default function useProjectContext() {
    return useContext(ProjectContext);
}
