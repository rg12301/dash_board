// Imports
import firebase, { COLLECTIONS } from '../firebase';
import { MEMBER } from '../types';

// -----------------------------------------------------------------------------
/** Get provided number of members (limit) to display
 * @param  {firebase.app.App} initializedProject
 * @returns Promise
 */
export async function getMembers(
    initializedProject: firebase.app.App,
): Promise<MEMBER[]> {
    const members: MEMBER[] = [];
    await initializedProject
        .firestore()
        .collection(COLLECTIONS.MEMBERS)
        .get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                snapshot.forEach((memberDoc) => {
                    members.push(memberDoc.data() as MEMBER);
                });
            }
        });
    return members;
}

// -----------------------------------------------------------------------------
/**
 * Add a member to firestore database of initialized project.
 * @param  {firebase.app.App} initializedProject
 * @param  {MEMBER} member
 * @returns Promise
 */
export async function addMember(
    initializedProject: firebase.app.App,
    member: MEMBER,
): Promise<void> {
    return await initializedProject
        .firestore()
        .collection(COLLECTIONS.MEMBERS)
        .doc(member.uid)
        .set(member)
        .then(() => {
            console.log('Member added successfully');
        })
        .catch((error) => {
            console.error('Cannont add member, error occurred!', error);
        });
}

// -----------------------------------------------------------------------------
export async function uploadMemberProfileImage(
    initializedProject: firebase.app.App,
    file: File | null | undefined,
    memberUid: string,
): Promise<string> {
    return await initializedProject
        .storage()
        .ref(`MEMBERS/${memberUid}/profileImage`)
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

// -----------------------------------------------------------------------------
export async function deleteMemberProfileImage(
    initializedProject: firebase.app.App,
    memberUid: string,
) {
    return await initializedProject
        .storage()
        .ref(`MEMBERS/${memberUid}/profileImage`)
        .delete()
        .then(() => {
            console.log('Profile image deleted successfully');
        })
        .catch((error) => {
            console.error(
                'Cannot delete profile file, an error occurred!',
                error,
            );
        });
}

// -----------------------------------------------------------------------------
export async function editMember(
    initializedProject: firebase.app.App,
    updatedMember: MEMBER,
): Promise<void> {
    return await initializedProject
        .firestore()
        .collection(COLLECTIONS.MEMBERS)
        .doc(updatedMember.uid)
        .update(updatedMember)
        .then(() => {
            console.log('Member updated successfully');
        })
        .catch((error) => {
            console.error('Cannont update member, error occurred!', error);
        });
}

// -----------------------------------------------------------------------------
export async function deleteMember(
    initializedProject: firebase.app.App,
    memberUid: string,
) {
    await initializedProject
        .firestore()
        .collection(COLLECTIONS.MEMBERS)
        .doc(memberUid)
        .delete()
        .then(() => {
            console.log('Member deleted successfully');
        })
        .catch((error) => {
            console.error('Cannot delete member, an error occurred!', error);
        });
}
