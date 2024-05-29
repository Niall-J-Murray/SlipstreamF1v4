interface PracticeDraftProps {
    isPracticeLeague: boolean | undefined | null,
    isLeagueFull: boolean | undefined | null,
    togglePracticeLeague: () => void,
    addTestTeam: (e: { preventDefault: () => void }) => void,
    showDraftPickTips: boolean | undefined,
    togglePracticeOptions: () => void
}

export default function PracticeDraft({
                                          isPracticeLeague,
                                          isLeagueFull,
                                          togglePracticeLeague,
                                          addTestTeam
                                      }: PracticeDraftProps) {

    function PracticeDraftNotActive() {
        return (
            <>
                <div>
                    <h4>Want to try a practice draft?</h4>
                </div>
                <div>
                    Caution:<br/>
                    <ul className="text-block">
                        <li>This cannot be undone, you will have to delete your team from this league after the
                            practice
                            draft is finished if you would like to join another league.
                        </li>
                        <li>If you do not delete your team, the league will continue as normal, but all test teams
                            will be
                            removed.
                        </li>
                    </ul>
                </div>
                <form>
                    <div className="form-check form-switch">
                        <input className="form-check-input" id="practiceDraftToggle"
                               onChange={togglePracticeLeague}
                               role="switch" type="checkbox" checked={false}/>
                        <label className="form-check-label" htmlFor="practiceDraftToggle">
                            Toggle Practice Draft Mode
                        </label>
                    </div>
                </form>
            </>
        );
    }

    function PracticeDraftActive() {
        return (
            <>
                <div>
                    <h4>For Practice Draft:</h4>
                    <ul className="text-block">
                        <li>To see how the game works, you can add dummy test teams to this league for a practice draft.
                        </li>
                        <li>Test teams can be deleted after the practice draft, or will be automatically deleted after
                            24
                            hours.
                        </li>
                        <li>Any non-test teams can be left in this league, or deleted to join a new league.</li>
                    </ul>
                </div>
                {isLeagueFull ?
                    <div>
                        This league is full, players can now begin selecting their drivers.
                    </div>
                    :
                    <div>
                    <span className={"pr-3"}>
                        Click to add test team to this league -
                    </span>
                        <button className="btn btn-proceed" id="test-team-button" type="submit"
                                onClick={(e) => {
                                    addTestTeam(e)
                                }}>
                            Add Test Team
                        </button>
                    </div>
                }
            </>
        );
    }

    function PracticeDraftToggle() {
        if (isPracticeLeague) {
            return <PracticeDraftActive/>
        } else {
            return <PracticeDraftNotActive/>
        }
    }

    return (
        <PracticeDraftToggle/>
    );
}