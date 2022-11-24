import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = () => {
  return (
    <div className="grid grid-cols-1 mx-5 lg:grid-cols-3 gap-4">
      <Link>
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg bg-[url('https://i.ibb.co/WW8v0ZG/hp.png')] object-cover h-28 w-full bg-cover bg-center text-center">
          <div className="flex-grow"></div>
        </div>
      </Link>
      {/* 2 */}
      <Link>
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg bg-[url('https://i.ibb.co/8gpw5gW/mackbook.png')] object-cover h-28 w-full bg-cover bg-center text-center">
          <div className="flex-grow"></div>
        </div>
      </Link>
      {/* 3 */}
      <Link>
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg bg-[url('https://i.ibb.co/dfBvQY2/png-clipart-logo-brand-lenovo-thinkpad-ideapad-strategic-blue-text-1.png')] object-cover h-28 w-full bg-cover bg-center text-center">
          <div className="flex-grow"></div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
