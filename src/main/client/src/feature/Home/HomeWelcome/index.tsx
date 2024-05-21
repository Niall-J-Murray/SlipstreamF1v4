import IUser from "../../../types/user.type.ts";

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
                    <h4>Go to your <a href="/dashboard">Dashboard</a></h4>
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
                <h4>Go to your <a href="/dashboard">Dashboard</a> to create a one.</h4>
            </div>
        );
    }

    function GuestGreeting() {
        return (
            <>
                <h4>
                    <a href="/login">Please Login</a>
                    <br/><br/>- or -<br/><br/>
                    <a href="/register">Register to play!</a>
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