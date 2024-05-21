import axios from "axios";
import authHeader from "./auth-header";

const API_DATA_URL = "http://localhost:8080/api/admin";

export const getAllUsers = async () => {
    return await axios.get(API_DATA_URL + "/allUsers", {headers: authHeader()})
        .then(response => response.data);
};

export const getAllLeagues = async () => {
    return await axios.get(API_DATA_URL + "/allLeagues", {headers: authHeader()})
        .then(response => response.data);
};

export const getAddDrivers = async () => {
    console.log("Drivers Added Axios")
    return await axios.get(API_DATA_URL + "/addDrivers", {headers: authHeader()})
        .then(response => response.data);
};

export const getUpdateStandings = async () => {
    console.log("Leagues updated Axios")
    return await axios.get(API_DATA_URL + "/updateStandings", {headers: authHeader()})
        .then(response => response.data);
};

export const postDeleteTeam = async (teamId: string | number | undefined) => {
    return await axios
        .post(API_DATA_URL + "/deleteTeam/" + teamId,
            {teamId: teamId})
        .then(response => response.data);
};

export const postDeleteUser = async (userId: string | number | undefined) => {
    return await axios
        .post(API_DATA_URL + "/deleteUser/" + userId,
            {userId: userId})
        .then(response => response.data);
};
