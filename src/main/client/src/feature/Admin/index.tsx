import {useEffect, useState} from "react";
import {getAllUsers} from "../../services/admin.service.ts";
import IUser from "../../types/user.type.ts";
import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import AdminControls from "./AdminControls";
import UserTable from "./UserTable";
import DriverStandingsTable from "../Dashboard/DriverTable/DriverStandingsTable";
import LeaguesTable from "./LeaguesTable";
import {useNavigate} from "react-router-dom";

interface AdminProps {
    userData: IUser | undefined,
}

export default function Admin({userData}: AdminProps) {
    const redirect = useNavigate();
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


    const [allUsers, setAllUsers]
        = useState<Array<IUser> | undefined>([]);

    useEffect(() => {
        if (!userData || !isAdmin(userData)) {
            redirect("/dashboard");
        }
        getAllUsers().then(response => {
            setAllUsers(response);
        })
    }, []);

    return (
        <>
            <View>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <div className="grid grid-cols-5 gap-2">
                            {isAdmin(userData) ?
                                <>
                                    <div className="col-start-2 col-span-3">
                                        <AdminControls/>
                                    </div>
                                    <div className="col-start-2 col-span-3">
                                        <LeaguesTable/>
                                    </div>
                                    <div className="col-start-2 col-span-3">
                                        <UserTable allUsers={allUsers}/>
                                    </div>
                                    <div className="col-start-2 col-span-3">
                                        <DriverStandingsTable/>
                                    </div>
                                </>
                                :
                                <div className="col-start-2 col-span-3">
                                    <h1>User is not Admin</h1>
                                </div>
                            }
                        </div>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}