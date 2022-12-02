import React  from 'react';
import Banner from '../Banner/Banner';
import CategoryCard from '../CategoryCard/CategoryCard';
import CTA from '../CTA/CTA';
import { useQuery } from "react-query";
import Advertisement from '../Advertisement/Advertisement';
import Spinner from '../../../Component/Spinner/Spinner';



const Home = () => {

    const { data: category = [], refetch } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/category/`)
            const data = res.json();
            refetch()
            return data;
        }
    })

    const { data: advertise = [], isLoading} = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/advertisement`)
            const data = res.json();
            return data;
        }
    })

if(isLoading){
return <Spinner/>
}

    return (
        <div>
            <Banner/>
            {
                   <Advertisement advertise={advertise}/>
                   
               
            }
            <h1 className='text-2xl text-center py-3 font-semibold text-gray-800 dark:text-blue-500'>Category</h1>
            <hr className='pb-4 w-1/3 mx-auto h-2' />
            <div className="grid grid-cols-1 mx-5 lg:grid-cols-3 gap-4 mt-10">
            {
                category.map(categories => <CategoryCard key={categories._id} categories={categories}/>)
            }
            </div>
            <CTA/>
        </div>
    );
};

export default Home;