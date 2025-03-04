import IDriver from "../../../../types/driver.type.ts";
import {useDriverStandings} from "../../../../hooks/queries/driver-queries.ts";

export default function DriverStandingsTable() {
    const driverStandings = useDriverStandings().data;

    return (
        <>
            <table className="drivers-table">
                <caption><h3>F1 Drivers Championship</h3></caption>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Pts</th>
                    <th>Driver</th>
                    <th>Code</th>
                    <th>Nationality</th>
                    <th>Constructor</th>
                </tr>
                </thead>
                <tbody>
                {driverStandings?.map((driver: IDriver) => {
                    return (
                        <tr key={driver.id}>
                            <td>{driver.standing}</td>
                            <td>{driver.points}</td>
                            <td>{driver.surname}</td>
                            <td>{driver.shortName}</td>
                            <td>{driver.nationality}</td>
                            <td>{driver.constructor}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div>
                <h4>
                    * Driver Changes:
                    <br/>Substituted drivers will be shown here.
                </h4>
            </div>
        </>
    );
}


