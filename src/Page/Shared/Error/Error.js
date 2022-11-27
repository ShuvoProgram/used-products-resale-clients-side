import React from 'react';
import { Link } from 'react-router-dom';
import { HiThumbDown } from "react-icons/hi";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Error = () => {
    return (
    <>
    <Navbar/>
        <section className="flex items-center h-full sm:p-16 bg-white dark:bg-gray-900 dark:text-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                    <HiThumbDown className='w-40 h-40 text-blue-500 dark:text-gray-600'/>
                <p className="text-3xl text-gray-800">Looks like our services are currently offline</p>
                <Link rel="noopener noreferrer" href="#" className="px-8 py-3 bg-blue-500 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Back to homepage</Link>
            </div>
        </section>
        <Footer/>
    </>
    );
};

export default Error;