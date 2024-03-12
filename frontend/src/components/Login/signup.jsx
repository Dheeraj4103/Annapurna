import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import {useDispatch, useSelector} from "react-redux"
import { signUp } from "../../store/User";
import style from "./login.module.css"
import { Link } from 'react-router-dom';

function SignUp() {
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const dispatch = useDispatch();
    console.log(isLoggedIn);

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    function handleSubmit() {
        const userCreds = { name, email, password };
        dispatch(signUp(userCreds));
        setEmail(null)
        setName(null)
        setPassword(null)
    }

    
    return (
        <>
            <Navbar></Navbar>
            <div className={style.loginForm}>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        className={style.input}
                        placeholder="Name"
                    />
                </label>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        className={style.input}
                        placeholder="Email"
                    />
                </label>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setPassword(e.target.value)}
                        className={style.input}
                        placeholder="Password"
                    />
                </label>
                <button
                    onClick={handleSubmit}
                    className={style.btn}
                >
                    Submit
                </button>
                <p>Already have an account ?   
                </p>
                    <Link to="/login" className={style.link_1}>Login</Link>
            </div>
        </>
    );
};

export default SignUp;