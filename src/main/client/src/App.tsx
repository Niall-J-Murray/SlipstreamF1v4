import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import {getUserFromLocalStorage, logout} from "./services/auth.service";
import Home from "./feature/Home";
import Login from "./feature/Login";
import Register from "./feature/Register";
import Logout from "./feature/Logout";
import Dashboard from "./feature/Dashboard";
import Admin from "./feature/Admin";
import {useEffect, useState} from "react";
import EventBus from "./common/EventBus.ts";
import {useUserAuth} from "./hooks/queries/auth-queries.ts";
import {useUserData} from "./hooks/queries/user-queries.ts";
import {hideLoader, showLoader} from "./services/loading.service.ts";
import IUser from "./types/user.type.ts";

export default function App() {
    const [currentUser, setCurrentUser]
        = useState<IUser | undefined>();

    useEffect(() => {
        const user = getUserFromLocalStorage();
        // console.log;(user)
        if (user) {
            setCurrentUser(user);
        }
        EventBus.on("logout", logOut);
        return () => {
            EventBus.remove("logout", logOut);
        };
    }, []);

    const logOut = () => {
        logout(currentUser?.id);
    }

    const {
        data: userAuth,
        isLoading: userAuthLoading,
        // status: statUserAuth,
        error: errUserAuth,
    } = useUserAuth();
    // const userId = userAuth ? userAuth.id : null;
    const {
        data: userData,
        isLoading: userDataLoading,
        // status: statUserData,
        error: errUserData,
    } = useUserData(userAuth?.id);


    const isLoading = userAuthLoading || userDataLoading;
    const error = errUserAuth || errUserData;

    if (isLoading) {
        return <>{showLoader()}</>
        // showLoader();
    } else {
        hideLoader();
    }

    if (error) {
        return (<Login userData={userData} error={error}/>);
    }

    // if (statUserAuth === "loading") return <>showLoader()</>;
    // if (statUserAuth === "success") hideLoader();
    // if (statUserAuth === "error") return <h1>{JSON.stringify(errUserAuth)}</h1>
    //
    // if (statUserData === "loading") return <>showLoader()</>;
    // if (statUserData === "success") hideLoader();
    // if (statUserData === "error") return <h1>{JSON.stringify(errUserData)}</h1>

    return (
        <>
            <div className="container">
                <BrowserRouter basename={"/slipstream"}>
                    <Routes>
                        <Route path="/" element={<Home userData={userData}/>}/>
                        <Route path="/home" element={<Home userData={userData}/>}/>
                        <Route path="/register" element={<Register userData={userData}/>}/>
                        <Route path="/login" element={<Login userData={userData} error={error}/>}/>
                        <Route path="/dashboard" element={<Dashboard userData={userData}/>}/>
                        <Route path="/admin" element={<Admin userData={userData}/>}/>
                        <Route path="/logout" element={<Logout userData={userData}/>}/>
                        {/*<Route path="/test" element={<TestPage userData={userData}/>}/>*/}
                        {/*<Route path="/sse" element={<SseTestPage/>}/>*/}
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}


// import './App.css'
// import {Link} from "react-router-dom";
// import {useEffect} from "react";
// import {Env} from "./Env.ts";
//
// function App() {
//     useEffect(() => {
//         fetch(`${Env.API_BASE_URL}/ping`)
//             .then(response => response.text())
//             .then(body => console.log(body));
//     }, []);
//     return (
//         <>
//             <h1>Slipstream F1</h1>
//             <Link to='/home'>
//                 Visit /home
//             </Link>
//         </>
//     )
// }
//
// export default App
