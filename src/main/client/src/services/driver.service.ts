import axios from "axios";
import authHeader from "./auth-header";
import IDriver from "../types/driver.type.ts";

const API_URL = "http://localhost:8080/api/test/";
const API_DATA_URL = "http://localhost:8080/api/driver";

export const getUserBoard = () => {
    return axios.get(API_URL + "driver", {headers: authHeader()});
};

export const getDriverData = async (data:any): Promise<IDriver> => {
    console.log("getDriverData")
    console.log(data)
    console.log(data.driverId)
    const responseData = await axios.get(API_DATA_URL + "/" + data.driverId, {headers: authHeader()})
        .then(response => response.data);
    return responseData;
};

export const getAllDrivers = async () => {
    const data = await axios.get(API_DATA_URL + "/allDrivers", {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getDriversInTeam = async (teamId: number | null | undefined): Promise<Array<IDriver>> => {
    const data = await axios.get(API_DATA_URL + "/driversInTeam/" + teamId, {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getUndraftedDrivers = async (leagueId: number | null | undefined): Promise<Array<IDriver>> => {
    const data = await axios.get(API_DATA_URL + "/undraftedDrivers/" + leagueId, {headers: authHeader()})
        .then(response => response.data);
    return data;
};

// export const postPickDriver = async (userId: number | null | undefined, driverId: string | number | null | undefined): Promise<IDriver> => {
export const postPickDriver = async (data: {
    userId: number | null | undefined;
    driverId: number | null | undefined;
}): Promise<IDriver> => {
    const response = await axios
        .post(API_DATA_URL + "/pick/" + data.userId,
            {
                driverId: data.driverId,
            })
        .then(response => response.data);
    return response;
};

// export const postPickDriver = async (data: { userId: string; driverId: number; }): Promise<IDriver> => {
//     const response = await axios
//         .post(API_DATA_URL + "/pick/" + data.userId,
//             {
//                 driverId: data.driverId,
//             });
//     if (response.data) {
//         return response.data;
//     }
// };