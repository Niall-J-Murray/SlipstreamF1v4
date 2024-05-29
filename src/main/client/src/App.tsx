import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import {signOut as authSignOut, getUserFromLocalStorage} from "./services/auth.service";
import Home from "./feature/Home";
import SignIn from "./auth-components/SignIn";
import SignUp from "./auth-components/SignUp";
import SignOut from "./auth-components/SignOut";
import Profile from "./auth-components/Profile";
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
        let lastSignIn = localStorage.getItem("signInDate");
        if (lastSignIn && lastSignIn < new Date().toDateString()) {
            authSignOut(currentUser?.id)
        }
        const user = getUserFromLocalStorage();
        if (user) {
            setCurrentUser(user);
        }
        EventBus.on("signout", signOut);
        return () => {
            EventBus.remove("signout", signOut);
        };
    }, []);

    const signOut = () => {
        authSignOut(currentUser?.id);
    }

    const {
        data: userAuth,
        isLoading: userAuthLoading,
        // status: statUserAuth,
        error: errUserAuth,
    } = useUserAuth();

    const {
        data: userData,
        isLoading: userDataLoading,
        // status: statUserData,
        error: errUserData,
    } = useUserData(userAuth?.id);


    const isLoading = userAuthLoading || userDataLoading;
    const error = errUserAuth || errUserData;

    if (error) {
        return (
            <SignIn userData={userData} error={error}/>
        );
    } else if (isLoading) {
        // toggleLoading={props.toggleLoading}
        showLoader()
    } else {
        hideLoader();
        return (
            <>
                <div className="container">
                    <BrowserRouter basename={"/slipstream"}>
                        <Routes>
                            <Route path="/" element={<Home userData={userData}/>}/>
                            <Route path="/home" element={<Home userData={userData}/>}/>
                            <Route path="/signup" element={<SignUp userData={userData}/>}/>
                            <Route path="/signin" element={<SignIn userData={userData} error={error}/>}/>
                            <Route path="/profile" element={<Profile userData={userData}/>}/>
                            <Route path="/dashboard" element={<Dashboard userData={userData}/>}/>
                            <Route path="/admin" element={<Admin userData={userData}/>}/>
                            <Route path="/signout" element={<SignOut userData={userData}/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </>
        );
    }
}


// import './App.css'
// import {Link} from "react-router-dom";
// import {useEffect} from "react";
// import {Env} from "./Env.ts";
//
// function App() {

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
