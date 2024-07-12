import axios from "axios";
import authHeader from "./auth-header";
import IUser from "../types/user.type.ts";
import {Env} from "../Env.ts";

// const API_URL = "/api/user/";
const API_URL = `${Env.API_BASE_URL}/user/`;

export const getUserData = async (userId: number | null | undefined): Promise<IUser> => {
    return await axios
        .get(API_URL + userId, {headers: authHeader()})
        .then(response => response.data);
};
