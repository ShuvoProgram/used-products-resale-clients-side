import React from 'react';
import Banner from '../Banner/Banner';
import CategoryCard from '../CategoryCard/CategoryCard';
import CTA from '../CTA/CTA';
import Product from '../Products/Product';
import { useQuery } from "react-query";

const Home = () => {
    const { data: category = [], refetch, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/category/`)
            const data = res.json()
            return data;
        }
    })
    return (
        <div>
            <Banner/>
            <div className="grid grid-cols-1 mx-5 lg:grid-cols-3 gap-4">
            {
                category.map(categories => <CategoryCard key={categories._id} categories={categories}/>)
            }
            </div>
            <Product/>
            <CTA/>
        </div>
    );
};

export default Home;