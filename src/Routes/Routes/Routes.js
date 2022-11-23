import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Blogs from "../../Page/Blogs/Blogs";
import Login from "../../Page/Login/Login";
import SignUp from "../../Page/SignUp/SignUp";

const routes = createBrowserRouter([
    {path: '/', element: <Main/>, children: [
        {path: '/login', element: <Login/>},
        {path: '/signup', element: <SignUp/>},
        {path: '/blog', element: <Blogs/>}
    ]}
])

export default routes;