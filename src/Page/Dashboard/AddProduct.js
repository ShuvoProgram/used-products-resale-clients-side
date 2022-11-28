import React, { useContext, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PhoneIcon from "@mui/icons-material/Phone";
import LaptopIcon from "@mui/icons-material/Laptop";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventIcon from '@mui/icons-material/Event';
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { addProducts } from "../../api/productApi";
import { AuthContext } from "../../Context/UseContext";
import { getImageUrl } from "../../api/ImageUpload";
import { useQuery } from "react-query";
import Spinner from "../../Component/Spinner/Spinner";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const locations = [
  { value: "Dhaka", label: "Dhaka" },
  { value: "Chittagong", label: "Chittagong" },
  { value: "Barishal", label: "Barishal" },
  { value: "Sylhet", label: "Sylhet" },
  { value: "Rongpur", label: "Rongpur" },
  { value: "Pabna", label: "Pabna" },
];
const usedYear = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 },
];

const AddProduct = () => {
  const {user} = useContext(AuthContext)
  const [arrivalDate] = useState(new Date());
  const [selected, setSelected] = useState("excellent");
  const navigate = useNavigate();

  const {data: category = [], isLoading} = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/category/`)
      const data = res.json()
      return data;
    }
  })

  

  if(isLoading){
    return <Spinner/>
  }
 
  const handleOptionChange = (e) => {
    setSelected(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const location = form.location.value;
    const purchaseYear = format(arrivalDate, "P");
    const resellerPrice = parseInt(form.resellerPrice.value);
    const originalPrice = parseInt(form.originalPrice.value);
    const description = form.description.value;
    const phone = form.phone.value;
    // const categoryName = form.brand.value;
    const yearOfUsed = form.yearOfUsed.value;
    const categoryID = form.brand.value;
    const condition = selected;
    const img = form.img.files[0];
    
    getImageUrl(img)
    .then(data => {
      const products = {
        title,
        location,
        purchaseYear,
        yearOfUsed,
        resellerPrice,
        originalPrice,
        description,
        phone,
        // categoryName,
        categoryID,
        condition,
        img: data,
        advertisement: false,
        sold: false,
        report: false,
        host: {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email
        }
      }
      addProducts(products).then(data => {
        toast.success('Product Added Successfully')
        navigate('/dashboard/my-product')
        form.reset()
      })
    })
    .catch(err => console.log(err))    
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="w-full max-w-md p-8 space-y-3 text-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 ng-untouched ng-pristine ng-valid">
          <div className="space-y-1 text-sm">
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <ProductionQuantityLimitsIcon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
              </span>
              <input
                type="text"
                name="title"
                className="block w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Product Title"
              />
            </div>
          </div>
          <div className="space-y-1 text-sm relative">
            <label htmlFor="location" className="block text-gray-600">
              Location
            </label>
            <span className="absolute bottom-3">
              <LocationOnIcon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
            </span>
            <select
              className="select select-bordered w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="location"
              id="location"
              type="text"
              placeholder="Location"
              required>
              {locations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between ">
            <div className="shadow-md rounded-md my-2 p-3 flex justify-between items-center">
              <div>
                <p className="block text-sm text-gray-500">Published</p>
                <DayPicker
                  selected={arrivalDate}
                  // onSelect={setArrivalDate}
                  className="w-1/2 dark:text-white"
                  mode="single"
                  min={1}
                />
              </div>
              <CalendarTodayIcon className="h5 w-5 dark:text-white" />
            </div>
          </div>
          <div className="flex justify-between gap-2 relative">
            <div className="space-y-1 text-sm w-1/2">
              <label htmlFor="price" className="block text-gray-600">
               Reseller Price
              </label>
              <span className="absolute bottom-3">
                <AttachMoneyIcon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
              </span>
              <input
                className="w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="resellerPrice"
                id="price"
                type="number"
                placeholder="Reseller Price"
                required
              />
            </div>
            <div className="space-y-1 text-sm w-1/2">
              <label htmlFor="price" className="block text-gray-600">
               Original Price
              </label>
              <span className="absolute bottom-3">
                <AttachMoneyIcon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
              </span>
              <input
                className="w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="originalPrice"
                id="price"
                type="number"
                placeholder="Original Price"
                required
              />
            </div>
          </div>
          <div className="space-y-1 text-sm relative">
            <label htmlFor="mobileNumber" className="block text-gray-600">
              Mobile Number
            </label>
            <span className="absolute bottom-3">
              <PhoneIcon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
            </span>
            <input
              className="w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="phone"
              id="mobileNumber"
              type="number"
              placeholder="+880"
              required
            />
          </div>
          <div className="space-y-1 text-sm relative">
            <label htmlFor="location" className="block text-gray-600">
              Product Category
            </label>
            <span className="absolute bottom-3">
              <LaptopIcon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
            </span>
            <select
              className="select select-bordered w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              // value={brand}
              name="brand"
              type="text"
              placeholder="Product Category"
              required>
              {category.map((opt) => (
                <option key={opt.value} value={opt._id}>
                  {opt.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1 text-sm relative">
            <label htmlFor="yearOfUsed" className="block text-gray-600">
              Years of used
            </label>
            <span className="absolute bottom-3">
              <EventIcon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
            </span>
            <select
              className="select select-bordered w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              // value={brand}
              name="yearOfUsed"
              type="text"
              placeholder="Year Of Used"
              required>
              {usedYear.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="condition" className="block text-gray-600">
              Product Condition
            </label>
            <div className="flex">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">Excellent</span>
                  <input
                    type="radio"
                    value="excellent"
                    name="radio-10"
                    className="radio checked:bg-blue-500"
                    checked={selected === "excellent"}
                    onChange={handleOptionChange}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">Good</span>
                  <input
                    type="radio"
                    value="good"
                    name="radio-10"
                    className="radio checked:bg-blue-500"
                    checked={selected === "good"}
                    onChange={handleOptionChange}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">Fair</span>
                  <input
                    type="radio"
                    value="fair"
                    name="radio-10"
                    className="radio checked:bg-red-500"
                    checked={selected === "fair"}
                    onChange={handleOptionChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 items-center">
            <label
              htmlFor="image"
              className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-md cursor-pointer dark:border-gray-600 dark:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <h2 className="mx-3 text-gray-400 w-full">
                Upload Product Photo
              </h2>
              <input
                type="file"
                name="img"
                id="image"
                accept="image/*"
                hidden
              />
            </label>
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="description" className="block text-gray-600">
              Description
            </label>

            <textarea
              id="description"
              className="w-full h-20 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="description"></textarea>
          </div>
          <button
            type="submit"
            className="block w-full p-3 text-center font-medium tracking-wide transition duration-200 rounded shadow-md hover:text-gray-100 bg-gradient-to-r from-blue-600 to-sky-500 text-white focus:shadow-outline focus:outline-none">
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
