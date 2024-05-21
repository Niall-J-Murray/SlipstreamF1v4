import IUser from "../../../../types/user.type.ts";
import IDriver from "../../../../types/driver.type.ts";

interface DraftInProgressProps {
    currentPickNumber: number | undefined | null,
    isUsersTurnToPick: boolean,
    nextUserToPick: IUser | undefined,
    selectedDriver: IDriver | undefined | null,
    lastPickTime: Date | string | undefined | null,
    lastDriverPicked: IDriver | string | undefined | null,
    handlePick: (e: { preventDefault: () => void }, driverId: (number | undefined | null)) => void
}

export default function DraftInProgress({
                                            currentPickNumber,
                                            isUsersTurnToPick,
                                            nextUserToPick,
                                            selectedDriver,
                                            lastPickTime,
                                            lastDriverPicked,
                                            handlePick
                                        }: DraftInProgressProps) {

    // const formattedLastPickTime = (lastPickTime?.toLocaleTimeString() + " " + lastPickTime?.toLocaleDateString())

    if (isUsersTurnToPick) {
        return (
            <div className="grid grid-cols-2">
                <div className="col-start-1 col-span-2 draft-span">
                    <div>
                        Draft in progress...
                    </div>
                    <div className={"pick-instructions-go"}>
                        Current pick number: {currentPickNumber && currentPickNumber < 10
                        ? "0" + currentPickNumber : currentPickNumber}
                    </div>
                </div>
                <div className="col-start-1 col-span-3 draft-span">
                    {/*<div className={"pick-instructions-go"}>*/}
                    {/*    It's {nextUserToPick?.username}'s pick*/}
                    {/*</div>*/}
                    {nextUserToPick?.isTestUser ?
                        <div>
                            Select a driver
                            <br/>for test team
                        </div>
                        :
                        <div>
                            Select a driver
                            <br/>for your team
                        </div>
                    }
                    <div className={"pick-instructions-go"}>
                        It's your pick:
                        <br/>
                        {nextUserToPick?.username}
                    </div>
                </div>
                <div className="col-start-1 col-span-3 draft-span">
                    <div>
                        You have selected: {selectedDriver ?
                        (selectedDriver?.firstName + " " + selectedDriver?.surname)
                        :
                        "Select a driver below..."
                    }
                    </div>
                    <div>
                        {/*<button onClick={(e) => handlePick(e, selectedDriver?.driverId)}*/}
                        <button onClick={(e) => handlePick(e, selectedDriver?.id)}
                                className={"btn btn-proceed"}
                                type="submit"
                                disabled={!selectedDriver}
                        >
                            Confirm Pick
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="grid grid-cols-2">
                <div className="col-start-1 col-span-3 draft-span">
                    <div>
                        Draft in progress...
                    </div>
                    <div className={"pick-instructions-wait"}>
                        Current pick number: {currentPickNumber && currentPickNumber < 10
                        ? "0" + currentPickNumber : currentPickNumber}
                    </div>
                </div>
                <div className="col-start-1 col-span-3 draft-span">
                    <div>
                        Last pick was made at:
                        <br/>{lastPickTime ? lastPickTime?.toString() : "No picks made yet"}
                    </div>
                    <div className={"pick-instructions-wait"}>
                        Next to pick:
                        <br/>
                        {nextUserToPick?.username}
                    </div>
                </div>
                <div className="col-start-1 col-span-3 draft-span">
                    <div>
                        Last driver picked:
                    </div>
                    <div>
                        {lastDriverPicked ? lastDriverPicked.toString() : "No picks made yet"}
                    </div>
                    {/*<div>*/}
                    {/*    <button onClick={(e) => handlePick(e, selectedDriver?.driverId)}*/}
                    {/*            className={"btn btn-proceed"}*/}
                    {/*            type="submit"*/}
                    {/*            disabled={!selectedDriver}*/}
                    {/*    >*/}
                    {/*        Confirm Pick*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}


{/*                {selectedDriver*/
}
{/*                    ?*/
}
{/*                    <div className="col-start-1 col-span-3 draft-span">*/
}
{/*                        <div>*/
}
{/*                            You have selected:*/
}
{/*                        </div>*/
}
{/*                        <div>*/
}
{/*                            {selectedDriver?.firstName + " " + selectedDriver?.surname}*/
}
{/*                        </div>*/
}
{/*                        <div>*/
}
{/*                            <button onClick={(e) => handlePick(e, selectedDriver.driverId)}*/
}
{/*                                    className={"btn btn-proceed"}*/
}
{/*                                    type="submit">*/
}
{/*                                Confirm Pick*/
}
{/*                            </button>*/
}
{/*                        </div>*/
}
{/*                    </div>*/
}
{/*                    :*/
}
{/*                    <div className="col-start-1 col-span-3 toggle-span">*/
}
{/*                        <h4>*/
}
{/*                            You have selected:*/
}
{/*                        </h4>*/
}
{/*                        <h4>*/
}
{/*                            <p>Select a driver below...</p>*/
}
{/*                        </h4>*/
}
{/*                        <h4>*/
}
{/*                            <div>*/
}
{/*                                <button onClick={(e) => handlePick(e, selectedDriverId)}*/
}
{/*                                        className={"btn btn-disabled"}*/
}
{/*                                        type="submit"*/
}
{/*                                        disabled={!selectedDriver}>*/
}
{/*                                    Confirm Pick*/
}
{/*                                </button>*/
}
{/*                            </div>*/
}
{/*                        </h4>*/
}
{/*                    </div>*/
}
{/*                }*/
}
{/*            </>*/
}
{/*        );*/
}
{/*    }*/
}

{/*    return (*/
}
{/*        <>*/
}
{/*            <PickInstructions/>*/
}
{/*        </>*/
}
{/*    )*/
}
{/*}*/
}
