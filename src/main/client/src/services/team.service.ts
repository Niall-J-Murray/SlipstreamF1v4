import axios from "axios";
import authHeader from "./auth-header.ts";

const API_DATA_URL = "http://localhost:8080/api/team";

export const getTeam = async (teamId: number | null | undefined) => {
    const data = await axios.get(API_DATA_URL + "/getTeam/" + teamId, {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const postCreateUserTeam = async (data: { userId: number| null | undefined; teamName: string; } | null | undefined) => {
    const response = await axios
        .post(API_DATA_URL + "/createUserTeam/" + data?.userId, {
            teamName: data?.teamName,
        });
    if (response.data) {
        return response.data;
    }
};

export const postDeleteUserTeam = async (userId: number | null | undefined) => {
    const response = await axios
        .post(API_DATA_URL + "/deleteUserTeam/" + userId, {});
    if (response.data) {
        return response.data;
    }
};

export const postCreateTestTeam = async (leagueId: number | null | undefined) => {
    const response = await axios
        .post(API_DATA_URL + "/createTestTeam/" + leagueId, {
            leagueId,
        })
    if (response.data) {
        return response.data;
    }
};

export const postDeleteTestTeams = async (leagueId: number | null | undefined) => {
    const response = await axios
        .post(API_DATA_URL + "/deleteTestTeams/" + leagueId, {
            leagueId,
        })
    if (response.data) {
        return response.data;
    }
};