import Head from 'next/head';
import ProjectSelection from '../views/ProjectSelection';

export default function project_selection() {
    return (
        <div>
            <Head>
                <title>_board | Project Selection</title>
                <meta name='dashboard' content='' />
            </Head>
            <ProjectSelection />
        </div>
    );
}
