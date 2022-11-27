import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ categories }) => {
  const { _id, img } = categories;
  return (
    <div className="mx-5 lg:mx-2">
      <Link to={`/category/${_id}`}>
        <div className={`h-full flex items-center border-gray-200 border p-4 rounded-lg object-cover h-28 w-full bg-cover bg-center text-center`} style={{ backgroundImage: `url(${img})` }}>
          <div className="flex-grow"></div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
