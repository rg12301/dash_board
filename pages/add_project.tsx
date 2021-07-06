import Head from 'next/head';
import AddProject from '../views/AddProject';

export default function add_project() {
    return (
        <div>
            <Head>
                <title>_board | Add Project</title>
                <meta name='Add Project' content='' />
            </Head>
            <AddProject />
        </div>
    );
}
