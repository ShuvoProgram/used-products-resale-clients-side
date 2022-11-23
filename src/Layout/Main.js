import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Page/Shared/Footer/Footer';
import Navbar from '../Page/Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar />
            <div className='bg-white dark:bg-gray-800 '>
            <Outlet />
            </div>
            <Footer/>
        </div>
    );
};

export default Main;