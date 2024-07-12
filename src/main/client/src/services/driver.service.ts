import axios from "axios";
import authHeader from "./auth-header";
import IDriver from "../types/driver.type.ts";
import {Env} from "../Env.ts";

// const API_URL = "/api/driver/";
const API_URL = `${Env.API_BASE_URL}/driver/`;

export const getDriverData = async (data:any): Promise<IDriver> => {
    return await axios.get(API_URL + data.driverId, {headers: authHeader()})
        .then(response => response.data);
};

export const getAllDrivers = async () => {
    return await axios.get(API_URL + "allDrivers", {headers: authHeader()})
        .then(response => response.data);
};

export const getDriversInTeam = async (teamId: number | null | undefined): Promise<Array<IDriver>> => {
    return await axios.get(API_URL + "driversInTeam/" + teamId, {headers: authHeader()})
        .then(response => response.data);
};

export const getUndraftedDrivers = async (leagueId: number | null | undefined): Promise<Array<IDriver>> => {
    return await axios.get(API_URL + "undraftedDrivers/" + leagueId, {headers: authHeader()})
        .then(response => response.data);
};

export const postPickDriver = async (data: {
    userId: number | null | undefined;
    driverId: number | null | undefined;
}): Promise<IDriver> => {
    return await axios
        .post(API_URL + "pick/" + data.userId,
            {
                driverId: data.driverId,
            })
        .then(response => response.data);
};