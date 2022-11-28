import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/UseContext';
import Footer from '../Page/Shared/Footer/Footer';
import Navbar from '../Page/Shared/Navbar/Navbar';

import { useAdmin, useSeller } from '../hooks/useUser';


const DashBoardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isSeller] = useSeller(user?.email);
    const [isAdmin] = useAdmin(user?.email);

    return (
        <>
            <Navbar />
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-white  dark:bg-gray-800">
                    {/* <!-- Page content here --> */}
                    
                    <Outlet/>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu  w-80 bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <div className="flex flex-col h-screen py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700">
                            <div className="flex flex-col justify-between flex-1 mt-6">
                                <nav>
                                    <Link to='/dashboard/orders' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                                        <span className="mx-4 font-medium">Orders</span>
                                    </Link>
                                    {/* {
                                        isUser && <>
                                            <Link to='/dashboard/myorders' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                                                <span className="mx-4 font-medium">My Orders</span>
                                            </Link>
                                        </>
                                    } */}
                                    {
                                        isSeller && <>
                                            <Link to='/dashboard/add-product' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                                                <span className="mx-4 font-medium">Add Product</span>
                                            </Link>
                                            <Link to='/dashboard/my-product' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                                                <span className="mx-4 font-medium">My Product</span>
                                            </Link>
                                        </>
                                    }
                                    {
                                        isAdmin && <>
                                            <Link to='/dashboard/allbuyer' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                                                <span className="mx-4 font-medium">All Buyers</span>
                                            </Link>
                                            <Link to='/dashboard/allseller' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                                                <span className="mx-4 font-medium">All Seller</span>
                                            </Link>
                                            <Link to='/dashboard/reportitem' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                                                <span className="mx-4 font-medium">Reported Items</span>
                                            </Link>
                                        </>
                                    }
                                </nav>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default DashBoardLayout;