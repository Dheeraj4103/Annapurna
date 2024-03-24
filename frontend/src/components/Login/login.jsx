import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import {useDispatch, useSelector} from "react-redux"
import { logIn } from "../../store/User";
import style from "./login.module.css"
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const dispatch = useDispatch();
    console.log(isLoggedIn);
    const navigate = useNavigate();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    function handleSubmit() {
        const userCreds = { email, password };
        dispatch(logIn(userCreds));
        setEmail(null)
        setPassword(null)
        navigate("/");
    }
    return (
        <>
            <Navbar></Navbar>
            <div className={style.loginForm}>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        className={style.input}
                        placeholder="Email"
                        defaultValue={email}
                    />
                </label>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setPassword(e.target.value)}
                        className={style.input}
                        placeholder="Password"
                        defaultValue={password}
                    />
                </label>
                <button
                    onClick={handleSubmit}
                    className={style.btn}
                >
                    Submit
                </button>
                <p>Don't have an account ?   
                </p>
                    <Link to="/signup" className={style.link_1}>Sign Up</Link>
            </div>
        </>
    );
};

export default Login;