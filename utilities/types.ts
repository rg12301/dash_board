// -----------------USER------------------------
export interface ROLE {
    role: 'Admin' | 'Manager' | 'Developer';
}

export interface USER extends ROLE {
    name: string;
    lastAccessed: firebase.default.firestore.FieldValue;
    email: string;
    profileImage?: string;
}

// -----------------PROJECT------------------------
export interface FIREBASE_PROJECT_CONFIGURATION {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

export interface PROJECT {
    title: string;
    description: string;
    firebaseConfig: FIREBASE_PROJECT_CONFIGURATION;
}

// -----------------MEMBER------------------------
export interface GENDER {
    gender: 'Male' | 'Female' | 'Non-Binary' | 'Prefer not to say';
}

export interface MEMBER extends GENDER {
    uid: string;
    name: string;
    phone: number;
    profile_image: string | '';
    email: string;
    college: string;
    current_profession: string;
    year_of_passing: number;
    address: string | '';
}

export interface ARTICLE {
    article_id: string;
    article_banner: string;
    article_title: string;
    article_description: string;
    links: string[];
    type: 'BLOG' | 'NEWS';
    postedOn: firebase.default.firestore.Timestamp;
    postedBy: string;
}

// // -----------------TABLE------------------------
// export interface COLUMN<ROW extends object> {
//     key: keyof ROW;
//     displayName?: string;
//     width?: string;
//     type?: 'text' | 'select';
//     options?: string[] | number[];
//     selected?: number;
//     editable?: boolean;
//     hidden?: boolean;
//     align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
// }

// export const roleMap = {
//     Admin: 0,
//     Manager: 1,
//     Developer: 2,
// };
