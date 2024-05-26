import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'virtual:uno.css'
import "../src/assets/css/custom.css";
import App from './App.tsx'
// import {BrowserRouter} from "react-router-dom";
import {ReactQueryDevtools} from "react-query/devtools";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/*<BrowserRouter basename={'/slipstream'}>*/}
            <QueryClientProvider client={queryClient}>
                <App/>
                <ReactQueryDevtools/>
            </QueryClientProvider>
        {/*</BrowserRouter>*/}
    </React.StrictMode>
);


// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
// import {createBrowserRouter, RouterProvider} from 'react-router-dom';
//
// import slipstreamLogo from "/src/assets/images/slipstreamLogoBlack.png";
//
// const router = createBrowserRouter([
//         {
//             path: '/',
//             element: <App/>,
//         },
//         {
//             path: '/home',
//             element:
//                 <div>
//                     <img
//                         className="h-8 w-auto"
//                         src={slipstreamLogo}
//                         alt="Slipstream Logo"
//                     />
//                 </div>,
//         },
//     ],
//     {
//         basename: '/slipstream',
//     },
// );
//
// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//         <RouterProvider router={router}/>
//     </React.StrictMode>,
// )
