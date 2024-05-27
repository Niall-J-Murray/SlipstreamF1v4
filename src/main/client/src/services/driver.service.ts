import axios from "axios";
import authHeader from "./auth-header";
import IDriver from "../types/driver.type.ts";

const API_DATA_URL = "/api/driver/";

export const getDriverData = async (data:any): Promise<IDriver> => {
    return await axios.get(API_DATA_URL + data.driverId, {headers: authHeader()})
        .then(response => response.data);
};

export const getAllDrivers = async () => {
    return await axios.get(API_DATA_URL + "allDrivers", {headers: authHeader()})
        .then(response => response.data);
};

export const getDriversInTeam = async (teamId: number | null | undefined): Promise<Array<IDriver>> => {
    return await axios.get(API_DATA_URL + "driversInTeam/" + teamId, {headers: authHeader()})
        .then(response => response.data);
};

export const getUndraftedDrivers = async (leagueId: number | null | undefined): Promise<Array<IDriver>> => {
    return await axios.get(API_DATA_URL + "undraftedDrivers/" + leagueId, {headers: authHeader()})
        .then(response => response.data);
};

export const postPickDriver = async (data: {
    userId: number | null | undefined;
    driverId: number | null | undefined;
}): Promise<IDriver> => {
    return await axios
        .post(API_DATA_URL + "pick/" + data.userId,
            {
                driverId: data.driverId,
            })
        .then(response => response.data);
};