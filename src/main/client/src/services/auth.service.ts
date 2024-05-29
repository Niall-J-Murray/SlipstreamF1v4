import axios from "axios";
import IUser from "../types/user.type.ts";
import {Env} from "../Env.ts";

// const API_URL = "http://localhost:8080/api/auth/";
// const API_URL = "/api/auth/";
//  const API_URL = "${Env.API_BASE_URL}";
const API_URL = `${Env.API_BASE_URL}/auth/`;

export const signUp = (username: string, email: string, password: string) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

// Todo Check async signIn
export const signIn = (username: string, password: string) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem("signInDate", new Date().toDateString());
            }
            return response.data;
        });
};

export const signOut = (userId: number | null | undefined) => {
    void updateOnSignOut(userId);
    localStorage.removeItem("user")
};

export const updateOnSignOut = (userId: number | null | undefined) => {
    return axios
        .post(API_URL + "signout", {
            userId,
        })
};

export const getUserFromLocalStorage = (): IUser | null => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
};