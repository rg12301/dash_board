import React from 'react';
interface Props {}

const Loading = (props: Props) => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='h-10 w-10 border-t-4 border-r-4 rounded-full border-_blue animate-spin'></div>
        </div>
    );
};

export default Loading;
