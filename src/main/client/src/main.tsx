import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import slipstreamLogo from "/src/assets/images/slipstreamLogoBlack.png";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/home',
        element:
            <div>
                <img
                    className="h-8 w-auto"
                    src={slipstreamLogo}
                    alt="Slipstream Logo"
                />
            </div>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
