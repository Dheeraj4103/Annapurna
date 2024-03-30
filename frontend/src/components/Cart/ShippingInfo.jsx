import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import {useDispatch, useSelector} from "react-redux"
import { logIn } from "../../store/User";
import style from "./ShippingInfo.module.css"
import { Link, useNavigate } from 'react-router-dom';
import { placeOrder } from "../../store/cart";

function ShippingInfo() {
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
   
    const dispatch = useDispatch();
    console.log(isLoggedIn);
    const navigate = useNavigate();

    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [state, setState] = useState(null);
    const [country, setCountry] = useState(null);

    function handleSubmit() {
        const shippingInfo = {
            address,
            city,
            phoneNumber,
            postalCode,
            state,
            country
        }
        console.log(shippingInfo)
        dispatch(placeOrder(shippingInfo));
    }
    return (
        <>
            <Navbar></Navbar>
            <div className={style.loginForm}>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        className={style.input}
                        placeholder="Address"
                        defaultValue={address}
                    />
                </label>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        className={style.input}
                        placeholder="City"
                        defaultValue={city}
                    />
                </label>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className={style.input}
                        placeholder="PhoneNumber"
                        defaultValue={phoneNumber}
                    />
                </label>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setPostalCode(e.target.value)}
                        className={style.input}
                        placeholder="PostalCode"
                        defaultValue={postalCode}
                    />
                </label>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setState(e.target.value)}
                        className={style.input}
                        placeholder="State"
                        defaultValue={state}
                    />
                </label>
                <label className={style.inputLabel}> 
                    <input
                        type="text"
                        onChange={(e) => setCountry(e.target.value)}
                        className={style.input}
                        placeholder="Country"
                        defaultValue={country}
                    />
                </label>
                <button
                    onClick={handleSubmit}
                    className={style.btn}
                >
                    Submit
                </button>
                
            </div>
        </>
    );
};

export default ShippingInfo;