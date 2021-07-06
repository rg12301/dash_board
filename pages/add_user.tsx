import Head from 'next/head';
import AddUser from '../views/AddUser';

export default function add_project() {
    return (
        <div>
            <Head>
                <title>_board | Add User</title>
                <meta name='Add Project' content='' />
            </Head>
            <AddUser />
        </div>
    );
}
