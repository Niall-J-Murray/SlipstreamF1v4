import ITeam from "../../../../types/team.type.ts";
import IDriver from "../../../../types/driver.type.ts";
import {Fragment} from "react";
import {UseQueryResult} from "react-query";
import ILeague from "../../../../types/league.type.ts";


interface PostDraftLeagueTableProps {
    leagueData: ILeague | undefined,
    leagueTeams: Array<ITeam> | undefined | null,
    driversInTeam: (teamId: (number | null | undefined)) => UseQueryResult<IDriver[], unknown>,
}

export default function PostDraftLeagueTable({leagueData, leagueTeams, driversInTeam}: PostDraftLeagueTableProps) {

    function sortTeams(teams: Array<ITeam> | undefined | null) {
        teams?.sort((a: ITeam, b: ITeam) => {
            // if (a.teamPoints == 0 && b.teamPoints == 0) {
            //     return b.firstPickNumber! - a.firstPickNumber!;
            // }
            return a.ranking! - b.ranking!;
        });
        return teams;
    }

    const rankedTeams = sortTeams(leagueTeams);
    // const driversInTeam = useDriversInTeam;

    return (
        <>
            <table className="league-table pb-3">
                <caption>
                    <h3>{leagueData?.leagueName}</h3>
                    {/*<h3>{currentLeague?.isActive ? "League is active" : "League not active"}</h3>*/}
                </caption>
                <thead>
                <tr>
                    {/*<th className={"ranking"}>#</th>*/}
                    {/*<th className={"username"}>Username</th>*/}
                    {/*<th className={"teamname"}>Teamname</th>*/}
                    {/*<th className={"points"}>Points</th>*/}
                    {/*<th className={"drivers"} colSpan={2}>Drivers</th>*/}
                    <th>Pos</th>
                    <th className={"user-info-col"}>User Name</th>
                    <th className={"user-info-col"}>Team Name</th>
                    <th>Points</th>
                    <th>Driver 1</th>
                    <th colSpan={2}>Driver Points</th>
                    <th>Driver 2</th>
                </tr>
                </thead>
                <tbody>
                {rankedTeams?.map((team: ITeam) => {
                    team.drivers = driversInTeam(team.id).data
                    return (
                        <tr key={team.id}>
                            <td>{team.ranking}</td>
                            <td>{team.displayedUsername}</td>
                            <td>{team.teamName}</td>
                            <td>{team.teamPoints}</td>
                            {/*<td>{driversInTeam(team.id) ? driversInTeam[0]?.shortName : "d1"}</td>*/}
                            {/*<td>{driversInTeam(team.id) ? driversInTeam[1]?.shortName : "d2"}</td>*/}
                            {/*<td>{driversInTeam[0].shortName}</td>*/}
                            {/*<td>{driversInTeam[1].shortName}</td>*/}
                            {/*{team.drivers = driversInTeam(team.id)}*/}
                            {/*<td>{team.drivers[0].surname} ({team.drivers[0].points} - {team.firstPickStartingPoints})</td>*/}

                            {team.drivers?.map((driver: IDriver, i: number) => {
                                return (
                                    <Fragment key={driver.id}>
                                        {i == 0 && team.drivers ?
                                            <>
                                                <td>
                                                    {team.drivers[i].surname}
                                                </td>
                                                <td>
                                                    {(team.drivers[i].points! - team.firstPickStartingPoints!)}
                                                </td>
                                            </>
                                            : ""}
                                        {i == 1 && team.drivers ?
                                            <>
                                                <td>
                                                    {(team.drivers[i].points! - team.secondPickStartingPoints!)}
                                                </td>
                                                <td>
                                                    {team.drivers[i].surname}
                                                </td>
                                            </>
                                            : ""}
                                    </Fragment>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    );
}