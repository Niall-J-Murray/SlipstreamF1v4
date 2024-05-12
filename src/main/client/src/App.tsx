import './App.css'
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {Env} from "./Env.ts";

function App() {
    useEffect(() => {
        fetch(`${Env.API_BASE_URL}/ping`)
            .then(response => response.text())
            .then(body => console.log(body));
    }, []);
    return (
        <>
            <h1>Slipstream F1</h1>
            <Link to='/home'>
                Visit /home
            </Link>
        </>
    )
}

export default App
