import PracticeDraft from "./PracticeDraft";
import ILeague from "../../../../types/league.type.ts";

interface PracticeDraftOptionsProps {
    leagueData: ILeague | undefined,
    isPracticeLeague: boolean | undefined | null,
    isLeagueFull: boolean | undefined | null,
    showDraftPickTips: boolean | undefined,
    togglePracticeOptions: () => void,
    togglePracticeLeague: () => void,
    addTestTeam: (e: { preventDefault: () => void }) => void
}

export default function PracticeDraftOptions({isPracticeLeague, isLeagueFull, showDraftPickTips, togglePracticeOptions, togglePracticeLeague, addTestTeam}: PracticeDraftOptionsProps) {
    return (
        <>
            <div className="col-start-1 col-span-5">
                <PracticeDraft
                    isPracticeLeague={isPracticeLeague}
                    isLeagueFull={isLeagueFull}
                    togglePracticeLeague={togglePracticeLeague}
                    addTestTeam={addTestTeam}
                    showDraftPickTips={showDraftPickTips}
                    togglePracticeOptions={togglePracticeOptions}
                />
            </div>
        </>
    )
}