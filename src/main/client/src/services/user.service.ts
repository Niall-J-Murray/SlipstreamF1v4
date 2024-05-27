import axios from "axios";
import authHeader from "./auth-header";
import IUser from "../types/user.type.ts";

const API_DATA_URL = "/api/user/";

export const getUserData = async (userId: number | null | undefined): Promise<IUser> => {
    return await axios
        .get(API_DATA_URL + userId, {headers: authHeader()})
        .then(response => response.data);
};
