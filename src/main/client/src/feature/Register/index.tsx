import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import RegistrationForm from "./RegistrationForm";
import IUser from "../../types/user.type.ts";


interface RegisterProps {
    userData:  IUser |undefined,
}

export default function Register({userData}: RegisterProps) {
    return (
        <>
            <View>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="col-start-3 col-span-1 box-shadow">
                                <RegistrationForm userData={userData}/>
                            </div>
                        </div>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}