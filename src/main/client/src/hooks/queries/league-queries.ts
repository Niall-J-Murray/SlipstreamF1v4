import {useQuery} from "react-query";
import {
    getAllLeagueTeams,
    getLeagueData,
    getNextUserToPick,
    getOpenLeague,
    getPickNumber
} from "../../services/league.service.ts";

export const useOpenLeague = () =>
    useQuery({
        queryKey: ["openLeague"],
        queryFn: () => getOpenLeague(),
    });

// export const useLeagueData = (leagueId: number | null | undefined, reFetchToggle: boolean | undefined) =>
//     useQuery({
//         queryKey: ["leagueData", leagueId, reFetchToggle],
//         queryFn: () => getLeagueData(leagueId),
//         enabled: !!leagueId,
//         // refetchInterval: 5000,
//     });

export const useLeagueData = (leagueId: number | null | undefined) =>
    useQuery({
        queryKey: ["leagueData", leagueId],
        queryFn: () => getLeagueData(leagueId),
        enabled: !!leagueId,
    });

export const useAllTeamsInLeague = (leagueId: number | null | undefined) =>
    useQuery({
        queryKey: ["allTeamsInLeague", leagueId],
        queryFn: () => getAllLeagueTeams(leagueId),
        enabled: !!leagueId,
    });

// export const useNextPickNumber = (leagueId: number | null | undefined, reFetchToggle: boolean | undefined) =>
//     useQuery({
//         queryKey: ["nextPickNumber", leagueId],
//         queryFn: () => getPickNumber(leagueId),
//         // enabled: !!reFetchToggle,
//         enabled: !!leagueId && reFetchToggle,
//         refetchInterval: 5000,
//     });

export const useNextPickNumber = (leagueId: number | null | undefined) =>
    useQuery({
        queryKey: ["nextPickNumber", leagueId],
        queryFn: () => getPickNumber(leagueId),
        enabled: !!leagueId,
    });

export const useNextUserToPick = (leagueId: number | null | undefined) =>
    useQuery({
        queryKey: ["nextUserToPick", leagueId],
        queryFn: () => getNextUserToPick(leagueId),
        enabled: !!leagueId,
    });

// export const useNextUserToPick = (leagueId: number | null | undefined, reFetchToggle: boolean | undefined) =>
//     useQuery({
//         queryKey: ["nextUserToPick", leagueId],
//         queryFn: () => getNextUserToPick(leagueId),
//         enabled: !!leagueId && reFetchToggle,
//         refetchInterval: 5000,
//     });