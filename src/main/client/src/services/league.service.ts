import axios from "axios";
import authHeader from "./auth-header";
import ILeague from "../types/league.type.ts";
import ITeam from "../types/team.type.ts";
import IUser from "../types/user.type.ts";
import {Env} from "../Env.ts";

// const API_URL = "/api/league/";
const API_URL = `${Env.API_BASE_URL}/league/`;

export const getOpenLeague = async (): Promise<ILeague> => {
    return await axios.get(API_URL + "openLeague", {headers: authHeader()})
        .then(response => response.data);
};

export const getLeagueData = async (leagueId: number | null | undefined): Promise<ILeague> => {
    return await axios.get(API_URL + leagueId, {headers: authHeader()})
        .then(response => response.data);
};

// export const getTeamLeague = async (teamId: number | null | undefined): Promise<ILeague> => {
//     return await axios.get(API_URL + "team/" + teamId, {headers: authHeader()})
//         .then(response => response.data);
// };

export const getAllLeagueTeams = async (leagueId: number | null | undefined): Promise<Array<ITeam>> => {
    return await axios.get(API_URL + leagueId + "/allTeams", {headers: authHeader()})
        .then(response => response.data);
};


// export const getIsDraftInProgress = async (leagueId: number | null | undefined): Promise<boolean> => {
//     return await axios.get(API_URL + leagueId + "/isDraftInProgress", {headers: authHeader()})
//         .then(response => response.data);
// };
//
// export const getIsLeagueActive = async (leagueId: number | null | undefined): Promise<boolean> => {
//     return await axios.get(API_URL + leagueId + "/isLeagueActive", {headers: authHeader()})
//         .then(response => response.data);
// };

export const getPickNumber = async (leagueId: number | null | undefined): Promise<number | null | undefined> => {
    if (leagueId) {
        return await axios.get(API_URL + leagueId + "/getPickNumber", {headers: authHeader()})
            .then(response => response.data);
    }
};

export const getNextUserToPick = async (leagueId: number | null | undefined): Promise<IUser> => {
    return await axios.get(API_URL + leagueId + "/getNextUserToPick", {headers: authHeader()})
        .then(response => response.data);
};

export const postToggleTestLeague = async (leagueId: number | null | undefined) => {
    const response = await axios
        .post(API_URL + leagueId + "/toggleTestLeague", {
            // headers: authHeader(),
            leagueId
        });
    if (response.data) {
        return response.data;
    }
};
