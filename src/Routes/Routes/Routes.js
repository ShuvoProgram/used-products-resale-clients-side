import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../../Layout/DashBoardLayout";
import Main from "../../Layout/Main";
import Blogs from "../../Page/Blogs/Blogs";
import AddProduct from "../../Page/Dashboard/AddProduct";
import AllBuyer from "../../Page/Dashboard/AllBuyer";
import AllSeller from "../../Page/Dashboard/AllSeller";
import Dashboard from "../../Page/Dashboard/Dashboard";
import MyOrders from "../../Page/Dashboard/MyOrders";
import MyProducts from "../../Page/Dashboard/MyProducts";
import Payment from "../../Page/Dashboard/Payment";
import ReportedItem from "../../Page/Dashboard/ReportedItem";
import Home from "../../Page/Home/Home/Home";
import Products from "../../Page/Home/Products/Products";
import Login from "../../Page/Login/Login";
import Error from "../../Page/Shared/Error/Error";
import SignUp from "../../Page/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
// import UserRoute from "../UserRoute/UserRoute";

const routes = createBrowserRouter([
    {path: '/', element: <Main/>, children: [
        {path: '/', element: <Home/>},
        {path: '/login', element: <Login/>},
        {path: '/signup', element: <SignUp/>},
        {path: '/blog', element: <Blogs/>},
        { path: '/category/:id', element: <Products />, loader: ({ params }) => fetch(`${process.env.REACT_APP_API_URL}/category/${params.id}`)}
    ],
errorElement: <Error/>},
{
    path: '/dashboard', element: <PrivateRoute><DashBoardLayout/></PrivateRoute>, children: [
        {path: '', element: <Dashboard/>},
        {path: '/dashboard/orders', element: <MyOrders/>},
        { path: '/dashboard/add-product', element: <SellerRoute><AddProduct /></SellerRoute>},
        { path: '/dashboard/my-product', element: <SellerRoute><MyProducts /></SellerRoute>},
        { path: '/dashboard/allbuyer', element: <AdminRoute><AllBuyer /></AdminRoute>},
        { path: '/dashboard/allseller', element: <AdminRoute><AllSeller /></AdminRoute>},
        { path: '/dashboard/reportitem', element: <AdminRoute><ReportedItem /></AdminRoute>},
        {
            path: '/dashboard/payment/:id',
            element: <Payment></Payment>,
            loader: ({ params }) => fetch(`${process.env.REACT_APP_API_URL}/booking/${params.id}`)
        }
    ]
}
])

export default routes;