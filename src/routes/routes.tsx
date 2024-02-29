import { createBrowserRouter } from "react-router-dom";
import { Index } from "../pages/app";
import { LayoutApp } from "../layouts/app/app";
import { RegisterContract } from "../pages/app/register/RegisterContract";

export const Router = createBrowserRouter([
    { 
        path: '/',
        element: <LayoutApp/>,
        children: [
            { 
                path: '/',
                element: <Index/>,
            },
            {
                path: '/register',
                element: <RegisterContract/>
            }
        ]
    },
    
])