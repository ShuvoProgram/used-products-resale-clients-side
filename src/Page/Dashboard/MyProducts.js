import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/UseContext";
import ConfirmationModal from "../Shared/ConfirmationModal/ConfirmationModal";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const [deletingProduct, setDeletingProduct] = useState(null);

  const closeModal = () => {
    setDeletingProduct(null);
  };

  const url = `${process.env.REACT_APP_API_URL}/products?email=${user?.email}`;

  const { data: product = [], refetch } = useQuery({
    queryKey: ["product", user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  const handleDeleteProduct = (product) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${product._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) refetch();
        toast.success(`${product.title} deleted successfully`);
      });
  };

  const handleAdvertiseProduct = (product) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/products/advertisement/${product._id}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0){
          toast.success(`${product.title} advertise successfully`);
        }
      });
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {product.map((product) => (
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md border-2 dark:border-gray-600">
              <Link className="block relative h-48 rounded overflow-hidden">
                <img
                  alt={product.title}
                  className="object-cover object-center w-full h-full block"
                  src={product.img}
                />
              </Link>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  CATEGORY
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {product.title}
                </h2>
                <p className="mt-1">Location: {product.location}</p>
                <div className="flex justify-between">
                  <p className="mt-1">ResellerPrice: {product.resellerPrice}</p>
                  <p className="mt-1">OriginalPrice: {product.originalPrice}</p>
                </div>
                <p className="mt-1">Year Of Used: {product.yearOfUsed}</p>
                <p className="mt-1">Posted: {product.purchaseYear}</p>
                <div>
                  {/* <span className="mt-1">Author Name: {product.host.name}</span> */}
                </div>
              </div>
              <div className="mt-2 flex justify-between">
                <label
                  className="btn btn-error"
                  onClick={() => setDeletingProduct(product)}
                  htmlFor="confirmation-modal">
                  Delete
                </label>
                {
                  product.sold === false ? <label
                    className="btn btn-success"
                    onClick={() => handleAdvertiseProduct(product)}
                  >
                    Advertise
                  </label> : <label className='btn btn-true disabled'>Advertise</label>
                }
                
              </div>
            </div>
          ))}
        </div>
      </div>
      {deletingProduct && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingProduct.title}. It cannot be undone.`}
          successAction={handleDeleteProduct}
          successButtonName="Delete"
          modalData={deletingProduct}
          closeModal={closeModal}></ConfirmationModal>
      )}
    </section>
  );
};

export default MyProducts;
