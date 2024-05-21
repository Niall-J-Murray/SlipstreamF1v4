import IUser from "../../../types/user.type.ts";

export default function UserTable({allUsers}:any) {
    const users: IUser[] = allUsers;
    return (
        <>
            <div>
                <table className="table drivers-table">
                    <caption><h3>Users -
                        <small>({users?.length} total)</small></h3>
                    </caption>
                    <thead>
                    <tr>
                        <th>UID</th>
                        <th>Username</th>
                        <th>Team Name</th>
                        <th>TID</th>
                        <th>Email</th>
                        <th>Last Logout</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users?.map((user: IUser) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.team? user.team?.teamName : "No active team"}</td>
                                <td>{user.team? user.team?.id : "N/A"}</td>
                                <td>{user.email}</td>
                                <td>{user.lastLogout}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
}