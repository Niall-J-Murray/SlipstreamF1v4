import HomeWelcome from "./HomeWelcome";
import AppDescription from "./AppDescription";
import HowToPlay from "./HowToPlay";
import Layout from "../../components/Layout/Layout.tsx";
import IUser from "../../types/user.type.ts";

interface HomeProps {
    userData: undefined | IUser
}

export default function Home({userData}: HomeProps) {

    return (
        <>
            <Layout>
                <div className="grid grid-cols-5 gap-2">
                    <div className="col-start-2 col-span-1 box-shadow">
                        <HomeWelcome userData={userData}/>
                    </div>
                    <div className="col-start-3 col-span-2 box-shadow">
                        <AppDescription/>
                    </div>
                    <div id="how-to-play" className="col-start-2 col-span-3 box-shadow">
                        <HowToPlay/>
                    </div>
                </div>
            </Layout>
        </>
    );
}
