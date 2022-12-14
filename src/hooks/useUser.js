import { useEffect, useState } from 'react';

export const useSeller = (email) => {
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);

    useEffect(() => {
        if(email){
            fetch(`${process.env.REACT_APP_API_URL}/users/seller/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsSeller(data.isSeller);
                setIsSellerLoading(false)
            })
        }
    }, [email])
    return [isSeller, isSellerLoading];
};

export const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        if(email){
            fetch(`${process.env.REACT_APP_API_URL}/users/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data.isAdmin);
                setIsAdminLoading(false)
            })
        }
    }, [email])
    return [isAdmin, isAdminLoading];
};
