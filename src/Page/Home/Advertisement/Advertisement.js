import React, { useState } from 'react';
import BookingModal from '../../../Component/BookingModal/BookingModal';

const Advertisement = ({ advertise }) => {
    const [advertisement, setAdvertisement] = useState(null);
    const { title, resellerPrice, img, condition, sold } = advertise;
    return (
        <>
            {
                sold === false ?
                    <section className=" dark:bg-gray-800 lg:py-12 lg:flex lg:justify-center">
                        <div
                            className="overflow-hidden bg-white dark:bg-gray-900 lg:mx-8 lg:flex lg:max-w-6xl lg:w-full lg:shadow-md lg:rounded-xl">
                            <div className="lg:w-1/2">
                                <div className=" bg-cover lg:h-full object-cover h-28 w-full bg-center" style={{ backgroundImage: `url(${img})` }}></div>
                            </div>

                            <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                                    {title}
                                </h2>
                                <div className="mt-4 text-gray-500 dark:text-gray-300 flex justify-between lg:text-xl">
                                    <p>Reseller Price: <span className='text-blue-600'>${resellerPrice}</span></p>
                                    <p>Product Condition: <span className='text-blue-600'>${condition}</span></p>
                                </div>

                                <div className="inline-flex w-full mt-6 sm:w-auto">
                                    <label className="btn btn-primary inline-flex items-center justify-center w-1/2 lg:w-full px-6 py-2 text-sm text-white duration-300 rounded-lg focus:ring-opacity-80" htmlFor="booking-modal" onClick={() => setAdvertisement(advertise)}>Buy Now</label>
                                </div>
                            </div>
                            {
                                advertisement &&
                                <BookingModal
                                    booking={advertisement}
                                    setBooking={setAdvertisement}
                                />

                            }
                        </div>
                    </section> :
            <h1>no advertise</h1>
        }
        </>
    );
};

export default Advertisement;