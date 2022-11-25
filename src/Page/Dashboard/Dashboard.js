import React, { useContext } from 'react';
import { AuthContext } from '../../Context/UseContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    return (
        <div className='h-screen text-gray-700 dark:text-white flex flex-col justify-center items-center pb-16'>
            <div className='flex justify-center items-center'>
                <p className='text-6xl font-bold'>Welc</p>
                <div className='w-9 h-9 border-8 border-dashed rounded-full animate-spin mt-3 border-green-400'></div>
                <p className='text-6xl font-bold mr-2'>me</p>
                <p className='text-6xl font-bold'>T</p>
                <div className='w-9 h-9 border-8 border-dashed rounded-full animate-spin mt-3 border-green-400 mr-2'></div>
                <p className="text-6xl font-bold">{user?.displayName}</p>
            </div>
            <div className='flex justify-center text-gray-500 items-center mt-4'>
                <p className='text-3xl font-medium'>User Dashboard</p>
            </div>
        </div>
    );
};

export default Dashboard;