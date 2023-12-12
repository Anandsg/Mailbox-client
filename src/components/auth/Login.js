import React, { useRef, useState } from "react";
import { checkValidateData } from "../../utils/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [isSignUpForm, setIsSignUpForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const email = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);

    const handleValidationBtn = async () => {
        const message = checkValidateData(email.current.value,
            password.current.value, confirmPassword.current ?
            confirmPassword.current.value : null);
        setErrorMessage(message);
        if (message) return;

        try {
            if (isSignUpForm) {
                // Sign up logic
                if (confirmPassword.current && confirmPassword.current.value
                    !== password.current.value) {
                    setErrorMessage("Passwords did not match.");
                    return;
                }

                const userCredential = await createUserWithEmailAndPassword(auth, email.current.value,
                    password.current.value,
                    confirmPassword.current ?
                        confirmPassword.current.value : null);
                const user = userCredential.user;
                console.log(user);

                const loginDetails = { token: user.accessToken, email: user.email };
                localStorage.setItem('details', JSON.stringify(loginDetails));

                // Send verification email
                const mailVerify = await axios.post(
                    'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDO2RcyM6pWLSv9E5MBtzGACEPx2Chtqxg',
                    {
                        requestType: 'VERIFY_EMAIL',
                        idToken: user.accessToken,
                    }
                );

                console.log(mailVerify);

                if (mailVerify.status === 200) {
                }
            } else {
                // Login logic
                const userCredential = await signInWithEmailAndPassword(auth, email.current.value,
                    password.current.value);
                const user = userCredential.user;
                console.log(user);
                navigate('/welcome');
            }

        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setErrorMessage("Email already in use. Please login.");
            } else {
                setErrorMessage(error.message);
            }
        }
    };

    const toggleSignInForm = () => {
        setIsSignUpForm(!isSignUpForm);
    };

    return (
        <div className="flex">
            <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-3/12 p-4 md:p-10 my-40 md:mx-auto right-0 left-0 border">
                <h2 className="text-center text-xl">{isSignUpForm ? "Sign Up" : "Login"}</h2>
                <input
                    ref={email}
                    type="email"
                    placeholder="Email"
                    className="p-2 flex my-3 border w-full rounded-md text-sm"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-2 my-3 flex border w-full rounded-md text-sm"
                />
                {isSignUpForm && <input
                    ref={confirmPassword}
                    type="password"
                    placeholder="Confirm password"
                    className="p-2 my-3 flex border w-full rounded-md text-sm"
                />}
                <p className="text-sm text-red-500">{errorMessage}</p>
                <button
                    onClick={handleValidationBtn}
                    className="p-2 my-4 bg-indigo-500 text-white w-full rounded-md"
                >
                    {isSignUpForm ? "Sign Up" : "Login"}
                </button>
                {isSignUpForm ? (
                    <div className="flex p-2 rounded-md justify-center">
                        <p className="rounded-md text-sm px-2 text-center">Have an account? </p>
                        <p
                            className=" text-sm cursor-pointer hover:underline text-indigo-500 "
                            onClick={toggleSignInForm}
                        >
                            Login
                        </p>
                    </div>
                ) : (
                    <div className="flex bg-indigo-100 p-2 rounded-md justify-center">
                        <p className="rounded-md text-sm px-2 text-center">Don't have an account?</p>
                        <p
                            className=" text-sm cursor-pointer hover:underline "
                            onClick={toggleSignInForm}
                        >
                            Sign Up
                        </p>
                    </div>
                )}
                {!isSignUpForm && <div>
                    <Link to='/forgotPassword'>
                        <p className="rounded-md text-sm px-2 my-5 text-center cursor-pointer hover:underline">
                            Forgot password?
                        </p>
                    </Link>
                </div>}
            </form>
        </div>
    );
};

export default Login;
