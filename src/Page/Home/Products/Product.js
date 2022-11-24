import React from 'react';
import { Link } from 'react-router-dom';

const Product = () => {
    return (
        <div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md border-2 border-gray-100 dark:border-gray-800">
                <Link className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/421x261" />
                </Link>
                <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                    <p className="mt-1">$21.15</p>
                </div>
            </div>
        </div>
    );
};

export default Product;