import IUser from "../../../types/user.type.ts";
import {Link} from "react-router-dom";

interface HomeWelcomeProps {
    userData: IUser | undefined
}

export default function HomeWelcome({userData}: HomeWelcomeProps) {

    function Greeting() {
        if (userData) {
            return (<UserGreeting/>);
        }
        return (<GuestGreeting/>);
    }

    function UserGreeting() {
        const {username, team} = userData!;
        if (team) {
            return (
                <div>
                    <h3>Welcome back
                        <br/>
                        {username}!</h3>
                    <h4>Go to your <Link to="/dashboard">Dashboard</Link></h4>
                    <h3>Team name: {team.teamName}</h3>
                    {team.teamPoints ?
                        <h3>Points: {team.teamPoints}</h3>
                        :
                        <>
                            <h3>Points: 0</h3>
                            <h4>(Points will be scored after next race)</h4>
                        </>
                    }
                </div>
            );
        }
        return (
            <div>
                <h3>Hello {username}!</h3>
                <h4>You do not have a team yet.</h4>
                <h4>Go to your <Link to="/dashboard">Dashboard</Link> to create a one.</h4>
            </div>
        );
    }

    function GuestGreeting() {
        return (
            <>
                <h4>
                    <Link to="/signin">Please Sign In</Link>
                    <br/><br/>- or -<br/><br/>
                    <Link to="/signup">Sign Up to play!</Link>
                </h4>
            </>
        );
    }

    return (
        <>
            <div className="p-1">
                <h2>Welcome to <br/>Slipstream F1 Draft Picks!</h2>
                <Greeting/>
            </div>
        </>
    );
}