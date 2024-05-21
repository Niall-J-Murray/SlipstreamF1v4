interface PracticeOptionsToggleProps {
    isPracticeLeague: boolean | undefined | null,
    showDraftPickTips: boolean | undefined
    togglePracticeOptions: () => void,
}

export default function PracticeOptionsToggle({
                                                  isPracticeLeague,
                                                  togglePracticeOptions,
                                                  showDraftPickTips
                                              }: PracticeOptionsToggleProps) {
    // return (
    //     <>
    //         <div className={"toggle-span"}>
    //             {showDraftPickTips ? "Draft Pick Tips" : "Draft Controls"}
    //             <div className="form-check form-switch">
    //                 <input className="form-check-input"
    //                        id="testBoxToggleOff" onChange={togglePracticeOptions} role="switch"
    //                        type="checkbox" defaultChecked={showDraftPickTips}/>
    //                 <label className="form-check-label" htmlFor="testBoxToggleOff">Show Draft Pick Tips</label>
    //             </div>
    //         </div>
    //         <hr/>
    //     </>
    // );
    return (
        <>
            {isPracticeLeague ?
                <>
                    <div className={"toggle-span"}>
                        {showDraftPickTips ? "Draft Pick Tips" : "Draft Controls"}
                        <div className="form-check form-switch">
                            <input className="form-check-input"
                                   id="testBoxToggleOff" onChange={togglePracticeOptions} role="switch"
                                   type="checkbox" defaultChecked={showDraftPickTips}/>
                            <label className="form-check-label" htmlFor="testBoxToggleOff">Show Draft Pick Tips</label>
                        </div>
                    </div>
                    <hr/>
                </>
                :
                <>
                    <div className={"toggle-span"}>
                        {showDraftPickTips ? "Draft Pick Tips" : "Draft Controls"}
                        <div className="form-check form-switch">
                            <input className="form-check-input"
                                   id="testBoxToggleOff" onChange={togglePracticeOptions} role="switch"
                                   type="checkbox" defaultChecked={!showDraftPickTips}/>
                            <label className="form-check-label" htmlFor="testBoxToggleOff">Show Practice Draft
                                Options</label>
                        </div>
                    </div>
                    <hr/>
                </>
            }
        </>
    );
}