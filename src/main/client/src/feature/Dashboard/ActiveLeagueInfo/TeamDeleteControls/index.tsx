interface TeamDeleteControlsProps {
    handleDeleteTestTeams: (e: { preventDefault: () => void }) => void
}

export default function TeamDeleteControls({handleDeleteTestTeams}: TeamDeleteControlsProps) {

    return (
        <div>
            <p>This league is now active.
                <br/>
                Test teams will be deleted 24 hours after draft was finished.
                <br/>
                You can delete your team to join a new league, or continue in this league with any user-created
                teams.
            </p>
            <div>
                <label className={"pr-3"}>
                    Test teams can be removed now by clicking here:
                </label>
                <button className="btn btn-proceed"
                        type="button"
                        onClick={(e) => handleDeleteTestTeams(e)}
                >
                    Delete all test teams
                </button>
            </div>
        </div>
    );
}