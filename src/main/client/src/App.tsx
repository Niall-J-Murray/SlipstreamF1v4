import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  signOut as authSignOut,
  getUserFromLocalStorage,
} from "./services/auth.service";
import Home from "./feature/Home";
import SignIn from "./auth-components/SignIn";
import SignUp from "./auth-components/SignUp";
import SignOut from "./auth-components/SignOut";
import Profile from "./auth-components/Profile";
import Dashboard from "./feature/Dashboard";
import Admin from "./feature/Admin";
import { useEffect, useState } from "react";
import EventBus from "./common/EventBus.ts";
import { useUserAuth } from "./hooks/queries/auth-queries.ts";
import { useUserData } from "./hooks/queries/user-queries.ts";
import { hideLoader, showLoader } from "./services/loading.service.ts";
import IUser from "./types/user.type.ts";
import Layout from "./components/Layout/Layout.tsx";

export default function App() {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>();

  useEffect(() => {
    let lastSignIn = localStorage.getItem("signInDate");
    if (lastSignIn && lastSignIn < new Date().toDateString()) {
      authSignOut(currentUser?.id);
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
  };

  const {
    data: userAuth,
    isLoading: userAuthLoading,
    error: errUserAuth,
  } = useUserAuth();

  const {
    data: userData,
    isLoading: userDataLoading,
    error: errUserData,
  } = useUserData(userAuth?.id);

  const isLoading = userAuthLoading || userDataLoading;
  const error = errUserAuth || errUserData;

  if (error) {
    console.error("Application error:", error);
    return (
      <div className="app-container flex items-center justify-center">
        <div className="card p-4 text-center max-w-md w-full">
          <h2 className="text-xl text-red-600 font-bold mb-4">
            Error Occurred
          </h2>
          <p className="mb-4">
            {error instanceof Error
              ? error.message
              : "An unexpected error has occurred. Please try again later."}
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Reload Application
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    showLoader();
    return (
      <div className="app-container flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  hideLoader();

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home userData={userAuth || undefined} />
              </Layout>
            }
          />
          <Route
            path="/home"
            element={
              <Layout>
                <Home userData={userAuth || undefined} />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout>
                <SignUp userData={userAuth || undefined} />
              </Layout>
            }
          />
          <Route
            path="/signin"
            element={
              <Layout>
                <SignIn
                  userData={userAuth || undefined}
                  error={
                    error
                      ? error instanceof Error
                        ? { message: error.message }
                        : { message: "An unknown error occurred" }
                      : {}
                  }
                />
              </Layout>
            }
          />
          <Route
            path="/signout"
            element={
              <Layout>
                <SignOut userData={userAuth || undefined} />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile userData={userData || undefined} />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard userData={userData || undefined} />
              </Layout>
            }
          />
          <Route
            path="/admin"
            element={
              <Layout>
                <Admin userData={userData || undefined} />
              </Layout>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
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
