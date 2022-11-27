import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import ConfirmationModal from '../Shared/ConfirmationModal/ConfirmationModal';

const ReportedItem = () => {
    const [deletingReport, setDeletingReport] = useState(null);

    const closeModal = () => {
        setDeletingReport(null);
    };

    const { data: report = [], refetch } = useQuery({
        queryKey: ['report'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/reported`)
            const data = res.json()
            return data;
        }
    })

    const handleDeleteProduct = product => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${product._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0)
                    refetch();
                toast.success(`${product.title} deleted successfully`)

            })
    }

    console.log(report);
    return (
        <div className='mx-10'>
            <h1 className="text-2xl">Reported Items</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full bg-white  dark:bg-gray-800">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            report.map(r => (
                                <tr key={r._id}>
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
                                            <div className="font-bold">{r.title}</div>
                                        </div>
                                    </td>
                                    <td>
                                        {r.host.email}
                                    </td>
                                    <th>
                                        <label
                                            onClick={() => setDeletingReport(r)}
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
                deletingReport && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingReport.name}. It cannot be undone.`}
                    successAction={handleDeleteProduct}
                    successButtonName="Delete"
                    modalData={deletingReport}
                    closeModal={closeModal}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default ReportedItem;