import {useMutation, useQuery} from "react-query";
import {
    getTeam,
    postCreateUserTeam,
    postCreateTestTeam,
    postDeleteTestTeams,
    postDeleteUserTeam
} from "../../services/team.service.ts";

export const useTeamData = (teamId: number | null | undefined) =>
    useQuery({
        queryKey: ["teamData", teamId],
        queryFn: () => getTeam(teamId),
        enabled: !!teamId,
    });

export const useCreateTeam = () =>
    useMutation({
        mutationKey: ["createTeam"],
        mutationFn: postCreateUserTeam,
    });

export const useDeleteTeam = (userId: number | null | undefined) =>
    useMutation({
        mutationKey: ["deleteTeam", userId],
        mutationFn: () => postDeleteUserTeam(userId),
    });

export const useCreateTestTeam = (leagueId: number | null | undefined) =>
    useMutation({
        mutationKey: ["createTestTeam", leagueId],
        mutationFn: () => postCreateTestTeam(leagueId),
    });

export const useDeleteTestTeams = (leagueId: number | null | undefined) =>
    useMutation({
        mutationKey: ["deleteTestTeams", leagueId],
        mutationFn: () => postDeleteTestTeams(leagueId),
    });