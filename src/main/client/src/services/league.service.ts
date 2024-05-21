import axios from "axios";
import authHeader from "./auth-header";
import ILeague from "../types/league.type.ts";
import ITeam from "../types/team.type.ts";
import IUser from "../types/user.type.ts";

const API_DATA_URL = "http://localhost:8080/api/league/";

export const getOpenLeague = async (): Promise<ILeague> => {
    const data = await axios.get(API_DATA_URL + "openLeague", {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getLeagueData = async (leagueId: number | null | undefined): Promise<ILeague> => {
    const data = await axios.get(API_DATA_URL + leagueId, {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getTeamLeague = async (teamId: number | null | undefined): Promise<ILeague> => {
    const data = await axios.get(API_DATA_URL + "team/" + teamId, {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getAllLeagueTeams = async (leagueId: number | null | undefined): Promise<Array<ITeam>> => {
    const data = await axios.get(API_DATA_URL + leagueId + "/allTeams", {headers: authHeader()})
        .then(response => response.data);
    return data;
};


export const getIsDraftInProgress = async (leagueId: number | null | undefined): Promise<boolean> => {
    const data = await axios.get(API_DATA_URL + leagueId + "/isDraftInProgress", {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getIsLeagueActive = async (leagueId: number | null | undefined): Promise<boolean> => {
    const data = await axios.get(API_DATA_URL + leagueId + "/isLeagueActive", {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getPickNumber = async (leagueId: number | null | undefined): Promise<number | null | undefined> => {
    if (leagueId) {
        const data = await axios.get(API_DATA_URL + leagueId + "/getPickNumber", {headers: authHeader()})
            .then(response => response.data);
        return data;
    }
};

export const getNextUserToPick = async (leagueId: number | null | undefined): Promise<IUser> => {
    const data = await axios.get(API_DATA_URL + leagueId + "/getNextUserToPick", {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const postToggleTestLeague = async (leagueId: number | null | undefined) => {
    const response = await axios
        .post(API_DATA_URL + leagueId + "/toggleTestLeague", {
            // headers: authHeader(),
            leagueId
        });
    if (response.data) {
        return response.data;
    }
};
