import DriverDraftTable from "./DriverDraftTable";
import DriverStandingsTable from "./DriverStandingsTable";
import IDriver from "../../../types/driver.type.ts";

interface DriverTableProps {
    isDraftInProgress: boolean | undefined | null,
    isUsersTurnToPick: boolean | undefined | null,
    selectedDriver: IDriver | undefined | null,
    undraftedDrivers: Array<IDriver> | undefined | null,
    handleDriverSelection: (driver: IDriver) => IDriver,
}

export default function DriverTable({isDraftInProgress, isUsersTurnToPick, selectedDriver, undraftedDrivers, handleDriverSelection}: DriverTableProps) {
    if (isDraftInProgress) {
        return (
            <DriverDraftTable
                isUsersTurnToPick={isUsersTurnToPick}
                handleDriverSelection={handleDriverSelection}
                selectedDriver={selectedDriver}
                undraftedDrivers={undraftedDrivers}
            />
        );
    }
    return (
        <div className="col-start-3 col-span-2">
            <DriverStandingsTable/>
        </div>
    );
}