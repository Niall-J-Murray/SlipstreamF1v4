import axios from "axios";
import authHeader from "./auth-header";
import {Env} from "../Env.ts";

// const API_URL = "/api/admin/";
const API_URL = `${Env.API_BASE_URL}/admin/`;

export const getAllUsers = async () => {
    return await axios.get(API_URL + "allUsers", {headers: authHeader()})
        .then(response => response.data);
};

export const getAllLeagues = async () => {
    return await axios.get(API_URL + "allLeagues", {headers: authHeader()})
        .then(response => response.data);
};

export const getAddDrivers = async () => {
    console.log("Drivers Added Axios")
    return await axios.get(API_URL + "addDrivers", {headers: authHeader()})
        .then(response => response.data);
};

export const getUpdateStandings = async () => {
    console.log("Leagues updated Axios")
    return await axios.get(API_URL + "updateStandings", {headers: authHeader()})
        .then(response => response.data);
};

export const postDeleteTeam = async (teamId: string | number | undefined) => {
    return await axios
        .post(API_URL + "deleteTeam/" + teamId,
            {teamId: teamId})
        .then(response => response.data);
};

export const postDeleteUser = async (userId: string | number | undefined) => {
    return await axios
        .post(API_URL + "deleteUser/" + userId,
            {userId: userId})
        .then(response => response.data);
};
