import {getAddDrivers, getUpdateStandings, postDeleteTeam, postDeleteUser} from "../../../services/admin.service.ts";
import {useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

// function load(key) {
//     const item = window.sessionStorage.getItem(key);
//     return item != null ? item : "";
// }

export default function AdminControls() {
    const navigate: NavigateFunction = useNavigate();
    const [loading, setLoading]
        = useState<boolean>(false);
    const [message, setMessage]
        = useState<string>("");
    const [teamId, setTeamId]
        = useState<string | number | undefined>();
    const [userId, setUserId]
        = useState<string | number | undefined>();
    // const [updateSuccessful, setUpdateSuccessful]
    //     = useState<boolean>(false);
    // const [updateMessage, setUpdateMessage]
    //     = useState<string>(() => load('updateMessage'));
    //
    // useEffect(() => {
    //     window.sessionStorage.setItem('updateMessage', updateMessage);
    //     setUpdateMessage(window.sessionStorage.getItem('updateMessage'));
    // }, [updateMessage]);


    const handleAddDrivers = () => {
        console.log("AddDrivers")
        setMessage("");
        setLoading(true);

        getAddDrivers()
            .then(
                () => {
                    navigate("/admin");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        // setUpdateSuccessful(true);
    }

    const handleUpdateStandings = () => {
        console.log("UpdateStandings")
        setMessage("");
        setLoading(true);

        getUpdateStandings()
            .then(
                () => {
                    // sessionStorage.setItem("updateMessage", "Update Successful");
                    navigate("/admin");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        // setUpdateSuccessful(true);
    }

    // function getMessage() {
    //     //get it if Status key found
    //     if (localStorage.getItem("updateMessage")) {
    //         updateMessage = localStorage.getItem("updateMessage");
    //         localStorage.clear();
    //     }
    // };

    const handleDeleteTeam = (teamId: string | number | undefined) => {
        console.log("handleDeleteTeam")
        console.log(teamId)
        setMessage("");
        setLoading(true);

        postDeleteTeam(teamId)
            .then(
                () => {
                    navigate("/admin");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        // setUpdateSuccessful(true);
    }

    const handleDeleteUser = (userId: string | number | undefined) => {
        console.log("handleDeleteUser")
        console.log(userId)
        setMessage("");
        setLoading(true);

        postDeleteUser(userId)
            .then(
                () => {
                    navigate("/admin");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        // setUpdateSuccessful(true);
    }

    return (
        <>
            <table className="league-table" id="email">
                <caption><h3>Admin Controls</h3></caption>
                <thead>
                <tr>
                    <th>Email Type</th>
                    <th>Address</th>
                    <th>Delete Team</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div>
                            <label htmlFor="emailType">Choose email type:</label>
                        </div>
                        <div>
                            <select name="emailType" id="emailType">
                                <option value="1">1: Send Custom Email</option>
                                <option value="2">2: Send Email Template</option>
                                <option value="3">3: Send Custom Html Email</option>
                                <option value="4">4: Send HTML Email Template</option>
                            </select>
                        </div>
                    </td>
                    <td>
                        <div>
                            <label htmlFor="emailAddress">Recipient:</label>
                        </div>
                        <div>
                            <input type="email" name="emailAddress" id="emailAddress"/>
                        </div>
                        <div className="padding: 3px">
                            <button type="submit" className="btn btn-danger navbar-btn">Send Email</button>
                        </div>
                    </td>
                    <td>
                        <div>
                            <label htmlFor="teamId">Team ID:</label>
                        </div>
                        <div>
                            <input type="text" name="teamId" id="teamId"
                                   onChange={e =>
                                       setTeamId(e.target.value)}/>
                        </div>
                        <div className={"p-1"}>
                            <button className="btn btn-proceed"
                                    type={"submit"}
                                    onClick={() => handleDeleteTeam(teamId)}>
                                <span>Delete Team</span>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>API</th>
                    <th>Response</th>
                    <th>Delete User</th>
                </tr>
                <tr>
                    <td>
                        <div className={"p-1"}>
                            <button className="btn btn-proceed"
                                    type={"submit"}
                                    onClick={() => handleAddDrivers()}>
                                <span>Add Drivers</span>
                            </button>
                        </div>
                        <div className={"p-1"}>
                            <button className="btn btn-proceed"
                                    type={"submit"}
                                    onClick={() => handleUpdateStandings()}>
                                <span>Update Standings</span>
                            </button>
                        </div>
                    </td>
                    <td>
                        <div>
                            <div>{loading ? "loading" : ""}</div>
                            <div>{message ? message : ""}</div>
                            {/*<div onLoad={() => getMessage()}>{updateMessage}</div>*/}
                            {/*<div>{updateSuccessful ? sessionStorage.getItem("updateMessage") : ""}</div>*/}
                        </div>
                    </td>
                    <td>
                        <div>
                            <label htmlFor="userId">User ID:</label>
                        </div>
                        <div>
                            <input type="text" name="userId" id="userId"
                                   onChange={e => setUserId(e.target.value)}/>
                        </div>
                        <div className="padding: 3px">
                            <div className={"p-1"}>
                                <button className="btn btn-proceed"
                                        type={"submit"}
                                        onClick={() => handleDeleteUser(userId)}>
                                    <span>Delete User</span>
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    );
}