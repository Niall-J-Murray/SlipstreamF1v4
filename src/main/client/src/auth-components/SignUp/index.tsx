import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import SignUpForm from "./SignUpForm";
import IUser from "../../types/user.type.ts";


interface RegisterProps {
    userData:  IUser |undefined,
}

export default function SignUp({userData}: RegisterProps) {
    return (
        <>
            <View>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="col-start-3 col-span-1 box-shadow">
                                <SignUpForm userData={userData}/>
                            </div>
                        </div>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}