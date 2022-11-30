import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from '../../../Component/ProductCard/ProductCard';

const Products = () => {
    const data = useLoaderData();

    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-wrap -m-4">
                    {
                        data.map(product => <ProductCard key={product._id} product={product}/>)
                    }
                </div>
            </div>
            
        </section>
    );
};

export default Products;