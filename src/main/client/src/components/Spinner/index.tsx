import steeringWheel from "../../assets/images/racing_wheel.gif"

export default function Spinner() {
    return (
        <div className={"loading-gif"}>
            <img
                src={steeringWheel}
                alt="Loading..."
            />
        </div>
    );
}