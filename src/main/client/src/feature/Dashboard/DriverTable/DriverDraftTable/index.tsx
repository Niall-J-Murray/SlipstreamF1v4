import IDriver from "../../../../types/driver.type.ts";

interface DriverDraftTableProps {
    isUsersTurnToPick: boolean | undefined | null,
    handleDriverSelection: (driver: IDriver) => IDriver,
    selectedDriver: IDriver | undefined | null,
    undraftedDrivers: Array<IDriver> | undefined | null
}

export default function DriverDraftTable({
                                             isUsersTurnToPick,
                                             handleDriverSelection,
                                             selectedDriver,
                                             undraftedDrivers
                                         }: DriverDraftTableProps) {
    return (
        <>
            <div className="col-start-3 col-span-2">
                <table className="drivers-table draft-table">
                    <caption>
                        <h3>Undrafted Drivers -<small>({undraftedDrivers?.length}/20 remaining)</small></h3>
                    </caption>
                    <thead>
                    <tr>
                        {(isUsersTurnToPick) ?
                            <th>Pick</th>
                            :
                            <th>Car#</th>
                        }
                        <th>Driver</th>
                        <th>Pos</th>
                        <th>Pts</th>
                        <th>Nationality</th>
                        <th>Constructor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {undraftedDrivers?.map((driver: IDriver) => {
                        return (
                            <tr key={driver.id}>
                                {(!isUsersTurnToPick) ?
                                    <>
                                        <td>{driver.carNumber}</td>
                                        <td>{driver.surname}</td>
                                        <td>{driver.standing}</td>
                                        <td>{driver.points}</td>
                                        <td>{driver.nationality}</td>
                                        <td>{driver.constructor}</td>
                                    </> :
                                    <>
                                        {selectedDriver?.id == driver.id ?
                                            <>
                                                <td className={"selected-cell"}>
                                                    <input
                                                        id="driver-radio"
                                                        type="radio"
                                                        name="driverId"
                                                        defaultChecked={true}
                                                        onChange={() => {
                                                            handleDriverSelection(driver)
                                                        }}
                                                    />
                                                </td>
                                                <td className={"selected-cell"}>{driver.surname}</td>
                                                <td className={"selected-cell"}>{driver.standing}</td>
                                                <td className={"selected-cell"}>{driver.points}</td>
                                                <td className={"selected-cell"}>{driver.nationality}</td>
                                                <td className={"selected-cell"}>{driver.constructor}</td>
                                            </>
                                            :
                                            <>
                                                <td>
                                                    <input
                                                        id="driver-radio"
                                                        type="radio"
                                                        name="driverId"
                                                        onClick={() => {
                                                            handleDriverSelection(driver)
                                                        }}
                                                    />
                                                </td>
                                                <td>{driver.surname}</td>
                                                <td>{driver.standing}</td>
                                                <td>{driver.points}</td>
                                                <td>{driver.nationality}</td>
                                                <td>{driver.constructor}</td>
                                            </>
                                        }
                                    </>
                                }
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <div>
                    <h6>
                        * Driver Changes:
                        <br/>Ricciardo replaced de Vries on July 11th 2023.
                        <br/>Lawson replaced Ricciardo on August 27th 2023.
                        <br/>Ricciardo replaced Lawson on October 20th 2023.
                    </h6>
                </div>
            </div>
        </>
    );
}

