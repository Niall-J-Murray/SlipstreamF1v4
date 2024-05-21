import Spinner from "../Spinner";

export default function View(props: any) {
    let loadingGif;
    if (props.loading) {
        loadingGif = <Spinner/>;
    }
    return (
        <>
            <div id={"view"} className="flex justify-center h-screen">
                {loadingGif}
                {props.children}
            </div>
        </>
    );
}