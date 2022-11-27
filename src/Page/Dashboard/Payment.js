import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Spinner from "../../Component/Spinner/Spinner";
import CheckOut from './CheckOut';

const Payment = () => {
    const booking = useLoaderData();
    console.log(booking)
    const navigation = useNavigation();
    const { treatment, price, appointmentDate, slot } = booking;

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

    if (navigation.state === "loading") {
        return <Spinner/>
    }
    return (
        <div>
            <h3 className="text-3xl">Payment for {treatment}</h3>
            <p className="text-xl">Please pay <strong>${price}</strong> for your appointment on {appointmentDate} at {slot}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckOut
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;