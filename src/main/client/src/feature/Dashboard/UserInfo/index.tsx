import {ObjectSchema} from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import IDriver from "../../../types/driver.type.ts";
import IUser from "../../../types/user.type.ts";
import ILeague from "../../../types/league.type.ts";
import {UseQueryResult} from "react-query";
import {Link} from "react-router-dom";

interface DashTopProps {
    userData: IUser | undefined,
    leagueData: ILeague | undefined,
    leagueSize: number | undefined | null,
    isPracticeLeague: boolean | undefined | null,
    isLeagueFull: boolean | undefined | null,
    isLeagueActive: boolean | undefined | null,
    initialValues: { teamName: string },
    validationSchema: ObjectSchema<object>,
    loading: boolean,
    message: string,
    handleCreateTeam: (formValue: { teamName: string }) => void,
    handleDeleteUserTeam: (e: { preventDefault: () => void }) => void,
    driversInTeam: (teamId: (number | null | undefined)) => UseQueryResult<IDriver[]>
    // driversInTeam: (teamId: (number | null | undefined)) => QueryObserverIdleResult<Array<IDriver>, unknown> | QueryObserverLoadingErrorResult<Array<IDriver>, unknown> | QueryObserverLoadingResult<Array<IDriver>, unknown> | QueryObserverRefetchErrorResult<Array<IDriver>, unknown> | QueryObserverSuccessResult<Array<IDriver>, unknown>
}

export default function UserInfo({
                                    userData,
                                    leagueData,
                                    leagueSize,
                                    isLeagueFull,
                                    isLeagueActive,
                                    initialValues,
                                    validationSchema,
                                    loading,
                                    message,
                                    handleCreateTeam,
                                    handleDeleteUserTeam,
                                    driversInTeam,
                                }: DashTopProps) {


    const username = userData?.username;
    const teamName = userData?.team?.teamName
    const firstPickNumber = userData?.team?.firstPickNumber
    const secondPickNumber = userData?.team?.secondPickNumber
    const driversInUserTeam = driversInTeam(userData?.team?.id).data;

    const isAdmin = (user: IUser | undefined) => {
        let isAdmin = false;
        user?.roles?.map(role => {
                if (role.name === "ROLE_ADMIN") {
                    isAdmin = true;
                }
            }
        )
        return isAdmin;
    }

    function CreateTeam() {
        return (
            <>
                <div>
                    <h4>{leagueData?.leagueName} is open to join.
                        <br/>
                        Once the league is full, the draft can begin.</h4>
                    <h4>You must create a team to try a practice draft.</h4>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleCreateTeam}
                >
                    <Form className={"col-start-1 col-span-3"}>
                        <div className="form-group">
                            {/*<label htmlFor="teamName">Choose a team name to get started:*/}
                            <legend>Choose a team name to get started:</legend>
                            <Field id="teamName" name="teamName" type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-proceed" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Create Team</span>
                            </button>
                            <ErrorMessage
                                name="teamName"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </>
        )
    }

    function AdminGreeting() {
        return (
            <div>
                <h3>{username}'s Dashboard </h3>
                <hr/>
                <h3>Sorry, admins cannot play!</h3>
                <h3><Link to="/admin">Go to admin dashboard</Link></h3>
                <h3>- or -</h3>
                <h3><Link to="/signup">Register for a user account</Link></h3>
            </div>);
    }

    // function PracticeGreeting() {
    //     if (isPracticeLeague && !isLeagueActive) {
    //         return <div>
    //             <h4>This is a practice league -
    //                 <br/> {">"} You may make picks for your team and test teams.
    //                 <br/> {">"} Test teams will be removed automatically 24hrs after practice draft
    //                 is finished.
    //             </h4>
    //         </div>;
    //     }
    // }

    function UserGreeting() {
        if (userData?.team) {
            if (isLeagueFull || isLeagueActive) {
                return (
                    <div>
                        <h3>{username}'s Dashboard </h3>
                        <hr/>
                        <p>Your team: {teamName}</p>
                        <p>1st pick number: {firstPickNumber}
                            <br/>
                            2nd pick number: {secondPickNumber}</p>
                        Selected Drivers:
                        {driversInUserTeam && driversInUserTeam?.length < 1 ?
                            <div>
                                1 -
                            </div>
                            :
                            <div>
                                {driversInUserTeam?.map((driver: IDriver, i: number) => {
                                    return (
                                        <div key={driver.id}>
                                            {driver ?
                                                <>{i + 1} - {driver.surname}</>
                                                :
                                                <> {i + 1} - </>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        <hr/>
                        {isLeagueActive ?
                            <>
                                <div>
                                    <p>Want to join a different league?</p>
                                    <button className="btn btn-proceed "
                                            type="button"
                                            onClick={(e) => handleDeleteUserTeam(e)}
                                    >
                                        Delete This Team
                                    </button>
                                </div>
                                <hr/>
                                <h3>Your league is active, points will be scored from races after:
                                    <br/>{leagueData?.activeTimestamp?.slice(0, 8)}</h3>
                            </>
                            :
                            <h3>Draft in progress...</h3>
                        }
                        {/*<PracticeGreeting/>*/
                        }
                    </div>
                )
                    ;
            }
            return (
                <div>
                    <h3>{username}'s Dashboard </h3>
                    <hr/>
                    <p>Your team: {teamName}</p>
                    <p>Random 1st pick draft number: {firstPickNumber}</p>
                    <p>Random 2nd pick draft number: {secondPickNumber}</p>
                    <hr/>
                    <h4>{leagueData?.leagueName} is {leagueSize} of 10 teams full.
                        <br/>
                        Draft picks will start when the league is full.
                        <br/>
                        To start a draft with less than 10 players, you can add test teams using the practice draft
                        options.
                    </h4>
                    {/*<PracticeGreeting/>*/}
                </div>
            );
        }
        return (
            <div>
                <h3>{username}'s Dashboard </h3>
                <hr/>
                <CreateTeam/>
            </div>
        );
    }

    function Greeting() {
        if (isAdmin(userData)) {
            return <AdminGreeting/>;
        }
        return <UserGreeting/>;
    }

    return (
        <Greeting/>
    );
}
