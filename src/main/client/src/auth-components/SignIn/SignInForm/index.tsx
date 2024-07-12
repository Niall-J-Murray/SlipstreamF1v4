import {NavigateFunction, useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import lights_on from "../../../assets/images/lights_on.png";
import {signIn} from "../../../services/auth.service";
import {useState} from "react";

interface LoginFormProps {
    error: unknown
}

export default function SignInForm({error}: LoginFormProps) {
    const navigate: NavigateFunction = useNavigate();
    const [loading, setLoading]
        = useState<boolean>(false);
    const [message, setMessage]
        = useState<string>("");

    const initialValues: {
        username: string;
        password: string;
    } = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object()
        .shape({
            username: Yup.string().required("This field is required!"),
            password: Yup.string().required("This field is required!"),
        });

    const handleSignIn = (formValue: { username: string; password: string }) => {
        const {username, password} = formValue;
        setMessage("");
        setLoading(true);

        signIn(username.trim(), password.trim())
            .then(
                () => {
                    navigate("/dashboard");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
    };

    return (
        <>
            <div className="grid grid-cols-5 gap-3 p-5">
                <img
                    src={lights_on}
                    height={180}
                    width={330}
                    alt="red-lights"
                    className="login-pic col-start-1 col-span-3"
                />
                <div className={"col-start-1 col-span-3"}>Please Log In</div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSignIn}
                >
                    <Form className={"col-start-1 col-span-3"}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field name="username" type="text" className="form-control"/>
                            <ErrorMessage
                                name="username"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="current-password" className="form-control"/>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-proceed" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
                <div className={"col-start-1 col-span-3"}>
                    <a onClick={() => navigate("/register")}><u>Or Sign Up...</u></a>
                </div>
            </div>
            <div>
                {error ?
                    <>
                        <h3 className={"error-message"}>An error has occurred - <br/>
                            Please try login again</h3>
                    </>
                    : <></>}
            </div>
        </>
    );
};