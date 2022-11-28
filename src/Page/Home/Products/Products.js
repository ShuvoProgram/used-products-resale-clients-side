import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';
import BookingModal from '../../../Component/BookingModal/BookingModal';
// import Spinner from '../../../Component/Spinner/Spinner';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const Products = () => {
    const [booking, setBooking] = useState(null);
    const data = useLoaderData();

    const handleReport = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
            method: "PUT",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success("Make report successful.");
                    // setIsLoading(false)
                }
            });
    };

    // if(isLoading){
    //     return <Spinner/>
    // }

    console.log(data);

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
                                    <div className='flex mt-1 justify-between'>
                                        
                                        <span className="flex">Verify: <AiOutlineCloseCircle className='ml-2 h-6 w-6 text-red-500' /></span>
                                    </div>
                                </div>
                                <div className='mt-2 flex justify-between'>
                                    {
                                        product.sold === false ? <label className="btn btn-primary" htmlFor="booking-modal" onClick={() => setBooking(product)}>Book Now</label> : <label className='btn btn-true disabled'>Sold</label>
                                    }
                                    <label className="btn btn-primary btn-xs" onClick={() => handleReport(product._id)}>Report</label>
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