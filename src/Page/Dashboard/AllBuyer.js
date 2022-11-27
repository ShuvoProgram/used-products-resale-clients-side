import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Spinner from '../../Component/Spinner/Spinner';
import ConfirmationModal from '../Shared/ConfirmationModal/ConfirmationModal';

const AllBuyer = () => {
    const [deletingBuyer, setDeletingBuyer] = useState(null);

    const closeModal = () => {
        setDeletingBuyer(null);
    }

    const {data: buyer = [], refetch, isLoading} = useQuery({
        queryKey: ['buyer'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/buyer/`)
            const data = res.json()
            return data;
        }
    })

    
    const handleDeleteBuyer = buyer => {
        fetch(`http://localhost:5000/users/buyer/${buyer._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0)
            refetch();
            toast.success(`User ${buyer.name} deleted successfully`)

        })
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='mx-10'>
            <h1 className="text-2xl">all buyers</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full bg-white  dark:bg-gray-800">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyer.map(buy => (
                                <tr key={buy._id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{buy.name}</div>
                                        </div>
                                    </td>
                                    <td>
                                       {buy.email}
                                    </td>
                                    <th>
                                        <label 
                                            onClick={() => setDeletingBuyer(buy)}
                                        htmlFor="confirmation-modal"
                                            className='btn btn-error btn-xs'
                                        >
                                            Delete
                                        </label>
                                    </th>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
            {
                deletingBuyer && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingBuyer.name}. It cannot be undone.`}
                    successAction={handleDeleteBuyer}
                    successButtonName="Delete"
                    modalData={deletingBuyer}
                    closeModal={closeModal}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default AllBuyer;