import React from 'react';
import Banner from '../Banner/Banner';
import CategoryCard from '../CategoryCard/CategoryCard';
import CTA from '../CTA/CTA';
import Product from '../Products/Product';

const Home = () => {
    return (
        <div>
            <Banner/>
            <CategoryCard/>
            <Product/>
            <CTA/>
        </div>
    );
};

export default Home;