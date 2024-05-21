import PracticeDraftOptions from "./PracticeDraftOptions";
import DraftInProgress from "./DraftInProgress";
import IUser from "../../../types/user.type.ts";
import ILeague from "../../../types/league.type.ts";
import IDriver from "../../../types/driver.type.ts";
import PracticeOptionsToggle from "./PracticeDraftOptions/PracticeOptionsToggle";

interface DraftControlsProps {
    userData: IUser | undefined,
    leagueData: ILeague | undefined,
    isPracticeLeague: boolean | undefined | null,
    isLeagueFull: boolean | undefined | null,
    showDraftPickTips: boolean | undefined,
    selectedDriver: IDriver | undefined | null,
    lastPickTime: Date | string | undefined | null,
    lastDriverPicked: IDriver | string | undefined | null,
    currentPickNumber: number | undefined | null,
    isUsersTurnToPick: boolean,
    nextUserToPick: IUser | undefined,
    togglePracticeOptions: () => void,
    togglePracticeLeague: () => void,
    addTestTeam: (e: { preventDefault: () => void }) => void,
    handlePick: (e: { preventDefault: () => void }, driverId: (number | undefined | null)) => void
}

export default function DraftControls({
                                          userData,
                                          leagueData,
                                          isPracticeLeague,
                                          isLeagueFull,
                                          showDraftPickTips,
                                          selectedDriver,
                                          lastPickTime,
                                          lastDriverPicked,
                                          currentPickNumber,
                                          isUsersTurnToPick,
                                          nextUserToPick,
                                          togglePracticeOptions,
                                          togglePracticeLeague,
                                          addTestTeam,
                                          handlePick
                                      }: DraftControlsProps) {

    if (!userData?.team) {
        return (
            <>
                <PracticeOptionsToggle
                    isPracticeLeague={isPracticeLeague}
                    showDraftPickTips={showDraftPickTips}
                    togglePracticeOptions={togglePracticeOptions}
                />
                <div className={"pt-5"}>
                    <h3>Please create a team to join an open league or try a practice draft.</h3>
                    <div className={"pt-5"}></div>
                    <h4>Controls and instructions will be available here once you have created a team...</h4>
                </div>
            </>
        );
    } else {
        return (
            <div>
                <PracticeOptionsToggle
                    isPracticeLeague={isPracticeLeague}
                    showDraftPickTips={showDraftPickTips}
                    togglePracticeOptions={togglePracticeOptions}
                />
                {isLeagueFull ?
                    <DraftInProgress
                        currentPickNumber={currentPickNumber}
                        isUsersTurnToPick={isUsersTurnToPick}
                        nextUserToPick={nextUserToPick}
                        selectedDriver={selectedDriver}
                        lastPickTime={lastPickTime}
                        lastDriverPicked={lastDriverPicked}
                        handlePick={handlePick}
                    />
                    :
                    <div className="grid grid-cols-5">
                        <PracticeDraftOptions
                            leagueData={leagueData}
                            isPracticeLeague={isPracticeLeague}
                            isLeagueFull={isLeagueFull}
                            showDraftPickTips={showDraftPickTips}
                            togglePracticeOptions={togglePracticeOptions}
                            togglePracticeLeague={togglePracticeLeague}
                            addTestTeam={addTestTeam}
                        />
                    </div>
                }
            </div>
        )
    }
}
