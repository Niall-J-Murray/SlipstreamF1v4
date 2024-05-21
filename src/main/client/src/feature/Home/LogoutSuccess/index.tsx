export default function LogoutSuccessful(b: boolean) {
    if (b) {
        return (
            <div>
                <h4>Log out successful</h4>
                <h4><a href="/login">Log back in?</a></h4>
            </div>
        );
    } else return (<div></div>);
}