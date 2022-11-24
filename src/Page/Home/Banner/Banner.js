import React from 'react';
import bannerImage from '../../../assets/laptop/macBook.jpeg';

const Banner = () => {
    return (
        <div class="container px-6 py-4 mx-auto">
            <div class="items-center lg:flex">
                <div class="w-full lg:w-1/3">
                    <div class="lg:max-w-lg">
                        <h1 class="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">Best Place To Choose Your Laptop</h1>

                        <p class="mt-2 text-gray-600 dark:text-gray-400">We provide republished branded laptop for our customer with reasonable price</p>

                        <button class="w-full tracking-wider px-6 py-2.5 mt-6 text-sm text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Shop Now</button>
                    </div>
                </div>

                <div class="flex items-center justify-center w-full mt-6 lg:mt-0 ">
                    <img class="w-full h-full lg:max-w-3xl" src={bannerImage} alt="Catalogue-pana.svg"/>
                </div>
            </div>
        </div>
    );
};

export default Banner;