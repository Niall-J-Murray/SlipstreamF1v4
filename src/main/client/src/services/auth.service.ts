import axios from "axios";
import IUser from "../types/user.type.ts";

const API_URL = "/api/auth/";

export const register = (username: string, email: string, password: string) => {
    return axios.post(API_URL + "register", {
        username,
        email,
        password,
    });
};

export const login = (username: string, password: string) => {
    return axios
        .post(API_URL + "login", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

export const logout = (userId: number | null | undefined) => {
    void updateOnLogout(userId);
    localStorage.removeItem("user")
};

export const updateOnLogout = (userId: number | null | undefined) => {
    return axios
        .post(API_URL + "logout", {
            userId,
        })
};

export const getUserFromLocalStorage = (): IUser | null => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
};