import {HashLink} from "react-router-hash-link";

export default function HowToPlay() {
    return (
        <>
            <h4>How to play:</h4>
            <div className="text-block">
                <p>
                    Follow this {" "}
                    <a href="https://vimeo.com/842933066" target="_blank">
                        link
                    </a>{" "}
                    to see a short demonstration video on Vimeo.com.
                    <br/>
                    Or, follow the steps below, or once you{" "}
                    <a href="register">register</a>, <a href="login">log-in</a> and
                    create a team, you can try a{" "}
                    <HashLink smooth  to="/dashboard" elementId={"practice-draft-options"}>practice draft</HashLink> to
                    see how it works.
                    <br/>
                    Practice leagues can also be used to create real leagues with
                    less than 10 users, by adding dummy teams to complete the draft.
                </p>
                <ol>
                    <li>
                        Register an account with your email address and choose a
                        username, then log in.
                    </li>
                    <li>
                        Go to your Dashboard, where you can name and create your team.
                        Your team is automatically added to the current open league.
                    </li>
                    <li>
                        When you join a league, you are randomly assigned a 1st and
                        2nd draft pick number.
                    </li>
                    <li>
                        To make the game more fair, the better your 1st pick number
                        is, the worse your 2nd will be. E.G. If you get the best 1st
                        pick, you also get the worst 2nd pick.
                    </li>
                    <li>
                        Each league has 10 teams, with 2 drivers per team. When a
                        league is full, a new one is automatically created. The draft
                        picks for each league cannot begin until the league is full.
                    </li>
                    <li>
                        Once a league is full, players in that league take turns
                        adding drivers to their teams, in order of their pick numbers.
                        When all 20 drivers have been picked, the league is active!
                    </li>
                    <li>
                        The league is now active, and teams will score whatever points
                        their drivers get in the real life F1 Driver's Championship.
                    </li>
                    <li>
                        Points will only be gained from future races, so any points
                        that drivers already have will not be added to your team.
                    </li>
                    <li>
                        No new teams or leagues can be created after the start of
                        Qualification, until the following Monday, during a F1 race
                        weekend.
                    </li>
                    <li>
                        At the end of the season, most points wins! If points are
                        level, the team who had the worse first pick number wins.
                    </li>
                </ol>
                <p>
                    For race schedules and more information on the Formula 1 World
                    Championship visit:
                    <a
                        href="https://www.formula1.com/en/racing/2023.html"
                        target="_blank"
                    >
                        formula1.com
                    </a>
                </p>
            </div>
            {" "}
        </>
    );
}
