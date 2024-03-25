import { createBrowserRouter } from "react-router-dom";
import { Index } from "../pages/app";
import { LayoutApp } from "../layouts/app/app";
import { RegisterContract } from "../pages/app/register/RegisterContract";
import { UpdateContract } from "../pages/app/update/UpdateContract";
import { Login } from "../pages/app/login/Login.tsx";

export const Router = createBrowserRouter([
    { 
        path: '/',
        element: <LayoutApp/>,
        children: [
            {
                path: '/',
                loader: () => window.localStorage.getItem('@ekoos_contratos: usuario') ? window.location.href = '/index' : window.location.href = '/login'
            },
            { 
                path: '/index',
                element: <Index/>,
            },
            {
                path: '/register',
                element: <RegisterContract/>
            },
            {
                path: '/update/:seq_contrato',
                element: <UpdateContract/>,
            }
        ]
    },
    { 
        path: '/login',
        element: <Login/>,
    },
])