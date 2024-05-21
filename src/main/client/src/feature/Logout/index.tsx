import * as AuthService from "../../services/auth.service.ts";
import {getUserFromLocalStorage} from "../../services/auth.service.ts";
import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import checkered_flag from "../../assets/images/checkered_flag.jpg";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import IUser from "../../types/user.type.ts";

interface LogoutProps {
    userData: undefined | IUser
}

export default function Logout({userData}: LogoutProps) {
    const redirect: NavigateFunction = useNavigate();
    const logOut = () => {
        AuthService.logout(getUserFromLocalStorage()?.id);
        // setShowModeratorBoard(false);
        // setShowAdminBoard(false);
        // setCurrentUser(undefined);
        redirect("/home");
        window.location.reload();
    };

    useEffect(() => {
        if (!userData) {
            redirect("/login");
        }
    }, []);

    function LogOutForm() {
        return (
            <div className="grid grid-cols-7 gap-3 p-5">
                <img
                    id={"login-pic"}
                    className={"col-start-1 col-span-3"}
                    src={checkered_flag}
                    height={180}
                    width={330}
                    alt="red-lights"

                />
                <div className={"col-start-2 col-span-5 p-1"}>
                    <div className={"p-6"}>Are you sure...?</div>
                    <button className="btn btn-proceed" type="submit" onClick={logOut}>
                        <span>Confirm Logout</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <View>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="col-start-3 col-span-1 box-shadow">
                                <LogOutForm/>
                            </div>
                        </div>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}

