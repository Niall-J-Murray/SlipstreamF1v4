import ITeam from "../../../../types/team.type.ts";
import ILeague from "../../../../types/league.type.ts";
import IUser from "../../../../types/user.type.ts";

interface PreDraftLeagueTableProps {
    leagueData: ILeague | undefined,
    leagueTeams: Array<ITeam> | undefined | null,
    leagueSize: number | undefined | null,
    nextUserToPick: IUser | undefined | null,
    isDraftInProgress: boolean | undefined | null
}

export default function PreDraftLeagueTable({
                                                leagueData,
                                                leagueTeams,
                                                leagueSize,
                                                nextUserToPick,
                                                isDraftInProgress
                                            }: PreDraftLeagueTableProps) {
    const rankedTeams = sortTeams(leagueTeams);

    function sortTeams(teams: Array<ITeam> | undefined | null) {
        if (isDraftInProgress) {
            teams?.sort((a: ITeam, b: ITeam) => {
                return a.firstPickNumber! - b.firstPickNumber!
            });
        }
        return teams;
    }

    return (
        <>
            <table className="league-table">
                <caption>
                    {isDraftInProgress ?
                        <h3>{leagueData?.leagueName}</h3>
                        :
                        <h3>{leagueData?.leagueName} - {leagueSize}/10 full</h3>}
                </caption>
                <thead>
                <tr>
                    <th id={"username"}>User Name</th>
                    <th id={"team-name"}>Team Name</th>
                    <th>1st Pick</th>
                    <th>2nd Pick</th>
                </tr>
                </thead>
                <tbody>
                {leagueSize == 0 ?
                    <tr>
                        <td colSpan={4}>Create a team to join this league</td>
                    </tr>
                    :
                    <>
                        {rankedTeams?.map((team: ITeam) => {
                            return (
                                <tr key={team.id}>
                                    {(isDraftInProgress && nextUserToPick?.team?.id == team.id) ?
                                        <>
                                            <td className={"selected-cell"}>{team.displayedUsername}</td>
                                            <td className={"selected-cell"}>{team.teamName}</td>
                                            <td className={"selected-cell"}>{team.firstPickNumber}</td>
                                            <td className={"selected-cell"}>{team.secondPickNumber}</td>
                                        </>
                                        :
                                        <>
                                            <td>{team.displayedUsername}</td>
                                            <td>{team.teamName}</td>
                                            <td>{team.firstPickNumber}</td>
                                            <td>{team.secondPickNumber}</td>
                                        </>
                                    }
                                </tr>
                            );
                        })}
                    </>
                }
                </tbody>
            </table>
        </>
    );
}