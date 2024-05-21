import {useEffect, useState} from "react";
import {getAllLeagues} from "../../../services/admin.service.ts";
import ILeague from "../../../types/league.type.ts";

export default function LeaguesTable() {
    const [allLeagues, setAllLeagues]
        = useState([])


    useEffect(() => {
        const getDriverStandings = async () => {
            await getAllLeagues().then(function (response) {
                setAllLeagues(response);
            });
        }
        getDriverStandings().catch(console.error);
    }, []);

    return (
        <>

            <table className="drivers-table">
                <caption><h3>Leagues</h3></caption>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>League Name</th>
                    <th>Size</th>
                    <th>Creation Time</th>
                    <th>Active Time</th>
                    <th>Test?</th>
                </tr>
                </thead>
                <tbody>
                {allLeagues?.map((league: ILeague) => {
                    return (
                        <tr key={league.id}>
                            <td>{league.id}</td>
                            <td>{league.leagueName}</td>
                            <td>{league.teams?.length}</td>
                            <td>{league.creationTimestamp}</td>
                            <td>{league.activeTimestamp}</td>
                            <td>{league.isPracticeLeague ? "Yes" : "No"}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    );
}


