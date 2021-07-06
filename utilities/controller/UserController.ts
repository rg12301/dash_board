// Imports
import { UserAddIcon } from '@heroicons/react/solid';
import { firestore, auth, COLLECTIONS, storage } from '../firebase';
import { USER } from '../types';

// -----------------------------------------------------------------------------
/**
 * Uses firebase auth signInWithEmailAndPassword to sign in user
 * @param  {string} email
 * @param  {string} password
 */
export async function signInUser(
    email: string,
    password: string,
): Promise<string | null> {
    return await auth()
        .signInWithEmailAndPassword(email, password)
        // Sign-out successful.
        .then((userCredential) => {
            const uid = userCredential.user!.uid;
            console.log(`User signed in with uid : ${uid}`);
            firestore().collection(COLLECTIONS.USERS).doc(uid).update({
                lastAccessed: firestore.FieldValue.serverTimestamp(),
            });
            return uid;
        })
        // An error happened.
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(
                `Error occured while signing in!!`,
                errorCode,
                errorMessage,
            );
            return null;
        });
}

// -----------------------------------------------------------------------------
/**
 * Uses firebase auth signOut to sign out user
 */
export async function signOutUser() {
    auth()
        .signOut()
        // Sign-out successful.
        .then(() => {
            console.log(`User signed out sucessfully`);
        })
        // An error happened.
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(
                `Error occured while signing in!!`,
                errorCode,
                errorMessage,
            );
        });
}

// -----------------------------------------------------------------------------
// TODO : Forget password

// -----------------------------------------------------------------------------
export async function getUser(uid: string): Promise<USER | null> {
    return await firestore()
        .collection(COLLECTIONS.USERS)
        .doc(uid)
        .get()
        .then((userDoc) => {
            return userDoc.data() as USER;
        })
        .catch((error) => {
            console.error(`Cannot find user with uid ${uid}`);
            console.error(error.code, error.message);
            return null;
        });
}

// -----------------------------------------------------------------------------
export async function addUser(
    newUser: USER,
    password: string,
    profileImage: File | undefined,
) {
    await auth()
        .createUserWithEmailAndPassword(newUser.email, password)
        .then(async (onFullfilled) => {
            if (onFullfilled.user) {
                const uid = onFullfilled.user.uid;
                if (profileImage) {
                    await uploadUserProfileImage(profileImage, uid).then(
                        async (profilePhotoUrl) => {
                            await firestore()
                                .collection(COLLECTIONS.USERS)
                                .doc(uid)
                                .set({
                                    ...newUser,
                                    profileImage: profilePhotoUrl,
                                })
                                .then(() => {
                                    console.log('User added successfully');
                                })
                                .catch((error) => {
                                    console.error(
                                        'Cannont add user, error occurred!',
                                        error,
                                    );
                                });
                        },
                    );
                } else {
                    firestore()
                        .collection(COLLECTIONS.USERS)
                        .doc(uid)
                        .set(newUser)
                        .then(() => {
                            console.log('User added successfully');
                        })
                        .catch((error) => {
                            console.error(
                                'Cannont add user, error occurred!',
                                error,
                            );
                        });
                }
            } else {
                console.error(`Cannot register user, try again later!!`);
            }
        });
}

// -----------------------------------------------------------------------------
export async function uploadUserProfileImage(
    file: File | null | undefined,
    uid: string,
): Promise<string> {
    return await storage()
        .ref(`${COLLECTIONS.USERS}/${uid}/profileImage`)
        .put(file as Blob)
        .then((snapshot) => {
            console.log('Profile image uploaded successfully');
            return snapshot.ref.getDownloadURL();
        })
        .catch((error) => {
            console.error(
                'Error occured while uploading the profile image!',
                error,
            );
            return '';
        });
}
