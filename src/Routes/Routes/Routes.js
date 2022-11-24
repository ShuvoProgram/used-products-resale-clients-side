import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Blogs from "../../Page/Blogs/Blogs";
import Home from "../../Page/Home/Home/Home";
import Login from "../../Page/Login/Login";
import Error from "../../Page/Shared/Error/Error";
import SignUp from "../../Page/SignUp/SignUp";

const routes = createBrowserRouter([
    {path: '/', element: <Main/>, children: [
        {path: '/', element: <Home/>},
        {path: '/login', element: <Login/>},
        {path: '/signup', element: <SignUp/>},
        {path: '/blog', element: <Blogs/>}
    ],
errorElement: <Error/>}
])

export default routes;