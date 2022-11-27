import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import Spinner from "../../Component/Spinner/Spinner";
import ConfirmationModal from "../Shared/ConfirmationModal/ConfirmationModal";

const AllSeller = () => {
  const [deletingSeller, setDeletingSeller] = useState(null);

  const closeModal = () => {
    setDeletingSeller(null);
  };

  const {
    data: seller = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["seller"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users/seller/`);
      const data = res.json();
      return data;
    },
  });

  const handleMakeVerify = (id) => {
    fetch(`http://localhost:5000/users/seller/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make verify successful.");
          refetch();
        }
      });
  };

  const handleDeleteSeller = (seller) => {
    fetch(`http://localhost:5000/users/seller/${seller._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) refetch();
        toast.success(`User ${seller.name} deleted successfully`);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-10">
      <h1 className="text-2xl">all Seller</h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Verify Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {seller.map((sell) => (
              <tr key={sell._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="/tailwind-css-component-profile-2@56w.png"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{sell.name}</div>
                  </div>
                </td>
                <td>{sell.email}</td>
                <td>
                  {sell?.status === "verify" ? (
                    <p className="btn btn-xs btn-success">Verified</p>
                  ) : (
                    <button
                      onClick={() => handleMakeVerify(sell._id)}
                      className="btn btn-xs btn-primary">
                      Verify
                    </button>
                  )}
                </td>
                <th>
                  <label
                    onClick={() => setDeletingSeller(sell)}
                    htmlFor="confirmation-modal"
                    className="btn btn-error btn-xs">
                    Delete
                  </label>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingSeller && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingSeller.name}. It cannot be undone.`}
          successAction={handleDeleteSeller}
          successButtonName="Delete"
          modalData={deletingSeller}
          closeModal={closeModal}></ConfirmationModal>
      )}
    </div>
  );
};

export default AllSeller;
