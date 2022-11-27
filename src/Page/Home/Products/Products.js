import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import BookingModal from '../../../Component/BookingModal/BookingModal';

const Products = () => {
    const [booking, setBooking] = useState(null)
    const data = useLoaderData();
    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-wrap -m-4">
                    {
                        data.map(product => (
                            <div class="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md border-2 dark:border-gray-600">
                                <Link class="block relative h-48 rounded overflow-hidden">
                                    <img alt={product.title} class="object-cover object-center w-full h-full block" src={product.img} />
                                </Link>
                                <div class="mt-4">
                                    <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 class="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
                                    <p class="mt-1">Location: {product.location}</p>
                                    <div className='flex justify-between'>
                                    <p class="mt-1">ResellerPrice: {product.resellerPrice}</p>
                                    <p class="mt-1">OriginalPrice: {product.originalPrice}</p>
                                    </div>
                                    <p class="mt-1">Year Of Used: {product.yearOfUsed}</p>
                                    <p class="mt-1">Posted: {product.purchaseYear}</p>
                                    <p class="mt-1">Author Name: {product.host.name}</p>
                                </div>
                                <div className='mt-2'>
                                    <label className="btn btn-primary" htmlFor="booking-modal" onClick={() => setBooking(product)}>Book Now</label>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                booking && 
                <BookingModal 
                booking={booking}
                setBooking={setBooking}
                />

            }
        </section>
    );
};

export default Products;