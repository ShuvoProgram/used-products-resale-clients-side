import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import BookingModal from '../../../Component/BookingModal/BookingModal';
import { AuthContext } from '../../../Context/UseContext';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const AllProducts = () => {
    
    const [booking, setBooking] = useState(null);
    


    const url = `${process.env.REACT_APP_API_URL}/product`;

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json();
            return data;
        }
    })



    

    const handleReport = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
            method: "PUT",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success("Make report successful.");
                    refetch()
                }
            });
    };

    return (
        <section className="text-gray-600 body-font py-10">
            <div className='flex flex-col items-center'>
                <h1 className="text-3xl text-blue-600 text-center">Our Products</h1>
                <hr className='text-gray-600 dark:text-white w-1/4 mt-2' />
            </div>
            <div className="container px-5 py-16 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {
                        products.map(product => (
                            <div key={product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md border-2 dark:border-gray-600">
                                <Link className="block relative h-48 rounded overflow-hidden">
                                    <img alt={product.title} className="object-cover object-center w-full h-full block" src={product.img} />
                                </Link>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
                                    <p className="mt-1">Location: {product.location}</p>
                                    <div className='flex justify-between'>
                                        <p className="mt-1">ResellerPrice: {product.resellerPrice}</p>
                                        <p className="mt-1">OriginalPrice: {product.originalPrice}</p>
                                    </div>
                                    <p className="mt-1">Year Of Used: {product.yearOfUsed}</p>
                                    <p className="mt-1">Posted: {product.purchaseYear}</p>
                                    <div className='flex mt-1 justify-between'>
                                    {/* <span className="">Author Name: {product.host.name}</span> */}
                                        <span className="flex">Verify: <AiOutlineCloseCircle className='ml-2 h-6 w-6 text-red-500'/></span>
                                    </div>
                                </div>
                                <div className='mt-2 flex justify-between'>
                                    {
                                        product.sold === false ?<label className="btn btn-primary" htmlFor="booking-modal" onClick={() => setBooking(product)}>Book Now</label>:  <label className='btn btn-true disabled'>Sold</label>
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

export default AllProducts;