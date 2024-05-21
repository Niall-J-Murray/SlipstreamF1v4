import TeamDeleteControls from "./TeamDeleteControls";
import IDriver from "../../../types/driver.type.ts";
import {Fragment} from "react";

interface ActiveLeagueInfoProps {
    undraftedDrivers: Array<IDriver> | undefined | null,
    isPracticeLeague: boolean | undefined | null
    handleDeleteTestTeams: (e: { preventDefault: () => void }) => void,
}

export default function ActiveLeagueInfo({
                                             undraftedDrivers,
                                             isPracticeLeague,
                                             handleDeleteTestTeams
                                         }: ActiveLeagueInfoProps) {
    return (
        <div>
            {isPracticeLeague ?
                <div className="col-start-3 col-span-2">
                    <TeamDeleteControls handleDeleteTestTeams={handleDeleteTestTeams}/>
                </div>
                :
                <div className="col-start-3 col-span-2">
                    <table className="undrafted-drivers-table">
                        <caption>
                            <h3>Drivers from Deleted Teams</h3>
                        </caption>
                        <thead>
                        <tr>
                            <th className={"p-4"}>Driver</th>
                            <th className={"p-4"}>Constructor</th>
                            <th className={"p-4"}>Points</th>
                            <th className={"p-4"}>Driver</th>
                            <th className={"p-4"}>Constructor</th>
                            <th className={"p-4"}>Points</th>
                            {/*<th>Driver</th>*/}
                            {/*<th className={"pr-4"}>Constructor</th>*/}
                            {/*<th>Points</th>*/}
                        </tr>
                        </thead>
                        <tbody>

                        {undraftedDrivers?.length == 0 ?
                            <tr>
                                <td colSpan={6}>No teams have been removed from this league.</td>
                            </tr>
                            :
                            <>

                                {undraftedDrivers?.map((driver: IDriver, i: number) => {
                                    return (
                                        <Fragment key={driver.id}>
                                            {i % 2 == 0 ?
                                                <tr>
                                                    <td>{undraftedDrivers[i]?.surname}</td>
                                                    <td>{undraftedDrivers[i]?.constructor}</td>
                                                    <td>{undraftedDrivers[i]?.points}</td>
                                                    <td>{undraftedDrivers[i + 1]?.surname}</td>
                                                    <td>{undraftedDrivers[i + 1]?.constructor}</td>
                                                    <td>{undraftedDrivers[i + 1]?.points}</td>
                                                    {/*<td>{undraftedDrivers[i + 2]?.surname}</td>*/}
                                                    {/*<td>{undraftedDrivers[i + 2]?.constructor}</td>*/}
                                                    {/*<td>{undraftedDrivers[i + 2]?.points}</td>*/}
                                                </tr>
                                                :
                                                <></>
                                            }
                                        </Fragment>)
                                })}
                            </>
                        }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}
