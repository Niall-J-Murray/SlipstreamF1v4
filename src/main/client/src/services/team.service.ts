import axios from "axios";
import authHeader from "./auth-header.ts";
import {Env} from "../Env.ts";

// const API_URL = "/api/team/";
const API_URL = `${Env.API_BASE_URL}/team/`;

export const getTeam = async (teamId: number | null | undefined) => {
    return await axios.get(API_URL + "getTeam/" + teamId, {headers: authHeader()})
        .then(response => response.data);
};

export const postCreateUserTeam = async (data: { userId: number| null | undefined; teamName: string; } | null | undefined) => {
    const response = await axios
        .post(API_URL + "createUserTeam/" + data?.userId, {
            teamName: data?.teamName,
        });
    if (response.data) {
        return response.data;
    }
};

export const postDeleteUserTeam = async (userId: number | null | undefined) => {
    const response = await axios
        .post(API_URL + "deleteUserTeam/" + userId, {});
    if (response.data) {
        return response.data;
    }
};

export const postCreateTestTeam = async (leagueId: number | null | undefined) => {
    const response = await axios
        .post(API_URL + "createTestTeam/" + leagueId, {
            leagueId,
        })
    if (response.data) {
        return response.data;
    }
};

export const postDeleteTestTeams = async (leagueId: number | null | undefined) => {
    const response = await axios
        .post(API_URL + "deleteTestTeams/" + leagueId, {
            leagueId,
        })
    if (response.data) {
        return response.data;
    }
};