import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-evenly",
            }}
        >
            <div style={{fontWeight: "bold"}}>
                <Link to={"/"} style={{textDecoration: "none"}}>
                    To-Do App
                </Link>
            </div>
            <div>
                <Link to={"/dashboard"}>Dashboard</Link>
            </div>
        </div>
    );
};

