import React, { useContext, useState } from 'react';
import Banner from '../Banner/Banner';
import CategoryCard from '../CategoryCard/CategoryCard';
import CTA from '../CTA/CTA';
import Product from '../Products/Product';
import { useQuery } from "react-query";
import Advertisement from '../Advertisement/Advertisement';
import { AuthContext } from '../../../Context/UseContext';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [verify, setVerify] = useState([]);

    const { data: category = [], refetch } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/category/`)
            const data = res.json();
            refetch()
            return data;
        }
    })

    const { data: advertise = [] } = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/advertisement`)
            const data = res.json()
            return data;
        }
    })


    // const sellerEmail = `${process.env.REACT_APP_API_URL}/users/seller?email=${user.email}`;

    // const { data: sellerVerify = [] } = useQuery({
    //     queryKey: ['verify'],
    //     queryFn: async () => {
    //         const res = await fetch(sellerEmail)
    //         const data = await res.json();
    //         return data;
    //     }
    // })

    return (
        <div>
            <Banner/>
            {
                <Advertisement advertise={advertise}/>
            }
            <div className="grid grid-cols-1 mx-5 lg:grid-cols-3 gap-4">
            {
                category.map(categories => <CategoryCard key={categories._id} categories={categories}/>)
            }
            </div>
                <Product />
            <CTA/>
        </div>
    );
};

export default Home;