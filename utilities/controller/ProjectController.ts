// Imports
import firebase from 'firebase/app';
import { firestore, COLLECTIONS } from '../firebase';
import { FIREBASE_PROJECT_CONFIGURATION, PROJECT } from '../types';

// -----------------------------------------------------------------------------
/**
 * Adds new project details along with firebase configuration map into firestore database.
 * @param  {string} title
 * @param  {string} description
 * @param  {FIREBASE_PROJECT_CONFIGURATION} projectFirebaseConfig
 */
export async function addProject(project: PROJECT) {
    await firestore()
        .collection(COLLECTIONS.PROJECTS)
        .doc(project.firebaseConfig.projectId)
        .set(project)
        .then(() => {
            console.log(`Project added successfully!`);
        })
        .catch((error) => {
            console.error('Error while adding project : ', error);
        });
}

// -----------------------------------------------------------------------------
/**
 * Get details of all projects from firestore database to display on project selection page.
 * @returns Promise<PROJECT[]>
 */
export async function getAllProjects(): Promise<PROJECT[]> {
    const projects: PROJECT[] = [];
    return await firestore()
        .collection(COLLECTIONS.PROJECTS)
        .get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                snapshot.forEach((projectDoc) => {
                    projects.push(projectDoc.data() as PROJECT);
                });
            }
            return projects;
        });
}

// -----------------------------------------------------------------------------
/**
 * Initializes selected project
 * @param  {FIREBASE_PROJECT_CONFIGURATION} projectFirebaseConfig
 * @returns firebase.app.App
 */
export function initializeProject(
    projectFirebaseConfig: FIREBASE_PROJECT_CONFIGURATION,
): firebase.app.App {
    try {
        return firebase.app(projectFirebaseConfig.projectId);
    } catch (error) {
        const initializedProject = firebase.initializeApp(
            projectFirebaseConfig,
            projectFirebaseConfig.projectId,
        );
        return initializedProject;
    }
}

// -----------------------------------------------------------------------------
