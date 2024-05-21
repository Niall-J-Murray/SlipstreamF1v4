import axios from "axios";
import authHeader from "./auth-header";
import IUser from "../types/user.type.ts";

const API_URL = "http://localhost:8080/api/test";
const API_DATA_URL = "http://localhost:8080/api";

export const getPublicContent = () => {
    return axios
        .get(API_URL + "/all");
};

export const getUserBoard = () => {
    return axios
        .get(API_URL + "/user", {headers: authHeader()});
};

export const getUserData = async (userId: number | null | undefined): Promise<IUser> => {
    return await axios
        .get(API_DATA_URL + "/user/" + userId, {headers: authHeader()})
        .then(response => response.data);
};

export const getModeratorBoard = () => {
    return axios
        .get(API_URL + "/mod", {headers: authHeader()});
};

export const getAdminBoard = () => {
    return axios
        .get(API_URL + "/admin", {headers: authHeader()});
};