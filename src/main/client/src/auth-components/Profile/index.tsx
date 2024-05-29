import IUser from "../../types/user.type.ts";
import Layout from "../../components/Layout/Layout.tsx";

interface ProfileProps {
    userData?: undefined | IUser
}

export default function Profile({userData: currentUser}: ProfileProps) {
    const partialToken =
        currentUser?.accessToken
            ? `${currentUser.accessToken.substring(0, 20)} ... ${currentUser.accessToken.substring(currentUser.accessToken.length - 20)}`
            : "";
    // const renderRoles = () =>
    //     currentUser?.roles?.map((role: IRole) =>
    //         <li key={role.id}>{role.name}</li>);

    function ProfileData() {
        return (
            <div className="grid grid-cols-12 gap-2">
                <div className="col-start-3 col-span-3 h-125 box-shadow">
                    <header className="jumbotron">
                        <h3>
                            <strong>{currentUser?.username}'s</strong> Profile
                        </h3>
                    </header>
                    <p>
                        <strong>Token:</strong> {partialToken}
                    </p>
                    <p>
                        <strong>Id:</strong> {currentUser?.id}
                    </p>
                    <p>
                        <strong>Email:</strong> {currentUser?.email}
                    </p>
                    <p>
                        Last Sign In: {localStorage.getItem("signInDate")}
                    </p>
                    <p>
                        Last Sign Out: {currentUser?.lastLogout?.toString()}
                    </p>
                    {/*<strong>Authorities:</strong>*/}
                    {/*<ul>*/}
                    {/*    {renderRoles()}*/}
                    {/*</ul>*/}
                </div>
            </div>
        );
    }

    return (
        <>
            <Layout>
                <ProfileData/>
            </Layout>
        </>
    );
};
;

